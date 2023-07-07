import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardsProducts from './CardsProducts';

type CategoryType = {
  id: string;
  name: string;
};

type ProductType = {
  id: string;
  thumbnail: string;
  title: string;
  price: string;
};
const INITIAL_STATE = {
  id: '',
  thumbnail: '',
  title: '',
  price: '',
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
  console.log(productValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const products = await
      getProductsFromCategoryAndQuery(productValue.search, undefined);
      if (products) { setStateListApi(products.results); }
      setStateListMap(products.results);
      console.log(stateListMap);
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
    <div>
      <Link data-testid="shopping-cart-button" to="/shoppingcart">Carrinho</Link>
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
      {selectedCategory !== '' && categoryProducts.length > 0 && (
        categoryProducts.map((product) => (
          <Link
            key={ product.id }
            to={ `/product/details/${product.id}` }
            data-testid="product-detail-link"
          >
            <CardsProducts
              image={ product.thumbnail }
              name={ product.title }
              value={ product.price }
            />
          </Link>
        ))
      )}
      {selectedCategory === '' && stateListApi.length === 0 && (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      )}
      {selectedCategory === '' && stateListApi.length > 0 && (
        stateListMap.map((product) => (
          <Link
            key={ product.id }
            to={ `/product/details/${product.id}` }
            data-testid="product-detail-link"
          >
            <CardsProducts
              image={ product.thumbnail }
              name={ product.title }
              value={ product.price }
            />
          </Link>
        ))
      )}
    </div>

  );
}

export default Search;
