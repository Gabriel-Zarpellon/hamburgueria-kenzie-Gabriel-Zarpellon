import { Header } from "../../Header";

export function PageTemplate({ children, counter, setIsOpen, setSearch }) {
  return (
    <>
      <Header counter={counter} setIsOpen={setIsOpen} setSearch={setSearch} />
      <main>{children}</main>
    </>
  );
}