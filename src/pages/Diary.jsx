import {useParams, useNavigate} from "react-router-dom";
import Header from "/src/components/Header";
import Button from "/src/components/Button.jsx";
import Viewer from "/src/components/Viewer.jsx";
import useDiary from "/src/hooks/useDiary";
import {getStringedDate} from "/src/util/get-stringed-date.js";
import usePageTitle from "../hooks/usePageTitle.jsx";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기`);

    if (!curDiaryItem) {
        return <div>데이터 로딩중...!</div>
    }

    const {createDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createDate));

    return <div>
        <Header
            title={`${title} 기록`}
            leftChild={<Button onClick={() => nav(-1)} text={'<'}/>}
            rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={'수정하기'}/>}
        />
        <Viewer emotionId={emotionId} content={content} />
    </div>;
};

export default Diary;