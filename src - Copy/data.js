export const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      additionalImages: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'
      ],
      category: 'electronics',
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Bluetooth 5.0',
        'Built-in microphone',
        'Lightweight design'
      ]
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking, notifications, and long battery life. Stay connected and monitor your fitness.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      category: 'electronics',
      rating: 4.2,
      reviewCount: 86,
      features: [
        'Heart rate monitor',
        'Sleep tracking',
        'Water resistant',
        '7-day battery',
        'Customizable watch faces'
      ]
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt available in multiple colors. Perfect for everyday wear.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      category: 'clothing',
      rating: 4.0,
      reviewCount: 45,
      features: [
        '100% premium cotton',
        'Reinforced stitching',
        'Classic fit',
        'Machine washable',
        'Available in 8 colors'
      ]
    },
    {
      id: 4,
      name: 'Coffee Maker',
      description: 'Automatic coffee maker for your home with programmable timer and thermal carafe.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82',
      category: 'home',
      rating: 4.7,
      reviewCount: 210,
      isNew: true,
      features: [
        '12-cup capacity',
        'Programmable timer',
        'Pause & serve',
        'Charcoal water filter',
        '2-hour auto shutoff'
      ]
    },
    {
      id: 5,
      name: 'Running Shoes',
      description: 'Lightweight running shoes with cushioned soles for maximum comfort during workouts.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'clothing',
      rating: 4.3,
      reviewCount: 156,
      features: [
        'Breathable mesh upper',
        'Shock-absorbing soles',
        'Flexible design',
        'Non-slip tread',
        'Available in 5 colors'
      ]
    },
    {
      id: 6,
      name: 'Desk Lamp',
      description: 'Adjustable LED desk lamp with multiple brightness levels and color temperatures.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516',
      category: 'home',
      rating: 4.1,
      reviewCount: 72,
      features: [
        '5 brightness levels',
        '3 color temperatures',
        'USB charging port',
        'Touch controls',
        'Adjustable arm'
      ]
    }
  ]

  const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return await response.json();
};

// Update other functions similarly