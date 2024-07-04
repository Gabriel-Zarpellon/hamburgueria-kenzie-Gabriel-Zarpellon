import { useState } from "react";
import { MdSearch } from "react-icons/md";

export function SearchInput({formClass, buttonClass, mdSize, setSearch}){
    const [value, setValue] = useState("");
    function submit(e){
        e.preventDefault();
        setSearch(value)
        setValue("");
    }
    return(
        <form className={formClass} onClick={submit}>
              <input type="text" value={value} placeholder="Pesquisar..." onChange={(e)=>setValue(e.target.value)} required/>
              <button type="submit" className={buttonClass} aria-label="search" title="Pesquisar">
            <MdSearch size={mdSize} />
          </button>
            </form>
    )
}