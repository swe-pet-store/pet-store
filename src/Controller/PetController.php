<?php


namespace App\Controller;


use App\Entity\Category;
use App\Entity\Item;
use App\Entity\Pet;
use App\Entity\User;
use App\Repository\PetRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/pet')]
class PetController extends AbstractController
{   private $doctrine;

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

}