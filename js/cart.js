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
  const sumWithInitial = arrList.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    initialValue
  );
  cartShop.innerHTML = sumWithInitial;
  return sumWithInitial;
}
cart();

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

      <div class="cart__total">${item.productCount * item.productPrice}$</div>

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
  return sumWithInitial;
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
  hideBuy();
}

// them sp
function plusItem(id) {
  for (let i = 0; i < dataCartItem.length; i++) {
    if (
      dataCartItem[i].productId === Number(id) &&
      dataCartItem[i].count < dataCart[i].productQuantity
    ) {
      dataCartItem[i].count += 1;
    }
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));
  cartItemUI();
  totalCart();
}
// bot sp
function minusItem(id) {
  for (let i = 0; i < dataCartItem.length; i++) {
    if (dataCartItem[i].productId === Number(id) && dataCartItem[i].count > 1) {
      dataCartItem[i].count -= 1;
    }
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));
  cartItemUI();
  totalCart();
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
// var customerList = {
//   id: randomId(),
//   name: `${fname.value}`,
// };
const apiUrl = "http://localhost:3000/DANHSACHDONHANG";

// const getDataCustomer = async () => {
//   const response = await fetch(apiUrl);
//   const customerData = await response.json();
//   console.log(customerData);
//   return customerData;
// };
// getDataCustomer();

async function randomId() {
  let randomId = Math.floor(Math.random() * 10000) + 1;
  let dataOrder = await listCustomer.getDataCustomer();
  for (let i = 0; i < dataOrder.length; i++) {
    if (dataOrder[i].idUser === randomId) {
      randomId();
    }
    return randomId;
  }
  console.log(dataOrder);
}
randomId();

function getDate() {
  let date = new Date();
  let dateNow = ` ${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} `;

  return dateNow;
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
  bill.style.display = "none";
  fname.value = "";
  lname.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  mess.value = "";
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
  mess.value = "";
  showSuccess(errorName);
  showSuccess(errorEmail);
});

// var customerList = {
//   id: randomId(),
//   dateNow: getDate(),
//   name: `${fname.value} ${lname.value}`,
//   email: email.value,
//   address: `${province.value}-${districts.value}-${wards.value}`,
//   numberHouse: address.value,
//   mess: mess.value,
// };
