const listCustomer = () => {
  const customerApi = "http://localhost:3000/DANHSACHDONHANG";
  let keyLocalStorageItemCart = "DANHSACHITEMCART";
  let dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));

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
  return {
    getDataCustomer,
    postDataCustomer,
  };
};
