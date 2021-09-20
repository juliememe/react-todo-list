import React, {useEffect, useRef} from "react";
import {CategoryEditProps} from "./CategoryEdit.interface";
import styles from './category-edit.scss';
import ClassName from "classnames/bind";

const cx = ClassName.bind(styles);


const CategoryEditTemplate = ({editable, saveCategory, saveInputData, inputData, categoryTitle}: CategoryEditProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef && inputRef.current && inputRef.current.focus();
    }, [inputRef, editable]);

    return editable ?
        <form onSubmit={saveCategory} onBlur={saveCategory}><input ref={inputRef} type="text"
                                                                   value={inputData}
                                                                   name="categoryName"
                                                                   onChange={saveInputData}/>
        </form> : <span className={cx('category__item')}>{categoryTitle}</span>

}

export const CategoryEdit = React.memo(CategoryEditTemplate);