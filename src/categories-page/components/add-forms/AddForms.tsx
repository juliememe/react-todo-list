import React, {useCallback, useMemo} from "react";
import {InputField} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {
    addCategory,
    addTodoItem,
    checkProgress
} from "../../../state/Action";
import {Item} from "../todo-item/Todo-item.interface";
import {getCategoryId, getItemName} from "../../../state/Selector";
import {v4 as uuidv4} from "uuid";

export const AddForms = () => {
    const currentId = useSelector(getCategoryId);
    const dispatch = useDispatch();
    const currentTodoName = useSelector(getItemName);

    const addCategories = useCallback((title: string) => {
        if (!title.trim()) {
            return null;
        } else {
            let newCategory: any = {
                id: uuidv4(),
                title: title,
                items: [],
                categories: [],
                parentId: null
            }
            let key = newCategory.id;
            dispatch(addCategory({newCategory, key}));
        }
    }, [dispatch]);

    const isDisabled = useMemo(() => {
        return !currentId || !!currentTodoName;
    }, [currentId, currentTodoName]);

    const addTodoItems = useCallback((name: string) => {
        if (!name.trim()) {
            return;
        } else {
            const newTodoItem: Item = {
                id: uuidv4(),
                name: name,
                isChecked: false,
            }
            dispatch(addTodoItem({newTodoItem}));
            dispatch(checkProgress());
        }

    }, [dispatch])

    return (
        <div className="form__edit">
            <InputField value={''} placeholderValue={'Enter category title'} tooltipText={"Add new category"}
                        inputName={"categoryTitleInput"} ariaLabelText={"Add new category button"}
                        className={'form-control'} handleOnSubmit={addCategories} disabled={false}/>
            <InputField value={''} placeholderValue={'Enter todo title'} ariaLabelText={"Add new todo title button"}
                        tooltipText={"Add new todo title"} inputName={"todoTitleInput"}
                        className={'form-control'} handleOnSubmit={addTodoItems} disabled={isDisabled}/>
        </div>
    )
}