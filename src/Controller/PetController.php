<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/pet')]
class PetController extends AbstractController
{
    /**
    * @Route("/add-pet", name="app_add_pet", methods={"POST"})   
    * 
    */
    public function addPet(Request $request): JsonResponse
    {
        $data = $request->getContent();
        $data = json_decode($data, true);
        dump($data);
        return $this->json($data);
    }

}