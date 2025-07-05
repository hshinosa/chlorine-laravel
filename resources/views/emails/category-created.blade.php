<x-mail::message>
# New Category Created

Hello {{ $userData['name'] }},

A new category has been successfully created in the system.

**Category Details:**
- **Name:** {{ $categoryData['name'] }}
- **Status:** {{ $categoryData['is_publish'] ? 'Published' : 'Draft' }}
- **Created At:** {{ $categoryData['created_at'] }}

<x-mail::button :url="config('app.url') . '/categories'">
View Categories
</x-mail::button>

This is an automated notification from {{ config('app.name') }}.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
