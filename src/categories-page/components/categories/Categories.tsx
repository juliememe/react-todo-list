import React from "react";
import {Category} from "../category";
import styles from './categories.scss';
import ClassName from "classnames/bind";
import {CategoryInterface} from "../category/Category.interface";

const cx = ClassName.bind(styles);

export const Categories = ({categories, setCategoryId, state}: any) => {

    return (
        <>
            {categories.map((cat: CategoryInterface) => {
                return (
                    <ul key={cat.id}
                        className={cx({"category-invisible": cat.expanded, "category-visible": !cat.expanded})}>
                        <Category category={cat} setCategoryId={setCategoryId}/>
                        <Categories state={state} categories={cat.categories.map((num) => state[num])}
                                    setCategoryId={setCategoryId}/>
                    </ul>
                )
            })}
        </>
    )
}

