<?php

namespace App\Controller;

use App\Entity\Item;
use App\Entity\Order;
use App\Entity\Pet;
use App\Entity\User;
use App\Repository\ItemRepository;
use App\Repository\OrderRepository;
use App\Repository\PetRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class IndexController
 * @package App\Controller
 */
class OrderController extends AbstractController
{

    private $orderRepository;
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager, OrderRepository $orderRepository){
        $this->entityManager = $entityManager;
        $this->orderRepository = $orderRepository;
    }


    /**
     * @Route("/cart/add-order", name="app_add_order", methods={"GET"})
     *
     */
    public function addOrder(Request $request, SerializerInterface $serializer){
        try {
            $userId = 1;
            $itemId = 12;
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['id' => $userId]);
            $item = $this->entityManager->getRepository(Item::class)->findOneBy(['id' => $itemId]);
            $quantityToBePurchased = 3;
            $order = $this->orderRepository->findOneSpecificOrder($userId, $itemId);
            if (count($order) == 0) {
                $newOrder = new Order();
                $newOrder->setUser($user);
                $newOrder->setItem($item);
                $newOrder->setQuantity($quantityToBePurchased);
                $newOrder->setProcessed(0);
                $this->entityManager->persist($newOrder);
                $this->entityManager->flush();
                return $this->json('added');
            } else{
                $order = $this->orderRepository->findOneBy(['id'=> $order[0]->getId()]);
                $currentQuantity = $order->getQuantity();
                $order->setQuantity($currentQuantity + $quantityToBePurchased);
                $this->entityManager->persist($order);
                $this->entityManager->flush();
                return $this->json('updated');
            }

        }catch (\Exception $e){
            return $this->json('failure');
        }
    }

    /**
     * @Route("/cart/orders", name="app_user_orders", methods={"GET"})
     *
     */
    public function getShoppingCart(Request $request, SerializerInterface $serializer){
        try{
            $userId = 1;
            $orders = $this->orderRepository->findUserOrders($userId);
            $serialized = $serializer->serialize(
                $orders,"json",[
                    'groups'=> 'order'
                ]
            );
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('nope');
        }
    }

    /**
     * @Route("/cart/purchase-items", name="app_purchase_orders", methods={"GET"})
     *
     */
    public function purchaseItems(Request $request){
        try{
            $userId = 1;
            $orders = $this->orderRepository->findUserOrders($userId);
            foreach($orders as $order){
                $quantity = $order['order']->getQuantity();
                $item = $this->entityManager->getRepository(Item::class)->findOneBy(['id'=> $order['order']->getItem()->getId()]);
                $order = $this->entityManager->getRepository(Order::class)->findOneBy(['id' => $order['order']->getId()]);
                $currentQuantity = $item->getQuantity();
                $item->setQuantity($currentQuantity-$quantity);
                $order->setProcessed(1);
                $this->entityManager->persist($item);
                $this->entityManager->persist($order);
                $this->entityManager->flush();
            }
            return $this->json('purchased');
        }catch (\Exception $e){
            return $this->json('not purchased');
        }
    }

    /**
     * @Route("/cart/delete-order", name="app_delete_order", methods={"GET"})
     *
     */
    public function deleteOrder(Request $request){
        try{
            $orderId = 2;
            $order = $this->orderRepository->findOneBy(['id'=> $orderId]);
            $this->orderRepository->remove($order,true);
            return $this->json('deleted');
        }catch (\Exception $e){
            return $this->json('not deleted');
        }
    }
}

