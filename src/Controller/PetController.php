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


#[Route('/pet', name: 'pet.')]
class PetController extends AbstractController
{
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
            return $this->json('request failed');
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
}
