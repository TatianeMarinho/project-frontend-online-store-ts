import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

type CategoryType = {
  id: string;
  name: string;
};

function Search() {
  const [productValue, setProductValue] = useState('');
  const [stateList, setStateList] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function getAPI() {
      const api = await getCategories();
      setStateList(api);
      console.log(stateList);
    }
    getAPI();
  }, []);

  const handleInput = () => {

  };

  return (
    <div>
      <Link data-testid="shopping-cart-button" to="/shoppingcart">Carrinho</Link>
      <form>
        <input
          type="text"
          name="search"
          value={ productValue }
        />
        <button onClick={ handleInput }> Buscar </button>
      </form>

      {stateList.length === 0 && (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      )}
      {stateList.length > 0 && (
        stateList.map((list) => {
          return (
            <button data-testid="category" key={ list.id }>{list.name}</button>

          );
        })
      )}

    </div>

  );
}

export default Search;
