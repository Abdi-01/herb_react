import React, { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { Grid, Container, Card } from '@material-ui/core';
import './customorderstyles.css';

const CustomOrder = () => {
  const [customProduct, setCustomProduct] = useState({
    addProductName: '',
    addProductDesc: '',
  });

  const [addImage, setAddImage] = useState({
    addFile: null,
    addFileName: null,
  });

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

  const customProductBtnHandler = () => {
    if (addImage.addFile) {
      let formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          custom_product_name: customProduct.addProductName,
          custom_product_desc: customProduct.addProductDesc,
        })
      );
      formData.append('file', addImage.addFile);
      Axios.post(`${API_URL}/products/customorder`, formData)
        .then((res) => {
          alert(res.data.message);
          setCustomProduct({
            addProductName: '',
            addProductDesc: '',
          });
          setAddImage({
            ...addImage,
            addFile: '',
            addFileName: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCustomProduct({ ...customProduct, [name]: value });
  };

  const refreshContent = () => {
    setCustomProduct({
      ...customProduct,
      addProductName: '',
      addProductDesc: '',
    });
    setAddImage({
      ...addImage,
      addFile: null,
      addFileName: null,
    });
  };
  return (
    <div className="product_custom_container">
      <Card>
        <Grid>
          <Container>
            <div className="image_preview">
              <img id="imgpreview" alt="" width="100%" />
            </div>
            <div className="form_container">
              <label htmlFor="img">Upload prescription image here</label>
              <input
                onChange={btnAddImage}
                type="file"
                className="form-control"
                id="img"
              />
              <label htmlFor="ProductDesc">Notes:</label>
              <textarea
                value={customProduct.addProductDesc}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="addProductDesc"
                id="ProductDesc"
                rows="4"
                cols="50"
              />
            </div>
          </Container>
          <Grid>
            <Container></Container>
            <Container>
              <div className="modal-footer">
                <button
                  onClick={customProductBtnHandler}
                  className="btn btn-info text-white"
                >
                  Submit
                </button>
                <button onClick={refreshContent} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CustomOrder;
