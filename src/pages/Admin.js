import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Admin() {
  const userGlobal = useSelector((state) => state.userGlobal);

  if (userGlobal?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h3>Admin Dashboard Page</h3>
    </div>
  );
}

export default Admin;
