<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category Updated Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #3498db;
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin-bottom: 20px;
        }
        .highlight {
            background-color: #e3f2fd;
            padding: 15px;
            border-left: 4px solid #2196f3;
            margin: 20px 0;
            border-radius: 4px;
        }
        .category-name {
            font-weight: bold;
            color: #2196f3;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-published {
            background-color: #4caf50;
            color: white;
        }
        .status-draft {
            background-color: #ff9800;
            color: white;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .updated-icon {
            font-size: 48px;
            color: #3498db;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="updated-icon">📝</div>
            <h1>Category Updated</h1>
        </div>
        
        <div class="content">
            <p>Hello {{ $user['name'] }},</p>
            
            <p>We want to inform you that a category has been updated in our system.</p>
            
            <div class="highlight">
                <p><strong>Category Name:</strong> <span class="category-name">{{ $category['name'] }}</span></p>
                <p><strong>Status:</strong>
                    <span class="status-badge {{ $category['is_publish'] ? 'status-published' : 'status-draft' }}">
                        {{ $category['is_publish'] ? 'Published' : 'Draft' }}
                    </span>
                </p>
                <p><strong>Updated At:</strong> {{ $category['updated_at'] }}</p>
            </div>
            
            <p>You can view the updated category and all other categories by clicking the button below.</p>
            
            <div style="text-align: center;">
                <a href="{{ config('app.url') }}/categories" class="btn">View Categories</a>
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated notification. Please do not reply to this email.</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
