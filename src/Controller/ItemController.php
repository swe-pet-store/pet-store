<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('item')]
class ItemController extends AbstractController
{
    #[Route('/add-item', name: 'app_add_item')]
    public function addItem() : JsonResponse
    {
        $pets = $this->petRepository->findAll();
        $arrayOfPets = [];
        foreach ($pets as $pet){
            $arrayOfPets[] = $pet->toArray();
        }

        return $this->json($arrayOfPets);
    }

}