import axios from "axios";
import { API } from "../../constants/api";

export const fetchCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    axios
      .get(`${API}/carts`, {
        params: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Get cart", res.data);
        dispatch({
          type: "FILL_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateQty = (id, qty, action) => {
  return (dispatch) => {
    axios
      .patch(`${API}/carts/${id}`, {
        qty: qty,
        action: action,
      })
      .then((res) => {
        console.log("update Quantity", res);
        dispatch(fetchCart());
        dispatch({
          type: "INCREMENT_CART",
        });
      })
      .catch();
  };
};

export const deleteCart = (id) => {
  return (dispatch) => {
    axios
      .delete(`${API}/carts/${id}`)
      .then((res) => {
        dispatch(fetchCart());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const emptyCart = (userId) => {
  return (dispatch) => {
    axios
      .delete(`${API}/carts/${userId}`)
      .then((res) => {
        dispatch(fetchCart());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkoutCart = (
  userData,
  totalPrice,
  cartList,
  recipent,
  currentDate
) => {
  return (dispatch) => {
    axios.post(`${API}/transactions`, {
      userId: userData.id,
      recipent: recipent.name,
      address: recipent.address,
      totalPrice: totalPrice,
      transactionItems: cartList,
      currentDate: currentDate,
    });
  };
};
