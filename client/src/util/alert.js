import Swal from "sweetalert2";
export function displayToast(text, Icon, color, time = 1500) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: color,
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: Icon,
    title: text,
  });
}
