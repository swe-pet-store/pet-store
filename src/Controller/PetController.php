<?php


namespace App\Controller;


use App\Entity\Category;
use App\Entity\Pet;
use App\Entity\User;
use App\Repository\PetRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/pet')]
class PetController extends AbstractController
{   private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
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