import Header from "/src/components/Header";
import Button from "/src/components/Button.jsx";
import Editor from "/src/components/Editor.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext} from "react";
import {DiaryDispatchStateContext} from "/src/App";
import Swal from 'sweetalert2';
import {showConfirm} from "/src/components/SweetAlert";
import useDiary from "/src/hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle.jsx";

const Edit = () => {
    const nav = useNavigate();
    const {onDelete, onUpdate} = useContext(DiaryDispatchStateContext);
    const params = useParams();
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기 수정`);

    const onSubmit = async (input) => {
        const result = await showConfirm('일기를 정말 수정할까요?', '');
        if (result.isConfirmed) {
            await onUpdate(Number(params.id), input.createDate.getTime(), input.emotionId, input.content);
            await Swal.fire(
                '수정 완료!',
                '수정되었습니다.',
                'success',
            ).then(r => {
                nav(-1, {replace: true})
            });
        }
    };

    const handleDelete = async () => {
        const result = await showConfirm('삭제하시겠습니까?', '복구 불가!');
        if (result.isConfirmed) {
            await onDelete(params.id);
            await Swal.fire(
                '삭제 완료!',
                '삭제되었습니다.',
                'success',
            ).then(r => {
                nav('/', {replace: true})
            });
        }
    };

    return <div>
        <Header
            title={'일기 수정하기'}
            leftChild={
                <Button text={'뒤로 가기'} onClick={() => nav('/')}/>
            }
            rightChild={
                <Button text={'삭제하기'} type={'NEGATIVE'} onClick={handleDelete}/>}
        />
        <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
};

export default Edit;