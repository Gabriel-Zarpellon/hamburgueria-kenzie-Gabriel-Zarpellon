import { MdSearch } from "react-icons/md";
import Logo from "../../assets/Logo.svg";
import styles from "./style.module.scss";
import { SearchInput } from "../SearchInput";

export function Header({ counter, setIsOpen, setSearch }) {
  return (
    <header>
      <div className="container">
        <div className={styles.headerBox}>
          <div>
            <div className={styles.logoContainer}>
              <img src={Logo} alt="Logo Kenzie Burguer" />
            </div>

            <SearchInput formClass={styles.inputContainerBig} buttonClass={styles.inputButtonBig} mdSize={21} setSearch={setSearch}/>
          
          </div>

          <div>
            <button className={styles.cartButton} onClick={() => {setIsOpen(true);}}>
              <span>{counter}</span>
            </button>
          </div>
        </div>
        <SearchInput formClass={styles.inputContainerSmall} buttonClass={styles.inputButtonSmall} mdSize={18} setSearch={setSearch}/>
      </div>
    </header>
  );
}
