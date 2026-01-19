import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = cartList.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      )

      const handleOrderConfirm = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-summary-container">
          <h1 className="order-total">Order Total: Rs {totalPrice}/-</h1>
          <p className="items-count">{totalItems} Items in cart</p>

          {/* Only ONE checkout button (popup trigger) */}
          <div className="checkout-btn-center">
            <PaymentPopup
              cartList={cartList}
              onOrderConfirm={handleOrderConfirm}
            />
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
