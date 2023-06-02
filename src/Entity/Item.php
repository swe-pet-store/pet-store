<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ItemRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity(repositoryClass: ItemRepository::class)]
class Item
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['item'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['item'])]
    private ?int $quantity = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['item'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'item')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['item'])]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item'])]
    private ?string $state = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['item'])]
    private ?string $images;

    #[ORM\Column]
    #[Groups(['item'])]
    private ?int $createdAt = null;

    #[ORM\Column]
    #[Groups(['item'])]
    private ?int $lastUpdatedAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'item')]
    #[Groups(['item'])]
    private ?Category $category = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['item'])]
    private ?int $discount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getImages()
    {
        return $this->images;
    }

    public function setImages(array $images): self
    {
        $this->images = $images;

        return $this;
    }

    public function getCreatedAt(): ?int
    {
        return $this->createdAt;
    }

    public function setCreatedAt(int $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getLastUpdatedAt(): ?int
    {
        return $this->lastUpdatedAt;
    }

    public function setLastUpdatedAt(int $lastUpdatedAt): self
    {
        $this->lastUpdatedAt = $lastUpdatedAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(?int $discount): self
    {
        $this->discount = $discount;

        return $this;
    }
}
