<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): void
    {

        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setName($data['name']);
        $user->setSurname($data['surname']);
        $user->setPassword(
          $passwordHasher->hashPassword($user, $data['password'])
        );
        $user->setEmail($data['email']);
        $user->setAddress($data['address']);
        $user->setPhoneNumber($data['phone_number']);

        $entityManager->persist($user);
        $entityManager->flush();

//        return $this->redirect($this->generateUrl('app_login'));
    }
    #[Route('/login', name: 'app_login')]
    public function login(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher){
        $data = json_decode($request->getContent(), true);
        $username = $data['name'];
        $password = $data['password'];
        $email = $data['email'];
        $user = new User();
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        if(!$username || !$password){
            return new Response("Wrong credentials");
        }

        $userExists = $userRepository->findBy(['username'=>$username, 'password'=>$password, 'email'=>$email]);

        if(!$userExists){
            return new Response("User does not exist");
        }

        $isPasswordValid = $passwordHasher->isPasswordValid($user, $password);
        if(!$isPasswordValid){
            return new Response("Invalid pass");
        }

        //generate token
        //redirect user to homepage

    }
}
