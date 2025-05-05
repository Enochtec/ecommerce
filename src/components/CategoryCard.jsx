import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  return (
    <Link 
      to={category.link}
      className="relative group rounded-xl overflow-hidden h-64"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
        <p className="text-gray-200">{category.description}</p>
        <span className="mt-2 inline-block text-white font-medium group-hover:underline">
          Shop Now →
        </span>
      </div>
    </Link>
  )
}