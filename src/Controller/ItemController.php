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

#[Route('/item')]
class ItemController extends AbstractController
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
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