import { useState } from 'react';
import styled from './PriceInput.module.scss';
interface PriceInputProps {
    placeholder : string;
    name : string;
}

const PriceInput:React.FC<PriceInputProps> = (props) => {
    const {placeholder, name} = props;
    const [price ,setPrice] = useState<string>('');

    const changeHandler  = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.validity.valid){
            setPrice(event.target.value);
        }
    }
    return (
        <div className={styled.priceInputWrap}>
            <p className={styled.priceName}>{name}</p>
            <input  onChange = {changeHandler.bind(this)} pattern = '[0-9]*' placeholder={placeholder} value = {price} name = {name} type = "text" className={styled.priceInput}/>
        </div>
    )
    
} 

export default PriceInput;