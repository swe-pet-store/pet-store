<?php


namespace App\Controller;


use App\Entity\Category;
use App\Entity\Item;
use App\Entity\Pet;
use App\Entity\User;
use App\Repository\ItemRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/item')]
class ItemController extends AbstractController
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }


    /**
     * @Route("/like-item", name="like-item", methods={"GET"})
     */
    public function likeItems(Request $request, UserRepository $userRepository, ItemRepository $itemRepository){
        $user = $userRepository->findOneBy(['id'=> 1]);
        $item = $itemRepository->findOneBy(['id'=>2]);
        $item_likes = $item->getLikes();
        $liked_items = $user->getLikedItems();
        $liked_items_array =  explode(',', $liked_items);
        if(!in_array(2, $liked_items_array)){
            $new_liked_items_list = $liked_items.','.strval(2);
            $user->setLikedItems($new_liked_items_list);
            $item->setLikes($item_likes+1);
            $em = $this->doctrine->getManager();
            $em->persist($user);
            $em->persist($item);
            $em->flush();

        }

        return $this->json('yay');
    }


    /**
     * @Route("/unlike-item", name="like-item", methods={"GET"})
     */
    public function unlikeItems(Request $request, UserRepository $userRepository, ItemRepository $itemRepository){
        $user = $userRepository->findOneBy(['id'=> 1]);
        $item = $itemRepository->findOneBy(['id'=>2]);
        $item_likes = $item->getLikes();
        $liked_items = $user->getLikedItems();
        $liked_items_array =  explode(',', $liked_items);
        if(in_array(2, $liked_items_array)){
            $new_liked_items= array_diff( $liked_items_array, [2]);
            $new_liked_items_list = implode(",", $new_liked_items);
            $user->setLikedItems($new_liked_items_list);
            $item->setLikes($item_likes-1);
            $em = $this->doctrine->getManager();
            $em->persist($user);
            $em->persist($item);
            $em->flush();

        }

        return $this->json('yay');
    }


    /**
     * @Route("/all-items",name="app_all_items", methods={"GET"})
     */
    public function getAllItems(Request $request, SerializerInterface $serializer) : JsonResponse{

        try{
            $em = $this->doctrine->getManager();
            $items = $em->getRepository(Item::class)->findAll();
            $serialized = $serializer->serialize(
                $items,"json",[
                    'groups'=> 'item'
                ]
            );
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('request failed');
        }

    }

      /**
     * @Route("/some-items",name="app_some_items", methods={"GET"})
     */
    public function getSomeItems(Request $request, SerializerInterface $serializer) : JsonResponse{
        try{
            $em = $this->doctrine->getManager();
            $items = $em->getRepository(Item::class)->findBy([], null, 7);           
            $serialized = $serializer->serialize(
                $items,"json",[
                    'groups'=> 'item'
                ]
            );
            return new JsonResponse($serialized,200,[],true);
        }catch (\Exception $e){
            return $this->json('request failed');
        }

    }

    /**
     * @Route("/specific-item",name="app_specific_item", methods={"GET"})
     */
    public function getSpecificItem(Request $request, SerializerInterface $serializer): JsonResponse{
    try {
        $id = $request->query->get('id');
        $em = $this->doctrine->getManager();
        $item = $em->getRepository(Item::class)->find($id);

        if (!$item) {
            throw new \Exception('item not found');
        }

        $serialized = $serializer->serialize(
            $item,
            "json",
            ['groups' => 'item']
        );
        return new JsonResponse($serialized, 200, [], true);
    } catch (\Exception $e) {
        return $this->json($e);
    }
}

/**
 * @Route("/liked-items", name="app_liked_items", methods={"GET"})
 */
public function getLikedItems(Request $request, SerializerInterface $serializer): JsonResponse
{
    try {
        $itemIds = $request->query->get('itemIds');

        $itemIdsArray = explode(',', $itemIds);

        // Convert each substring to an integer
        $ids = array_map('intval', $itemIdsArray);

        // If 'ids' is not found in query parameters, check 'params' property
        if ($ids === null) {
            $requestData = $request->query->all();
            $ids = isset($requestData['ids']) ? $requestData['ids'] : null;
        }

        // Check if 'ids' is a non-empty array
        if (!is_array($ids) || empty($ids)) {
            throw new \Exception('Invalid or missing "ids" parameter');
        }

        // Fetch items based on IDs from the database
        $em = $this->doctrine->getManager();
        $items = $em->getRepository(Item::class)
            ->createQueryBuilder('i')
            ->where('i.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();

        if (empty($items)) {
            throw new \Exception('Items not found');
        }

        // Serialize the list of items
        $serialized = $serializer->serialize(
            $items,
            'json',
            ['groups' => 'item']
        );
        return new JsonResponse($serialized, 200, [], true);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], 400);
    }
}

/**
* @Route("/add-item", name="app_add_item", methods={"POST"})   
* 
*/
public function addItem(Request $request ) : JsonResponse
{
    try {
        $item = new Item();
        $data = $request->getContent();
        $data = json_decode($data, true);
        $em = $this->doctrine->getManager();
        $user = $em->getRepository(User::class)->findOneBy(['id' => 1]);
        $category = $em->getRepository(Category::class)->findOneBy(['name' => strtolower($data['category'])]);
        $status = ($data['quantity'] > 0) ?  'has stock' : 'no stock';
        $item->setUser($user);
        $item->setName($data['name']);
        $item->setQuantity($data['quantity']);
        $item->setPrice($data['price']);
        $item->setCategory($category);
        $item->setStatus($status);
        $item->setDescription($data['description']);
        $item->setState($data['state']);
        $item->setCreatedAt(1);
        $item->setLastUpdatedAt(1);
        if($data['images'] && !empty($data['images'])){
            $item->setImages($data['images']);
        }
        if($data['frontImage'] && !empty($data['frontImage'])){
            $item->setFrontImage($data['frontImage']);
        }
        $em->persist($item);
        $em->flush();
        return $this->json('success');
    }catch (\Exception $e){
        return $this->json('failure');
    }

}

/**
 * @Route("/personal-items/{userId}", name="app_personal_items", methods={"GET"})
 */
public function getPersonalItems(Request $request, SerializerInterface $serializer, int $userId): JsonResponse
{
    try {
        // Fetch items based on user ID from the database
        $em = $this->doctrine->getManager();
        $items = $em->getRepository(Item::class)
        ->createQueryBuilder('i')
        ->join('i.user', 'u')
        ->where('u.id = :userId')
        ->setParameter('userId', $userId)
        ->getQuery()
        ->getResult();

        if (empty($items)) {
            throw new \Exception('Items not found');
        }

        // Serialize the list of items
        $serialized = $serializer->serialize(
            $items,
            'json',
            ['groups' => 'item']
        );
        return new JsonResponse($serialized, 200, [], true);
    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], 400);
    }
}
}