import React, {useCallback, useMemo} from "react";
import {TodoItem} from "../todo-item";
import {Item} from "../todo-item/Todo-item.interface";
import {useDispatch, useSelector} from "react-redux";
import {checkProgress, markAsDone} from "../../../state/Action";
import {getFilterIsDone, getSearchValue, getTodo} from "../../../state/Selector";
import './task-list.scss';

const TaskList = ({categoryId}: any) => {
    const dispatch = useDispatch();
    const searchValue = useSelector(getSearchValue);
    const showDoneItems = useSelector(getFilterIsDone);
    const todos = useSelector(getTodo(categoryId))

    const markChanges = useCallback((item: Item) => {
        dispatch(markAsDone({item, id: categoryId}));
        dispatch(checkProgress());
    }, [categoryId, dispatch]);

    const taskList = useMemo(() => {
            return todos.filter((e) => e.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1).filter((e) => e.isChecked === showDoneItems).map((elem) => {
                return <TodoItem item={elem}
                                 key={elem.id}
                                 handleCheckBox={markChanges}
                                 labelName={''}/>
            })
        }
        , [searchValue, markChanges, showDoneItems, todos]);

    return (<div className="task__list">
            {taskList || null}
        </div>
    )
}
export const MemoizedTaskList = React.memo(TaskList);
