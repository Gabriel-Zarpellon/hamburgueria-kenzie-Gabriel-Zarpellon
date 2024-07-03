import { CartItemCard } from "./CartItemCard";
import { Modal } from "../Modal";
import styles from "./style.module.scss";


export const CartModal = ({ cartList, setIsOpen }) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <Modal setIsOpen={setIsOpen} total={total}>
      <ul>
        {/* <li>
      <div>
        <img src={product.img} alt={product.name} />
        <h3>{product.name}</h3>
      </div>
      <button aria-label="delete" title="Remover item">
        <MdDelete size={21} />
      </button>
    </li> */}
        
        {cartList.length <= 0 ? (
          <div className={styles.emptyCart}>
            <p className="paragraph dark">Seu carrinho está vazio.</p>
          </div>
        ) : (
          cartList.map((product) => (
            <CartItemCard key={product.id} product={product} />
          ))
        )}
      </ul>
    </Modal>
  );
};
