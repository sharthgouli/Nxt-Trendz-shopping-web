import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, price, quantity, imageUrl} = cartItemDetails
  const totalPrice = price * quantity

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        return (
          <li className="cart-item">
            <img src={imageUrl} alt={title} className="cart-product-image" />
            <div className="cart-item-details">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">{brand}</p>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  data-testid="minus"
                  onClick={() => decrementCartItemQuantity(id)}
                >
                  <BsDashSquare />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  data-testid="plus"
                  onClick={() => incrementCartItemQuantity(id)}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <p className="cart-total-price">₹{totalPrice}/-</p>
            </div>
            <button
              type="button"
              data-testid="remove"
              onClick={() => removeCartItem(id)}
            >
              <AiFillCloseCircle />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
