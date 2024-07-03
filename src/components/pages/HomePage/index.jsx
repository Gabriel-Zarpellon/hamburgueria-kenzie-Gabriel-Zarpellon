import { useEffect, useState } from "react";
import { CartModal } from "../../CartModal";
import { ProductList } from "../../ProductList";
import { api } from "../../../services/api.js";
import { PageTemplate } from "../../templates/PageTemplate";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const HomePage = () => {
  const localProductList = localStorage.getItem("@PRODUCTLIST");
  const [productList, setProductList] = useState(
    localProductList ? JSON.parse(localProductList) : []
  );

  const localCartList = localStorage.getItem("@CARTLIST");
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(
    cartList.length > 0 ? cartList.length : 0
  );
  const [isOpen, setIsOpen] = useState(false);

  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("@PRODUCTLIST", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("@CARTLIST", JSON.stringify(cartList));
  }, [cartList]);

  function addProduct(product) {
    let newCartList = [];
    if (cartList.length > 0) {
      cartList.forEach((element) => {
        if (element.id == product.id) {
          notify(element.name);
          setCartList(cartList);
        } else {
          newCartList = [...cartList, {...product, key: crypto.randomUUID()}];
          setCartList(newCartList);
        }
      });
    } else {
      newCartList = [...cartList, product];
      setCartList(newCartList);
    }
  }

  useEffect(() => {
    function addCounter() {
      setCounter(cartList.length);
    }
    addCounter();
  }, [cartList]);

  function removeProduct(removeId) {
    let newCartList = cartList.filter((product) => product.id != removeId);
    setCartList(newCartList);
  }

  function notify(elementName) {
    toast.warn(`O item ${elementName} já foi adicionado ao carrinho!`, { });
  }
  return (
    <PageTemplate counter={counter} setIsOpen={setIsOpen}>
      <ToastContainer position="top-center" autoClose={3000} closeOnClick/>
      {loading ? (
        <h1 className="title">Carregando produtos...</h1>
      ) : (
        <ProductList productList={productList} addProduct={addProduct} />
      )}
      {isOpen ? (
        <CartModal
          cartList={cartList}
          setIsOpen={setIsOpen}
          removeProduct={removeProduct}
          setCartList={setCartList}
        />
      ) : null}
    </PageTemplate>
  );
};
