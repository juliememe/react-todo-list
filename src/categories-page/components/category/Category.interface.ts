import {Item} from "../todo-item/Todo-item.interface";

export interface CategoryProps {
    setCategoryId: (id: string | number) => void;
    category: CategoryInterface;
}

export interface CategoryInterface {
    title: string;
    id: number | string,
    categories: Array<string | number>;
    items: Item[];
    parentId: string | null | number;
    editable?: boolean;
    expanded?: boolean;
}