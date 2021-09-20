import React, {useCallback} from "react";
import {Button, Checkbox} from "../../../components";
import {PencilSquare} from "react-bootstrap-icons";
import {TodoItemProps} from "./Todo-item.interface";
import styles from './todo-item.scss';
import ClassName from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTodo} from "../../../state/Action";
import {getCategoryId} from "../../../state/Selector";
import {useHistory} from "react-router-dom";

const cx = ClassName.bind(styles);

export const TodoItem = ({handleCheckBox, labelName, item}: TodoItemProps) => {
    const history = useHistory();
    const currentId = useSelector(getCategoryId);
    const dispatch = useDispatch();
    const handler = useCallback((e) => {
        const mark = e.target.checked
        return handleCheckBox({...item, isChecked: mark});
    }, [item, handleCheckBox])

    const setTodoId = useCallback(() => {
        dispatch(setCurrentTodo({item, categoryId: currentId}));
        history.push(`/categories/${currentId}/todo/${item.id}`);
    }, [currentId, item, dispatch, history])

    return (
        <div className={cx("todo-item")} id={item.id}>
            <div className={cx("todo-item__container")}>
                <Checkbox check={Boolean(item.isChecked)} handleCheckBox={handler} labelName={labelName}
                          labelElement={"todo-item"} labelId={'todo-item'}/>
                <span className={cx({"todo-item__done": item.isChecked})}>{item.name}</span>
            </div>
            <div className={cx("side__btns")}>
                <Button handler={setTodoId} btnClass={cx('btn', 'btn-light', 'btn-item')}
                        btnType={"button"}
                        disabled={false} ariaLabelText={"Edit todo button"}
                        tooltipText={"Edit todo"}><PencilSquare/></Button>
            </div>
        </div>)
}