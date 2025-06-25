# Food Ordering Website

A comprehensive food ordering platform built with Laravel backend, React frontend, and AI-powered chatbot integration. This system provides role-based access control for administrators and customers, along with intelligent customer support through a multi-agent chatbot system.

## Features

### 🏪 **Admin Panel**
- **Store Management**: Complete control over restaurant operations
- **Menu Management**: Add, edit, and remove food items with images and descriptions
- **Analytics Dashboard**: View sales reports and business insights
- **Inventory Control**: Manage stock levels and availability

### 👥 **Customer Features**
- **User Registration & Authentication**: Secure account creation and login
- **Browse Menu**: Explore food categories and detailed item descriptions
- **Shopping Cart**: Add items, modify quantities, and manage orders

### 🤖 **Multi-Agent Customer Support Chatbot**
- **Intelligent Assistance**: AI-powered chatbot for instant customer support
- **Store Information**: Get real-time information about restaurant's info, such as menu items, prices, and discount, etc.
- **Order Placement**: Place orders directly through chat conversation
- **24/7 Availability**: Round-the-clock customer assistance
- **Natural Language Processing**: Understands and responds to customer queries naturally

## Technology Stack

### Backend
- **Laravel**: PHP framework for robust API development
- **MySQL**: Database management

### Frontend
- **React**: Modern JavaScript library for user interfaces

### AI Chatbot
- **Python**: Backend chatbot development
- **OpenAI API**: Advanced natural language processing
- **Flask**: Lightweight web framework for chatbot server

## Prerequisites

Before installation, ensure you have the following installed:
- PHP (>= 8.0)
- Composer
- Node.js and NPM
- Python (>= 3.7)
- XAMPP (Apache & MySQL)
- Git

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/mbyhphat/Food-ordering.git
cd Food-ordering
```

### 2. Backend Setup (Laravel)
Navigate to the project directory and install dependencies:
```bash
cd project/
composer install
composer require laravel/sanctum
```

Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

Setup Laravel Sanctum:
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan session:table
php artisan migrate
```

### 3. Frontend Setup (React)
Navigate to frontend directory:
```bash
cd project/front-end/
npm install
cp .env.example .env
```

### 4. Admin Panel Setup
Navigate to admin directory:
```bash
cd admin/
npm install
cp .env.example .env
```

### 5. Chatbot Setup
Navigate to chatbot directory:
```bash
cd chatbot/
pip install -r requirements.txt
cp .env.example .env
```

**Important**: Replace the OpenAI API key in the `.env` file with your own API key.

### 6. Database Configuration
1. Start Apache and MySQL in XAMPP
2. Go to `https://localhost/phpmyadmin/`
3. Create a new database using the SQL script located in `project/database/food.sql`

### 7. Image Assets Setup
Copy images from the `image/` directory to:
```bash
project/storage/app/public/
```

Then create a symbolic link:
```bash
php artisan storage:link
```

## Running the Application

### 1. Start Laravel Backend
```bash
cd project/
php artisan serve --port=8001
```

### 2. Start Admin Panel
```bash
cd admin/
npm run dev
```

### 3. Start Chatbot Server
```bash
cd chatbot/
python app.py
```

### 4. Start Frontend Application
```bash
cd project/front-end/
npm run dev
```

### 5. Access the Application
Open your browser (preferably in incognito mode or clear browser history) and navigate to:
```
http://localhost:3000
```

## Default Accounts

### Admin Account
- **Email**: admin@gmail.com
- **Password**: Haha123@

### Customer Account
- **Email**: user1@gmail.com
- **Password**: Haha123@

## Usage

1. **Homepage**: Browse the main interface and available food options
2. **Login**: Use the provided credentials to access admin or customer features
3. **Admin Dashboard**: Manage store operations, orders, and menu items
4. **Customer Interface**: Browse menu, add items to cart, and place orders
5. **Chatbot**: Interact with the AI assistant for support and order placement

## API Endpoints

The Laravel backend provides RESTful API endpoints for:
- User authentication
- Menu management
- Order processing
- Customer support
- Admin operations
