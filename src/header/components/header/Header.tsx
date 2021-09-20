import Logo from "../logo/Logo";
import {Checkbox, SearchBar} from "../../../components";
import './header.scss';
import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSearchFilter, setTodoItemsDoneFilter} from "../../../state/Action";
import {getCategoryId, getFilterIsDone, getItemName, getSearchValue} from "../../../state/Selector";
import {useHistory} from "react-router-dom";
import {useQuery} from "../../../hooks/UseQuery";

export function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isDone = useSelector(getFilterIsDone);
    const itemName = useSelector(getItemName);
    const currentCategoryId = useSelector(getCategoryId);
    const search = useSelector(getSearchValue);
    const query = useQuery();
    const searchQuery = useMemo(() => query.get('search') || '', [query])

    const handleCheck = React.useCallback((e) => {
        dispatch(setTodoItemsDoneFilter({itemsIsDone: e.target.checked}));
    }, [dispatch]);

    const setSearchValue = useCallback((e) => {
        history.push(`/categories/${currentCategoryId}/?search=${e.target.value}`)
    }, [currentCategoryId, history]);

    useEffect(() => {
        dispatch(setSearchFilter({searchValue: searchQuery}))
    }, [searchQuery, dispatch])

    const header = useMemo(() => {
        return itemName ? <h1>{itemName}</h1> : <Logo/>
    }, [itemName])

    const disabled = useMemo(() => {
        return !currentCategoryId || !!itemName;
    }, [currentCategoryId, itemName])

    return (
        <header className="header">
            <div className="header__wrapper">
                {header}
                <div className='header__form'>
                    <Checkbox check={isDone} handleCheckBox={handleCheck} labelName={'Show done'} labelId={"show-done"}
                              labelElement={"show-done"}/>
                    <SearchBar onChangeHandler={setSearchValue} searchValue={search}
                               disabled={disabled}/>
                </div>
            </div>
        </header>
    )
}
