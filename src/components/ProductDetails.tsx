import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import { setProductOnCart } from '../services/ShoppingCartStorage';
import Carrinho from '../images/shoppingCart.svg';
import AddCarrinho from '../images/addShoppingCart.svg';
import Home from '../images/homeButton.svg';
import '../styles/productDetail.css';

const INITIAL_STATE = {
  title: '',
  pictures: [{ url: '' }],
  thumbnail: '',
  attributes: [{ id: '', name: '', value_name: '' }],
  price: 0,
  id: '',
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(INITIAL_STATE);

  useEffect(() => {
    const fetchDetails = async () => {
      const api = await getProductById(id || '');
      setProduct(api);
    };
    fetchDetails();
  }, [id]);

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
      <main className="productDetailsContainer">
        <div className="productDetailsfirstContainer">
          <img
            className="productDetailsImg"
            src={ product.pictures[0].url }
            alt="imagem do produto"
            data-testid="product-detail-image"
          />
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => { setProductOnCart(product); } }
          >
            <img src={ AddCarrinho } alt="adicionar ao carrinho" />
          </button>
        </div>
        <div className="productDetailsInfo-container">
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <h2 data-testid="product-detail-price">
            {`R$ ${product.price.toFixed(2)}`}
          </h2>
          <ul>
            {product.attributes.map((att) => (att.value_name !== null ? (
              <li key={ att.id }>
                <p>{`${att.name}: ${att.value_name}`}</p>
              </li>
            ) : null))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default ProductDetails;
