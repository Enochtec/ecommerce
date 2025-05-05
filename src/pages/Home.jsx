import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'

export default function Home() {
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      description: 'Latest gadgets and devices',
      link: '/products?category=electronics'
    },
    {
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
      description: 'Trendy fashion for everyone',
      link: '/products?category=clothing'
    },
    {
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
      description: 'Everything for your home',
      link: '/products?category=home'
    }
  ]

  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Dedicated support'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-64 h-64 bg-green-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-green-400">ShopEasy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at prices you'll love
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect product?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who shop with us every day.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}