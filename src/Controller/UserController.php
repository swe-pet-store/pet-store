<?php

namespace App\Controller;

use App\Entity\RefreshToken;
use App\Entity\User;
use App\Repository\ItemRepository;
use App\Repository\PetRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController
{
    private $entityManager;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->jwtManager = $jwtManager;
    }
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }
    /**
     * @Route("/register-user", name="register", methods={"POST"})
     */
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
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
        return new Response("success");
    }
    /**
     * @Route("/login-user", name="login-user", methods={"POST"})
     */    public function login(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher): \Symfony\Component\HttpFoundation\JsonResponse|Response
    {
        $data = json_decode($request->getContent(), true);
//        $username = $data['name'];
        $password = $data['password'];
        $email = $data['email'];
        $user = new User();
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );
//        $user->setName($data['name']);
        $user->setEmail($data['email']);
        if(!$email || !$password){
            return new Response("Wrong credentials");
        }
        $isPasswordValid = $passwordHasher->isPasswordValid($user, $password);
        if(!$isPasswordValid){
            return new Response("Invalid pass");
        }

        $userExists = $userRepository->findBy(['email'=>$email]);
        if(!$userExists){
            return new Response("User does not exist");
        }

        //generate token
        $token = $this->jwtManager->create($user);
        return $this->json(['token' => $token]);
        //redirect user to homepage
//        return $this->redirect($this->generateUrl('api_register'));
    }
    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(TokenInterface $token, EntityManagerInterface $entityManager): Response
    {
        $auth_user = $token->getUser();
        if($auth_user == null){
            return new Response("error");
        }
        $refresh_token = $entityManager->getRepository(RefreshToken::class)->findBy(['username'=> $auth_user->getUserIdentifier()]);
        $entityManager->remove((object)$refresh_token);
        $entityManager->flush();

        return new Response("user logged out");
    }
}
