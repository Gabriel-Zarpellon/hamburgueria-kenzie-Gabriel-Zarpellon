import { Header } from "../../Header";

export function PageTemplate({ children, counter, setIsOpen }) {
  return (
    <>
      <Header counter={counter} setIsOpen={setIsOpen} />
      <main>{children}</main>
    </>
  );
}