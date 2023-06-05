<?php

namespace App\Controller;

use App\Entity\RefreshToken;
use App\Entity\User;
use App\Repository\ItemRepository;
use App\Repository\PetRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Util\SecureRandom;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController
{
    private $entityManager;
    private JWTTokenManagerInterface $jwtManager;
    private JWTEncoderInterface $jwtEncoder;

    public function __construct(JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager, JWTEncoderInterface $jwtEncoder)
    {
        $this->entityManager = $entityManager;
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
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
     * @throws \Exception
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

        $userExists = $userRepository->findOneBy(['email'=>$email]);
        if(!$userExists){
            return new Response("User does not exist");
        }
        $isPasswordValid = $passwordHasher->isPasswordValid($userExists, $password);
        if(!$isPasswordValid){
            return new Response("Invalid pass");
        }
        $token = $this->jwtManager->create($user);
//            $bytes = random_bytes(50);
//            $refresh_token = bin2hex($bytes);
//
//            $refresh_token_object = new RefreshToken();
//            $refresh_token_object->setUsername($userExists[0]->getName());
//            $refresh_token_object->setRefreshToken($refresh_token);
//
//            $datetime = new \DateTime();
//            $datetime->modify('+1 year');
//            $refresh_token_object->setValid($datetime);
//
//            $entityManager->persist($refresh_token_object);
//            $entityManager->flush();
//            return $this->json(['token' => $token, 'refresh_token'=>$refresh_token]);
        return $this->json(['token' => $token, 'refresh_token'=>"test"]);


        //generate token

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

    /**
     * @Route("/user-profile", name="user-profile", methods={"POST"})
     * @throws JWTDecodeFailureException
     */
    public function getUserData(Request $request, UserRepository $userRepository, SerializerInterface $serializer)
    {
//        $user = $this->getUser();
//        $user = $token->getUser();
//        dd($user);
//        return $this->json($user);
        $data = json_decode($request->getContent(), true);
        $email = $data['localData']['email'];
        $user = $userRepository->findBy(['email'=>$email]);

        $serialized = $serializer->serialize(
            $user,
            'json',
            ['groups' => 'user:details']
        );

        dump($serialized);
        //   var_dump($serialized);

        //   return $this->json($serialized);
        return new JsonResponse($serialized,200,[],true);


    }

    #[Route('/edit-user', name: 'user_edit', methods: ['PUT'])]
    public function edit_user(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $initialEmail = $data['initialEmail']['email'];
        $user = $userRepository->findOneBy(['email'=> $initialEmail]);

        $name = $data['name'];
        $email = $data['email'];
        $phone_nr = $data['phoneNumber'];
        $desc = $data['personalDescription'];

        $user->setDescription($desc);
        $user->setName($name);
        $user->setPhoneNumber($phone_nr);
        $user->setEmail($email);

        $entityManager->flush();

        return $this->json($user);
    }


}
