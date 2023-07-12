import { Link } from 'react-router-dom';
import Carrinho from '../images/shoppingCart.svg';
import Home from '../images/homeButton.svg';
import MagnifyingGlass from '../images/magnifyingGlass.svg';
import '../styles/header.css';

type HeaderProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string;
};

function Header({ onSubmit, onChange, value }: HeaderProps) {
  return (
    <header>
      <Link to="/"><img src={ Home } alt="home" /></Link>
      <form onSubmit={ onSubmit }>
        <input
          type="text"
          name="search"
          value={ value }
          onChange={ onChange }
          data-testid="query-input"
        />
        <button
          data-testid="query-button"
        >
          <img src={ MagnifyingGlass } alt="search" />
        </button>
      </form>
      <Link
        data-testid="shopping-cart-button"
        to="/shoppingcart"
      >
        <img src={ Carrinho } alt="carrinho" />
      </Link>
    </header>
  );
}

export default Header;
