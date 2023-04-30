import styled from './loading.module.scss';

interface loadingProps {
    childern?: React.ReactNode;
    className ?: string;
}
const Loading : React.FC<loadingProps>  = (props) => {
   const {className} = props;
    
    return (
        <div className = {className}>
            <div className = {styled.spin}></div>
        </div>
    )
}

export default Loading;


