type ProductType = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity?: number;
};

function setProductOnCart(product: ProductType) {
  let quantity = 1;
  const productToStore = { ...product, quantity };

  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:ProductType) => p.id === product.id);

  if (storedProduct !== undefined) {
    quantity = storedProduct.quantity + 1;
    const productWithNewQuantity = {
      ...productToStore,
      quantity,
    };
    const newStorage = replaceItem(shoppingCart, storedProduct, productWithNewQuantity);
    localStorage.setItem(
      'shoppingCart',
      JSON.stringify([...newStorage]),
    );
    return [...newStorage];
  }

  localStorage.setItem('shoppingCart', JSON.stringify([...shoppingCart, productToStore]));
  return [...shoppingCart, productToStore];
}

function getItemsOnCart() {
  return JSON.parse(localStorage.getItem('shoppingCart') || '[]');
}
function removeQuantityFromCart(product: ProductType) {
  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:ProductType) => p.id === product.id);

  const quantity = storedProduct.quantity > 1 ? storedProduct.quantity - 1 : 1;

  const productWithNewQuantity = {
    ...storedProduct,
    quantity,
  };
  const newStorage = replaceItem(shoppingCart, storedProduct, productWithNewQuantity);
  localStorage.setItem('shoppingCart', JSON.stringify([...newStorage]));
  return [...newStorage];
}

function removeFromCart(product: ProductType) {
  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:ProductType) => p.id === product.id);

  const newStorage = RemoveItem(shoppingCart, storedProduct);

  localStorage.setItem('shoppingCart', JSON.stringify([...newStorage]));
  return newStorage;
}

function replaceItem(
  array: ProductType[],
  itemToRemove: ProductType,
  itemToAdd: ProductType,
) {
  const index = array.findIndex((p:ProductType) => p.id === itemToRemove.id);
  array.splice(index, 1, itemToAdd);
  return array;
}

function RemoveItem(array: ProductType[], itemToRemove: ProductType) {
  const index = array.findIndex((p:ProductType) => p.id === itemToRemove.id);
  array.splice(index, 1);
  return array;
}

export { setProductOnCart, getItemsOnCart, removeQuantityFromCart, removeFromCart };
