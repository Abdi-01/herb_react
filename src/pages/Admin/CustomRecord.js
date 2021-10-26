import React,  { useState, useEffect }  from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';


const CustomRecord = () => {

  const userGlobal = useSelector((state) => state.userGlobal);

  const [dataFetch, setDataFetch] = useState({
    customDataList: []
  });
  
  const fetchData = () => {
    Axios.get(`${API_URL}/products/record`)
      .then((res) => {
        if (res.data.length) {
          setDataFetch({ ...dataFetch, customDataList: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderReports = () => {
    let customDataList = [...dataFetch.customDataList];

    return customDataList.map((val) => {
      return(
        <tr>
          <td>{val.Date}</td>
          <td>{val.product_name}</td>
          <td>{val.capacity_per_package}</td>
          <td>{val.unit}</td>
          <td>{val.dose}</td>
          <td>Rp. {val.total_price}</td>
        </tr>
      )
    })
  }

  useEffect(() => {
    fetchData();
  }, []);


  if (userGlobal?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="container p-5r">
      <div className="col-12 text-center">
        <h1>Custom Product Record</h1>
        <div className="row">
          <table className="table mt-6">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Netto</th>
                <th>Unit</th>
                <th>Dose</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {renderReports()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomRecord;
