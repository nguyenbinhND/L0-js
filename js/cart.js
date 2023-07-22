let listSp = listCustomer.getListItem(listCustomer.keyLocalStorageListSP);
let CartItem = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
var cartCategory = document.querySelector(".cart__category");
var cartContent = document.querySelector(".cart__container");
var totalPrice = document.querySelector(".total-price");
var cartShop = document.querySelector(".cart__account");
var hideBtnBuy = document.querySelector(".cart__category-total");

// http://localhost:3000/DANHSACHDONHANG

function cart() {
  let arrList = CartItem;
  let initialValue = 0;
  let sumWithInitial;
  if (arrList?.length > 0) {
    sumWithInitial = arrList.length;
    cartShop.innerHTML = sumWithInitial;
    return sumWithInitial;
  } else {
    sumWithInitial = initialValue;
  }
}
cart();

function hiddenBtnBuy() {
  hideBtnBuy.style.display = "none";
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

let dataCart = getbyID(listSp, CartItem);

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
  CartItem.length === 0
    ? (cartContent.innerHTML = `  
     <span class="empty-cart">
     <img src="../img/empty-cart.png" alt="empty cart">
  </span> 
  `) && hiddenBtnBuy()
    : (cartContent.innerHTML = getbyID(listSp, CartItem).map((item) => {
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
      }));
}
cartItemUI();

function totalUi() {
  let listCartData = getbyID(listSp, CartItem);
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
  for (let i = 0; i < CartItem.length; i++) {
    if (CartItem[i].productId === Number(id)) {
      CartItem.splice(i, 1);
    }
  }
  // localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCartItem));
  createToast("success", "xóa sản phẩm hàng thành công!");
  listCustomer.saveData(listCustomer.keyLocalStorageItemCart, CartItem);
  totalCart();
  cart();
  cartItemUI();
}

function plusItem(id) {
  const itemTemp = listSp.find((a) => a.id === Number(id));
  for (let i = 0; i < CartItem.length; i++) {
    if (
      CartItem[i].productId === Number(id) &&
      CartItem[i].count < itemTemp.soLuong
    ) {
      CartItem[i].count += 1;
    }
    if (
      CartItem[i].productId == Number(id) &&
      CartItem[i].count === itemTemp.soLuong
    ) {
      createToast("warning", "Sản phẩm đã đạt đến giới hạn!");
    }
  }
  listCustomer.saveData(listCustomer.keyLocalStorageItemCart, CartItem);
  cart();
  totalCart();
  cartItemUI();
}

function minusItem(id) {
  for (let i = 0; i < CartItem.length; i++) {
    if (CartItem[i].productId === Number(id) && CartItem[i].count > 0) {
      CartItem[i].count -= 1;
    }
    if (CartItem[i].count === 0) {
      if (confirm("Bạn muốn xóa sản phẩm?") === true) {
        CartItem.splice(i, 1);
        createToast("success", "xóa sản phẩm  thành công!");
      } else {
        CartItem[i].count = 1;
      }
    }
  }
  listCustomer.saveData(listCustomer.keyLocalStorageItemCart, CartItem);
  cartItemUI();
  totalCart();
  cart();
}

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

async function getDistrictbyProviceId() {
  let city = document.querySelector(".province");
  let district = document.querySelector(".districts");
  let data = await Districts();
  city.addEventListener("change", (e) => {
    district.innerHTML = `<option value="0">--Chọn Huyện/Quận--</option>`;
    if (data && data?.length > 0) {
      data.map((element) => {
        if (element.province_code === Number(city.value)) {
          let options = `<option value="${element.code}">${element.name}</option>`;
          district.insertAdjacentHTML("beforeend", options);
        }
      });
    }
  });
}
getDistrictbyProviceId();

async function listWards() {
  let listDistricts = document.querySelector(".districts");
  let listWards = document.querySelector(".wards");
  let data = await Wards();

  listDistricts.addEventListener("change", (e) => {
    if (data && data.length > 0) {
      listWards.innerHTML = `<option value="0">--Chọn Phường/Xã--</option>`;
      data.map((ward) => {
        if (ward.district_code === Number(listDistricts.value)) {
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
  let dataOrder = await listCustomer.getDataCustomer();
  for (let i = 0; i < dataOrder.length; i++) {
    if (dataOrder[i].idUser === randomUserID) {
      randomId();
    }
  }
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

function isVietnamesePhoneNumber(number) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

function checkName(input) {
  console.log(/[a-zA-Z0-9&_\.-]/.test(input));

  return /[a-zA-Z0-9&_\.-]/.test(input);
}

// check submit form
const getdataBill = async () => {
  let customerData = await listCustomer.getDataCustomer();
  return customerData;
};

function checkError(fname, lname, email, phone, address) {
  let errorName = document.querySelector(".errorName");
  let errorEmail = document.querySelector(".errorEmail");
  let errorPhone = document.querySelector(".errorPhone");
  let errorHouse = document.querySelector(".errorHouse");
  let errorSelect = document.querySelector(".errorSelect");

  if ((fname.value.trim() == "") | (lname.value.trim() == "")) {
    showError(errorName, "không được để trống họ hoặc tên");
  } else {
    // showSuccess(errorName);
    if (!checkName(fname.value.trim()) || !checkName(lname.value.trim())) {
      //   console.log(" hihih ");

      showError(errorName, "Họ hoặc Tên không chứa ký tự đặc biệt");
      // } else if (
      //   checkName(fname.value.trim()) === false &&
      //   checkName(lname.value.trim()) === true
      // ) {
      //   showError(errorName, "Tên không chứa ký tự đặc biệt");
    } else showSuccess(errorName);
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
    if (
      isVietnamesePhoneNumber(phone.value.trim()) &&
      phone.value.trim().length < 11
    ) {
      showSuccess(errorPhone);
    } else showError(errorPhone, "vd: 03/09 + số điện thoại và < 10 số ");
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
// const dataApiServe = getdataBill();
const dataApiServe = listCustomer.customerApi;
const confirmBuy = document.querySelector(".btn-confirm");
confirmBuy.addEventListener("click", async () => {
  checkError(fname, lname, email, phone, address);

  if (errorLength() === 0) {
    setTimeout(() => {}, 1000);
    let listBillItem = getbyID(listSp, CartItem);
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

    refreshQuantity("minus");
    listCustomer.postDataCustomer(customer);
    let arr = [];
    listCustomer.saveData(keyLocalStorageItemCart, arr);
    cartItemUI();
    hideBuy();
    createToast("success", "đã mua hàng thành công!");
  }
  if (errorLength() === 0 && !dataApiServe) {
    createToast("error", "server bị lỗi đặt hàng thất bại");
  }
});

// cập nhật số lượng sản phẩm sau khi order
function refreshQuantity(type) {
  let newListProducts = [...listSp];
  switch (type) {
    case "plus":
      for (let j = 0; j < CartItem.length; j++) {
        for (let i = 0; i < listSp.length; i++) {
          if (listSp[i].id === CartItem[j].productId) {
            let newItem = {
              id: listSp[i].id,
              name: listSp[i].name,
              img: listSp[i].img,
              price: listSp[i].price,
              soLuong: Number(listSp[i].soLuong + 1),
            };
            newListProducts[i] = newItem;
          }
        }
      }
      console.log(newListProducts);
      listCustomer.saveData(keyLocalStorageListSP, newListProducts);

      break;
    case "minus":
      for (let j = 0; j < CartItem.length; j++) {
        for (let i = 0; i < listSp.length; i++) {
          if (listSp[i].id === CartItem[j].productId && listSp[i].soLuong > 0) {
            let newItem = {
              id: listSp[i].id,
              name: listSp[i].name,
              img: listSp[i].img,
              price: listSp[i].price,
              soLuong: Number(listSp[i].soLuong - 1),
            };
            newListProducts[i] = newItem;
            // listDataCartItem[i].soLuong - 1;
          }
        }
      }
      console.log(newListProducts);
      listCustomer.saveData(keyLocalStorageListSP, newListProducts);

      break;

    default:
      console.log("loi refresh");
      break;
  }
}
