import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../helper';
import Axios from 'axios';
import './modaladdproduct.css';
import { Card } from '@material-ui/core';

export const AddModal = ({ showModal }) => {
  const [productFetch, setProductFetch] = useState({
    productDataList: [],
  });

  const [newProduct, setNewProduct] = useState({
    addProductName: '',
    addProductDesc: '',
    addProductStock: 0,
    addProductCapacityPerPackage: 0,
    addProductNettoTotal: 0,
    addProductUnit: 0,
    addProductPricePerUnit: 0,
    addProductPricePerStock: 0,
    addProductBrand: '',
    addProductCategory: '',
  });

  const [addImage, setAddImage] = useState({
    addFile: '',
    addFileName: '',
  });

  const fetchProducts = () => {
    Axios.get(`${API_URL}/products/get`)
      .then((res) => {
        setProductFetch({
          ...productFetch,
          productDataList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const cancelEdit = () => {
    setNewProduct({
      ...newProduct,
      addProductName: '',
      addProductDesc: '',
      addProductStock: 0,
      addProductCapacityPerPackage: 0,
      addProductNettoTotal: 0,
      addProductUnit: 0,
      addProductPricePerUnit: 0,
      addProductPricePerStock: 0,
      addProductBrand: '',
      addProductCategory: '',
    });
  };

  const addNewProduct = () => {
    if (addImage.addFile) {
      let formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          product_name: newProduct.addProductName,
          product_desc: newProduct.addProductDesc,
          stock: parseInt(newProduct.addProductStock),
          capacity_per_package: parseInt(newProduct.addProductCapacityPerPackage),
          // netto_total: parseInt(newProduct.addProductNettoTotal),
          unit: newProduct.addProductUnit,
          price_per_unit: parseInt(newProduct.addProductPricePerUnit),
          price_per_stock: parseInt(newProduct.addProductPricePerStock),
          brand_id: newProduct.addProductBrand,
          category_id: newProduct.addProductCategory,
        })
      );
      formData.append('file', addImage.addFile);

      Axios.post(`${API_URL}/products/post`, formData)
        .then((res) => {
          alert(res.data.message);
          fetchProducts();
          setNewProduct({
            addProductName: '',
            addProductDesc: '',
            addProductStock: 0,
            addProductCapacityPerPackage: 0,
            // addProductNettoTotal: 0,
            addProductUnit: 0,
            addProductPricePerUnit: 0,
            addProductPricePerStock: 0,
            addProductBrand: '',
            addProductCategory: '',
          });
          setAddImage({
            addFile: '',
            addFileName: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {showModal ? (
        <Card className="modal_container">
          <div>
            <div className="modal-content">
              <div className="modal-header">
                <h3>Please fill all the form:</h3>
              </div>
              <div className="modal-body">
                <div>
                  <div>
                    <img id="imgpreview" alt="" width="100%" />
                  </div>
                  <label htmlFor="img" className="text-xl-left">
                    Add image
                  </label>
                  <input
                    onChange={btnAddImage}
                    type="file"
                    className="form-control"
                    id="img"
                  />
                </div>
                <div>
                  <label htmlFor="productname" className="text-xl-left">
                    Product Name
                  </label>
                  <input
                    value={newProduct.addProductName}
                    onChange={inputHandler}
                    name="addProductName"
                    type="text"
                    id="productname"
                    placeholder="Product Name"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="productdescription" className="text-xl-left">
                    Product Description
                  </label>
                  <textarea
                    value={newProduct.addProductDesc}
                    onChange={inputHandler}
                    name="addProductDesc"
                    type="text"
                    id="productdescription"
                    placeholder="Product Description"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="productstock" className="text-xl-left">
                    Product Stock
                  </label>
                  <input
                    value={newProduct.addProductStock}
                    onChange={inputHandler}
                    name="addProductStock"
                    id="productstock"
                    type="number"
                    placeholder="10"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="productnetto" className="text-xl-left">
                    Product Netto
                  </label>
                  <input
                    value={newProduct.addProductCapacityPerPackage}
                    onChange={inputHandler}
                    name="addProductCapacityPerPackage"
                    type="number"
                    id="productcapacityperpackage"
                    placeholder="400"
                    className="form-control"
                  />
                </div>
                {/* <div>
                  <label htmlFor="productnettototal" className="text-xl-left">
                    Product Netto Total
                  </label>
                  <input
                    value={newProduct.addProductNettoTotal}
                    onChange={inputHandler}
                    name="addProductNettoTotal"
                    type="number"
                    id="productnettototal"
                    placeholder="4000"
                    className="form-control"
                  />
                </div> */}
                <div>
                  <label htmlFor="productunit" className="text-xl-left">
                    Product Unit
                  </label>
                  <select
                    value={newProduct.addProductUnit}
                    onChange={inputHandler}
                    name="addProductUnit"
                    type="text"
                    id="productunit"
                    placeholder="ml"
                    className="form-control"
                  >
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                    <option value="tablet">tablet</option>
                    <option value="botol">botol</option>
                    <option value="kaplet">kaplet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="productpriceperunit" className="text-xl-left">
                    Price Per Unit
                  </label>
                  <input
                    value={newProduct.addProductPricePerUnit}
                    onChange={inputHandler}
                    name="addProductPricePerUnit"
                    type="number"
                    id="productpriceperunit"
                    placeholder="5000"
                    className="form-control"
                  />
                </div>
                <div>
                  <label
                    htmlFor="productpriceperstock"
                    className="text-xl-left"
                  >
                    Price Per Stock
                  </label>
                  <input
                    value={newProduct.addProductPricePerStock}
                    onChange={inputHandler}
                    name="addProductPricePerStock"
                    type="number"
                    id="productpriceperstock"
                    placeholder="5000"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="productbrand" className="text-xl-left">
                    Product Brand
                  </label>
                  <select
                    value={newProduct.addProductBrand}
                    onChange={inputHandler}
                    name="addProductBrand"
                    type="number"
                    id="productbrand"
                    placeholder="Kimia Farma"
                    className="form-control"
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
                </div>
                <div>
                  <label htmlFor="productcategory" className="text-xl-left">
                    Product Category
                  </label>
                  <select
                    value={newProduct.addProductCategory}
                    onChange={inputHandler}
                    name="addProductCategory"
                    type="number"
                    id="productcategory"
                    placeholder="Antibiotic"
                    className="form-control"
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
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={addNewProduct}
                  className="btn btn-info text-white"
                >
                  Add Product
                </button>
                <button onClick={cancelEdit} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  );
};
