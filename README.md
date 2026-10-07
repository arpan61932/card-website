# ShopEasy — E-Commerce Website Clone

## 📌 About The Project

**ShopEasy** is a frontend **e-commerce website clone** created for learning and practicing modern web development concepts.

The website provides a simple online shopping experience where users can browse featured products, view product details, add products to their cart, change product quantities, remove products, and see the automatically calculated subtotal, 18% tax, and final total.

The project is built using **HTML, CSS, and JavaScript** without using any frontend framework. Product data and cart operations are handled dynamically using JavaScript.

This is a **frontend/demo project**. The checkout system is currently simulated and does not process real payments.

## ✨ Features

### 🛍️ Product Listing
- Displays featured products in a responsive grid.
- Products are dynamically generated using JavaScript.
- Each product contains:
  - Product image
  - Product name
  - Price in Indian Rupees (₹)
  - Short product description
  - Add to Cart button
  - Details button

### 📋 Product Details
Users can click the **Details** button to view the selected product's:
- Name
- Description
- Price

The details are displayed dynamically using JavaScript.

### 🛒 Shopping Cart
Users can add products to their shopping cart and manage them easily.

Cart functionality includes:
- Add products
- Increase quantity
- Decrease quantity
- Manually enter quantity
- Remove products
- Empty cart message

### 💰 Automatic Price Calculation
The cart automatically calculates:

- **Subtotal**
- **18% Tax**
- **Final Total**

Prices are formatted using the Indian Rupee (₹) currency format.

### 💳 Checkout Demo
A checkout button is included as a demonstration of the shopping flow.

Currently, checkout is not connected to a real payment gateway. It displays a demo message and can later be integrated with payment services such as **Razorpay or Stripe**.

### 📱 Responsive Design
The website is responsive and adapts to different screen sizes, including:

- Desktop
- Tablet
- Mobile

A mobile-specific layout is implemented using CSS media queries.

### 🎨 Modern UI
The website uses a dark modern interface featuring:

- Dark gradient background
- Card-based product layout
- Sticky navigation bar
- Responsive product grid
- Hover effects
- Modern buttons
- Visual price highlighting
- Clean typography

### ⚡ Performance & Accessibility
The project also includes some frontend optimization practices:

- Lazy loading for product images
- Image decoding optimization
- Semantic HTML elements
- Accessible button labels
- Keyboard focus states
- Responsive layout
- Efficient product lookup using JavaScript `Map`

## 🛠️ Technologies Used

- **HTML5** — Website structure
- **CSS3** — Styling and responsive design
- **JavaScript (ES6+)** — Product and cart functionality
- **Intl.NumberFormat** — Indian currency formatting
- **Vercel** — Deployment


## ⚙️ How It Works

```text
User visits website
        ↓
Browse products
        ↓
View product details
        ↓
Add product to cart
        ↓
Increase / decrease quantity
        ↓
Remove products if required
        ↓
Calculate Subtotal
        ↓
Calculate 18% Tax
        ↓
Calculate Final Total
        ↓
Checkout Demo
```

## ⚠️ Project Disclaimer

This is a **frontend e-commerce demo/clone project** created for educational and portfolio purposes.

It is **not connected to a real e-commerce backend**, database, authentication system, inventory system, or payment gateway.

The checkout functionality is currently a demo and does not process real transactions.
