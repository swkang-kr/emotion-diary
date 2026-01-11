import {getEmotionImage} from "/src/util/get-emotion-image.js";
import Button from "/src/components/Button.jsx";
import '/src/components/DiaryItem.css';
import {useNavigate} from "react-router-dom";

const DiaryItem = ({id, emotionId, createDate, content}) => {
    const nav = useNavigate();
    return <div className={'DiaryItem'}>
        <div onClick={() => nav(`/diary/${id}`)} className={`img_section img_section_${emotionId}`}>
            <img src={getEmotionImage(emotionId)} alt={'img'}/>
        </div>
        <div onClick={() => nav(`/diary/${id}`)} className={'info_section'}>
            <div className={'created_date'}>
                {new Date(createDate).toLocaleDateString()}
            </div>
            <div className={'content'}>
                {content}
            </div>
        </div>
        <div className={'button_section'}>
            <Button text={'수정하기'} onClick={() => nav(`/edit/${id}`)} />
        </div>
    </div>;
};

export default DiaryItem;