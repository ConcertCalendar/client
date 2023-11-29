import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

const ViewCategory = () => {
//    const viewValue = useSelector((state:RootState)=> state.calendar.viewCategory);
    const dispatch = useDispatch();
    
    const selectView = (event :React.ChangeEvent<HTMLSelectElement>) => {
  //      dispatch(setViewCategory(event.target.value));
    }
    return (
        <div>
           <select id = "calendarCategory" onChange={selectView}>
                    <option value = "1" >month</option>
                    <option value = "2">year</option>
            </select>
        </div>
    )
}

export default ViewCategory;