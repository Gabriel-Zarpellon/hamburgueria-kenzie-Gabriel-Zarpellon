export const ProductCard = ({ product, addProduct }) => {
    return(
        <li>
            <div>
            <img src={product.img} alt={product.name} />
            </div>
            <div>
                <h3>{product.name}</h3>
                <p className="paragraph">{product.category}</p>
                <p className="paragraph green">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</p>
                <button className="btn" onClick={(e)=>{
                    e.preventDefault();
                    addProduct(product);
                }}>Adicionar</button>
            </div>
        </li>
    )
}