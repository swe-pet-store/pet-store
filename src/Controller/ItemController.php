<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/item')]
class ItemController extends AbstractController
{
    /**
    * @Route("/add-item", name="app_add_item", methods={"POST"})   
    * 
    */
    public function addItem(Request $request ) : JsonResponse
    {
        $data = $request->getContent();
        $data = json_decode($data, true);
        dump($data);
        return $this->json($data);

    }

}