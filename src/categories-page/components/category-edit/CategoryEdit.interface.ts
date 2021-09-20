import React from "react";

export interface CategoryEditProps {
    editable: boolean | undefined;
    saveCategory: (e: InputEvent) => void;
    saveInputData: (e: React.SyntheticEvent) => void;
    inputData: string;
    categoryTitle: string;
}