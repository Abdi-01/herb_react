import React,  { useState, useEffect }  from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';


const SalesReport = () => {

  const userGlobal = useSelector((state) => state.userGlobal);

  const [salesFetch, setSalesFetch] = useState({
    salesDataList: []
  });
  
  const fetchSales = () => {
    Axios.get(`${API_URL}/admin`)
      .then((res) => {
        if (res.data.length) {
          setSalesFetch({ ...salesFetch, salesDataList: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const renderReports = () => {
    let salesDataList = [...salesFetch.salesDataList];

    return salesDataList.map((val) => {
      return(
        <tr>
          <td>{val.Date}</td>
          <td>{val.product_name}</td>
          <td>{val.quantity}</td>
          <td>{val.total_price}</td>
        </tr>
      )
    })
  }

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
              {renderReports()}
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
