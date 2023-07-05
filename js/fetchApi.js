const listCustomer = (() => {
  const customerApi = "http://localhost:3000/DANHSACHDONHANG";
  const keyLocalStorageListSP = "DANHSACHSP";
  const keyLocalStorageItemCart = "DANHSACHITEMCART";

  const getListItem = (url) => {
    let dataListSp = JSON.parse(localStorage.getItem(url));
    return dataListSp;
  };

  const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getDatabyId = async (id) => {
    const apiUrl = customerApi;
    const getDatabyIdUrl = `${apiUrl}/${id}`;
    return await fetch(getDatabyIdUrl)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  };

  const getDataCustomer = async () => {
    const response = await fetch(customerApi);
    const customerData = await response.json();
    return customerData;
  };

  const postDataCustomer = async (dataCartItem) => {
    let option = {
      method: "POST",
      body: JSON.stringify(dataCartItem),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };
    await fetch(customerApi, option)
      .the((response) => {
        response.json();
      })
      .then((data) => {});
  };

  const deleteCustomer = (id) => {
    fetch(customerApi + "/" + id, {
      method: "DELETE",
    })
      .then(() => {
        createToast("success", "Hủy đơn hàng thành công!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    getListItem,
    saveData,
    getDataCustomer,
    postDataCustomer,
    deleteCustomer,
    getDatabyId,
    keyLocalStorageListSP,
    keyLocalStorageItemCart,
  };
})();
