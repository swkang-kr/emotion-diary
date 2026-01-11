// Custom Hook
import {DiaryStateContext} from "/src/App.jsx";
import {useContext, useEffect, useState} from "react";
import {showWarning} from "/src/components/SweetAlert.jsx";
import {useNavigate} from "react-router-dom";

const useDiary = (id) => {
    const nav = useNavigate();
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();

    // Mount 이후, params.id or data 변경이 있는 경우
    useEffect(() => {
        const currentDiaryItem = data.find(item => Number(item.id) === Number(id));

        if (!currentDiaryItem) {
            showWarning('존재하지 않는 ', '일기입니다');
            nav('/', {replace: true});
        }

        setCurDiaryItem(currentDiaryItem);
    }, [id]);

    return curDiaryItem;
}

export default useDiary;