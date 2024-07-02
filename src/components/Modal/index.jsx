import { MdClose } from "react-icons/md";
import styles from "./style.module.scss";

export function Modal({ children, setIsOpen, total }) {
  return (
    <div role="dialog" className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <h1 className="title white">Carrinho de compras</h1>
          <button aria-label="close" title="Fechar" onClick={() => {setIsOpen(false);}}>
            <MdClose size={21} />
          </button>
        </div>
        <div>{children}</div>
        <div className={styles.modalMain}>
          <div className={styles.totalBox}>
            <p className="paragraph dark">Total</p>
            <p className="paragraph">
              {total.toLocaleString("pt-BR", {style: "currency", currency: "BRL",})}
            </p>
          </div>
          <button className="btn cart">Remover todos</button>
        </div>
      </div>
    </div>
  );
}
