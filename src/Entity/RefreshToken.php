<?php

//namespace App\Entity;
//
//use App\Repository\RefreshTokenRepository;
//use Doctrine\ORM\Mapping as ORM;
//
//#[ORM\Entity(repositoryClass: RefreshTokenRepository::class)]
//class RefreshToken
//{
//    #[ORM\Id]
//    #[ORM\GeneratedValue]
//    #[ORM\Column]
//    private ?int $id = null;
//
//    public function getId(): ?int
//    {
//        return $this->id;
//    }
//}


namespace App\Entity;

use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "refresh_tokens")]
class RefreshToken extends BaseRefreshToken
{

}