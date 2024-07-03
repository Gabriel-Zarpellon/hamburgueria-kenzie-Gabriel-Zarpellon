import { CartItemCard } from "./CartItemCard";
import { Modal } from "../Modal";
import styles from "./style.module.scss";


export const CartModal = ({ cartList, setIsOpen, removeProduct, setCartList }) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <Modal setIsOpen={setIsOpen} total={total} setCartList={setCartList}>
      <ul>
        {cartList.length <= 0 ? (
          <div className={styles.emptyCart}>
            <p className="paragraph dark">Seu carrinho está vazio.</p>
          </div>
        ) : (
          cartList.map((product) => (
            <CartItemCard key={product.key} product={product} removeProduct={removeProduct}/>
          ))
        )}
      </ul>
    </Modal>
  );
};
