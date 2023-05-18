import styled from './SelectConcert.module.scss';

const SelectConcert = ({option}) => {
    return (
        <select name = "concert" className= {styled.selectConcert}>
            {option.map((item) => (
                <option
                    className= {styled.option}
                    key = {item.key}
                    value = {item.value}
                    >
                    {item.value}
                </option>
            ))}
        </select>
    )
}

export default SelectConcert;