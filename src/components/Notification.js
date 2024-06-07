import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOption = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export function alertToast({msg, type, pos}) {
    // type: 'success', 'error', 'warning', 'info' 이렇게 4가지 사용가능
    toast.dismiss();
    toast(msg, {
        ...toastOption,
        type: type,
        position: pos
    });
};

{/*
    toastify 사용법
    import { alertToast } 를 해준다
    이후 alert가 필요할 때,
    alertToast({msg: `알림에 넣을 글`, type: '알림 타입', pos: '알림을 줄 위치'});
*/}