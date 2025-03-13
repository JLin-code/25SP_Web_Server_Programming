import { ref } from 'vue'
import { addNotifications } from './notifications'

const cart = ref<any[]>([])

export function refCart() {
  return cart
}

function addToCart({ name, price }: any) {
  cart.value.push({ name, price, quantity: 1 })
  addNotifications({
    imessage: 'Added to cart',
    type: 'success',
  })
}