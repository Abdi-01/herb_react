import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { AddModal } from './ModalAddProduct/ModalAddProduct';

import styled from 'styled-components';

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #8ccfcd;
  color: #fff;
  cursor: pointer;
`;

const Admin = () => {
  const [productFetch, setProductFetch] = useState({
    productDataList: [],
    pagination: 1,
    maximumPage: 0,
    dataPerPage: 5,
  });

  const [editProduct, setEditProduct] = useState({
    editId: 0,
    editProductName: '',
    editProductDesc: '',
    editProductStock: null,
    editProductNetto: null,
    editProductNettoTotal: null,
    editProductUnit: null,
    editProductPricePerUnit: null,
    editProductPricePerStock: null,
    editProductBrand: '',
    editProductCategory: '',
  });

  const [addImage, setAddImage] = useState({
    addFile: '',
    addFileName: '',
  });

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const fetchProducts = () => {
    Axios.get(`${API_URL}/products/get`)
      .then((res) => {
        setProductFetch({
          ...productFetch,
          productDataList: res.data,
          maximumPage: Math.ceil(res.data.length / productFetch.dataPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshPage = () => {
    fetchProducts();
  };

  // render products
  const renderProducts = () => {
    const productPagination =
      (productFetch.pagination - 1) * productFetch.dataPerPage;

    let rawData = [...productFetch.productDataList];

    const itemPerPage = rawData.slice(
      productPagination,
      productPagination + productFetch.dataPerPage
    );

    return itemPerPage.map((product) => {
      return (
        <tr>
          <td>{product.product_id}</td>
          <td>{product.product_name}</td>
          <td>{product.product_desc}</td>
          <td>
            <img src={API_URL + product.product_img} width="100%" alt="" />
          </td>
          <td>{product.stock}</td>
          <td>{product.netto}</td>
          <td>{product.netto_total}</td>
          <td>{product.unit}</td>
          <td>{product.price_per_unit}</td>
          <td>{product.price_per_stock}</td>
          <td>{product.products_brands}</td>
          <td>{product.products_category}</td>
        </tr>
      );
    });
  };

  const nextHandler = () => {
    if (productFetch.pagination < productFetch.maximumPage) {
      setProductFetch({
        ...productFetch,
        pagination: productFetch.pagination + 1,
      });
    }
  };

  const prevHandler = () => {
    if (productFetch.pagination > 1) {
      setProductFetch({
        ...productFetch,
        pagination: productFetch.pagination - 1,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5r">
      <div className="col-12 text-center">
        <h1>Manage Products</h1>
        <button onClick={refreshPage}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v2.png"
            alt=""
          />
        </button>
        <div>
          <Button onClick={openModal}>Add New Product</Button>
        </div>
        <div>
          <AddModal showModal={showModal} setShowModal={setShowModal} />
        </div>
        <div className="row">
          <table className="table mt-6">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Netto</th>
                <th>Total Netto</th>
                <th>Unit</th>
                <th>Price Per Unit</th>
                <th>Price Per Stock</th>
                <th>Brand</th>
                <th>Category</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <button
                disabled={productFetch.pagination === 1}
                onClick={() => prevHandler()}
                className="btn btn-dark"
              >
                {'<'}
              </button>
              <div className="text-center">
                Page {productFetch.pagination} of {productFetch.maximumPage}
              </div>
              <button
                disabled={productFetch.pagination === productFetch.maximumPage}
                onClick={() => nextHandler()}
                className="btn btn-dark"
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
