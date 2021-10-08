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

  const editProducts = (editData) => {
    setEditProduct({
      ...editProduct,
      editId: editData.product_id,
      editProductName: editData.product_name,
      editProductDesc: editData.product_desc,
      editProductStock: editData.stock,
      editProductNetto: editData.netto,
      editProductNettoTotal: editData.netto_total,
      editProductUnit: editData.unit,
      editProductPricePerUnit: editData.price_per_unit,
      editProductPricePerStock: editData.price_per_stock,
      editProductBrand: editData.brand_id,
      editProductCategory: editData.category_id,
    });
  };

  const cancelEdit = () => {
    setEditProduct({ ...editProduct, editId: 0 });
  };

  const saveBtnHandler = () => {
    if (addImage.addFile) {
      let formData = new FormData();

      formData.append('file', addImage.addFile);

      formData.append(
        'data',
        JSON.stringify({
          product_name: editProduct.editProductName,
          product_desc: editProduct.editProductDesc,
          stock: editProduct.editProductStock,
          netto: editProduct.editProductNetto,
          netto_total: editProduct.editProductNettoTotal,
          unit: editProduct.editProductUnit,
          price_per_unit: editProduct.editProductPricePerUnit,
          price_per_stock: editProduct.editProductPricePerStock,
          brand_id: editProduct.editProductBrand,
          category_id: editProduct.editProductCategory,
        })
      );

      Axios.patch(`${API_URL}/products/update/${editProduct.editId}`, formData)
        .then((res) => {
          alert(res.data.message);
          fetchProducts();
          cancelEdit();
        })
        .catch(() => {
          alert(`Terjadi Kesalahan`);
        });
    } else if (!addImage.addFile) {
      Axios.patch(`${API_URL}/products/update/${editProduct.editId}`, {
        product_name: editProduct.editProductName,
        product_desc: editProduct.editProductDesc,
        product_img: productFetch.productDataList.product_img,
        stock: editProduct.editProductStock,
        netto: editProduct.editProductNetto,
        netto_total: editProduct.editProductNettoTotal,
        unit: editProduct.editProductUnit,
        price_per_unit: editProduct.editProductPricePerUnit,
        price_per_stock: editProduct.editProductPricePerStock,
        brand_id: editProduct.editProductBrand,
        category_id: editProduct.editProductCategory,
      })
        .then((res) => {
          alert(res.data.message);
          fetchProducts();
          cancelEdit();
        })
        .catch(() => {
          alert(`Terjadi Kesalahan`);
        });
    }
  };

  const btnAddImage = (e) => {
    if (e.target.files[0]) {
      setAddImage({
        ...addImage,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });

      let preview = document.getElementById('imgpreview');
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
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
      if (product.product_id === editProduct.editId) {
        return (
          <tr>
            <td>{product.product_id}</td>
            <td>
              <input
                value={editProduct.editProductName}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductName"
              />
            </td>
            <td>
              <textarea
                value={editProduct.editProductDesc}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductDesc"
              />
            </td>
            <td>
              <div>
                <img id="imgpreview" alt="" width="100%" />
              </div>
              <input
                onChange={btnAddImage}
                type="file"
                className="form-control"
                id="img"
              />
            </td>
            <td>
              <input
                value={editProduct.editProductStock}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductStock"
              />
            </td>
            <td>
              <input
                value={editProduct.editProductNetto}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductNetto"
              />
            </td>
            <td>
              <input
                value={editProduct.editProductNettoTotal}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductNettoTotal"
              />
            </td>
            <td>
              <select
                value={editProduct.editProductUnit}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductUnit"
              >
                <option value="ml">ml</option>
                <option value="mg">mg</option>
                <option value="tablet">tablet</option>
              </select>
            </td>
            <td>
              <input
                value={editProduct.editProductPricePerUnit}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductPricePerUnit"
              />
            </td>
            <td>
              <input
                value={editProduct.editProductPricePerStock}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductPricePerStock"
              />
            </td>
            <td>
              <select
                value={editProduct.editProductBrand}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductBrand"
              >
                <option value="1">Kalbe Farma</option>
                <option value="2">Sanbe Farma</option>
                <option value="3">Dexa Medica</option>
                <option value="4">Pharos Indonesia</option>
                <option value="5">Kimia Farma</option>
                <option value="6">Biofarma</option>
                <option value="7">Novartis</option>
                <option value="8">PT. Sido Muncul Tbk.</option>
                <option value="9">Blackmores Limited</option>
                <option value="10">H&H Group</option>
              </select>
            </td>
            <td>
              <select
                value={editProduct.editProductCategory}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editProductCategory"
              >
                <option value="1">Antibiotics</option>
                <option value="2">Antibacterials</option>
                <option value="3">Antacids</option>
                <option value="4">Antidepressants</option>
                <option value="5">Antiarrhythmics</option>
                <option value="6">Suplement</option>
                <option value="7">Anti-Inflammatories</option>
                <option value="8">Antipyretics</option>
                <option value="9">Paracetamol</option>
                <option value="10">Immunosuppressives</option>
              </select>
            </td>
            <td>
              <button onClick={saveBtnHandler} className="btn btn-secondary">
                Save
              </button>
            </td>
            <td>
              <button onClick={cancelEdit} className="btn btn-danger">
                Cancel
              </button>
            </td>
          </tr>
        );
      }
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
          <td>
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => editProducts(product)}
            >
              Edit
            </button>
          </td>
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
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
