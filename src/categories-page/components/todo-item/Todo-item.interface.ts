export interface TodoItemProps {
    item: Item;
    handleCheckBox: any;
    labelName: string;
}

export interface Item {
    id: string;
    name: string;
    isChecked?: boolean;
    description?: string;
    editable?: false;
}