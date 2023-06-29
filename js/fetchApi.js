const listCustomer = () => {
  const customerApi = "http://localhost:3000/DANHSACHDONHANG";
  let keyLocalStorageListSP = "DANHSACHSP";
  let listItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
  let keyLocalStorageItemCart = "DANHSACHITEMCART";

  const getCartItem = () => {
    let dataCartItem = JSON.parse(
      localStorage.getItem(keyLocalStorageItemCart)
    );
    return dataCartItem;
  };

  // const getItemById = async (id) => {
  //   let arr = [];
  //   let data = await getDataCustomer();
  //   let dataLength = data.length;
  //   for (let i = 0; i < dataLength; i++) {
  //     if ((data[i].id = id)) {
  //       data[i].cart.map((item)=>{
  //         if(item.productId = )
  //       })
  //     }
  //   }

  //   return data;
  //   console.log(data);
  // };

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
    getDataCustomer,
    postDataCustomer,
    getCartItem,
    deleteCustomer,
  };
};
