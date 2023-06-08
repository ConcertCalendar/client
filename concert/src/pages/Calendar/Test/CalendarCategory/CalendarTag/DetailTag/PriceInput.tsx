import { useState } from 'react';
import styled from './PriceInput.module.scss';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
interface PriceInputProps {
    placeholder : string;
    name : string;
    value : number;
    setValue : ActionCreatorWithPayload<number>;
}

const PriceInput:React.FC<PriceInputProps> = (props) => {
    const {placeholder, name , value, setValue} = props;
    const dispatch = useDispatch();

    const changeHandler  = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.validity.valid){
            dispatch(setValue(Number(event.target.value)));
        }
    }

    return (
        <div className={styled.priceInputWrap}>
            <p className={styled.priceName}>{name}</p>
            <input  onChange = {changeHandler.bind(this)} pattern = '[0-9]*' placeholder={placeholder} value = {value} name = {name} type = "text" className={styled.priceInput}/>
        </div>
    )
    
} 

export default PriceInput;