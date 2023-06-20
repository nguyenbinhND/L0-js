const listCustomer = (() => {
  const customerApi = "http://localhost:3000/DANHSACHDONHANG";
  const getDataCustomer = async () => {
    const response = await fetch(customerApi);
    const customerData = await response.json();
    return customerData;
  };

  return {
    getDataCustomer,
  };
})();

// const lib = (() => {
//   const keyLocalStorageListSP = "DANHSACHSP";
//   const keyLocalStorageItemCart = "DANHSACHITEMCART";
//   const saveDataToLS = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
//   };
//   const getDataFromLS = (key) => {
//     const data = localStorage.getItem(key);
//     return JSON.parse(data);
//   };
//   const getDataApi = (url) => {
//     return fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         // Xử lý dữ liệu nhận được từ máy chủ
//         return data;
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   };
//   const getDatabyId = (id) => {
//     const apiUrl =
//       "https://646ebc4909ff19b1208624b1.mockapi.io/api/v1/orderTable";
//     const getDatabyIdUrl = `${apiUrl}/${id}`;
//     return fetch(getDatabyIdUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         // Xử lý dữ liệu nhận được từ máy chủ
//         return data;
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
//   const postData = (data) => {
//     const url = "https://646ebc4909ff19b1208624b1.mockapi.io/api/v1/orderTable";
//     return fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Xử lý dữ liệu nhận được từ máy chủ sau khi thêm mới
//         return data;
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
//   const deleteData = async (orderId) => {
//     const apiUrl =
//       "https://646ebc4909ff19b1208624b1.mockapi.io/api/v1/orderTable";
//     const deleteUrl = `${apiUrl}/${orderId}`;
//     try {
//       const response = await fetch(deleteUrl, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Đã xóa đơn hàng thành công!");
//         // Thực hiện các hành động khác sau khi xóa đơn hàng thành công
//       } else {
//         console.log("Xóa đơn hàng không thành công. Vui lòng thử lại sau!");
//       }
//     } catch (error) {
//       console.log("Đã xảy ra lỗi khi xóa đơn hàng:", error);
//     }
//   };
//   function sumFunction(arr, keyArr) {
//     if (Array.isArray(arr)) {
//       if (typeof keyArr === "undefined") {
//         return arr.reduce(function (acc, val) {
//           return acc + val;
//         }, 0);
//       } else {
//         return arr.reduce(function (acc, obj) {
//           return acc + obj[keyArr];
//         }, 0);
//       }
//     }
//   }
//   return {
//     keyLocalStorageListSP,
//     keyLocalStorageItemCart,
//     saveDataToLS,
//     getDataFromLS,
//     getDataApi,
//     getDatabyId,
//     postData,
//     deleteData,
//     sumFunction,
//   };
// })();
