import styled from 'styled-components';

const InputTextarea = ({ name, placeholder, value, onChange }) => {
    return (
    <StyledInputTextarea 
    type="textarea" 
    name={name} 
    placeholder={placeholder} 
    value={value} 
    onChange={(e) => onChange(e.target.value)}/>
    )
}

export default InputTextarea;

const StyledInputTextarea = styled.textarea`
    width: 580px;
    height: 120px;
    border-radius: 20px;
    border: 2px solid var(--D3, #D3D3D3);
    background: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 20px;
    resize: none;

    ::placeholder {
        color: var(--D3, #D3D3D3);
    }

    &:focus {
        border: 2px solid #6349F6;
        outline: none;
    }
`