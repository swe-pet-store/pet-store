<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Pet::class)]
    private Collection $pet;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Item::class)]
    private Collection $item;

    public function __construct()
    {
        $this->pet = new ArrayCollection();
        $this->item = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Pet>
     */
    public function getPet(): Collection
    {
        return $this->pet;
    }

    public function addPet(Pet $pet): self
    {
        if (!$this->pet->contains($pet)) {
            $this->pet->add($pet);
            $pet->setCategory($this);
        }

        return $this;
    }

    public function removePet(Pet $pet): self
    {
        if ($this->pet->removeElement($pet)) {
            // set the owning side to null (unless already changed)
            if ($pet->getCategory() === $this) {
                $pet->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Item>
     */
    public function getItem(): Collection
    {
        return $this->item;
    }

    public function addItem(Item $item): self
    {
        if (!$this->item->contains($item)) {
            $this->item->add($item);
            $item->setCategory($this);
        }

        return $this;
    }

    public function removeItem(Item $item): self
    {
        if ($this->item->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getCategory() === $this) {
                $item->setCategory(null);
            }
        }

        return $this;
    }
}
