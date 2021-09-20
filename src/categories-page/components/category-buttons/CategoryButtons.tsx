import React from "react";
import {Button} from "../../../components";
import {BoxArrowInDownLeft, PencilSquare, Plus, Trash} from "react-bootstrap-icons";
import styles from './category-buttons.scss';
import ClassName from "classnames/bind";
import {CategoryButtonsProps} from "./CategoryButtons.interface";

const cx = ClassName.bind(styles);

const CategoryButtonsTemplate = ({editCategories, deleteCategoryBtn, createCategory, changeCategory, currentTodo}: CategoryButtonsProps) => {

    return(currentTodo ?
        <div className="side__btns">
            <Button handler={changeCategory} btnClass={cx("btn", "btn-light", "category__btn")}
                    btnType={"button"}
                    disabled={false}
                    ariaLabelText={"Move current todo into this category"}
                    tooltipText={"Move todo into this category"}><BoxArrowInDownLeft/></Button>
        </div> :
        <div className="side__btns">
            <Button handler={editCategories} btnClass={cx("btn", "btn-light", "category__btn")}
                    btnType={"button"} disabled={false} ariaLabelText={"Edit category title button"}
                    tooltipText={"Edit category"}><PencilSquare/></Button>
            <Button handler={deleteCategoryBtn} btnClass={cx("btn", "btn-light", "category__btn")}
                    btnType={"button"} disabled={false} tooltipText={"Delete category"}
                    ariaLabelText={"Delete category button"}><Trash/></Button>
            <Button handler={createCategory} btnClass={cx("btn", "btn-light", "category__btn")}
                    btnType={"button"} disabled={false} ariaLabelText={"Create subcategory button"}
                    tooltipText={"Create subcategory"}><Plus/></Button>
        </div>)
}

export const CategoryButtons = React.memo(CategoryButtonsTemplate);