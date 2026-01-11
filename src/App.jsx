import '/src/App.css';
import {Routes, Route} from 'react-router-dom';
import Home from '/src/pages/Home';
import New from '/src/pages/New';
import Diary from '/src/pages/Diary';
import Edit from '/src/pages/Edit';
import NotFound from '/src/pages/NotFound';
import {createContext, useEffect, useReducer, useRef, useState} from "react";

function reducer(state, action) {
    let nextStage;

    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE":
            nextStage = [action.data, ...state];
            break;
        case "UPDATE": {
            nextStage = state.map(item => Number(item.id) === Number(action.data.id) ? action.data : item);
            break;
        }
        case "DELETE": {
            nextStage = state.filter(item => Number(item.id) !== Number(action.data.id));
            break;
        }
        default:
            return state;
    }

    localStorage.setItem('diary', JSON.stringify(nextStage));
    return nextStage;
}

// 변경되는 값
export const DiaryStateContext = createContext(undefined);
// 변경되지 않는 값
export const DiaryDispatchStateContext = createContext(undefined);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    // 초기값 빈배열
    const [data, dispatch] = useReducer(reducer, []);
    // 초기값 0
    const idRef = useRef(0);

    // Mount시 한번만 실행
    useEffect(() => {
        const storedData = localStorage.getItem('diary');

        // 1. 데이터가 없거나, 문자열 "undefined"가 들어있는 경우 방어
        if (!storedData || storedData === "undefined") {
            setIsLoading(false);
            return;
        }

        try {
            const parsedData = JSON.parse(storedData);
            // 배열인지 체크
            if (!Array.isArray(parsedData)) {
                setIsLoading(false);
                return;
            }

            // 저장된 ID의 최대값 구하기
            let maxId = 0;
            parsedData.forEach(item => {
                maxId = Math.max(maxId, Number(item.id));
            });
            idRef.current = maxId + 1;

            dispatch({
                type: "INIT",
                data: parsedData,
            })

            // 로딩끝.
            setIsLoading(false);
        } catch (error) {
            console.error("localStorage 파싱 중 에러 발생:", error);
            // 에러 발생 시 잘못된 데이터가 남아있지 않도록 초기화 등을 고려
            localStorage.removeItem('diary');
        } finally {
            // 성공하든 실패하든 로딩 상태는 해제
            setIsLoading(false);
        }

    }, []);

    // 새로운 일기 추가
    const onCreate = (createDate, emotionId, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createDate,
                emotionId,
                content
            },
        });
    };

    // 기존 일기 수정
    const onUpdate = (id, createDate, emotionId, content) => {
        dispatch({
            type: "UPDATE",
            data: {
                id,
                createDate,
                emotionId,
                content
            },
        });
    };

    // 기존 일기 삭제
    const onDelete = (id) => {
        dispatch({
            type: "DELETE",
            data: {id},
        });
    };

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchStateContext.Provider value={{
                    onCreate, onUpdate, onDelete
                }}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new" element={<New/>}/>
                        <Route path="/diary/:id" element={<Diary/>}/>
                        <Route path="/edit/:id" element={<Edit/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </DiaryDispatchStateContext.Provider>
            </DiaryStateContext.Provider>
        </>
    )
}

export default App;
