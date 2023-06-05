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
     * @Route("/cart/add-order", name="app_add_order", methods={"POST"})
     *
     */
    public function addOrder(Request $request, SerializerInterface $serializer){
        // try {
            $data = $request->getContent();
            $data = json_decode($data, true);      
            $userId = $data['userId'];
            $itemId = $data['itemId'];
            $quantity = $data['quantity'];            
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['id' => $userId]);
            $item = $this->entityManager->getRepository(Item::class)->findOneBy(['id' => $itemId]);
            $order = $this->orderRepository->findOneSpecificOrder($userId, $itemId);
            if (count($order) == 0) {
                $newOrder = new Order();
                $newOrder->setUser($user);
                $newOrder->setItem($item);
                $newOrder->setQuantity($quantity);
                $newOrder->setProcessed(0);
                $this->entityManager->persist($newOrder);
                $this->entityManager->flush();
                $serialized = $serializer->serialize(
                    $newOrder,"json",[
                        'groups'=> 'order'
                    ]
                );
                return new JsonResponse($serialized,200,[],true);
            } else{
                $order = $this->orderRepository->findOneBy(['id'=> $order[0]->getId()]);
                $currentQuantity = $order->getQuantity();
                $order->setQuantity($currentQuantity + $quantity);
                $this->entityManager->persist($order);
                $this->entityManager->flush();
                $serialized = $serializer->serialize(
                    $order,"json",[
                        'groups'=> 'order'
                    ]
                );
                return new JsonResponse($serialized,200,[],true);
            }

        // }catch (\Exception $e){
        //     return $this->json('failure');
        // }
    }

    /**
     * @Route("/cart/orders/{userId}", name="app_user_orders", methods={"GET"})
     *
     */
    public function getShoppingCart(Request $request, SerializerInterface $serializer, $userId){
        try{
            // $userId = $request->query->get('userId');
            dump($userId);
            $orders = $this->orderRepository->findUserOrders($userId);
            $serialized = $serializer->serialize(
                $orders,"json",[
                    'groups'=> 'order'
                ]
            );
            dump($serialized);
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('nope');
        }
    }

    /**
     * @Route("/cart/purchase-items/{userId}", name="app_purchase_orders", methods={"POST"})
     *
     */
    public function purchaseItems(Request $request, $userId){
            // $userId = 1;
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
    }

    /**
     * @Route("/cart/delete-order/{orderId}", name="app_delete_order", methods={"POST"})
     *
     */
    public function deleteOrder(Request $request, $orderId){
        try{
            // $orderId = $request->query->get('orderId');

            dump($orderId);
            $order = $this->orderRepository->findOneBy(['id'=> $orderId]);
            $this->orderRepository->remove($order,true);
            return $this->json('deleted');
        }catch (\Exception $e){
            return $this->json('not deleted');
        }
    }
}

