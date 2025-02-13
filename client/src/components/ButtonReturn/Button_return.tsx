import React from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/arrow.svg";
import styles from "./Button_return.module.scss";

const Button_return = () => {
    const navigate = useNavigate();
    return(
            <button
                type="button"
                onClick={() => {navigate('/list')}}
                className={styles.Button_return}
            >
                <img src={arrowIcon} alt="return" />
            </button>
    )
}
export default Button_return;


