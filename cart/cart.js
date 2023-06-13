var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
var listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
var dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
var cartCategory = document.querySelector(".cart__category");
var cartContent = document.querySelector(".cart__container");
var totalPrice = document.querySelector(".total-price");
const cartShop = document.querySelector(".cart__account");

// console.log(listDataCartItem);
// console.log(dataCartItem);

function cart() {
  arrList = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
  let initialValue = 0;
  const sumWithInitial = arrList.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    initialValue
  );

  cartShop.innerHTML = sumWithInitial;
}
cart();

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
  // console.log(listNewdata);
  return listNewdata;
}

var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
// let listDatas = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
// let cartData = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
// let dataCart = getbyID(listDatas, cartData);
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

      <div class="cart__sub">${item.productPrice}</div>

      <div class="cart__total">${item.productCount * item.productPrice}</div>

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

// hide/noneHide bills
var btnBuy = document.querySelector(".btn-buy");
var bill = document.querySelector(".bills");
var cancel = document.querySelector(".btn-cancel");

btnBuy.addEventListener("click", () => {
  bill.style.display = "block";
});
cancel.addEventListener("click", () => {
  bill.style.display = "none";
});
