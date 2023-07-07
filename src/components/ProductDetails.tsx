import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

const INITIAL_STATE = {
  title: '',
  pictures: [{ url: '' }],
  attributes: [{ id: '', name: '', value_name: '' }],
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
    <main>
      <div className="productDetailsContainer">
        <h2>{product.title}</h2>
        <div>
          <img src={ product.pictures[0].url } alt="imagem do produto" />
          <ul>
            {product.attributes.map((att) => (
              <li key={ att.id }>
                <p>{`${att.name}: ${att.value_name}`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
