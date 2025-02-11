import React from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/arrow.svg";

const Button_return = () => {
    const navigate = useNavigate();

    return(
            <button
                type="button"
                onClick={() => {navigate('/list')}}
            >
                <img src={arrowIcon} alt="return" />
            </button>
    )
}
export default Button_return;


