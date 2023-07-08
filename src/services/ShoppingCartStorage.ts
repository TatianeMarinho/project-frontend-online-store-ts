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
    return;
  }

  localStorage.setItem('shoppingCart', JSON.stringify([...shoppingCart, productToStore]));
}

function getItemsOnCart() {
  return JSON.parse(localStorage.getItem('shoppingCart') || '[]');
}

function replaceItem(array: any[], itemToRemove: any, itemToAdd: any) {
  const index = array.findIndex((p:any) => p.id === itemToRemove.id);
  array.splice(index, 1, itemToAdd);
  return array;
}

export { setProductOnCart, getItemsOnCart };
