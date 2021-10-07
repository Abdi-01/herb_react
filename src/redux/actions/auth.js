import axios from "axios";
import { API } from "../../constants/api";

export const loginUser = ({ account, password }) => {
  return (dispatch) => {
    axios
      .get(`${API}/auth/login`, {
        params: {
          account: account,
          password: password,
        },
      })
      .then((res) => {
        if (res.data.dataLogin) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          let dataResult = res.data.dataLogin[0];
          delete dataResult.password;

          dispatch({
            type: "USER_LOGIN",
            payload: dataResult,
          });
        } else {
          dispatch({
            type: "USER_LOGIN",
            payload: res.data,
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "USER_LOGOUT",
    });
  };
};

export const getSession = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    axios
      .get(`${API}/auth/session`, {
        params: {
          token: token,
        },
      })
      .then((res) => {
        delete res.data.password;
        console.log(res);
        dispatch({
          type: "USER_LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {});
  };
};

export const loadData = () => {
  return {
    type: "LOAD_DATA",
  };
};

export const registerUser = ({ username, email, password }) => {
  return (dispatch) => {
    axios
      .post(`${API}/auth/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.data.dataLogin) {
          delete res.data.dataLogin[0].password;
          localStorage.setItem("token", JSON.stringify(res.data.token));
          let dataResult = res.data.dataLogin[0];
          console.log(dataResult);
          dispatch({
            type: "USER_LOGIN",
            payload: dataResult,
          });
        } else {
          dispatch({
            type: "USER_LOGIN",
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const forgotPassword = ({ account }) => {
  return (dispatch) => {
    axios
      .get(`${API}/auth/forgot-password`, {
        params: {
          account,
        },
      })
      .then((res) => {
        dispatch({
          type: "USER_LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
