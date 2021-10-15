import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/actions/cart";

function Home() {
  useEffect(() => {
    fetchCarts();
  }, []);

  const dispatch = useDispatch();
  const fetchCarts = (data) => dispatch(fetchCart(data));

  return <div>Home</div>;
}

export default Home;
