import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from './todo-edit.scss';
import ClassName from "classnames/bind";
import {Button, Checkbox} from "../../../components";
import {Item} from "../todo-item/Todo-item.interface";
import {checkProgress, editTodoItem, markAsDone, saveCurrentId, setCurrentTodo} from "../../../state/Action";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryId, getTodoCategory} from "../../../state/Selector";
import {useHistory} from "react-router-dom";

const cx = ClassName.bind(styles);

export const TodoEdit = ({item}: { item: Item }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentId = useSelector(getCategoryId);
    const categoryId = useSelector(getTodoCategory);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [todoName, setTodoName] = useState(item.name);
    const [todoDescription, setTodoDescription] = useState(item.description);
    const [checkItem, setCheckItem] = useState(item.isChecked);

    const changeName = useCallback((e) => {
        setTodoName(e.target.value);
    }, []);

    useEffect(() => {
        nameInputRef && nameInputRef.current && nameInputRef.current.focus();
    }, [nameInputRef]);

    const handlerCheckbox = useCallback((e) => {
        const mark = e.target.checked
        setCheckItem(mark);
        const checkedItem = {
            ...item,
            isChecked: mark
        }
        dispatch(setCurrentTodo({item: checkedItem, categoryId: currentId}))
        dispatch(markAsDone({item: checkedItem, id: currentId}));
        dispatch(checkProgress());
    }, [item, currentId, dispatch]);

    const handleCancel = useCallback(() => {
        dispatch(setCurrentTodo({item: null, categoryId: currentId}))
        history.push(`/categories/${currentId}`)
    }, [currentId, dispatch, history]);

    const saveTodoItem = useCallback(() => {
        const editedTodoItem = {
            ...item,
            name: todoName.trim(),
            isChecked: checkItem,
            description: todoDescription?.trim()
        }
        dispatch(editTodoItem({
            parentId: currentId,
            item: editedTodoItem,
            itemId: editedTodoItem.id,
            newCategoryId: categoryId ? categoryId : currentId
        }));
        dispatch(setCurrentTodo({item: null, categoryId: categoryId}))
        dispatch(saveCurrentId({id: categoryId || currentId}));
        dispatch(checkProgress());
        history.push(`/categories/${currentId}`)
    }, [todoDescription, todoName, checkItem, categoryId, currentId, dispatch, history, item]);

    const saveInputData = useCallback((e) => {
        setTodoDescription(e.target.value);
    }, []);

    return (
        <div className={cx("todo__container")}>
            <div className={cx('todo__btns')}>
                <Button handler={saveTodoItem} btnClass={cx("btn", "btn-light", "edit-btn")} btnType={'submit'}
                        disabled={false} tooltipText={"Save current todo"}
                        ariaLabelText={"Save current todo item button"}><span>Save changes</span></Button>
                <Button handler={handleCancel} btnClass={cx("btn", "btn-light", "cancel-btn")} btnType={'button'}
                        disabled={false} tooltipText={"Cancel edit mode"}
                        ariaLabelText={"Cancel edit mode button"}><span>Cancel</span></Button>
            </div>
            <input type="text" value={todoName} ref={nameInputRef} onChange={changeName}
                   className={cx('form-control', 'todo__title')}/>
            <Checkbox check={Boolean(item.isChecked)} handleCheckBox={handlerCheckbox} labelName={'Done'}
                      labelElement={"todo-edit"} labelId={"todo-edit"}/>
            <div className={cx("todo__description")}>
                <textarea value={todoDescription} onChange={saveInputData}/>
            </div>
        </div>
    )
}