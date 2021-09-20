import React from "react";

export interface CheckboxInterface {
    check: boolean;
    handleCheckBox: React.ChangeEventHandler<HTMLInputElement>;
    labelName: string;
    labelElement: string;
    labelId: string;

}