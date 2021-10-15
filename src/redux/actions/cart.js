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
      .patch(`${API}/carts/update-cart`, {
        id: id,
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
