import Swal from "sweetalert2";

const useToast = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: '380px',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },

    });

    const LoadingToast = Swal.mixin({
        toast: true,
        position: "top-end",
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        },
        
        showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
        },
        hideClass: {
            popup: '',                     // disable popup fade-out animation
        },
    })

    return { Toast, LoadingToast }
}

export default useToast