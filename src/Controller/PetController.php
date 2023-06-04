<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Pet;
use App\Entity\User;
use App\Repository\PetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/pet', name: 'pet.')]
class PetController extends AbstractController
{

    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    /**
     * @Route("/all-pets",name="app_all_pets", methods={"GET"})
     */
    public function getAllPets(Request $request, SerializerInterface $serializer) : JsonResponse{

        try{
            $em = $this->doctrine->getManager();
            $items = $em->getRepository(Pet::class)->findAll();
            $serialized = $serializer->serialize(
                $items,"json",[
                    'groups'=> 'pet'
                ]
            );
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('nope');
        }

    }

    /**
     * @Route("/some-pets",name="app_some_pets", methods={"GET"})
     */
    public function getSomePets(Request $request, SerializerInterface $serializer) : JsonResponse{
        try{
            $em = $this->doctrine->getManager();
            $items = $em->getRepository(Pet::class)->findBy([], null, 4);           
            $serialized = $serializer->serialize(
                $items,"json",[
                    'groups'=> 'pet'
                ]
            );
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('nope');
        }

    }


    /**
     * @Route("/specific-pet",name="app_specific_pets", methods={"GET"})
     */
    public function getSpecificPet(Request $request, SerializerInterface $serializer): JsonResponse{
    try {
        $id = $request->query->get('id');
        $em = $this->doctrine->getManager();
        $pet = $em->getRepository(Pet::class)->find($id);

        if (!$pet) {
            throw new \Exception('Pet not found');
        }

        $serialized = $serializer->serialize(
            $pet,
            "json",
            ['groups' => 'pet']
        );
        return new JsonResponse($serialized, 200, [], true);
    } catch (\Exception $e) {
        return $this->json($e);
    }
}



    /**
    * @Route("/add-pet", name="app_add_pet", methods={"POST"})   
    * 
    */
    public function addPet(Request $request): JsonResponse
    {
        try{
            $pet = new Pet();
            $data = $request->getContent();
            $data = json_decode($data, true);
            $em  =$this->doctrine->getManager();
            $user = $em->getRepository(User::class)->findOneBy(['id' => 1]);
            $category = $em->getRepository(Category::class)->findOneBy(['name' => strtolower($data['category'])]);
            $pet->setUser($user);
            $pet->setName($data['name']);
            $pet->setBreed($data['breed']);
            $pet->setStatus($data['status']);
            $pet->setCategory($category);
            $pet->setDescription($data['description']);
            $pet->setCreatedAt(1);
            $pet->setLastUpdatedAt(1);
            if($data['facts']){
                $pet->setFacts($data['facts']);
            }
            $em->persist($pet);
            $em->flush();
            return $this->json('success');
        }catch(\Exception $exception){
            return $this->json('failed');
        }
    }

    #[Route('/show/{id}', name: 'show')]

    public function show(Pet $pet): JsonResponse
    {
        return $this->json($pet);
    }

    #[Route('/delete/{id}', name: 'delete')]
    public function delete(Pet $pet, EntityManagerInterface $entityManager): RedirectResponse
    {
        $entityManager->remove($pet);
        $entityManager->flush();

        return $this->redirect($this->generateUrl('pet.index'));
    }


    #[Route('/edit/{id}', name: 'edit')]
    public function edit(Request $request, $pet_id, PetRepository $petRepository, EntityManagerInterface $entityManager): RedirectResponse
    {
        $data = json_decode($request->getContent(), true);
        $pet = $petRepository->find($pet_id);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
        $pet->setUser($user);
        $pet->setCategory($category);
        $pet->setName($data['name']);
        $pet->setAge($data['age']);
        $pet->setBreed($data['breed']);
        $pet->setDescription($data['description']);
        $pet->setFacts($data['facts']);
        $pet->setImages($data['images']);
        $pet->setStatus($data['status']);

        $entityManager->flush();
        return $this->redirect($this->generateUrl('pet.show'));
    }

    
/**
 * @Route("/personal-pets/{userId}", name="app_personal_pets", methods={"GET"})
 */
public function getPersonalPets(Request $request, SerializerInterface $serializer, int $userId): JsonResponse
{
    try {
        // Fetch items based on user ID from the database
        $em = $this->doctrine->getManager();
        $items = $em->getRepository(Pet::class)
            ->createQueryBuilder('p')
            ->join('p.user', 'u')
            ->where('u.id = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult();

        if (empty($items)) {
            throw new \Exception('Items not found');
        }

        // Serialize the list of items
        $serialized = $serializer->serialize(
            $items,
            'json',
            ['groups' => 'pet']
        );
        return new JsonResponse($serialized, 200, [], true);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], 400);
    }
}

}
