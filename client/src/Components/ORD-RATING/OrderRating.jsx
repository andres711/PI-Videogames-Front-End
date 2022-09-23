import {useDispatch} from "react-redux";
import {orderRating, setPage} from "../../redux/actions.js";
import "./OR.css";

function OrderRating() {
  const dispatch = useDispatch();

    const sortRatingHandleChange = (e) => {
        dispatch(orderRating(e.target.value));
        dispatch(setPage(1));
      };
    
    return (
        <div>
           <select
              className="selectors"
              onChange={(e) => sortRatingHandleChange(e)}
              defaultValue="all"
            >
              <option disabled value="all">
                Rating
              </option>
              <option value="mejor">+ to -</option>
              <option value="peor">- to +</option>
            </select>
        </div>
      );
}

export default OrderRating;