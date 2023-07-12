import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import CardsProducts from './CardsProducts';
import { setProductOnCart } from '../../services/ShoppingCartStorage';
import Header from '../Header';
import addShoppingCart from '../../images/addShoppingCart.svg';
import '../../styles/search.css';

type CategoryType = {
  id: string;
  name: string;
};

type ProductType = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
};

function Search() {
  const [productValue, setProductValue] = useState({ search: '' });
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [productsResult, setProductsResult] = useState<ProductType[]>([]);

  useEffect(() => {
    async function getAPI() {
      const api = await getCategories();
      setCategories(api);
    }
    getAPI();
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductValue({ ...productValue, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const products = await
      getProductsFromCategoryAndQuery(productValue.search, undefined);
      if (products) { setProductsResult(products.results); }
    } catch (err) {
      console.error('Nenhum produto foi encontrado');
    }
  };
  const handleCategoryClick = async (categoryId: string) => {
    try {
      const products = await getProductsFromCategoryAndQuery('', categoryId);
      if (products) { setProductsResult(products.results); }
    } catch (error) {
      console.error('Erro ao buscar os produtos da categoria');
    }
  };
  return (
    <>
      <Header
        onSubmit={ handleSubmit }
        onChange={ handleInput }
        value={ productValue.search }
      />
      <aside className="category-container">
        {categories.length > 0 && (
          categories.map((list) => (
            <button
              data-testid="category"
              key={ list.id }
              onClick={ () => handleCategoryClick(list.id) }
            >
              {list.name}
            </button>
          ))
        )}
      </aside>
      <main className="results-container">
        {productsResult.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <div className="results-grid">
          {productsResult.length > 0 && (
            productsResult.map((product) => (
              <div className="product-card" key={ product.id }>
                <Link
                  to={ `/product/details/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <CardsProducts
                    image={ product.thumbnail }
                    name={ product.title }
                    value={ product.price }
                  />
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => setProductOnCart(product) }
                >
                  <img src={ addShoppingCart } alt="adicionar" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </>

  );
}

export default Search;
