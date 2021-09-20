import React, {useEffect, useMemo} from "react";
import {Categories} from "../categories";
import {MemoizedTaskList} from "../tasks-list";
import styles from './categories-page.scss';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryId, getCurrentTodo, getData} from "../../../state/Selector";
import classNames from "classnames/bind";
import {checkProgress, saveCurrentId, setCurrentTodo} from "../../../state/Action";
import {TodoEdit} from "../todo-edit";
import {useParams} from "react-router-dom";

const cx = classNames.bind(styles);

export const CategoriesPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getData);
    const categoryId = useSelector(getCategoryId);
    const currentTodoItem = useSelector(getCurrentTodo);
    const {id, todoId} = useParams<{ id: string, todoId: string }>();

    function setCurrentCategoryId(id: string) {
        dispatch(saveCurrentId({id}));
        dispatch(checkProgress());
    }

    useEffect(() => {
        if (id) {
            dispatch(saveCurrentId({id}));
        }
        if (todoId) {
            dispatch(setCurrentTodo({
                item: categories[id].items.find((e) => String(e.id) === todoId) || null,
                categoryId: id
            }));
        }
    }, [id, todoId, categories, dispatch]);

    const categoriesArray = useMemo(() => {
        return Object.values(categories).filter((elem) => !elem.parentId).reverse()
    }, [categories]);

    const todoList = useMemo(() => {
        return currentTodoItem ? <TodoEdit item={currentTodoItem}/> : <MemoizedTaskList categoryId={categoryId}/>
    }, [currentTodoItem, categoryId]);


    return (
        <div className='categories__page'>
            <div className={cx("categories__categories")}>
                <Categories state={categories}
                            categories={categoriesArray}
                            setCategoryId={setCurrentCategoryId} categoryId={categoryId}/>
            </div>
            {todoList}
        </div>
    )
}