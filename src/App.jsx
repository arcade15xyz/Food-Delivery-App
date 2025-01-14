import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./Store/CartContext";
import { UserProgressContextProvider } from "./Store/userProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/UI/Checkout";

function App() {
  return (
    <>
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
