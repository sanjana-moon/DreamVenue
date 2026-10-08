# 🏛️ DreamVenue

**DreamVenue** is a modern venue marketplace platform that connects customers with venue vendors, making it easier to discover, explore, and book suitable venues for different events.

The platform provides separate experiences for **customers, vendors, and administrators**, with features designed to simplify venue discovery and management.

## 🔗 Live Project

🌐 **Live Website:** https://dreamvenue.vercel.app

## ✨ Features

### 👤 Customer

* Browse and explore available venues
* Search and filter venues
* View detailed venue information
* Book venues for events
* Secure payment integration with Stripe
* Manage bookings and profile
* Responsive experience across devices

### 🏢 Vendor

* Manage venue listings
* Add and update venue information
* Manage bookings
* View venue-related activities
* Manage vendor profile

### 🛡️ Admin

* Manage users and vendors
* Manage venue listings
* Monitor platform activities
* Manage the overall marketplace

## 🧰 Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **HeroUI**
* **Better Auth / JWT**
* **Stripe**

### Backend & Database

* **Node.js**
* **Express.js**
* **MongoDB**
* **REST API**

### Tools & Deployment

* **Git & GitHub**
* **Vercel**
* **Figma**
* **Postman**

## 📁 Project Structure

```text
dreamvenue/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── venues/
│   ├── booking/
│   └── ...
├── components/
├── hooks/
├── lib/
├── services/
├── types/
├── public/
├── utils/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/DreamVenue/dreamvenue.git
```

Navigate to the project directory:

```bash
cd dreamvenue
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Add any other environment variables required by your local configuration.

### Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔄 Application Flow

```text
Customer
   │
   ├── Search Venues
   │
   ├── View Venue Details
   │
   ├── Select Venue
   │
   ├── Make Booking
   │
   └── Complete Payment
           │
           ▼
        Stripe
```

Vendors can manage their venues and bookings, while administrators oversee the marketplace and its users.

## 🎯 Project Goals

DreamVenue was built to provide a centralized platform where users can:

* Discover suitable venues easily
* Compare available options
* Book venues through a streamlined process
* Make secure online payments
* Manage bookings from one platform

For vendors, the platform provides tools to showcase and manage their venues digitally.


## 🔮 Future Improvements

* Advanced venue recommendation system
* Reviews and ratings
* Real-time booking availability
* Improved search and filtering
* Notifications
* More advanced vendor analytics
* AI-powered venue recommendations

## 👩‍💻 Developer

**Sanjana Moon**

* 🌐 Portfolio: https://sanjana-portfolio-eight-eta.vercel.app
* 💻 GitHub: https://github.com/sanjana-moon
* 💼 LinkedIn: https://linkedin.com/in/sanjana-moon

---

⭐ If you find this project interesting, consider giving the repository a star!
