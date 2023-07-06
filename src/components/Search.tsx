import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardsProducts from './CardsProducts';

type CategoryType = {
  id: string;
  name: string;
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
          stateList.map((list) => {
            return (
              <button data-testid="category" key={ list.id }>{list.name}</button>

            );
          })
        )}
      </div>
      {stateListApi.length === 0
        ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        : (stateListMap.map((product) => (
          <CardsProducts
            key={ product.id }
            image={ product.thumbnail }
            name={ product.title }
            value={ product.price }
            data-testid="product"
          />
        )))}
    </div>

  );
}

export default Search;
