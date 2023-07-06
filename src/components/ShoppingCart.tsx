import { useState } from 'react';

function ShoppingCart() {
  const [shoppingCartList, setShoppingCartList] = useState([]);

  if (shoppingCartList.length === 0) {
    return (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>);
  }
  return (
    <h2>Tem alguma coisa no carrinho</h2>

  );
}

export default ShoppingCart;
