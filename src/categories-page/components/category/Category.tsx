import React, {useCallback, useMemo, useState} from "react";
import {Button} from "../../../components";
import {ArrowDownSquare} from "react-bootstrap-icons";
import classNames from "classnames/bind";
import styles from './category.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    addCategoryToCategory,
    checkProgress,
    deleteCategory,
    editCategory,
    setCategoryEditable, setCategoryExpanded, setTodoCategory
} from "../../../state/Action";
import {CategoryInterface, CategoryProps} from "./Category.interface";
import {getCategoryId, getCurrentTodo, getSearchValue, getTodoCategory} from "../../../state/Selector";
import {v4 as uuidv4} from "uuid";
import ClassName from "classnames/bind";
import {useHistory} from "react-router-dom";
import {CategoryButtons} from "../category-buttons";
import {CategoryEdit} from "../category-edit/CategoryEdit";

const cx = classNames.bind(styles);

export const Category = ({setCategoryId, category}: CategoryProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentId = useSelector(getCategoryId)
    const currentTodo = useSelector(getCurrentTodo);
    const [inputData, setInputData] = useState(category.title);
    const currentTodoItemCategory = useSelector(getTodoCategory);
    const searchValue = useSelector(getSearchValue);

    const handleCategoryClick = useCallback(() => {
        if (!currentTodo) {
            setCategoryId(category.id);
            history.push(`/categories/${category.id}/?search=${searchValue}`)
        }
    }, [category.id, currentTodo, searchValue, history, setCategoryId]);

    const isActive = useMemo(() => {
        if (currentTodoItemCategory && currentTodo) {
            return category.id === currentTodoItemCategory;
        } else {
            return category.id === currentId;
        }

    }, [category.id, currentId, currentTodoItemCategory, currentTodo]);

    const categoryTitle = useMemo(() => {
        return inputData.trim() ? inputData : 'New Category';
    }, [inputData]);

    const deleteCategoryBtn = useCallback(() => {
        dispatch(checkProgress());
        dispatch(deleteCategory({id: category.id}))
    }, [category.id, dispatch])

    const createCategory = useCallback(() => {
        let newCategory: CategoryInterface = {
            id: uuidv4(),
            title: "",
            items: [],
            categories: [],
            parentId: category.id,
            editable: true
        }
        let key = newCategory.id;
        dispatch(addCategoryToCategory({newCategory, key}));
    }, [category.id, dispatch])

    const editCategories = useCallback(() => {
        dispatch(setCategoryEditable({editable: true, id: category.id}));
    }, [category.id, dispatch]);

    const saveCategory = useCallback((e) => {
        e.preventDefault();
        dispatch(setCategoryEditable({editable: false, id: category.id}));
        dispatch(editCategory({categoryTitle, id: category.id}));
    }, [category.id, categoryTitle, dispatch])

    const saveInputData = useCallback((e) => {
        setInputData(() => e.target.value);
    }, [])

    const toggleSubcategory = useCallback(() => {
        dispatch(setCategoryExpanded({categoryExpanded: !category.expanded, id: category.id}))
    }, [category, dispatch]);

    const subcategory = useMemo(() => {
        return category.categories.length > 0;
    }, [category.categories])

    const hideClassButton = ClassName({
        "btn": true,
        "btn-light": true,
        "btn-hide": true
    });

    const changeCategory = useCallback(() => {
        dispatch(setTodoCategory({todoCategoryId: category.id}))
    }, [category.id, dispatch]);

    const showSubcategories = useMemo(() => {
        return subcategory ?
            <Button handler={toggleSubcategory} btnClass={hideClassButton} btnType={"button"}
                    disabled={false} ariaLabelText={"Show all subcategories button"}
                    tooltipText={"Show all subcategories"}><ArrowDownSquare/></Button> : null
    }, [hideClassButton, subcategory, toggleSubcategory])

    return (
        <li className={cx({category: true, openCategory: isActive})} onClick={handleCategoryClick}>
            <div className={cx("category__main")}>
                {showSubcategories}
                <CategoryEdit saveCategory={saveCategory} categoryTitle={category.title} editable={category.editable}
                              saveInputData={saveInputData} inputData={inputData}/>
            </div>
            <CategoryButtons createCategory={createCategory} changeCategory={changeCategory}
                             deleteCategoryBtn={deleteCategoryBtn} editCategories={editCategories}
                             currentTodo={currentTodo}/>
        </li>
    )
}