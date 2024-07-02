import { useEffect, useState } from "react";
import { CartModal } from "../../CartModal";
import { ProductList } from "../../ProductList";
import { api } from "../../../services/api.js";
import { PageTemplate } from "../../templates/PageTemplate";

export const HomePage = () => {
  const localProductList = localStorage.getItem("@PRODUCTLIST");
  const [productList, setProductList] = useState(
    localProductList ? JSON.parse(localProductList) : []
  );
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(
    cartList.length > 0 ? cartList.length : 0
  );
  const [isOpen, setIsOpen] = useState(false);

  // useEffect montagem - carrega os produtos da API e joga em productList
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

  // useEffect atualização - salva os produtos no localStorage (carregar no estado)

  useEffect(() => {
    localStorage.setItem("@PRODUCTLIST", JSON.stringify(productList));
  }, [productList]);

  // adição, exclusão, e exclusão geral do carrinho
  function addProduct(product) {
    let newCartList = [...cartList, product];
    setCartList(newCartList);
  }

  useEffect(() => {
    function addCounter() {
      setCounter(cartList.length);
    }
    addCounter();
  }, [cartList]);

  // renderizações condições e o estado para exibir ou não o carrinho
  // estilizar tudo com sass de forma responsiva
 

  return (
    <PageTemplate counter={counter} setIsOpen={setIsOpen}>
      {loading ? (
        <h1 className="title">Carregando produtos...</h1>
      ) : (
        <ProductList productList={productList} addProduct={addProduct} />
      )}
      {isOpen ? <CartModal cartList={cartList} setIsOpen={setIsOpen}/> : null}
    </PageTemplate>
  );
};