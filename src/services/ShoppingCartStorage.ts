function setProductOnCart(product: any) {
  let quantity = 1;
  const productToStore = { ...product, quantity };

  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:any) => p.id === product.id);

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
function removeQuantityFromCart(product: any) {
  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:any) => p.id === product.id);

  const quantity = storedProduct.quantity > 1 ? storedProduct.quantity - 1 : 1;

  const productWithNewQuantity = {
    ...storedProduct,
    quantity,
  };
  const newStorage = replaceItem(shoppingCart, storedProduct, productWithNewQuantity);
  localStorage.setItem('shoppingCart', JSON.stringify([...newStorage]));
  return [...newStorage];
}

function removeFromCart(product: any) {
  const storedCart = localStorage.getItem('shoppingCart');

  const shoppingCart = JSON.parse(storedCart || '[]');

  const storedProduct = shoppingCart.find((p:any) => p.id === product.id);

  const newStorage = RemoveItem(shoppingCart, storedProduct);

  localStorage.setItem('shoppingCart', JSON.stringify([...newStorage]));
  return newStorage;
}

function replaceItem(array: any[], itemToRemove: any, itemToAdd: any) {
  const index = array.findIndex((p:any) => p.id === itemToRemove.id);
  array.splice(index, 1, itemToAdd);
  return array;
}

function RemoveItem(array: any[], itemToRemove: any) {
  const index = array.findIndex((p:any) => p.id === itemToRemove.id);
  array.splice(index, 1);
  return array;
}

export { setProductOnCart, getItemsOnCart, removeQuantityFromCart, removeFromCart };
