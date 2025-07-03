<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class UserService
{
    /** @var UserRepositoryInterface */
    protected $userRepository;

    /**
     * UserService constructor.
     *
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function getAll(): Collection
    {
        return $this->userRepository->getAllUsers();
    }

    public function findById(int $id): ?Model
    {
        return $this->userRepository->getUserById($id);
    }

    public function create(array $data): Model
    {
        return $this->userRepository->createUser($data);
    }

    public function update(int $id, array $data): ?Model
    {
        $user = $this->userRepository->getUserById($id);
        if (!$user) {
            return null;
        }

        return $this->userRepository->updateUser($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->userRepository->deleteUser($id);
    }
}
