import { type } from '@testing-library/user-event/dist/type';
import { useCallback, useState } from 'react';
import './Join.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Join() {
    const [email, setEmail] = useState(""); //이메일 input value 값을 저장할 state
    const [password , setPassword] = useState(""); //비밀번호 input value 값을 저장할 state
    const [checkPassword, setCheckPassword] = useState(""); //비밀번호 확인 input value 값을 저장할 state
    const [nickname , setNickname] = useState(""); //닉네임 input value 값을 저장할 state
    const [name , setName] = useState(""); //이름 input value 값을 저장할 state
    const [birth , setBirth] = useState(""); //생년월일 input value 값을 저장할 state
    const [gender , setGender] = useState(""); //성별 input value 값을 저장할 state
    const [matchEmail, setMatchEmail] = useState(true); //이메일 input이 이메일 형식에 맞는지
    const [matchPassword, setMatchPassword]  = useState(true); //비밀번호가 비밀번호 형식에 맞는지
    const [samePassword, setSamePassword] = useState(true); //비밀번호와 비밀번호 확인 값이 같은지
    const [numberKeyPress , setNumberKeyPress] = useState(false); //키보드  숫자 자판 눌렀을 
    const navigate = useNavigate();

    const data = JSON.stringify(
        {
        "userEmail": email,
        "password": password,
        "userNickname": nickname,
        "name": name,
        "userBirth": `${birth.slice(0,4)}-${birth.slice(4,6)}-${birth.slice(6,8)}`
    })

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onChangeCheckPassword = (event) => {
        setCheckPassword(event.target.value);
    }

    const onChangeNickname = (event) => {
        setNickname(event.target.value);
    }
    
    const onChangeName = (event) => {
        setName(event.target.value);
    }

    
    const onNumberKeyDown = (event) => { //숫자키패드 눌렀을 때 keydown 이벤트가 chagne 이벤트보다 빨리 일어나는 것을 이용함
        if((!isNaN(event.key) && event.key !== " ") || event.key ==="Backspace") 
            setNumberKeyPress(true);
        else
            setNumberKeyPress(false);
    }


   
    const onChangeBirth = (event) => {
        if(numberKeyPress === true && event.target.value.length <= 8)
            setBirth(event.target.value);
    } 

    const onChangeGender = (event) => {
        setGender(event.target.value);
    }



    const checkMatchEmail = () => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if (regex.test(email)){
            setMatchEmail(true);
        }
        else{
            setMatchEmail(false);
        }
    }

    const checkMatchPassword = () => {
        const regex = /([A-Z]+[a-z]+[0-9]+[!@#]+)+/
        if (regex.test(password) && 12 <= password.length && password.length <= 15){
            setMatchPassword(true);
        }
        else{
            setMatchPassword(false);
        }
    }

    const checkSamePassword = () => {
        if (password === checkPassword)
            setSamePassword(true);
        else
            setSamePassword(false);
    }

    const checkNickname = (e) => { //db check 필요
        e.preventDefault();
    }

  

    const submitJoin = (e) =>{
        e.preventDefault();
        console.log(data)
        if(email ===  "") { //이메일이 공백이면
            alert("이메일을 입력하세요.");
        }
        else if(matchEmail === false){ //이메일이 형식에 맞지 않으면
            alert("이메일을 확인해주세요.")
        }
        else if(password === ""){
            alert("비밀번호를 입력하세요.")
        }
        else if(matchPassword === false){
            alert("비밀번호를 확인해주세요.")
        }
        else if(checkPassword === ""){
            alert("비밀번호 확인을 입력해주세요.")
        }
        else if (samePassword === false){
            alert("비밀번호가 일치하지 않습니다.")
        }
        else if(nickname === ""){
            alert("닉네임을 입력해주세요.")
        }
        else if(name === ""){
            alert("이름을 입력해주세요.")
        }

        else if(birth === "" || birth.length !== 8){
            alert("생년월일 입력해주세요")
        }
        else if(gender === ""){
            alert("성별을 입력해주세요")
        }
        else{
            console.log("api연결")
            axios.post("https://concal.p-e.kr/users/join",
                data
             , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{
                console.log(res)
                navigate('/');
                })
            .catch((err)=>
                console.log(err)
            )
        }
        console.log(e);
    }
   

    return (
        <div className="joinWrap">
          <form id  = "joinForm">
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "emailInput">이메일</label>
                <br/>
                <input 
                 type = "email"
                 id = "emailInput"
                 onChange={onChangeEmail}
                 onBlur = {checkMatchEmail} 
                 placeholder={"이메일을 입력해주세요"}
                >
                </input>
                <button className = {"checkBtn"} type = "submit" onClick = {checkNickname}>중복 확인</button>
                <div className = {matchEmail ? "hidden" : "errMsg"}>이메일을 확인해주세요</div>
            </div>
            <div className = "joinInput">   
                <em>* </em>
                <label htmlFor = "passwordInput">비밀번호</label>
                <input
                 type = "password"
                 id = "passwordInput"
                 maxLength={15}
                 onChange={onChangePassword}
                 onBlur = {checkMatchPassword}
                 placeholder={"비밀번호"}
                ></input> 
                <div className = {matchPassword ? "hidden" : "errMsg"}>비밀번호는 대/소문자 숫자 특수문자(!,@,#)을 포함하여 12자이상 15자 이내로 설정해주세요.</div>
            </div>
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "passwordCheckInput">비밀번호 확인</label>
                <input
                 type = "password"
                 id = "passwordCheckInput"
                 onChange={onChangeCheckPassword}
                 onBlur = {checkSamePassword}
                 placeholder ={"비밀번호 확인"}></input>
                <div className = {samePassword ? "hidden" : "errMsg"}>비밀번호가 일치하지 않습니다.</div>
            </div>
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "nicknameInput">닉네임</label>
                <br/>
                <input
                 type = "text"
                 id = "nicknameInput"
                 onChange={onChangeNickname}
                 placeholder={"닉네임을 입력하세요."}></input>
                <button className = {"checkBtn"} type = "submit" onClick = {checkNickname}>중복 확인</button>
            </div>
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "nameInput">이름</label>
                <input 
                 type = "text"
                 id = "nameInput"
                 onChange={onChangeName}
                 placeholder={"실명을 입력하세요."}></input>
            </div>
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "birthInput">생년월일</label>
                <input
                 type = "text"
                 id = "birthInput"
                 value = {birth}
                 onChange={onChangeBirth}
                 onKeyDown={onNumberKeyDown}
                 placeholder = {"8자리를 입력하세요."}></input>
            </div>
            <div className = "joinInput">
                <em>* </em>
                <label htmlFor = "genderInput">성별</label>
                <input type = "text" id = "genderInput" onChange={onChangeGender}></input>
            </div>
            <hr/>
            <div className='terms'>
                회원가입 약관
            </div>
                <button type = "submit" className = "join" onClick={submitJoin} >회원가입</button>
          </form>
        </div>
    );
  }
  
  export default Join;