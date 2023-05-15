<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/pet')]
class PetController extends AbstractController
{
    #[Route('/add-pet', name: 'app_add_pet')]
    public function addPet(): JsonResponse
    {
        $pets = $this->petRepository->findAll();
        $arrayOfPets = [];
        foreach ($pets as $pet){
            $arrayOfPets[] = $pet->toArray();
        }

        return $this->json($arrayOfPets);
    }

}