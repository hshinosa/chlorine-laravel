<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;


interface UserRepositoryInterface
{
    public function getAllUsers(): Collection;
    
    public function getUserById(int $id): ?Model;
    
    public function createUser(array $data): Model;
    
    public function updateUser(int $id, array $data): ?Model;
    
    public function deleteUser(int $id): bool;
}
