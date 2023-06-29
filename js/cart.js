var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
var listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
var dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
var cartCategory = document.querySelector(".cart__category");
var cartContent = document.querySelector(".cart__container");
var totalPrice = document.querySelector(".total-price");
var cartShop = document.querySelector(".cart__account");
var hideBtnBuy = document.querySelector(".cart__category-total");
// http://localhost:3000/DANHSACHDONHANG

function cart() {
  let arrList = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
  let initialValue = 0;
  let sumWithInitial;
  if (arrList?.length > 0) {
    sumWithInitial = arrList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.count,
      initialValue
    );
    cartShop.innerHTML = sumWithInitial;
    return sumWithInitial;
  } else {
    sumWithInitial = initialValue;
    hideBtnBuy.style.display = "none";
  }
  // const sumWithInitial = arrList.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue.count,
  //   initialValue
  // );

  // cartShop.innerHTML = sumWithInitial;
  // return sumWithInitial;
}
cart();

// function hideBuy() {
//   if (cart() == 0) {
//     hideBtnBuy.style.display = "none";
//   } else hideBtnBuy.style.display = "block";
// }

function hideBuy() {
  if (cart() == 0) {
    hideBtnBuy.style.display = "none";
  } else hideBtnBuy.style.display = "block";
}

function getItemByID(listDataCartItem, dataCartItem) {
  const listNewdata = [];

  for (let i = 0; i < listDataCartItem.length; i++) {
    for (let j = 0; j < dataCartItem.length; j++) {
      if (dataCartItem[j].id === listDataCartItem[i].id) {
        let carItem = {
          productName: listDataCartItem[i].name,
          productImg: listDataCartItem[i].img,
          productPrice: listDataCartItem[i].price,
          productId: listDataCartItem[i].id,
          productQuantity: listDataCartItem[i].soLuong,
          productCount: dataCartItem[j].count,
        };
        listNewdata.push(carItem);
      }
    }
  }

  return listNewdata;
}

var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
let dataCart = getbyID(listDataCartItem, dataCartItem);
var listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
var dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));

function getbyID(datas, cart) {
  let listCart = [];

  for (let i = 0; i < datas.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (datas[i].id === cart[j].productId) {
        let cartItem = {
          productName: datas[i].name,
          productImg: datas[i].img,
          productPrice: datas[i].price,
          productId: datas[i].id,
          productQuantity: datas[i].soLuong,
          productCount: cart[j].count,
        };

        listCart.push(cartItem);
      }
    }
  }

  return listCart;
}

function cartItemUI() {
  dataCartItem.length === 0
    ? (cartContent.innerHTML = `  
     <span class="empty-cart">
     <img src="../img/empty-cart.png" alt="empty cart">
  </span> 
  `)
    : (cartContent.innerHTML = getbyID(listDataCartItem, dataCartItem).map(
        (item) => {
          return `
        <div class="cart__content">
        <div class="cart__productName">
        <span class="cart__productName-img">
          <img
            src="${item.productImg}"
            alt=""
          />
        </span>
        <div class="cart__productName-info">
          <h1 class="title">${item.productName}</h1>
          <p class="quantity">Quantity: ${item.productQuantity}</p>
        </div>
      </div>

      <div class="cart__quantity">
        <span onclick="minusItem(${
          item.productId
        })"><i class="fa-solid fa-minus"></i></span>
        <p>${item.productCount}</p>
        <span  onclick="plusItem(${
          item.productId
        })"><i class="fa-solid fa-plus"></i></span>
      </div>

      <div class="cart__sub">${item.productPrice}$</div>

      <div class="cart__total">${
        Math.round(item.productCount * item.productPrice * 100) / 100
      }$</div>

      <div>
        <span class="cart__delete" onclick="removeItem(${item.productId})"
          ><i class="fa-solid fa-circle-xmark"></i
        ></span>
      </div>
      </div>
        `;
        }
      ));
}
cartItemUI();

function totalUi() {
  let listCartData = getbyID(listDataCartItem, dataCartItem);
  const initialValue = 0;
  const sumWithInitial = listCartData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.productPrice * currentValue.productCount;
  }, initialValue);
  return Math.round(sumWithInitial * 100) / 100;
}

function totalCart() {
  let sum = totalUi();
  totalPrice.innerHTML = `
  Total: ${sum} $
  `;
}
totalCart();

// remove Item
function removeItem(id) {
  for (let i = 0; i < dataCartItem.length; i++) {
    if (dataCartItem[i].productId === Number(id)) {
      dataCartItem.splice(i, 1);
    }
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));

  cartItemUI();
  totalCart();
  cart();
}

// dataCart[i].productQuantity

// them sp
// function plusItem(id) {
//   for (let i = 0; i < dataCartItem.length; i++) {
//     if (
//       dataCartItem[i].productId === Number(id) &&
//       dataCartItem[i].count < listDataCartItem[i].soLuong
//     ) {
//       dataCartItem[i].count += 1;
//       let minus = "minus";
//       refreshQuantity(minus);
//     }
//   }
//   cartItemUI();
//   totalCart();
// }
// bot sp
// function minusItem(id) {
//   for (let i = 0; i < dataCartItem.length; i++) {
//     if (dataCartItem[i].productId === Number(id) && dataCartItem[i].count > 1) {
//       let plus = "plus";
//       dataCartItem[i].count -= 1;
//       refreshQuantity(plus);
//     }
//   }

//   cartItemUI();
//   totalCart();
// }

function plusItem(id) {
  const itemTemp = listDataCartItem.find((a) => a.id === Number(id));
  for (let i = 0; i < dataCartItem.length; i++) {
    if (
      dataCartItem[i].productId === Number(id) &&
      dataCartItem[i].count < itemTemp.soLuong
    ) {
      dataCartItem[i].count += 1;
    }
    if (
      dataCartItem[i].productId == Number(id) &&
      dataCartItem[i].count > itemTemp.soLuong
    ) {
      alert("Sản phẩm trong kho đã đạt giới hạn");
    }
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));
  cartItemUI();
  totalCart();
  cart();
}

function minusItem(id) {
  let dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
  for (let i = 0; i < dataCartItem.length; i++) {
    if (dataCartItem[i].productId === Number(id) && dataCartItem[i].count > 0) {
      dataCartItem[i].count -= 1;
    }
    if (dataCartItem[i].count === 0) {
      if (confirm("Bạn muốn xóa sản phẩm?") === true) {
        dataCartItem.splice(i, 1);
      } else {
        dataCartItem[i].count = 1;
      }
    }
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));
  cartItemUI();
  totalCart();
  cartItemUI();
  cart();
}

// function hideBtnBuy() {
//   hideBtnBuy.style.display = "none";
// }

//bai 8  lay thong tin tinh-huyen--xa
async function Provinces() {
  var provinces = "https://provinces.open-api.vn/api/p/";
  try {
    let response = await fetch(provinces);
    let data = response.json();
    return data;
  } catch (error) {
    alert(" chua co thong tin du lieu");
  }
}

async function Districts() {
  var districts = `https://provinces.open-api.vn/api/d/`;
  try {
    let response = await fetch(districts);
    let data = response.json();

    return data;
  } catch (error) {
    alert(error);
  }
}

async function Wards() {
  var wards = `https://provinces.open-api.vn/api/w/`;
  try {
    let response = await fetch(wards);
    let data = response.json();

    return data;
  } catch (error) {
    alert(error);
  }
}

// bai 9 ASync/await   listProvinces
async function listProvinces() {
  let province = document.querySelector(".province");
  let data = await Provinces();
  if (data && data.length > 0) {
    data.map((city) => {
      let options = `<option value="${city.code}">${city.name}</option>`;
      province.insertAdjacentHTML("beforeend", options);
    });
  }
}
listProvinces();

async function listDistricts() {
  let province = document.querySelector(".province");
  let listDistricts = document.querySelector(".districts");
  let data = await Districts();
  province.addEventListener("change", (e) => {
    if (data && data.length > 0) {
      data.map((districts) => {
        if (districts.province_code === Number(e.target.value)) {
          let options = `<option value="${districts.code}">${districts.name}</option>`;
          listDistricts.insertAdjacentHTML("beforeend", options);
        }
      });
    }
  });
}
listDistricts();

async function listWards() {
  let listDistricts = document.querySelector(".districts");
  let listWards = document.querySelector(".wards");
  let data = await Wards();

  listDistricts.addEventListener("change", (e) => {
    if (data && data.length > 0) {
      data.map((ward) => {
        if (ward.district_code === Number(e.target.value)) {
          let options = `<option value="${ward.code}">${ward.name}</option>`;
          listWards.insertAdjacentHTML("beforeend", options);
        }
      });
    }
  });
}

listWards();

// cau 10

// const apiUrl = "http://localhost:3000/DANHSACHDONHANG";

async function randomId() {
  let randomUserID = Math.floor(Math.random() * 10000) + 1;
  let dataOrder = await listCustomer().getDataCustomer();
  for (let i = 0; i < dataOrder.length; i++) {
    if (dataOrder[i].idUser === randomUserID) {
      randomId();
    }
  }
  console.log(randomUserID);
  return randomUserID;
}

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return today;
}

// cau 11 validate
var form = document.querySelector(".bills__form");
var errorInput = document.querySelectorAll(".error");

var fname = document.querySelector(".input__fname");
var lname = document.querySelector(".input__lname");
var email = document.querySelector(".bills__form-email");
var phone = document.querySelector(".bills__form-phone");
var address = document.querySelector(".bills__name-house");
var province = document.querySelector(".province");
var districts = document.querySelector(".districts");
var wards = document.querySelector(".wards");
var mess = document.querySelector("mess");

function showError(input, mess) {
  input.innerHTML = mess;
}

function showSuccess(input) {
  input.innerHTML = "";
}

// Check email is valid
function checkEmail(input, err) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(err, "Email is not valid");
  }
}

// check submit form

function checkError(fname, lname, email, phone, address) {
  let errorName = document.querySelector(".errorName");
  let errorEmail = document.querySelector(".errorEmail");
  let errorPhone = document.querySelector(".errorPhone");
  let errorHouse = document.querySelector(".errorHouse");
  let errorSelect = document.querySelector(".errorSelect");

  if ((fname.value.trim() == "") | (lname.value.trim() == "")) {
    showError(errorName, "không được để trống họ hoặc tên");
  } else {
    showSuccess(errorName);
  }

  if (email.value.trim() == "") {
    showError(errorEmail, "Không được để trống email");
  } else {
    showSuccess(errorEmail);
    checkEmail(email, errorEmail);
  }
  if (phone.value.trim() == "") {
    showError(errorPhone, "Không được để trống số điện thoại");
  } else {
    showSuccess(errorPhone);
  }
  if (province.value == "") {
    showError(errorSelect, "Không được để trống thành phố");
  } else if (districts.value == "") {
    showError(errorSelect, "Không được để trống quận");
  } else if (wards.value == "") {
    showError(errorSelect, "Không được để trống xã");
  } else {
    showSuccess(errorSelect);
  }
  if (address.value.trim() == "") {
    showError(errorHouse, "không được để trống địa chỉ");
  } else {
    showSuccess(errorHouse);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkError(fname, lname, email, phone, address);
});

// hide/noneHide bills

var btnBuy = document.querySelector(".btn-buy");
var bill = document.querySelector(".bills");
var cancel = document.querySelector(".btn-cancel");
var closeBills = document.querySelector(".close");

btnBuy.addEventListener("click", () => {
  bill.style.display = "block";
});
cancel.addEventListener("click", () => {
  let errorName = document.querySelector(".errorName");
  let errorEmail = document.querySelector(".errorEmail");
  let errorPhone = document.querySelector(".errorPhone");
  let errorHouse = document.querySelector(".errorHouse");
  let errorSelect = document.querySelector(".errorSelect");
  // let errorSelect = document.querySelector(".errorSelect");
  bill.style.display = "none";
  fname.value = "";
  lname.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  // mess.value = "";

  showSuccess(errorName, errorEmail, errorPhone, errorHouse, errorSelect);
});

closeBills.addEventListener("click", () => {
  var errorName = document.querySelector(".errorName");
  var errorEmail = document.querySelector(".errorEmail");
  bill.style.display = "none";
  fname.value = "";
  lname.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  // mess.value = "";
  showSuccess(errorName);
  showSuccess(errorEmail);
});

// cau 15

function errorLength() {
  let errorName = document.querySelector(".errorName").innerHTML;
  let errorEmail = document.querySelector(".errorEmail").innerHTML;
  let errorPhone = document.querySelector(".errorPhone").innerHTML;
  let errorHouse = document.querySelector(".errorHouse").innerHTML;
  let errorSelect = document.querySelector(".errorSelect").innerHTML;
  return (
    errorName.length +
    errorEmail.length +
    errorPhone.length +
    errorHouse.length +
    errorSelect.length
  );
}
// console.log({ address });
const confirmBuy = document.querySelector(".btn-confirm");
confirmBuy.addEventListener("click", async () => {
  checkError(fname, lname, email, phone, address);
  if (errorLength() === 0) {
    let listBillItem = getbyID(listDataCartItem, dataCartItem);
    let customer = {
      idUser: await randomId(),
      fullName: `${fname.value} ${lname.value}`,
      address: `${address.value} ${wards.options[wards.selectedIndex].text} ${
        districts.options[districts.selectedIndex].text
      } ${province.options[province.selectedIndex].text}`,
      email: email.value,
      phone: phone.value,
      buyTime: getDate(),
      itemNumber: dataCartItem.length,
      totalQuantity: cart(),
      totalPrice: totalUi(),
      cart: dataCartItem,
      listBillItem: listBillItem,
    };
    console.log(customer);
    listCustomer().postDataCustomer(customer);
    alert("thêm sản phẩm thành công");
    let arr = [];
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
    cartItemUI();
    hideBuy();
  }
});

// cập nhật số lượng sản phẩm sau khi order
function refreshQuantity(type) {
  // listDataCartItem
  let newListProducts = [...listDataCartItem];
  // for (let j = 0; j < dataCartItem.length; j++) {
  //   for (let i = 0; i < listDataCartItem.length; i++) {
  //     if (
  //       listDataCartItem[i].id === dataCartItem[j].productId &&
  //       listDataCartItem[i].soLuong > 1
  //     ) {
  //       let newItem = {
  //         id: listDataCartItem[i].id,
  //         name: listDataCartItem[i].name,
  //         img: listDataCartItem[i].img,
  //         price: listDataCartItem[i].price,
  //         soLuong: Number(listDataCartItem[i].soLuong - dataCartItem[j].count),
  //       };
  //       newListProducts[i] = newItem;
  //     }
  //   }
  // }
  // console.log(newListProducts);
  // localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newListProducts));

  switch (type) {
    case "plus":
      for (let j = 0; j < dataCartItem.length; j++) {
        for (let i = 0; i < listDataCartItem.length; i++) {
          if (listDataCartItem[i].id === dataCartItem[j].productId) {
            let newItem = {
              id: listDataCartItem[i].id,
              name: listDataCartItem[i].name,
              img: listDataCartItem[i].img,
              price: listDataCartItem[i].price,
              soLuong: Number(
                // listDataCartItem[i].soLuong + dataCartItem[j].count
                listDataCartItem[i].soLuong + 1
              ),
            };
            newListProducts[i] = newItem;
          }
        }
      }
      console.log(newListProducts);
      localStorage.setItem(
        keyLocalStorageListSP,
        JSON.stringify(newListProducts)
      );
      break;
    case "minus":
      for (let j = 0; j < dataCartItem.length; j++) {
        for (let i = 0; i < listDataCartItem.length; i++) {
          if (
            listDataCartItem[i].id === dataCartItem[j].productId &&
            listDataCartItem[i].soLuong > 1
          ) {
            let newItem = {
              id: listDataCartItem[i].id,
              name: listDataCartItem[i].name,
              img: listDataCartItem[i].img,
              price: listDataCartItem[i].price,
              soLuong: Number(
                // listDataCartItem[i].soLuong - dataCartItem[j].count
                listDataCartItem[i].soLuong - 1
              ),
            };
            newListProducts[i] = newItem;
          }
        }
      }
      console.log(newListProducts);
      localStorage.setItem(
        keyLocalStorageListSP,
        JSON.stringify(newListProducts)
      );
      break;

    default:
      console.log("loi refresh");
      break;
  }
}
