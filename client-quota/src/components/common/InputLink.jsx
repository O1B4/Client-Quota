import styled from 'styled-components';

//<InputLink>고정 링크</InputLink> -> 이런 식으로 작성하시면 FixedLink에 삽입됩니다
//onChange 콜백이 제공되었을 때만 호출됨 -> 검증로직 등에 사용

const InputLink = ({ name, placeholder, children, onChange}) => {
    return <StyledInputLink>
        <FixedLink>{children}</FixedLink>
        <FlexLink name={name} placeholder={placeholder} onChange={onChange ? (e) => onChange(e) : undefined}/>
    </StyledInputLink>
}

export default InputLink;

const FixedLink = styled.div`
    width: auto;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 20px;
    border: 2px solid var(--D3, #D3D3D3);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--D3, #D3D3D3);
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
`;

const FlexLink = styled.input`
    flex: 1;
    border: none;
    background: none;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border-radius: 20px;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    ::placeholder {
        color: var(--D3, #D3D3D3);
    }
`;

const StyledInputLink = styled.div`
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 2px solid var(--D3, #D3D3D3);
    border-left: none;
    background: #FFF;

    &:focus-within {
        border: 2px solid #6349F6;
        border-left: none;
    }
`;