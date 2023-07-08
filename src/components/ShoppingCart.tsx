import { getItemsOnCart } from '../services/ShoppingCartStorage';

function ShoppingCart() {
  const storedCart = getItemsOnCart();

  if (storedCart.length === 0) {
    return (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>);
  }

  return (
    storedCart.map((product: any) => {
      return (
        <div key={ product.id }>
          <h3 data-testid="shopping-cart-product-name">
            Nome:
            {product.title}
          </h3>
          <h3>
            Preço:
            {product.price}
          </h3>
          <h3 data-testid="shopping-cart-product-quantity">
            Quantidade:
            {product.quantity}
          </h3>
        </div>
      );
    })
  );
}

export default ShoppingCart;
