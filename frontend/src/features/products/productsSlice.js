import { createSelector, createSlice } from '@reduxjs/toolkit';
import { initialCartLoad, productsAPI } from './productsAPI';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    userCurrentCart: null,
    success: null,
    message: null,
  },
  reducers: {
    fetchedAll: (state, action) => {
      state.list = action.payload.products;
      state.success = true;
    },
    fetchedAllCartItems: (state, action) => {
      const newCartItems = action.payload.userCurrentCart;
      state.userCurrentCart = newCartItems;
      state.success = true;
    },

    addedQuantity: (state, action) => {
      const newCartItems = action.payload.userCurrentCart;
      const updatedProduct = action.payload.updatedProduct;

      state.userCurrentCart = newCartItems;
      state.list = state.list.map((item) =>
        item.id === updatedProduct.id ? { ...updatedProduct } : { ...item }
      );
    },
    removedQuantity: (state, action) => {
      const newCartItems = action.payload.userCurrentCart;
      const updatedProduct = action.payload.updatedProduct;

      state.userCurrentCart = newCartItems;
      state.list = state.list.map((item) =>
        item.id === updatedProduct.id ? { ...updatedProduct } : { ...item }
      );
    },
    processFailed: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
    },
  },
});

export default productsSlice.reducer;
const {
  fetchedAll,
  addedQuantity,
  removedQuantity,
  processFailed,
  fetchedAllCartItems,
} = productsSlice.actions;

export const fetchAllProducts = () => async (dispatch) => {
  const url = 'http://localhost:5000/products';
  const method = 'GET';

  const apiResponse = await productsAPI(url, method);

  apiResponse.success
    ? dispatch(fetchedAll({ products: apiResponse.products }))
    : dispatch(processFailed({ message: apiResponse.error }));
};

export const fetchAllCartItems = () => async (dispatch) => {
  const url = 'http://localhost:5000/products/cart';

  const apiResponse = await initialCartLoad(url);

  apiResponse.success
    ? dispatch(
        fetchedAllCartItems({ userCurrentCart: apiResponse.currentCart })
      )
    : dispatch(processFailed({ message: apiResponse.error }));
};

export const addQuantity =
  ({ id, qty }) =>
  async (dispatch) => {
    const url = 'http://localhost:5000/products/add';
    const method = 'PATCH';
    const data = { id, qty };

    const apiResponse = await productsAPI(url, method, data);

    console.log(apiResponse.userCurrentCart);

    //actualiza la cesta y los productos de la UI
    apiResponse.success
      ? dispatch(
          addedQuantity({
            userCurrentCart: apiResponse.userCurrentCart,
            updatedProduct: apiResponse.updatedProduct,
          })
        )
      : dispatch(processFailed({ message: apiResponse.error }));
  };

export const removeQuantity = (id, qty) => async (dispatch, getState) => {
  const url = 'http://localhost:5000/products/remove';
  const method = 'PATCH';
  const data = { id, qty };

  const apiResponse = await productsAPI(url, method, data);

  console.log(apiResponse.userCurrentCart);

  //actualiza la cesta y los productos de la UI
  apiResponse.success
    ? dispatch(
        removedQuantity({
          userCurrentCart: apiResponse.userCurrentCart,
          updatedProduct: apiResponse.updatedProduct,
        })
      )
    : dispatch(processFailed({ message: apiResponse.error }));
};

export const selectAllProducts = createSelector(
  (state) => state.products.list, //input
  (list) => list //output
);

export const selectSingleProduct = (id) =>
  createSelector(
    (state) => state.products.list, //input
    (list) => list.find((item) => item.id === id) //output
  );

export const userCurrentCart = createSelector(
  (state) => state.products.userCurrentCart, //input
  (userCurrentCart) => userCurrentCart //output
);
