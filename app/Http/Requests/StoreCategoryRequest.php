<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:categories,name',
            'is_publish' => 'required|boolean',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama kategori harus diisi.',
            'name.string' => 'Nama kategori harus berupa teks.',
            'name.max' => 'Nama kategori maksimal 255 karakter.',
            'name.unique' => 'Nama kategori sudah ada.',
            'is_publish.required' => 'Status publish harus dipilih.',
            'is_publish.boolean' => 'Status publish harus berupa true atau false.',
        ];
    }

    /**
     * Get the custom attributes for the validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'Nama Kategori',
            'is_publish' => 'Status Publish',
        ];
    }
}
