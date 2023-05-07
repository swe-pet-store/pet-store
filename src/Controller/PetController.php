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
    #[Route('/', name: 'index')]
    public function index(PetRepository $petRepository): Response
    {
        $allPets = $petRepository->findAll();
        return new Response($this->json($allPets));

//        return $this->render('pet/index.html.twig', [
//            'controller_name' => 'PetController',
//        ]);
    }
    #[Route('/create', name: 'create')]
    public function create(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
        $pet = new Pet();
        $pet->setUser($user);
        $pet->setCategory($category);
        $pet->setName($data['name']);
        $pet->setAge($data['age']);
        $pet->setBreed($data['breed']);
        $pet->setDescription($data['description']);
        $pet->setFacts($data['facts']);
        $pet->setImages($data['images']);
        $pet->setStatus($data['status']);

        $errors = $validator->validate($pet);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        $entityManager->persist($pet);
        $entityManager->flush();

        return $this->redirect($this->generateUrl("pet.show"));

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
