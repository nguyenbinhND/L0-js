const listCustomer = () => {
  const customerApi = "http://localhost:3000/DANHSACHDONHANG";
  let keyLocalStorageListSP = "DANHSACHSP";
  let keyLocalStorageItemCart = "DANHSACHITEMCART";

  const getCartItem = () => {
    let dataCartItem = JSON.parse(
      localStorage.getItem(keyLocalStorageItemCart)
    );
    return dataCartItem;
  };

  const getListSp = () => {
    let dataListSp = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
    return dataListSp;
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
        alert("removed successful");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    getCartItem,
    getListSp,
    getDataCustomer,
    postDataCustomer,
    deleteCustomer,
    getDatabyId,
  };
};
