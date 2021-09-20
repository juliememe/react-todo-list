import React from "react";
import {SearchInterface} from "./Search.interface";

 const SearchBarTemplate = ({searchValue, onChangeHandler, disabled}: SearchInterface) => {

    return (
        <form className="form__search">
            <input className='search__bar form-control' type={"search"} value={searchValue}
                   onChange={onChangeHandler} placeholder={'Search'} disabled={disabled}/>
        </form>
    )
}
export const SearchBar = React.memo(SearchBarTemplate);