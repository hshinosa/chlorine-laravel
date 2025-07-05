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

    /**
     * Get all users.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->userRepository->getAllUsers();
    }

    /**
     * Find user by ID.
     *
     * @param int $id
     * @return Model|null
     */
    public function findById(int $id): ?Model
    {
        return $this->userRepository->getUserById($id);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->userRepository->createUser($data);
    }

    /**
     * Update an existing user.
     *
     * @param int $id
     * @param array $data
     * @return Model|null
     */
    public function update(int $id, array $data): ?Model
    {
        $user = $this->userRepository->getUserById($id);
        if (!$user) {
            return null;
        }

        return $this->userRepository->updateUser($id, $data);
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->userRepository->deleteUser($id);
    }
}
