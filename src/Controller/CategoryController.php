<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/category', name: 'category.')]
class CategoryController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();
        return new Response($this->json($categories));

//        return $this->render('category/index.html.twig', [
//            'controller_name' => 'CategoryController',
//        ]);
    }

    #[Route('/create', name: 'create')]
    public function create(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator, CategoryRepository $categoryRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $category = new Category();
        $category->setName($data['name']);
        $errors = $validator->validate($category);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
//        $categoryRepository->save($category);
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->redirect($this->generateUrl("category.show"));
    }

    #[Route('/show/{id}', name: 'show')]
    public function show(Category $category): JsonResponse
    {
        return $this->json($category);

    }

    #[Route('/delete/{id}', name: 'delete')]
    public function delete(Category $category, EntityManagerInterface $entityManager): RedirectResponse
    {
        $entityManager->remove($category);
        $entityManager->flush();

        return $this->redirect($this->generateUrl('category.index'));
    }

    #[Route('/edit/{id}', name: 'edit')]
    public function edit(Request $request, $category_id, CategoryRepository $categoryRepository, EntityManagerInterface $entityManager): RedirectResponse
    {
        $data = json_decode($request->getContent(), true);
        $category = $categoryRepository->find($category_id);
        $category->setName($data['name']);

        $entityManager->flush();
        return $this->redirect($this->generateUrl('category.show'));
    }

}
