<?php

namespace App\Controller;

use App\Entity\Testimonial;
use App\Entity\User;
use App\Repository\TestimonialRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;


#[Route('/testimonial', name: 'testimonial.')]

class TestimonialController extends AbstractController
{
    #[Route('/testimonial', name: 'app_testimonial')]
    public function index(TestimonialRepository $testimonialRepository): Response
    {
        $testimonials = $testimonialRepository->findAll();
        return new Response($this->json($testimonials));
//        return $this->render('testimonial/index.html.twig', [
//            'controller_name' => 'TestimonialController',
//        ]);
    }

    #[Route('/create', name: 'create')]
    public function create(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        $testimonial = new Testimonial();
        $testimonial->setUser($user);
        $testimonial->setDescription($data['description']);
        $testimonial->setImage($data['image']);

        $errors = $validator->validate($testimonial);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        $entityManager->persist($testimonial);
        $entityManager->flush();

        return $this->redirect($this->generateUrl("testimonial.show"));
    }

    #[Route('/show/{id}', name: 'show')]
    public function show(Testimonial $testimonial): JsonResponse
    {
        return $this->json($testimonial);

    }

    #[Route('/delete/{id}', name: 'delete')]
    public function delete(Testimonial $testimonial, EntityManagerInterface $entityManager): RedirectResponse
    {
        $entityManager->remove($testimonial);
        $entityManager->flush();

        return $this->redirect($this->generateUrl('testimonial.index'));
    }

    #[Route('/edit/{id}', name: 'edit')]
    public function edit(Request $request, $testimonial_id, TestimonialRepository $testimonialRepository, EntityManagerInterface $entityManager): RedirectResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
        $testimonial = $testimonialRepository->find($testimonial_id);
        $testimonial->setUser($user);
        $testimonial->setDescription($data['description']);
        $testimonial->setImage($data['image']);

        $entityManager->flush();
        return $this->redirect($this->generateUrl('testimonial.show'));
    }
}
