import { SetStateAction, useState , useRef } from "react";
import styled from './DetailModal.module.scss';
import PriceInput from "./PriceInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setDetail, setLocation, setMaxPrice, setMinPrice } from "store/calendarSlice";

interface DetailModalProps {
    visible : Boolean;
    setVisible : React.Dispatch<SetStateAction<Boolean>>;    
}
const DetailModal:React.FC<DetailModalProps> = (props) => {
    const {visible, setVisible} = props;
    const maxPrice = useSelector((state:RootState)=> state.calendar.maxPrice);
    const minPrice = useSelector((state:RootState)=> state.calendar.minPrice);
    const location = useSelector((state:RootState)=> state.calendar.location);
    const dispatch = useDispatch();

    const changeLocation = (event : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLocation(event.target.value));
    }

    const onClickCancle = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setLocation(""));
        dispatch(setMinPrice(0));
        dispatch(setMaxPrice(0));
        dispatch(setDetail(false));
        setVisible(!visible);
    }
    const onClickOk = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setDetail(true));
        setVisible(!visible);
    }


    /*
    const [click , setClick] = useState<boolean>(false);
    const [width , setWidth] = useState<string>("");
    const minRef =  useRef<HTMLDivElement>(null);
    
    const slidePrice = (e:React.MouseEvent<HTMLDivElement>) => {
        if(click){
            console.log(e);
            if(minRef.current !== null){
                minRef.current.style.left = `${(e.pageX + e.movementX) / 1191 *100}%`;  
                dispatch(setMinPrice( Math.floor(Number(`${(e.pageX + e.movementX) /1191 * 500000 }`))));
            }
        }   
    }
 
    const mouseDown = (e:React.MouseEvent<HTMLButtonElement>) => {
        setClick(true)
    }

    const mouseUP  = (e:React.MouseEvent<HTMLButtonElement>) => {
        setClick(false)
    }
    const mousedivUP  = (e:React.MouseEvent<HTMLDivElement>) => {
        setClick(false)
    }
    <div className = {styled.priceBar} onMouseMove={slidePrice} onMouseLeave={mousedivUP}>
                    <div className={styled.left} ref = {minRef}>
                        <button  onMouseDown={mouseDown} onMouseUp={mouseUP}  className={styled.priceCircle} role="slider" aria-label="min" value = {minPrice}/>
                    </div>
                    <div className={styled.right}>
                        <button className={styled.priceCircle}/> 
                    </div>
                </div>
*/

    return (
        <section className = {styled.DetailModalContainer}>
            <button className={styled.xButton} onClick = {onClickCancle}>x</button>
            <h5>가격</h5>
            <div className={styled.priceWrap}>
                    <PriceInput id = 'min' name = "최저" placeholder="0" value = {minPrice} setValue={setMinPrice}/> <p>~</p> <PriceInput id = "max" name = "최고" placeholder="0" value = {maxPrice} setValue={setMaxPrice}/>
            </div>               
            <h5>지역</h5>
            <div className = {styled.locationWrap}>
                <input type = "radio" name = "locationRadio" value = "서울" onChange={changeLocation}/>서울
                <input type = "radio" name = "locationRadio" value = "지방" onChange = {changeLocation}/>지방
                <input type = "radio" name = "locationRadio" value = "" onChange={changeLocation}/>모두
            </div>
            <button className={styled.okButton} onClick = {onClickOk}> 적용 </button>
            <button className={styled.cancleButton} onClick = {onClickCancle}> 취소 </button>
        </section>
    )

}

export default DetailModal