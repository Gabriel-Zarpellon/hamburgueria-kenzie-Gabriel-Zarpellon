import Logo from "../../assets/Logo.svg";
import styles from "./style.module.scss";

export function Header({ counter, setIsOpen }) {
  return (
    <header>
      <div className="container">
        <div className={styles.headerBox}>
          <div>
            <img src={Logo} alt="Logo Kenzie Burguer" />
          </div>
          <div>
            <button onClick={()=>{setIsOpen(true)}}>
              <span>{counter}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
