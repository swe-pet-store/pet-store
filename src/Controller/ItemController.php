<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Item;
use App\Entity\User;
use App\Repository\CategoryRepository;
use App\Repository\ItemRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use JetBrains\PhpStorm\NoReturn;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ItemController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    #[NoReturn] #[Route('/item/create', name: 'app_create_item')]
    public function create(Request $request, ItemRepository $itemRepository): Response
    {
        $em = $this->doctrine->getManager();
//        $data = $request->getContent();
//        $data = json_decode($data, true);
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'Memory Foam Dog Bed',
            'price' => 20,
            'description' => 'Warm Bed for your pet ready to be used...',
            'state' => 'new',
            'images' => [1,2,3,4],
            'created_at' => 123,
            'quantity' =>10,
            'updated_at' => 123,
            'status' => 'available',
            'discount' => 0,

        ];
        $user = $em->getRepository(User::class)->findOneBy(['id'=>$data['user_id']]);
        $category = $em->getRepository(Category::class)->findOneBy(['id'=>$data['category_id']]);
        $item = new Item();
        $item->setUser($user);
        $item->setCategory($category);
        $item->setName($data['name']);
        $item->setPrice($data['price']);
        $item->setDescription($data['description']);
        $item->setState($data['state']);
        $item->setImages($data['images']);
        $item->setCreatedAt($data['created_at']);
        $item->setStatus($data['status']);
        $item->setQuantity($data['quantity']);
        $item->setDiscount($data['discount']);
        $item->setLastUpdatedAt($data['updated_at']);
        $itemRepository->save($item, true);
        dd($item);
        return $this->json($item);
    }

    #[NoReturn] #[Route('/item/delete/{item_id}', name: 'app_delete_item')]
    public function delete(Request $request, ItemRepository $itemRepository, $item_id): Response
    {
        $em = $this->doctrine->getManager();
        $item_id = 1;
        $item = $itemRepository->findOneBy(['id' => $item_id]);
        $em->remove($item);
        $em->flush();
        dd('yay');
        return $this->json($item);
    }

    #[NoReturn] #[Route('/item/edit/{item_id}', name: 'app_edit_item')]
    public function edit(Request $request, ItemRepository $itemRepository, $item_id): Response
    {
        $em = $this->doctrine->getManager();
        // the data for editing a specific item => received from the frontend side
        dd('yay');
        return $this->json();
    }

    #[NoReturn] #[Route('/item/readAll', name: 'app_create_item')]
    public function readAll(Request $request, ItemRepository $itemRepository, $item_id): Response
    {
        $em = $this->doctrine->getManager();
        $items = $itemRepository->findAll();
        return $this->json($items);
    }

    #[NoReturn] #[Route('/item/read/{$item_id}', name: 'app_create_item')]
    public function readSpecific(Request $request, ItemRepository $itemRepository, $item_id): Response
    {
        $item_id = 1; // provizore
        $em = $this->doctrine->getManager();
        $item = $itemRepository->findOneBy(['id'=> $item_id]);
        return $this->json($item);
    }
}
