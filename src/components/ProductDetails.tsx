import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

const INITIAL_STATE = {
  title: '',
  pictures: [{ url: '' }],
  attributes: [{ id: '', name: '', value_name: '' }],
  price: 0,
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(INITIAL_STATE);
  console.log(product);

  useEffect(() => {
    const fetchDetails = async () => {
      const api = await getProductById(id || '');
      setProduct(api);
    };
    fetchDetails();
  }, [id]);

  return (
    <main>
      <div>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </div>
      <div className="productDetailsContainer">
        <h2 data-testid="product-detail-name">{product.title}</h2>
        <h3 data-testid="product-detail-price">{`R$: ${product.price.toFixed(2)}`}</h3>
        <div>
          <img
            src={ product.pictures[0].url }
            alt="imagem do produto"
            data-testid="product-detail-image"
          />
          <ul>
            {product.attributes.map((att) => (att.value_name !== null ? (
              <li key={ att.id }>
                <p>{`${att.name}: ${att.value_name}`}</p>
              </li>
            ) : null))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
