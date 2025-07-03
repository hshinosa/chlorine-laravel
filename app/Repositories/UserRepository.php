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

    
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function getAllUsers(): Collection
    {
        return $this->model->all();
    }

    public function getUserById(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function createUser(array $data): Model
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return User::create($data);
    }

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

    public function deleteUser(int $id): bool
    {
        $user = User::find($id);
        
        if (!$user) {
            return false;
        }

        return $user->delete();
    }
}
