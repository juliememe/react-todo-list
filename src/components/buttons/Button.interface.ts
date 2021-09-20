import React from "react";

export interface ButtonProps {
    handler: any;
    btnClass: string;
    btnType: "button" | "submit" | "reset";
    children: React.ReactChild;
    disabled: boolean;
    ariaLabelText: string;
    tooltipText: string;
}