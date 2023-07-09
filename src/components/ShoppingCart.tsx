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
            {' '}
            {product.title}
          </h3>
          <h3>
            Preço:
            {' '}
            {`R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </h3>
          <h3 data-testid="shopping-cart-product-quantity">
            Quantidade:
            {' '}
            {product.quantity}
          </h3>
          <img src={ product.thumbnail } alt="foto do produto" />
        </div>
      );
    })
  );
}

export default ShoppingCart;
