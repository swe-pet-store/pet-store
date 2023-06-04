<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements \Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface, \Symfony\Component\Security\Core\User\UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:details', 'item','pet'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:details', 'item', 'pet'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:details','item','pet'])]
    private ?string $surname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:details','item', 'pet'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:details','item','pet'])]
    private ?string $phoneNumber = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:details', 'item', 'pet'])]
    private ?string $likedItems = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:details', 'item','pet'])]
    private ?string $address = null;

    #[Groups(['user:details'])]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Pet::class)]
    private Collection $pet;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Item::class)]
    private Collection $item;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Testimonial::class)]
    private Collection $testimonial;

    public function __construct()
    {
        $this->pet = new ArrayCollection();
        $this->item = new ArrayCollection();
        $this->testimonial = new ArrayCollection();
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

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getLikedItems(): ?string
    {
        return $this->likedItems;
    }

    public function setLikedItems(?string $likedItems): self
    {
        $this->likedItems = $likedItems;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

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
            $pet->setUser($this);
        }

        return $this;
    }

    public function removePet(Pet $pet): self
    {
        if ($this->pet->removeElement($pet)) {
            // set the owning side to null (unless already changed)
            if ($pet->getUser() === $this) {
                $pet->setUser(null);
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
            $item->setUser($this);
        }

        return $this;
    }

    public function removeItem(Item $item): self
    {
        if ($this->item->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getUser() === $this) {
                $item->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Testimonial>
     */
    public function getTestimonial(): Collection
    {
        return $this->testimonial;
    }

    public function addTestimonial(Testimonial $testimonial): self
    {
        if (!$this->testimonial->contains($testimonial)) {
            $this->testimonial->add($testimonial);
            $testimonial->setUser($this);
        }

        return $this;
    }

    public function removeTestimonial(Testimonial $testimonial): self
    {
        if ($this->testimonial->removeElement($testimonial)) {
            // set the owning side to null (unless already changed)
            if ($testimonial->getUser() === $this) {
                $testimonial->setUser(null);
            }
        }

        return $this;
    }

    public function getRoles(): array
    {
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
        // TODO: Implement getRoles() method.
    }

    public function eraseCredentials(): void
    {
        $this->password = null;
        // TODO: Implement eraseCredentials() method.
    }

    public function getUserIdentifier(): string
    {
        return $this->name;
        // TODO: Implement getUserIdentifier() method.
    }
}
