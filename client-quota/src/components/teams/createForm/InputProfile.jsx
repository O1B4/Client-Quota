import { useState } from 'react';
import styled from 'styled-components';

const TeamProfileIcon = "/assets/svg/teamProfileIcon.svg"

const StyledInputProfile = styled.div`
    width: 480px;
    display: flex;
    align-items: center;
`;

const ProfileDisplay = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background: url(${props => props.$imgUrl || TeamProfileIcon}) no-repeat center/cover;
    border: 3px solid var(--D3, #D3D3D3);
    margin-right: 15px;
`;

const ProfileUploadButton = styled.button`
    width: 180px;
    height: 40px;
    border-radius: 20px;
    background: #6349F6;
    color: #FFF;
    text-align: center;
    margin-right: 5px;
`;

const ProfileDeleteButton = styled.button`
    width: 180px;
    height: 40px;
    border-radius: 20px;
    background: #D3D3D3;
    color: #FFF;
    text-align: center;
`;


const InputProfile = () => {
    const [profile, setProfile] = useState(TeamProfileIcon);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfile(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleProfileRemove = () => {
        setProfile(TeamProfileIcon);
    }



    return <StyledInputProfile>
        <ProfileDisplay $imgUrl={profile}/>
        <input
            id="profileInput"
            type="file"
            style={{display: 'none'}}
            onChange={handleProfileChange}
        />
        <div>
            <ProfileUploadButton onClick={() => document.getElementById('profileInput').click()}>프로필 등록</ProfileUploadButton>
            <ProfileDeleteButton onClick={handleProfileRemove}>프로필 삭제</ProfileDeleteButton>
            <p style={{color: "#D3D3D3"}}>400x400 픽셀 사이즈를 권장합니다</p>
        </div>
    </StyledInputProfile>
}

export default InputProfile;