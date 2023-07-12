type PropsCard = {
  image: string;
  name: string;
  value: number;
};

function CardsProducts(props: PropsCard) {
  const { image, name, value } = props;

  return (
    <div className="product" data-testid="product">
      <img src={ image } alt={ name } />
      <div>
        <h3>{ `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }</h3>
        <p>{ name }</p>
      </div>
    </div>
  );
}
export default CardsProducts;
