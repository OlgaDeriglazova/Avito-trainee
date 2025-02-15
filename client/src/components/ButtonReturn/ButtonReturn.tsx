import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/arrow.svg";
import styles from "./ButtonReturn.module.scss";

const ButtonReturn = () => {
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

export default ButtonReturn;


