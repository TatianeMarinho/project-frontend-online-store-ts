type PropsCard = {
  image: string;
  name: string;
  value: number;
};

function CardsProducts(props: PropsCard) {
  const { image, name, value } = props;

  return (
    <div data-testid="product">
      <img src={ image } alt={ name } />
      <div>
        <h3>{ name }</h3>
        <h4>{ `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }</h4>
      </div>
    </div>
  );
}
export default CardsProducts;
