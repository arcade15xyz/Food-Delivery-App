import CartContext from "../../Store/CartContext"
import Modal from "./Modal"
import { useContext, useActionState } from "react"
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import UserProgressContext from "../../Store/userProgressContext";
import Button from "./Button";
import useHttp from "../../Hooks/useHttp";
import Error from "../Error";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data,
      error,
      sendRequest,
      clearData
    }=useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice,item) => totalPrice + item.quantity * item.price, 0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

   async function checkoutAction(prevState, fd) {

    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }


  const [formState, formAction, isSending]=useActionState(checkoutAction, null);
  let action = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    action = <span>Sending order data...</span>
  }

  if(data && !error) {
    return(
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
    <form action={formAction}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

      <Input label='Full Name' type='text' id='name' />
      <Input label="E-Mail Address" id="email" type="email" />
      <Input label="Street" type='text' id='street' />
      <div>
      <Input label="Postal Code" type='text' id='postal-code' />
      <Input label="City" type='text' id='city' />
      </div>
      {error && <Error title="Failed to submit order" message={error}/>}
      <p className="modal-actions">
        {action}
      </p>
    </form>
  </Modal>
}