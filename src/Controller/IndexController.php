<?php

namespace App\Controller;

use App\Repository\PetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class IndexController
 * @package App\Controller
 */
class IndexController extends AbstractController
{

    private $petRepository;
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager, PetRepository $petRepository){
        $this->entityManager = $entityManager;
        $this->petRepository = $petRepository;
    }
    #[Route('index', name: 'app_index')]
    public function index()
    {
        $pets = $this->petRepository->findAll();
        $arrayOfPets = [];
        foreach ($pets as $pet){
           $arrayOfPets[] = $pet->toArray();
        }

        return $this->json($arrayOfPets);
    }

    /**
    *@Route("/{reactRouting}", name="app_main", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})   
    */ 
    public function main()
    {
        return $this->render('index/index.html.twig', [
        ]);
    }
}

