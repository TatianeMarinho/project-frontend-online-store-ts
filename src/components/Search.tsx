import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardsProducts from './CardsProducts';
import { setProductOnCart } from '../services/ShoppingCartStorage';

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
const INITIAL_STATE = {
  id: '',
  thumbnail: '',
  title: '',
  price: 0,
};

function Search() {
  const [productValue, setProductValue] = useState({ search: '' });
  const [stateList, setStateList] = useState<CategoryType[]>([]);
  const [stateListApi, setStateListApi] = useState([]);
  const [stateListMap, setStateListMap] = useState([INITIAL_STATE]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function getAPI() {
      const api = await getCategories();
      setStateList(api);
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
      setSelectedCategory('');
      const products = await
      getProductsFromCategoryAndQuery(productValue.search, undefined);
      if (products) { setStateListApi(products.results); }
      setStateListMap(products.results);
    } catch (err) {
      console.error('Nenhum produto foi encontrado');
    }
  };
  const handleCategoryClick = async (categoryId: string) => {
    try {
      const products = await getProductsFromCategoryAndQuery('', categoryId);
      setCategoryProducts(products.results);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Erro ao buscar os produtos da categoria');
    }
  };
  return (
    <>
      <nav>
        <Link data-testid="shopping-cart-button" to="/shoppingcart">Carrinho</Link>
      </nav>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="search"
          value={ productValue.search }
          onChange={ handleInput }
          data-testid="query-input"
        />
        <button
          data-testid="query-button"
        >
          Buscar
        </button>
      </form>
      <div>
        {stateList.length > 0 && (
          stateList.map((list) => (
            <button
              data-testid="category"
              key={ list.id }
              onClick={ () => handleCategoryClick(list.id) }
            >
              {list.name}
            </button>
          ))
        )}
      </div>
      <section className="results-container">
        {selectedCategory !== '' && categoryProducts.length > 0 && (
          categoryProducts.map((product) => (
            <div key={ product.id }>
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
                Adicionar ao carrinho
              </button>
            </div>
          ))
        )}
        {selectedCategory === '' && stateListApi.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        {selectedCategory === '' && stateListApi.length > 0 && (
          stateListMap.map((product) => (
            <div key={ product.id }>
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
                Adicionar ao carrinho
              </button>
            </div>
          ))
        )}
      </section>
    </>

  );
}

export default Search;
