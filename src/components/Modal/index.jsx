import { MdClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useOutclick } from "../../hooks/useOutclick";
import { useKeyDown } from "../../hooks/useKeydown";

export function Modal({ children, setIsOpen, total, setCartList }) {
  let modalRef = useOutclick(() => {
    setIsOpen(false);
  });

  useKeyDown("Escape", () => {
    setIsOpen(false);
  });

  return (
    <div role="dialog" className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalBox}>
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
              {total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
            </p>
          </div>
          <button className="btn cart" onClick={() => {setCartList([]);}}>
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
}
