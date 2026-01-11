import Header from "/src/components/Header";
import Button from "/src/components/Button"
import DiaryList from "/src/components/DiaryList.jsx";
import {useState, useContext} from "react";
import {DiaryStateContext} from "/src/App";
import usePageTitle from "/src/hooks/usePageTitle.jsx";

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    return data.filter((item) => beginTime <= item.createDate && item.createDate <= endTime);
};

const getYearMonth = (pivotDate) => {
    const year = pivotDate.getFullYear();
    // 월을 가져와서 +1 하고, 문자로 바꾼 뒤, 2자리가 안 되면 앞에 '0'을 채움
    const month = String(pivotDate.getMonth() + 1).padStart(2, '0');
    return `${year}년 ${month}월`;
}

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const monthlyData = getMonthlyData(pivotDate, data);
    usePageTitle('감정 일기장');

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    return <div>
        <Header
            title={getYearMonth(pivotDate)}
            leftChild={<Button text={`<`} type={'left'} onClick={onDecreaseMonth}/>}
            rightChild={<Button text={'>'} type={'right'} onClick={onIncreaseMonth}/>}
        />
        <DiaryList data={monthlyData} />
    </div>;
};

export default Home;