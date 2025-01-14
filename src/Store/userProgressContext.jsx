
import { useState } from "react";

import { createContext } from "react";

const UserProgressContext = createContext({
  progress:'',// 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: ()=> {},
  hideDheckout: () => {}
});

export function UserProgressContextProvider({children}){
  const [userProgress,setUserProgress]=useState('');

  function showCart(){
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }

  function showCheckout(){
    setUserProgress('checkout');
  }

  function hideCheckout() {
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }


  return(
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  );
}


export default UserProgressContext;