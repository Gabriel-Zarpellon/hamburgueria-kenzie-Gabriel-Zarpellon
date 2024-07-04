import { useEffect, useState } from "react";
import { CartModal } from "../../CartModal";
import { ProductList } from "../../ProductList";
import { api } from "../../../services/api.js";
import { PageTemplate } from "../../templates/PageTemplate";
import React from "react";

export const HomePage = () => {
  const localProductList = localStorage.getItem("@PRODUCTLIST");
  const [productList, setProductList] = useState(localProductList ? JSON.parse(localProductList) : []);

  const localCartList = localStorage.getItem("@CARTLIST");
  const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : []);

  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(cartList.length > 0 ? cartList.length : 0);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchResult = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()));

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

    let addIndex = cartList.findIndex((element) => element.id == product.id);

    if (addIndex != -1) {
      newCartList = cartList.map((element, index) =>
        index == addIndex ? { ...element, qtd: element.qtd + 1 } : element
      );
    } else {
      newCartList = [...cartList, { ...product, qtd: 1 }];
    }
    setCartList(newCartList);
  }

  useEffect(() => {
    function addCounter() {
      setCounter(cartList.length);
    }
    addCounter();
  }, [cartList]);

  function removeProduct(removeId) {
    let newCartList = [];
    let removeIndex = cartList.findIndex((product) => product.id == removeId);

    if (cartList[removeIndex].qtd > 1) {
      newCartList = cartList.map((product, index) =>
        index == removeIndex ? { ...product, qtd: product.qtd - 1 } : product
      );
    } else {
      newCartList = cartList.filter((product, index) => index != removeIndex);
    }

    setCartList(newCartList);
  }

  return (
    <PageTemplate counter={counter} setIsOpen={setIsOpen} setSearch={setSearch}>
      {loading ? (
        <h1 className="title">Carregando produtos...</h1>
      ) : (
        <ProductList
          productList={searchResult}
          addProduct={addProduct}
          search={search}
        />
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
