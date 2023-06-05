<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['order'])]
    private ?bool $processed = null;

    #[ORM\Column]
    #[Groups(['order'])]
    private ?int $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[Groups(['order'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[Groups(['order'])]
    private ?Item $item = null;

    public function __construct()
    {

    }

    public function getId(): ?int
    {
        return $this->id;
    }




    public function isProcessed(): ?bool
    {
        return $this->processed;
    }

    public function setProcessed(bool $processed): self
    {
        $this->processed = $processed;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }

    public function setItem(?Item $item): self
    {
        $this->item = $item;

        return $this;
    }
}
