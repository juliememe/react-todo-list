import React from "react";
import {ProgressBarInterface} from "./Progress-bar.interface";
import styles from './progress.scss';
import ClassName from "classnames/bind";

const cx = ClassName.bind(styles);

export const ProgressBar = ({progress}: ProgressBarInterface) => {
    return <div className="progress">
        <div className={cx("progress-bar", "progress-bar-striped")} role="progressbar" aria-valuenow={progress}
             aria-valuemin={0} aria-valuemax={100} style={{width: `${progress}%`}}
             aria-label="Progress bar of all done categories"/>
    </div>
}