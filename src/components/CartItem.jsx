import { currencyFormatter } from "../util/formatting"


export default function CartItem({ name, qunantity, price , onIncrease ,onDecrease}){


  return(
    <li className="cart-item">
      <p>
        {name} - {qunantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{qunantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  )
}