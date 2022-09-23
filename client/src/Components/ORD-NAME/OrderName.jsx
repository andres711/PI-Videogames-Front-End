import {useDispatch} from "react-redux";
import {orderName, setPage} from "../../redux/actions.js";
import "./ON.css";

function OrderName() {
    const dispatch = useDispatch();
    
    const sortNameHandleChange = (e) => {
        dispatch(orderName(e.target.value));
        dispatch(setPage(1));
      };
    return (
        <div>
            <select
              onChange={(e) => sortNameHandleChange(e)}
              className="selectors"
              defaultValue="ord"
            >
              <option disabled value="ord">
                Orden alfabetico
              </option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
        </div>
      );
}

export default OrderName;