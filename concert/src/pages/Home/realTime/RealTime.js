import { axiosInstance } from 'utils/customAxios';
import styled from './RealTime.module.scss';
import {useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';

function RealTime () {
    const [realTimeData, setRealTimeData] = useState([]);
    const navigate = useNavigate();
    
    const handleOnclick = (searchKeyword) => {
        const keyword = decodeURI(searchKeyword)
        navigate(`./search?searchKeyword=${keyword}`)
    }

    const makeRealTime = () => {
        return realTimeData.map((item ,idx)=> (
            
            <div className={styled.item} onClick = {handleOnclick.bind(this, item.conTitle)}>
                <span className = {styled.rank}>{idx+1}</span>
                {item.conTitle}
            </div>
        ))
    }
    useEffect(()=>{
        async function getRealTime() {
            const res = await axiosInstance.get('/calendar/ranking');
            if(res.status === 200){
                setRealTimeData(res.data.data);
            }
        }
        getRealTime();
        console.log(realTimeData);
    }, [])
    return (
    <div className = {styled.realTimeContainer}>
        <div className = {styled.title}> 실시간 인기 공연</div>
        {makeRealTime()}
    </div>
)}
export default RealTime;