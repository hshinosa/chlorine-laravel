<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    /** @var User */
    protected $model;

    /**
     * UserRepository constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Get all users.
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return $this->model->all();
    }

    /**
     * Get user by ID.
     *
     * @param int $id
     * @return Model|null
     */
    public function getUserById(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return Model
     */
    public function createUser(array $data): Model
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return User::create($data);
    }

    /**
     * Update an existing user.
     *
     * @param int $id
     * @param array $data
     * @return Model|null
     */
    public function updateUser(int $id, array $data): ?Model
    {
        $user = User::find($id);
        
        if (!$user) {
            return null;
        }

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        
        return $user->fresh();
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return bool
     */
    public function deleteUser(int $id): bool
    {
        $user = User::find($id);
        
        if (!$user) {
            return false;
        }

        return $user->delete();
    }
}
