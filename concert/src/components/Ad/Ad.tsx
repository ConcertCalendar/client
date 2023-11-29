import styled from './Ad.module.scss';

/* 광고 영역을 나타내는 컴포넌트*/

interface AdProps {
    childern ?: React.ReactNode;
}

const Ad:React.FC<AdProps> = (props) => {
    return (
        <div className={styled.adWrap}>

        </div>
    )
}

export default Ad;
