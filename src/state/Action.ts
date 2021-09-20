import {CategoryInterface} from "../categories-page/components/category/Category.interface";
import {Item} from "../categories-page/components/todo-item/Todo-item.interface";
import {ACTIONS} from "./ActionTypes";

export const addCategory = (payload: { newCategory: CategoryInterface, key: string }) => ({ //DONE
    type: ACTIONS.ADD_CATEGORY, payload
})

export const addCategoryToCategory = (payload: { newCategory: CategoryInterface, key: string | number }) => ({
    type: ACTIONS.ADD_CATEGORY_INTO_CATEGORY, payload
});

export const editCategory = (payload: { categoryTitle: string, id: string | number }) => ({
    type: ACTIONS.EDIT_CATEGORY, payload
});

export const deleteCategory = (payload: { id: string | number }) => ({
    type: ACTIONS.DELETE_CATEGORY, payload
});

export const addTodoItem = (payload: { newTodoItem: Item }) => ({
    type: ACTIONS.ADD_TODO_ITEM, payload
});

export const editTodoItem = (payload: { parentId: string | number, item: Item, itemId: string | number, newCategoryId: string | number }) => ({
    type: ACTIONS.EDIT_TODO_ITEM, payload
});

export const markAsDone = (payload: { item: Item, id: string | number }) => ({
    type: ACTIONS.MARK_AS_DONE_ITEM, payload
});

export const saveCurrentId = (payload: { id: string | number }) => ({
    type: ACTIONS.SAVE_CURRENT_ID, payload
})

export const checkProgress = () => ({
    type: ACTIONS.CHECK_PROGRESS
})

export const setCategoryEditable = (payload: { editable: boolean, id: string | number }) => ({
    type: ACTIONS.SET_CATEGORY_EDITABLE, payload
})

export const setTodoItemsDoneFilter = (payload: { itemsIsDone: boolean }) => ({
    type: ACTIONS.SET_FILTER_TODO_ITEMS, payload
})

export const setCategoryExpanded = (payload: { categoryExpanded: boolean, id: string | number }) => ({
    type: ACTIONS.SET_CATEGORY_EXPANDED, payload
})

export const setSearchFilter = (payload: { searchValue: string }) => ({
    type: ACTIONS.SET_SEARCH_FILTER, payload
})

export const setCurrentTodo = (payload: { item: Item | null, categoryId: string | number }) => ({
    type: ACTIONS.SET_CURRENT_TODO_ITEM, payload
})

export const setTodoCategory = (payload: { todoCategoryId: string | number }) => ({
    type: ACTIONS.SET_TODO_CATEGORY, payload
})