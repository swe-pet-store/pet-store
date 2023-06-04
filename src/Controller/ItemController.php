<?php


namespace App\Controller;


use App\Entity\Category;
use App\Entity\Item;
use App\Entity\Pet;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
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
        try{
            $item = new Item();
            $data = $request->getContent();
            $data = json_decode($data, true);
            $em  =$this->doctrine->getManager();
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
            $em->persist($item);
            $em->flush();
            return $this->json('success');

        }catch(\Exception $exception){
            return $this->json('failed');
        }


}

}