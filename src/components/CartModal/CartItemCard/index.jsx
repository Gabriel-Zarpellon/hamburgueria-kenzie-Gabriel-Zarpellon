import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss";

export function CartItemCard({ product, removeProduct }) {
  return (
    <li className={styles.cartItem}>
      <div className={styles.imgContainer}>
        <img src={product.img} alt={product.name} />
      </div>
      <div>
        <h1 className="title">{product.name}</h1>
        <p className="paragraph green">
          {product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        </p>
      </div>
      <div>
        <button aria-label="delete" title="Remover item" onClick={() => {removeProduct(product.id);}}>
          <MdDelete size={21} />
        </button>
      </div>
    </li>
  );
}
