import {useEffect} from "react";

const usePageTitle = (title) => {
    useEffect(() => {
        const $title = document.querySelector('title');
        $title.innerText = title;
    }, [title]); // title 변경시마다 호출
}

export default usePageTitle;
