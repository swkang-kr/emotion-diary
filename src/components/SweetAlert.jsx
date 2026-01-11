import Swal from 'sweetalert2';

// ✅ 1. 성공 메시지 (초록색 체크)
export const showSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: '저장 완료!',
        text: '성공적으로 처리되었습니다.',
    }).then(r => console.log(r));
};

// ❌ 2. 실패 메시지 (빨간색 X)
export const showError = () => {
    Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '잠시 후 다시 시도해 주세요.',
    }).then(r => console.log(r));
};

// ⚠️ 3. 경고 메시지 (노란색 느낌표)
export const showWarning = (title, text) => {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        confirmButtonColor: '#ffc107',
        confirmButtonText: '확인',
    }).then(r => {
        console.log(r);
    });
};

export const showConfirm = (title, text) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText: '취소',
    });
}