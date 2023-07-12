import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateForm from '../../services/validadeForm';

const initialState = {
  fullName: '',
  cpf: '',
  email: '',
  phone: '',
  cep: '',
  address: '',
  complement: '',
  number: '',
  city: '',
  state: '',
  paymentMethod: '',
};

function CheckoutForm() {
  const [formState, setFormState] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const validateAll = () => {
    const newErrors = validateForm(formState);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      setIsFormValid({ form: 'Campos inválidos' });
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAll()) {
      setFormState(initialState);
      localStorage.removeItem('shoppingCart');
      navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handlePaymentMethod = (e:any) => {
    setFormState({ ...formState, paymentMethod: e.target.name });
    console.log(e.target.id);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <h2>Informações do comprador</h2>
        <div>
          <input
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
            type="text"
            name="fullName"
            value={ formState.fullName }
            onChange={ handleChange }
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <input
            placeholder="CPF"
            data-testid="checkout-cpf"
            type="text"
            name="cpf"
            value={ formState.cpf }
            onChange={ handleChange }
          />
          {errors.cpf && <span>{errors.cpf}</span>}
        </div>
        <div>
          <input
            placeholder="Email"
            data-testid="checkout-email"
            type="text"
            name="email"
            value={ formState.email }
            onChange={ handleChange }
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <input
            placeholder="Telefone"
            data-testid="checkout-phone"
            type="text"
            name="phone"
            value={ formState.phone }
            onChange={ handleChange }
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <div>
          <input
            placeholder="CEP"
            data-testid="checkout-cep"
            type="text"
            name="cep"
            value={ formState.cep }
            onChange={ handleChange }
          />
          {errors.cep && <span>{errors.cep}</span>}
        </div>
        <div>
          <input
            placeholder="Endereço"
            data-testid="checkout-address"
            type="text"
            name="address"
            value={ formState.address }
            onChange={ handleChange }
          />
          {errors.address && <span>{errors.address}</span>}
        </div>
        <div>
          <input
            placeholder="Complemento"
            type="text"
            name="complement"
            value={ formState.complement }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            placeholder="Número"
            type="number"
            name="number"
            value={ formState.number }
            onChange={ handleChange }
          />
          {errors.number && <span>{errors.number}</span>}
        </div>
        <div>
          <input
            placeholder="Cidade"
            type="text"
            name="city"
            value={ formState.city }
            onChange={ handleChange }
          />
          {errors.city && <span>{errors.city}</span>}
        </div>
        <div>
          <select name="state" value={ formState.state } onChange={ handleChange }>
            <option value="">Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          {errors.state && <span>{errors.state}</span>}
        </div>
      </div>
      <div>
        <h2>Método de Pagamento</h2>
        <div>
          <p>Boleto</p>
          <input
            type="radio"
            name="payment-method"
            id="boleto"
            data-testid="ticket-payment"
            onClick={ (e: any) => handlePaymentMethod(e) }
          />
        </div>
        <div>
          <p>Cartão de Crédito</p>
          <label htmlFor="visa">
            <input
              type="radio"
              name="payment-method"
              id="visa"
              data-testid="visa-payment"
              onClick={ (e: any) => handlePaymentMethod(e) }
            />
            Visa
          </label>
          <label htmlFor="mastercard">
            <input
              type="radio"
              name="payment-method"
              id="mastercard"
              data-testid="master-payment"
              onClick={ (e: any) => handlePaymentMethod(e) }
            />
            Mastercard
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              name="payment-method"
              id="elo"
              data-testid="elo-payment"
              onClick={ (e: any) => handlePaymentMethod(e) }
            />
            Elo
          </label>
        </div>
        {errors.paymentMethod && <span>{errors.paymentMethod}</span>}
      </div>
      <button
        type="submit"
        data-testid="checkout-btn"
      >
        Enviar
      </button>
      {isFormValid.form && <span data-testid="error-msg">{isFormValid.form}</span>}
    </form>
  );
}

export default CheckoutForm;
