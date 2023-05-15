<?php

namespace App\Entity;

use App\Repository\PetRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PetRepository::class)]
class Pet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $breed = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'pet')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $images = [];

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column]
    private ?int $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'pet')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    private ?int $lastUpdatedAt = null;

    #[ORM\Column(nullable: true)]
    private ?float $age = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $facts = null;

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

    public function getBreed(): ?string
    {
        return $this->breed;
    }

    public function setBreed(string $breed): self
    {
        $this->breed = $breed;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function getImages(): array
    {
        return $this->images;
    }

    public function setImages(array $images): self
    {
        $this->images = $images;

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

    public function getCreatedAt(): ?int
    {
        return $this->createdAt;
    }

    public function setCreatedAt(int $createdAt): self
    {
        $this->createdAt = $createdAt;

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

    public function getLastUpdatedAt(): ?int
    {
        return $this->lastUpdatedAt;
    }

    public function setLastUpdatedAt(int $lastUpdatedAt): self
    {
        $this->lastUpdatedAt = $lastUpdatedAt;

        return $this;
    }

    public function getAge(): ?float
    {
        return $this->age;
    }

    public function setAge(?float $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getFacts(): ?string
    {
        return $this->facts;
    }

    public function setFacts(?string $facts): self
    {
        $this->facts = $facts;

        return $this;
    }

    public function toArray()
    {
        return ['id'=> $this->id, 'name'=> $this->name, 'breed'=> $this->breed];
    }
}
