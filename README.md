# A Cool Shop - E-Commerce Platform

A full-stack e-commerce application built with Java Spring Boot backend and vanilla JavaScript frontend. A complete shopping experience with product browsing, filtering, user authentication, shopping cart, and checkout functionality.

## 🎯 Features

### Product Management
- Browse products with responsive grid layout
- Filter by category, subcategory (colors), and price range
- Product detail modal with image zoom
- Real-time inventory management

### User Authentication & Profile
- User registration and login system
- Secure token-based authentication (Bearer tokens)
- User profile management with address and contact information
- Session persistence with localStorage

### Shopping Cart
- Add/remove products from cart
- View cart items with pricing
- Cart total calculation
- Clear cart functionality
- Shopping cart badge showing item count

### Checkout & Orders
- Secure checkout process
- Order processing and confirmation
- Order history tracking

### Design & UX
- Modern, responsive design system
- Custom color palette (teal, cream, charcoal)
- Mobile-friendly layout (responsive breakpoints)
- Professional branding with custom logo

## 🛠️ Tech Stack

### Backend
- **Language:** Java
- **Framework:** Spring Boot
- **Database:** MySQL
- **API:** RESTful endpoints with JWT authentication
- **Pattern:** MVC architecture with DAO layer

### Frontend
- **Language:** JavaScript (ES6+)
- **Markup:** HTML5 with Handlebars templating
- **Styling:** Custom CSS with design system variables
- **HTTP:** Axios for API calls
- **State Management:** Service-based architecture

### Database
- **MySQL** with custom schema for users, products, categories, orders, and shopping cart

## 📁 Project Structure

### Backend
```
src/main/java/
├── controller/
│   ├── AuthenticationController
│   ├── ProductsController
│   ├── CategoriesController
│   └── ShoppingCartController
├── model/
│   ├── User
│   ├── Product
│   ├── Category
│   ├── ShoppingCart
│   └── ShoppingCartItem
└── dao/
    ├── UserDao / MySqlUserDao
    ├── ProductDao / MySqlProductDao
    ├── CategoryDao / MySqlCategoryDao
    └── ShoppingCartDao
```

### Frontend
```
src/
├── index.html          (Main entry point)
├── css/
│   └── main.css        (Design system + component styles)
├── js/
│   ├── application.js  (Main app logic)
│   ├── config.js       (API configuration)
│   ├── services/
│   │   ├── user-service.js
│   │   ├── products-service.js
│   │   ├── shoppingcart-service.js
│   │   └── orders-service.js
│   └── templates/
│       ├── home.html
│       ├── product.html
│       ├── login-form.html
│       ├── header.html
│       └── ...other templates
└── images/
    ├── easyshop-logo.png
    └── products/
```

## 🚀 Getting Started

### Prerequisites
- Java 11+
- MySQL 5.7+
- Node.js/npm (for development)

### Backend Setup

1. **Create Database**
   ```bash
   mysql -u root -p < create_database_easyshop.sql
   ```

2. **Configure Database Connection**
   - Update `application.properties` with your MySQL credentials

3. **Run Spring Boot Application**
   ```bash
   mvn spring-boot:run
   ```
   - Server runs on `http://localhost:8080`

### Frontend Setup

1. **Configure API Base URL**
   - Update `config.js` with your backend URL:
   ```javascript
   const baseUrl = 'http://localhost:8080';
   ```

2. **Serve Frontend**
   - Open `index.html` in browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

## 📊 Key Components

### Services Architecture

**UserService**
- Handles user authentication (login/register)
- Manages JWT tokens
- Persists user session in localStorage
- Profile management

**ProductService**
- Fetches all products from backend
- Implements client-side filtering (category, price range, color)
- Manages product search state

**ShoppingCartService**
- Add/remove items from cart
- Calculate cart totals
- Render cart page
- Persist cart data

**OrdersService**
- Process checkout
- Create orders from cart items
- Order confirmation

### API Endpoints

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

**Products**
- `GET /products` - Get all products (with optional filters)
- `GET /products?cat={id}&minPrice={min}&maxPrice={max}&subCategory={color}`

**Categories**
- `GET /categories` - Get all categories
- `GET /categories/{id}` - Get specific category

**Shopping Cart**
- `POST /cart/add` - Add item to cart
- `GET /cart` - Get cart items
- `DELETE /cart/{itemId}` - Remove item
- `DELETE /cart/clear` - Clear entire cart

**Orders**
- `POST /orders/checkout` - Process checkout
- `GET /orders` - Get user's orders

## 🎨 Design System

### Color Palette
- **Primary:** Teal (#208080)
- **Accent:** Cream (#FFFCF9)
- **Text:** Charcoal (#1F2121)
- **Secondary:** Muted brown/gray tones

### Typography
- **Font:** FKGroteskNeue / Geist / Inter
- **Sizes:** xs (11px) → 4xl (30px)
- **Weights:** Normal (400) → Bold (600)

### Spacing System
- Consistent 4px grid
- Variables: space-4 through space-32

### Responsive Breakpoints
- Mobile portrait: 480px and below
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 📝 User Journey

1. **Browse** - User lands on homepage, sees product grid
2. **Filter** - Use sidebar filters to narrow down products
3. **View Details** - Click product image to see full details
4. **Login/Register** - Create account or sign in
5. **Add to Cart** - Add desired products to cart
6. **Checkout** - Review cart and proceed to checkout
7. **Confirm** - Complete purchase and view order confirmation

## ✨ Key Features Implemented

✅ Responsive product grid with auto-fit columns
✅ Advanced filtering (category, price range, color)
✅ Image modal for product detail viewing
✅ Shopping cart with real-time updates
✅ User authentication with JWT tokens
✅ Profile management with address/contact info
✅ Order history tracking
✅ Secure checkout process
✅ Modern design system with CSS variables
✅ Mobile-first responsive design
✅ Professional branding with custom logo

## 🔒 Security Features

- JWT token-based authentication
- Password hashing on backend
- Secure API endpoints with authorization headers
- Token persistence with localStorage
- XSS protection through templating

## 📈 Performance Optimizations

- Client-side filtering to reduce API calls
- Image lazy loading support
- Responsive grid layout with auto-fit
- CSS variables for efficient styling
- Minimized reflows with flexbox/grid

## 🐛 Known Limitations & Future Enhancements

### Current Limitations
- Single-user session per browser
- No payment gateway integration (demo mode)
- Limited product images
- No email notifications

### Future Enhancements
- Payment gateway integration (Stripe/PayPal)
- Email confirmation system
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Search functionality
- Product recommendations
- Multi-language support

## 🤝 Contributing

This is a capstone project. For questions or improvements, please reach out.

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ as a comprehensive full-stack e-commerce solution**