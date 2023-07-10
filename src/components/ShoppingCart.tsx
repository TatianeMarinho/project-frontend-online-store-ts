import { useEffect, useState } from 'react';
import {
  getItemsOnCart,
  removeQuantityFromCart,
  setProductOnCart,
  removeFromCart,
} from '../services/ShoppingCartStorage';

function ShoppingCart() {
  const [storedCart, setStoredCart] = useState(getItemsOnCart());

  useEffect(() => {
    const newCart = getItemsOnCart();
    setStoredCart(newCart);
  }, [storedCart]);

  if (storedCart.length === 0) {
    return (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>);
  }

  return (
    storedCart.map((product: any) => {
      return (
        <div key={ product.id }>
          <h3 data-testid="shopping-cart-product-name">
            Nome:
            {' '}
            {product.title}
          </h3>
          <h3>
            Preço:
            {' '}
            {`R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </h3>
          <div style={ { display: 'flex' } }>
            <button
              data-testid="remove-product"
              onClick={ () => removeFromCart(product) }
            >
              X
            </button>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => removeQuantityFromCart(product) }
            >
              -
            </button>
            <h3 data-testid="shopping-cart-product-quantity">{product.quantity}</h3>
            <button
              data-testid="product-increase-quantity"
              onClick={ () => setProductOnCart(product) }
            >
              +
            </button>
          </div>
          <img src={ product.thumbnail } alt="foto do produto" />
        </div>
      );
    })
  );
}

export default ShoppingCart;
