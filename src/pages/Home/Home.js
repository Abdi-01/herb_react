import React, { useEffect, useState } from 'react';
import { API_URL } from '../../helper';
import Axios from 'axios';

// file directory
import Product from './Product/Product';

//styling
import useStyles from './homestyles';
import './homestyles.css';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import 'boxicons';

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #8ccfcd;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  padding: 5% 1% 25%;
  top: 90px;
  left: 0;
  transition: 350ms;
  z-index: 1;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Products = () => {
  const [productsFetch, setProductsFetch] = useState({
    productList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
  });

  // const [productsFilter, setProductsFilter] = useState({
  //   filteredProducts: [],
  //   page: 1,
  //   maxPage: 0,
  //   sortBy: '',
  // });

  // const [searchProduct, setSearchProduct] = useState({
  //   searchProductName: '',
  //   searchProductCategory: '',
  // });

  const fetchProducts = () => {
    Axios.get(`${API_URL}/products/get`)
      .then((res) => {
        setProductsFetch({
          ...productsFetch,
          productList: res.data,
          maxPage: Math.ceil(res.data.length / productsFetch.itemPerPage),
        });
        // setProductsFilter({
        //   ...productsFilter,
        //   filteredProducts: res.data,
        //   maxPage: Math.ceil(res.data.length / productsFetch.itemPerPage),
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderProducts = () => {
    const productPagination =
      (productsFetch.page - 1) * productsFetch.itemPerPage;

    // unfiltered data = all the available data
    let rawData = [...productsFetch.productList];

    const compareItem = (a, b) => {
      if (a.product_name < b.product_name) {
        return -1;
      }
      if (a.product_name > b.product_name) {
        return 1;
      }
      return 0;
    };

    // switch (productsFilter.sortBy) {
    //   case 'lowestPrice':
    //     rawData.sort((a, b) => a.price_per_stock - b.price_per_stock);
    //     break;
    //   case 'highestPrice':
    //     rawData.sort((a, b) => b.price_per_stock - a.price_per_stock);
    //     break;
    //   case 'az':
    //     rawData.sort(compareItem);
    //     break;
    //   case 'za':
    //     rawData.sort((a, b) => compareItem(b, a));
    //     break;
    //   default:
    //     rawData = [...productsFilter.filteredProducts];
    //     break;
    // }

    const currentData = rawData.slice(
      productPagination,
      productPagination + productsFetch.itemPerPage
    );

    return currentData.map((product) => {
      return (
        <Grid key={product.id} item xs={3}>
          <Product product={product} />
        </Grid>
      );
    });
  };

  const nextPageHandler = () => {
    if (productsFetch.page < productsFetch.maxPage) {
      setProductsFetch({ ...productsFetch, page: productsFetch.page + 1 });
    }
  };

  const prevPageHandler = () => {
    if (productsFetch.page > 1) {
      setProductsFetch({
        ...productsFetch,
        page: productsFetch.page - 1,
      });
    }
  };

  // const inputHandler = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   setProductsFilter({ ...productsFilter, [name]: value });
  //   setProductsFetch({ ...productsFetch, [name]: value });
  //   setSearchProduct({ ...searchProduct, [name]: value });
  // };

  // const searchBtnHandler = () => {
  //   const filteredProducts = productsFetch.productList.filter((val) => {
  //     return (
  //       val.product_name
  //         .toLowerCase()
  //         .includes(searchProduct.searchProductName) &&
  //       val.products_category.includes(searchProduct.searchProductCategory)
  //     );
  //   });
  //   setProductsFilter({
  //     ...productsFilter,
  //     filteredProducts,
  //     maxPage: Math.ceil(filteredProducts.length / productsFetch.itemPerPage),
  //     page: 1,
  //   });
  // };

  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className={classes.content}>
        <Nav>
          <SidebarNav>
            <SidebarWrap>
              {/* <div className="input_search">
                <label htmlFor="searchProductName" className="text-white">
                  Product Name
                </label>
                <input
                  style={{ borderRadius: '25px' }}
                  onChange={inputHandler}
                  name="searchProductName"
                  type="text"
                  placeholder="Search..."
                  className="form-control mb-3"
                />
                <label htmlFor="searchProductCategory" className="text-white">
                  Product Category
                </label>
                <select
                  onChange={inputHandler}
                  name="searchProductCategory"
                  className="form-control"
                >
                  <option value="">All Items</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Antibacterials">Antibacterials</option>
                  <option value="Antacids">Antacids</option>
                  <option value="Antidepressants">Antidepressants</option>
                  <option value="Antiarrhythmics">Antiarrhythmics</option>
                  <option value="Suplement">Suplement</option>
                  <option value="Anti-Inflammatories">
                    Anti-Inflammatories
                  </option>
                  <option value="Antipyretics">Antipyretics</option>
                  <option value="Paracetamol">Paracetamol</option>
                  <option value="Immunosuppressives">Immunosuppressives</option>
                </select>
                <button
                  onClick={searchBtnHandler}
                  className="btn btn-primary my-3 button-search"
                >
                  Search
                </button>
                <label htmlFor="sortBy" className="text-white">
                  Sort Product
                </label>
                <select
                  onChange={inputHandler}
                  name="sortBy"
                  className="form-control"
                >
                  <option value="">Default</option>
                  <option value="lowestPrice">Lowest Price</option>
                  <option value="highestPrice">Highest Price</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div> */}

              <div className="mt-3">
                <div className="d-flex flex-row justify-content-between align-items-center my-4">
                  <button
                    disabled={productsFetch.page === 1}
                    onClick={prevPageHandler}
                    className="btn btn-dark"
                  >
                    {'<'}
                  </button>
                  <div className="text-center text-white">
                    Page {productsFetch.page} of {productsFetch.maxPage}
                  </div>
                  <button
                    disabled={productsFetch.page === productsFetch.maxPage}
                    onClick={nextPageHandler}
                    className="btn btn-dark"
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </SidebarWrap>
          </SidebarNav>
        </Nav>
      </main>
      <div className="products_container">
        <Grid container justifyContent="center" spacing={4}>
          {renderProducts()}
        </Grid>
      </div>
    </>
  );
};

export default Products;
