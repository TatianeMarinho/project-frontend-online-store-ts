import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getItemsOnCart,
  removeQuantityFromCart,
  setProductOnCart,
  removeFromCart,
} from '../services/ShoppingCartStorage';

type ProductType = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
};

function ShoppingCart() {
  const [storedCart, setStoredCart] = useState(getItemsOnCart());
  const navigate = useNavigate();

  const handleRemoveItem = (product: ProductType) => {
    const newStorage = removeFromCart(product);
    setStoredCart(newStorage);
  };

  const handleAddButton = (product: ProductType) => {
    const newStorage = setProductOnCart(product);
    setStoredCart(newStorage);
  };

  const handleMinusButton = (product: ProductType) => {
    const newStorage = removeQuantityFromCart(product);
    setStoredCart(newStorage);
  };

  if (storedCart.length === 0) {
    return (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>);
  }

  return (
    <>
      <section>
        {storedCart.map((product: ProductType) => (
          <div key={ product.id } className="product-card-shopping-cart">
            <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
            <div style={ { display: 'flex', alignItems: 'center' } }>
              <button
                data-testid="remove-product"
                onClick={ () => handleRemoveItem(product) }
              >
                X
              </button>
              <img src={ product.thumbnail } alt="foto do produto" />
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => handleMinusButton(product) }
              >
                -
              </button>
              <h3 data-testid="shopping-cart-product-quantity">{product.quantity}</h3>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => handleAddButton(product) }
              >
                +
              </button>
              <h3>
                {`R$ ${product.price
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              </h3>
            </div>
          </div>
        ))}
      </section>
      <button
        onClick={ () => navigate('/checkout') }
        data-testid="checkout-products"
      >
        checkout
      </button>
    </>
  );
}

export default ShoppingCart;
