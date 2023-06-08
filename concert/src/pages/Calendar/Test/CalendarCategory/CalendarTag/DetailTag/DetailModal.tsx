import { SetStateAction, useState } from "react";
import styled from './DetailModal.module.scss';
import PriceInput from "./PriceInput";

interface DetailModalProps {
    visible : Boolean;
    setVisible : React.Dispatch<SetStateAction<Boolean>>;    
}
const DetailModal:React.FC<DetailModalProps> = (props) => {
    const {visible, setVisible} = props;
    const [maxPrice , setMaxPrice] = useState<number>(0);
    const [minPirce , setMinPrice] = useState<number>(0);
    
    return (
        <section className = {styled.DetailModalContainer}>
            <h5>가격</h5>
            <div className={styled.priceWrap}>
                <PriceInput name = "최저" placeholder="0"/> <p>~</p> <PriceInput name = "최고" placeholder="0"/>
            </div>               
            <h5>지역</h5>
            <input type = "radio" name = "locationRadio" value = "서울"/>서울
            <input type = "radio" name = "locationRadio" value = "지방"/>지방
        </section>
    )

}

export default DetailModal