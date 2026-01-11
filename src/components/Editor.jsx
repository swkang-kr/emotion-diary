import "/src/components/Editor.css";
import EmotionItem from "/src/components/EmotionItem.jsx";
import Button from "/src/components/Button.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {emotionList} from "/src/util/Constants.js";
import {getStringedDate} from "/src/util/get-stringed-date.js";


const Editor = ({ initData, onSubmit }) => {
    const [input, setInput] = useState({
        createDate: new Date(),
        emotionId: 1,
        content: '',
    });
    const nav = useNavigate();
    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createDate: new Date(Number(initData.createDate)),
            });
        }
    }, [initData]);

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'createDate') {
            value = new Date(value);
        }
        setInput({...input, [name]: value});
    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    return <div className={'Editor'}>
        <section className={'date_section'}>
            <h4>오늘의 날짜</h4>
            <input name='createDate' type={'date'} value={getStringedDate(input.createDate)} onChange={onChangeInput}/>
        </section>
        <section className={'emotion_section'}>
            <h4>오늘의 감정</h4>
            <div className={'emotion_list_wrapper'}>
                {emotionList.map((item) => (
                    <EmotionItem
                        onClick={() => onChangeInput({
                            target: {
                                name: 'emotionId',
                                value: Number(item.emotionId),
                            }
                        })}
                        key={item.emotionId} {...item}
                        isSelected={Number(item.emotionId) === Number(input.emotionId)}
                    />
                ))}
            </div>
        </section>
        <section className={'content_section'}>
            <h4>오늘의 일기</h4>
            <textarea
                placeholder={'오늘은 어땠나요?'}
                name={'content'}
                value={input.content}
                onChange={onChangeInput}
                data-gramm="false"
                data-enable-grammarly="false"
            />
        </section>
        <section className={'button_section'}>
            <Button text={'취소하기'} onClick={() => nav('/')} />
            <Button
                onClick={onClickSubmitButton}
                text={'작성완료'}
                type={'POSITIVE'}/>
        </section>
    </div>
};

export default Editor;