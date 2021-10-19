import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SalesReport = () => {

  const userGlobal = useSelector((state) => state.userGlobal);

  if (userGlobal?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="container p-5r">
      <div className="col-12 text-center">
        <h1>Sales Report</h1>
        <div className="row">
          <table className="table mt-6">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
