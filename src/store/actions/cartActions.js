export const INCREASE_NO_IN_CART = 'INCREASE_NO_IN_CART'
export const DECREASE_NO_IN_CART = 'DECREASE_NO_IN_CART'

export const increaseNoInCart = item => ({
  type: INCREASE_NO_IN_CART,
  payload: item
})

export const decreaseNoInCart = () => {}
