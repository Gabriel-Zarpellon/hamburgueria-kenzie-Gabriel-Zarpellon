import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss";

export const ProductList = ({ productList, addProduct }) => {
  return (
    <div className="container">
      <ul className={styles.productList}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} addProduct={addProduct} />
        ))}
      </ul>
    </div>
  );
};
