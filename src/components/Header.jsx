import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../Store/CartContext';
import UserProgressContext from '../Store/userProgressContext';

export default function Header() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx=useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
    return totalNumberOfItems + item.quantity;
  },0);

  function handleshowCart(){
    userProgressCtx.showCart();
  }
  return(
    <header id="main-header">
      <div id="title">
        <img  src={logoImg} alt='A restaurant' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleshowCart} >Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}