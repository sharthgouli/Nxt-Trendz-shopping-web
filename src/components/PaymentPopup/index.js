import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const PaymentPopup = ({cartList, onOrderConfirm}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const calculateTotal = () => {
    if (!cartList || cartList.length === 0) return 0
    return cartList.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0,
    )
  }

  const getTotalItems = () => {
    if (!cartList || cartList.length === 0) return 0
    return cartList.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  const handlePaymentMethodChange = method => {
    setSelectedPaymentMethod(method)
  }

  const handleConfirmOrder = close => {
    if (selectedPaymentMethod === 'Cash on Delivery') {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        setSelectedPaymentMethod('')
        if (onOrderConfirm) {
          onOrderConfirm()
        }
        close()
      }, 2000)
    }
  }

  const paymentMethods = [
    'Card',
    'Net Banking',
    'UPI',
    'Wallet',
    'Cash on Delivery',
  ]

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="checkout-button">
          Checkout
        </button>
      }
      closeOnDocumentClick={false}
      closeOnEscape
    >
      {close => (
        <div className="payment-popup-container">
          {showSuccessMessage ? (
            <div className="success-message-container">
              <h2 className="success-message">
                Your order has been placed successfully
              </h2>
            </div>
          ) : (
            <>
              <div className="payment-popup-header">
                <h2 className="payment-popup-title">Payment Method</h2>
                <button
                  type="button"
                  className="close-button"
                  onClick={close}
                  data-testid="close-button"
                >
                  ×
                </button>
              </div>

              <div className="payment-methods-container">
                {paymentMethods.map(method => (
                  <label
                    key={method}
                    className={`payment-method-label ${
                      method !== 'Cash on Delivery' ? 'disabled' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={selectedPaymentMethod === method}
                      onChange={() => handlePaymentMethodChange(method)}
                      disabled={method !== 'Cash on Delivery'}
                      className="payment-radio-input"
                    />
                    <span className="payment-method-text">{method}</span>
                  </label>
                ))}
              </div>

              <div className="payment-summary-container">
                <div className="summary-row">
                  <span className="summary-label">Order total:</span>
                  <span className="summary-value">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Number of items:</span>
                  <span className="summary-value">{getTotalItems()}</span>
                </div>
              </div>

              <button
                type="button"
                className={`confirm-order-button ${
                  selectedPaymentMethod === 'Cash on Delivery'
                    ? 'enabled'
                    : 'disabled'
                }`}
                onClick={() => handleConfirmOrder(close)}
                disabled={selectedPaymentMethod !== 'Cash on Delivery'}
                data-testid="confirm-order-button"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>
      )}
    </Popup>
  )
}

export default PaymentPopup
