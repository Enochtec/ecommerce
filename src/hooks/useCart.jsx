import { useState, useEffect, createContext, useContext } from 'react'
import { 
  getCart as getCartApi,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeFromCart as removeFromCartApi
} from '../services/cartService'
import { toast } from 'react-toastify'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCartApi()
        setCart(cartData)
      } catch (error) {
        console.error('Failed to load cart:', error)
        setCart({ items: [], total: 0 })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCart()
  }, [])

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await addToCartApi(productId, quantity)
      setCart(updatedCart)
      toast.success('Item added to cart!')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const updateCartItem = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(itemId)
        return
      }
      
      const updatedCart = await updateCartItemApi(itemId, newQuantity)
      setCart(updatedCart)
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      const updatedCart = await removeFromCartApi(itemId)
      setCart(updatedCart)
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  const cartTotal = cart.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}