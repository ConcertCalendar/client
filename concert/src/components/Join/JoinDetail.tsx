import { useDispatch, useSelector } from 'react-redux';
import styled from './JoinDetail.module.scss';
import { useState } from 'react';
import { setNickname, setPhase ,setName ,setBirth, setGender, setInit} from 'store/joinSlice';
import { RootState } from 'store/store';
import { axiosInstance } from 'utils/customAxios';


const GENDER_MALE = '1';
const GENDER_FEMALE = '2';
const BASE_URL = 'https://dev.pushpin.co.kr'
const SUB_URL = '/users/join';

interface JoinDetailProps {
    childern ?: React.ReactNode;
}

const JoinDetail:React.FC<JoinDetailProps> = (props) => {
    const dispatch = useDispatch();
    const email = useSelector((state:RootState) => state.join.email);
    const password = useSelector((state:RootState)=> state.join.password);
    const nickname = useSelector((state:RootState)=> state.join.nickname);
    const name = useSelector((state:RootState)=> state.join.name);
    const birth = useSelector((state:RootState) => state.join.birth);
    const gender = useSelector((state:RootState)=> state.join.gender);
    const [checkedMale, setCheckedMale] = useState<boolean>(true);
    const [year , setYear] = useState<string>("");
    const [month , setMonth] = useState<string>("");
    const [day , setDay] = useState<string>("");
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(true); //다음 버튼 활성화 여부
    const [slide , setSlide] = useState<boolean>(false);
    const joinBody = {
        "userEmail" : email,
        "password" : password,
        "userNickname" : nickname,
        "name" : name,
        "userBirth" : birth,
        "userGender" : gender,
        "userPhone" : '010-0000-0000'
    };

    const validateNickName = () => {
        if(nickname.length > 0){
            return false
        } 
        return true
    } 

    const validateName = () => {
        if(name.length > 0 ){
            return false
        }
        return true;
    } 

    const validateBirth = () => {
        const birthValue = `${year}-${month}-${day}`;
        if(birthValue.length == 10){
            dispatch(setBirth(birthValue));
            return false
        }
        return true;
    }

    const validateGender = () => {
        if((checkedMale === true && gender === GENDER_MALE)||(checkedMale === false && gender == GENDER_FEMALE)){
            return true
        }
        return false
    }

    const validation = () => {
        if(validateNickName()){ //닉네임의 형식이 맞지 않으면
            alert('닉네임을 확인해주세요')
            return false;
        }
        
        if(validateName()){
            alert('이름을 확인해주세요.')
            return false;
        }

        if(validateBirth()){
            alert('생일을 확인해주세요.')
            return false;
        }
        if(!validateGender()){
            alert('성별을 확인해주세요');
            return false
        }

        return true;
    }

    async function requestJoin() {//회원가입 API요청 
        await axiosInstance.post(SUB_URL, JSON.stringify(joinBody)).then((res)=> {
            setSlide(true)
            setTimeout(()=> dispatch(setPhase('3')), 500);
            setInit();
        }).catch(()=> alert('다시 시도해주세요'));
    }


    const handleNext = () => {
        if(validation()){ //모든 값이 맞으면
            requestJoin();
            //setSlide(true); // 다음페이지로 이동
            //setTimeout(()=>dispatch(setPhase('3')), 500);
        }
    }

    const onChangeNickname = (event:React.ChangeEvent<HTMLInputElement>)=> {
        dispatch(setNickname(event.target.value));
    }
  
    const onChangename = (event:React.ChangeEvent<HTMLInputElement>)=> {
        dispatch(setName(event.target.value));
    }

    const checkNumber = (key : string) => { //입력이 숫자인지 체크
        const regex = new RegExp('[^0-9]');
        if(!regex.exec(key)){//숫자면 null 반환
            return true; //숫자면 true
        }
        return false;
    }

    const onChangeYear = (event : React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value.slice(-1);
        if(checkNumber(key))
            setYear(event.target.value)
    }

    const onChangeMonth = (event : React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value.slice(-1);
        if(checkNumber(key))
            setMonth(event.target.value)
    }

    const onChangeDay = (event : React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value.slice(-1);
        if(checkNumber(key))
            setDay(event.target.value)
    }

    const onClickGender = (event :React.MouseEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        dispatch(setGender(value))
        if(value === GENDER_MALE){
            setCheckedMale(true);
            return;
        }
        setCheckedMale(false);
    }


    return (
        <section className = {slide ? styled.section_join_detail_slide : styled.section_join_detail} >
            <div className = {styled.div_join}>
                <label className = {styled.join_label} htmlFor ="nickname"> 닉네임
                <input
                    id = "nickname"
                    type = "text" 
                    placeholder ='닉네임'
                    className = {styled.input_join}
                    value = {nickname}
                    onChange = {onChangeNickname} 
                    autoComplete = "off"
                    />
                </label>
            </div>
            <div className = {styled.div_join}>
                <label className = {styled.join_label} htmlFor = "name"> 이름
                    <input
                        id = "name"
                        type = "text" 
                        placeholder ='이름'
                        className = {styled.input_join} 
                        value = {name}
                        onChange = {onChangename} 
                        autoComplete = "off"
                    />  
                </label>
            </div>
            <div className = {styled.div_join}>
                <label htmlFor="year" className = {styled.join_label}> 생년월일</label>
                <div className = {styled.flex_row}>  
                    <input
                        id = "year"
                        type = "text"
                        placeholder='YYYY'
                        className = {`${styled.input_join} ${styled.year}`}
                        maxLength={4}
                        value={year}
                        autoComplete='off'
                        onChange = {onChangeYear} 
                    />
                    <input
                        id = "month"
                        type = "text" 
                        placeholder ='MM'
                        value = {month}
                        maxLength={2}
                        onChange= {onChangeMonth}
                        className = {`${styled.input_join} ${styled.month}`} 
                        autoComplete = "off"
                    />
                    <input
                        id = "day"
                        type = "text" 
                        placeholder ='DD'
                        value={day}
                        className = {`${styled.input_join} ${styled.day}`}
                        autoComplete = "off"
                        onChange = {onChangeDay}
                    />
                </div>
            </div>
            <div className = {styled.div_join}> 
                <label className = {styled.join_label} htmlFor='userSex'> 성별</label>
                <div className = {styled.flex_row}> 
                    <div className = {styled.div_join_gender}>
                        <input 
                          className = {`${styled.input_join} ${styled.input_gender}`}
                          id ="male"
                          type="radio" 
                          name="userSex" 
                          value={GENDER_MALE}
                          onClick={onClickGender} 
                         />   
                        <label htmlFor = "male" className = {`${styled.join_label} ${styled.label_gender}`}>남성</label>
                    </div>
                    <div className = {styled.div_join_gender}>
                        <input
                          className = {`${styled.input_join} ${styled.input_gender}`} 
                          id = 'female' 
                          type="radio" 
                          name="userSex" 
                          value={GENDER_FEMALE}
                          onClick={onClickGender}
                            />
                        <label htmlFor = "female" className = {`${styled.join_label} ${styled.label_gender}`}>여성</label> 
                    </div>
                </div>
            </div>
            <button 
            className = {checkNextBtn ? styled.btn_join : styled.btn_join_disabled}
            disabled = {!checkNextBtn}
            onClick ={handleNext}
            type='button'>
            다음
            </button>  
        </section>
    )

}

export default JoinDetail;