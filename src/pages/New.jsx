import Header from "/src/components/Header";
import Button from "/src/components/Button.jsx";
import Editor from "/src/components/Editor.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DiaryDispatchStateContext} from "/src/App";
import usePageTitle from "/src/hooks/usePageTitle";

const New = () => {
    const {onCreate} = useContext(DiaryDispatchStateContext);
    const nav = useNavigate();
    usePageTitle('새 일기 쓰기');

    const onSubmit = (input) => {
        onCreate(input.createDate.getTime(), input.emotionId, input.content);
        nav('/', {replace: true});
    }

    return <div>
        <Header title={'새 일기 쓰기'} leftChild={<Button text={'< 뒤로 가기'} onClick={() => nav('/')}/>} />
        <Editor onSubmit={onSubmit} />
    </div>;
};

export default New;