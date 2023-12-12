import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

import InputTitle from "@/components/common/InputTitle";
import InputSubTitle from "@/components/reservation/createReservation/ui/InputSubTitle";
import FormField from "../../../common/FormField";
import DateRangePicker from "./DateRangePicker";
import ReservationDurationPicker from "./ReservationDurationPicker";
import DayTimePicker from "./DayTimePicker";
import ExcludedDatesPicker from "./ExcludedDatesPicker";
import InputTextarea from "@/components/common/InputTextarea";
import InputRoomLink from "./InputRoomLink";

import { postCreatedReservation } from "@/api/reservationApi";


const CreateReservationForm = () => {
    const [roomName, setRoomName] = useState('');
    const [meetingKind, setMeetingKind] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd] = useState(null);  
    const [duration, setDuration] = useState(1); 
    const [availableTime, setAvailableTime] = useState([]);
    const [excludedDates, setExcludedDates] = useState([]);
    const [roomDescription, setRoomdescription] = useState('');
    const [roomUrl, setRoomUrl] = useState('');
    const [errors, setErrors] = useState({});

    // '다음' 버튼 클릭 시 처리 함수
    //  디버깅 목적으로 콘솔에 폼 데이터 로그
    const handleNextClick = () => {
        console.log("userId: ", "userId");  //추후 수정 예정
        console.log("teamId: ", "teamId");  //추후 수정 예정
        console.log("Room Name: ", roomName);
        console.log("meetingKind: ", meetingKind);
        console.log("meetingLocation: ", meetingLocation)
        console.log("Range Start:", rangeStart);
        console.log("Range End:", rangeEnd);
        console.log("durationKind: ", "HOUR");
        console.log("Duration:", duration);
        console.log("Available Time:", availableTime);
        console.log("Excluded Dates:", excludedDates);
        console.log("Room Description:", roomDescription);
        console.log("Room URL:", roomUrl);
        console.log("active Days: ", activeDays);

        // 필수 입력 필드 검증
        let newErrors = {};
        if (!roomName.trim()) newErrors.roomName = '! 예약 이름을 입력해주세요.';
        if (!meetingKind.trim()) newErrors.meetingKind = '! 미팅 방법을 입력해주세요.';
        if (!meetingLocation.trim()) newErrors.meetingLocation = '! 미팅 장소를 입력해주세요.';
        if (!rangeStart||!rangeEnd) newErrors.rangeStart = '! 예약 가능 기간을 선택해주세요.';
        if (availableTime.length === 0) newErrors.availableTime = '! 예약 가능 요일을 선택해주세요.';
        // ... 나머지 필수 입력 필드 검증

        // 오류가 있을 경우, 오류 메시지 상태를 업데이트하고 함수를 종료
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    }; 

    // 활성화된 요일과 시간을 관리하기 위한 추가 상태 훅들
    const [activeDays, setActiveDays] = useState({
        월: false, 화: false, 수: false, 목: false, 금: false, 토: false, 일: false,
    });

    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const dayToNumber = {
        "일": 0, "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6
    };

    // POST 요청을 위한 데이터 준비
    const postData = {
        "userId": 1234567,  //임의의 값
        "teamId": 22222,    //임의의 값
        "roomName": roomName,
        "meetingKind": meetingKind,
        "meetingLocation": meetingLocation,
        "rangeStart": rangeStart,
        "rangeEnd": rangeEnd,
        "duration": duration,
        "availableTime": availableTime,
        "excludeDate": excludedDates,
        "roomDescription": roomDescription,
        "roomUrl": roomUrl
    };

    // POST 요청을 보내는 부분
    const sendPostRequest = async () => {
        try {
            const resp = await postCreatedReservation(postData);
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    };

    // activeDays나 days 배열이 변경되면 해당 요일 활성화 여부 검사 후 
    // true일 경우 availableTime 형식에 맞춰 데이터 가공 후 상태를 업데이트한다. 
    useEffect(() => {
        const newAvailableTime = [];
        days.forEach((day, index) => {
            if (activeDays[day]) {
                newAvailableTime.push({
                    startTime: startTime, 
                    endTime: endTime, 
                    wDay: index
                });
            }
        });
        setAvailableTime(newAvailableTime);
    }, [activeDays, days]); 

    // 시간 변경 처리 함수
    const onTimeChange = (day, startTime, endTime) => {
        const wDay = dayToNumber[day];

        setAvailableTime(prev => {
        const existingIndex = prev.findIndex(item => item.wDay === wDay);
        const newTime = { startTime, endTime, wDay };

            if (existingIndex > -1) {
                const updatedTimes = [...prev];
                updatedTimes[existingIndex] = newTime;
                return updatedTimes;
            } else {
                return [...prev, newTime];
            }
        });
    };

    //요일 활성화 상태 토글 함수
    const toggleDayActive = (day, isActive) => {
        setActiveDays((prevActiveDays) => ({
            ...prevActiveDays,
            [day]: isActive,
        }));
    };
    

    useEffect(() => {
        // 상태가 변경될 때 필요한 로직을 여기에 작성합니다.
        // 예를 들면, 상태에 따라 사용자에게 보여줄 메시지를 변경하거나,
        // 특정 조건에 따라 다른 컴포넌트를 렌더링하는 등의 작업을 할 수 있습니다.

        // 예시: 상태가 변경될 때 콘솔에 로그를 출력
        console.log("예약 가능 기간이나 활성화된 요일이 변경되었습니다.", rangeStart, rangeEnd, activeDays);
    }, [rangeStart, rangeEnd, activeDays]); // 의존성 배열에 상태를 넣어줍니다.

    return (
        <StyledReservationForm>
            <ReservationInputContainer>
                <SpaceBetweenContainer>
                    <InputFormTitle>
                        <Circle/>
                        <InputTitle>기본 정보</InputTitle>
                    </InputFormTitle>
                    <PulpleButton>다음</PulpleButton>
                </SpaceBetweenContainer>

                <Line/>

                <FormField 
                    title="예약 이름" 
                    name="roomName" 
                    placeholder="예약 이름"
                    value={roomName}
                    onChange={setRoomName}
                    error={errors.roomName} 
                    />

                <FormField 
                    title="미팅 방법" 
                    name="meetingKind" 
                    placeholder="미팅 방법"
                    value={meetingKind}
                    onChange={setMeetingKind}
                    description="오프라인 미팅, 온라인 미팅 등 미팅 방법을 설정해주세요."
                    error={errors.meetingKind} 
                />

                <FormField 
                    title="미팅 장소" 
                    name="meetingLocation" 
                    placeholder="미팅 장소"
                    value={meetingLocation}
                    onChange={setMeetingLocation}
                    description="오프라인 미팅일 경우 미팅 장소, 온라인 미팅일 경우 링크 혹은 플랫폼 종류를 입력해주세요."
                    error={errors.meetingLocation} 
                />

                <Line/>
                
                <DateRangePicker
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    setRangeStart={setRangeStart}
                    setRangeEnd={setRangeEnd}    
                    error={errors.rangeStart}
                />    


                <ReservationDurationPicker
                    reservationDuration={duration}
                    setReservationDuration={setDuration}
                />

                <Line/>

                <SpaceBetweenContainer>
                    <DaysContainer>
                        <InputSubTitle required>요일별 가능한 시간</InputSubTitle>
                        {errors.availableTime && (<ErrorDescription>{errors.availableTime}</ErrorDescription>)}
                        {days.map((day) => (
                            <DayTimePicker
                                key={day}
                                day={day}
                                onTimeChange={onTimeChange}
                                isActive={activeDays[day]}
                                toggleDayActive={toggleDayActive}
                                startTime={startTime}
                                endTime={endTime}
                                setStartTime={setStartTime}
                                setEndTime={setEndTime}
                            />
                        ))}
                    </DaysContainer>
                    <VerticalLine/>
                    <DaysContainer>
                        <InputSubTitle desc="특정 일자를 제외할 수 있습니다.">제외할 날짜</InputSubTitle>
                        <ExcludedDatesPicker
                            excludedDates={excludedDates}
                            setExcludedDates={setExcludedDates}
                            availableTime={availableTime}
                        />          
                    </DaysContainer>      
             </SpaceBetweenContainer>

                <Line/>

                <InputSubTitle>설명</InputSubTitle>
                <InputTextarea
                    value={roomDescription}
                    onChange={setRoomdescription}/>

                <InputSubTitle required>예약 페이지 주소</InputSubTitle>
                <InputRoomLink 
                    name="roomUrl" 
                    placeholder="RoomExample"
                    value={roomUrl}
                    onChange={setRoomUrl}>quotime.co.kr/팀링크</InputRoomLink>
                <Line/>

                <ButtonContainer>
                    <GreyButton>취소</GreyButton>
                    <PulpleButton onClick={handleNextClick}>다음</PulpleButton>
                </ButtonContainer>
            </ReservationInputContainer>
        </StyledReservationForm>
    );
}

export default CreateReservationForm;

const StyledReservationForm = styled.form`
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    background: white;
    border: 1px var(--gray-color) solid;
`;

const ReservationInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5%;
`;

const SpaceBetweenContainer = styled.div`
    width: 100%;
    display: flex;  
    justify-content: space-between;
    margin-right: 5%;
`;

const InputFormTitle = styled.div`
    width: 95%;
    display: flex;
    align-items: center;
`;

const Circle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--primary-color);
    margin-right: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const PulpleButton = styled.div`
    width: 79px;
    height: 41px;
    border-radius: 20px;
    background: var(--primary-color);
    border: none;
    color: white;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 41px;
    cursor: pointer;
`;

const GreyButton = styled.div`
    width: 79px;
    height: 41px;
    border-radius: 20px;
    background: var(--gray-color);
    border: none;
    color: #868484;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 41px;
    cursor: pointer;
    margin-right: 5px;
`;

const Line = styled.div`
    width: 95%;
    border: 1px var(--gray-color) solid;
    margin: 10px;
`;

const DaysContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const VerticalLine = styled.div`
    height: auto;
    border-left: 1px solid var(--gray-color);
    margin: 0 20px;
`;

const ErrorDescription = styled.div`
    margin-top: 8px;
    font-size: 16px;
    color: red;
`;