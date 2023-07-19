import { Link } from 'react-router-dom';
import { getItemsOnCart } from '../../services/ShoppingCartStorage';
import CheckoutForm from './CheckoutForm';
import '../../styles/checkout.css';
import Home from '../../images/homeButton.svg';
import Carrinho from '../../images/shoppingCart.svg';

type ProductType = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
};

function Checkout() {
  const storedProducts = getItemsOnCart();
  return (
    <>
      <nav className="productDetailsNavContainer">
        <Link to="/">
          <img src={ Home } alt="home" />
        </Link>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <img src={ Carrinho } alt="carrinho" />
        </Link>
      </nav>
      <main className="product-list-out-checkout-container">
        <h1>Revise seus Produtos</h1>
        <section className="product-list-checkout-container">
          {storedProducts.map((product: ProductType) => (
            <div key={ product.id } className="product-checkout-container">
              <h3 className="product-title-checkout">{product.title}</h3>
              <div className="product-info-checkout-container">
                <img src={ product.thumbnail } alt="imagem do produto" />
                <h4>{product.quantity}</h4>
                <h3>
                  {`R$ ${product.price
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </h3>
              </div>
            </div>
          ))}
        </section>
        <h2>
          {
          `Total: R$ ${storedProducts.reduce((acc: any, product: ProductType) => {
            acc += product.price;
            return acc;
          }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
        </h2>
      </main>
      <section>
        <CheckoutForm />
      </section>
    </>
  );
}

export default Checkout;
