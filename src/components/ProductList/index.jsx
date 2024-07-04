import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss";

export const ProductList = ({ productList, addProduct, search }) => {
  return (
    <div className="container">
      {search ? <div className={styles.result}><p className="paragraph dark"> Resultados da busca para <strong>{search}</strong>.</p></div> : null}
      {productList.length > 0 ?  <ul className={styles.productList}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} addProduct={addProduct} />
        ))}
      </ul> : <div className={styles.result}><p className="paragraph dark"> Nenhum resultado encontrado.</p></div>} 
     
    </div>
  );
};
