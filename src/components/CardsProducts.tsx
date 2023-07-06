type PropsCard = {
  image: string;
  name: string;
  value: string | number;
};

function CardsProducts(props: PropsCard) {
  const { image, name, value } = props;

  return (
    <div>
      <img src={ image } alt={ name } data-testid="product" />
      <div>
        <h3 data-testid="product">{ name }</h3>
        <h4 data-testid="product">
          R$:
          { value }
        </h4>
      </div>
    </div>
  );
}
export default CardsProducts;
