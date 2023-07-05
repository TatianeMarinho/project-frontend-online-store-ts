import { useState } from 'react';

function Search() {
  const [productValue, setProductValue] = useState('');
  const [stateList, setStateList] = useState([]);

  const handleInput = () => {

  };
  return (
    <div>
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
    </div>

  );
}

export default Search;
