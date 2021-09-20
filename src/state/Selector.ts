import {createSelector, createSelectorCreator, defaultMemoize} from "reselect";
import {RootState} from "./Reducer";
import {isEqual} from 'lodash';

const _getData = (state: RootState) => state;
const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
)

const _getTodoData = (id: string) => (state: RootState) => {
    return state.todo.categories[id] ? state.todo.categories[id].items : [];
};
const _getCategoryId = (state: RootState) => state.todo.currentCategory;

const _getFilterIsDone = (state: RootState) => state.todo.filterItemsIsDone;

const _getCurrentProgress = (state: RootState) => state.todo.currentProgress;

const _getCurrentTodo = (state: RootState) => state.todo.currentTodo.item;
const _getSearchValue = (state: RootState) => state.todo.filterItemsValue;

const _getCurrentTodoCategory = (state: RootState)=> state.todo.currentTodoCategory;
const _getCurrentTodoName = (state: RootState)=> state.todo.currentTodo.item?.name;


export const getData = createSelector(_getData, state => state.todo.categories);
export const getTodo = createSelector(_getTodoData, state => state);
export const getCategoryId = createSelector(_getCategoryId, state => state);
export const getCurrentProgress = createSelector(_getCurrentProgress, state => state);
export const getFilterIsDone = createSelector(_getFilterIsDone, state => state);
export const getCurrentTodo = createSelector(_getCurrentTodo, state => state);
export const getTodoCategory= createSelector(_getCurrentTodoCategory, state=> state);
export const getItemName = createSelector(_getCurrentTodoName, state=>state);

export const getSearchValue = createDeepEqualSelector(_getSearchValue, state => state);