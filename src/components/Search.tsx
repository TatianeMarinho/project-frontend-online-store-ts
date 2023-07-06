import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

function Search() {
  const [productValue, setProductValue] = useState({ search: '' });
  const [stateList, setStateList] = useState([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductValue({ ...productValue, [name]: value });
  };
  console.log(productValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const products = await getProductsFromCategoryAndQuery('', productValue.search);
    setStateList(products.results);
  };
  console.log(stateList);

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

      {stateList.length === 0 && (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      )}
    </div>

  );
}

export default Search;
