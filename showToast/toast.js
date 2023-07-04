const toasts = {
  success: {
    icon: '<i class="fas fa-check-circle"></i>',
    msg: "Thêm sản phẩm thành công !",
  },
  error: {
    icon: '<i class="fas fa-exclamation-triangle"></i>',
    msg: "Sản phẩm đã đạt đến giới hạn!",
  },
  warning: {
    icon: '<i class="fas fa-exclamation-circle"></i>',
    msg: "Sản phẩm đã đạt đến giới hạn!",
  },
};

function createToast(status, mss) {
  let toast = document.createElement("div");
  toast.className = `toast ${status}`;

  //   toast.innerHTML = `
  //     ${toasts[status].icon}
  //     <span class="msg">${toasts[status].msg}</span>
  //     <span class="countdown"></span>
  //     `;
  toast.innerHTML = `
    ${toasts[status].icon}
    <span class="msg">${mss}</span>
    <span class="countdown"></span>
    `;
  document.querySelector("#toasts").appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "hide_slide 1s ease forwards";
  }, 1000);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}
