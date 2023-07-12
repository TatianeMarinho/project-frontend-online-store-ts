import { getItemsOnCart } from '../../services/ShoppingCartStorage';
import CheckoutForm from './CheckoutForm';

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
      <div>
        {storedProducts.map((product: ProductType) => (
          <div key={ product.id }>
            <img src={ product.thumbnail } alt="imagem do produto" />
            <h3>{product.title}</h3>
            <h3>{product.quantity}</h3>
            <h3>
              {`R$ ${product.price
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </h3>
          </div>
        ))}
      </div>
      <div>
        <CheckoutForm />
      </div>
    </>
  );
}

export default Checkout;
