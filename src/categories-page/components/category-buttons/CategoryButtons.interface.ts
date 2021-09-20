import {Item} from "../todo-item/Todo-item.interface";

export interface CategoryButtonsProps {
    editCategories: () => void;
    deleteCategoryBtn: () => void;
    createCategory: () => void;
    changeCategory: () => void;
    currentTodo: Item | null;
}