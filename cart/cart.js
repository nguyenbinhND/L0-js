var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
var listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
var dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
var cartCategory = document.querySelector(".cart__category");
var cartContent = document.querySelector(".cart__container");
var totalPrice = document.querySelector(".total-price");

// console.log(listDataCartItem);
// console.log(dataCartItem);
console.log(totalPrice);

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
  console.log(listNewdata);
  return listNewdata;
}

var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
let listDatas = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
let cartData = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));

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
  cartData.length === 0
    ? (cartContent.innerHTML = `  
     <span class="empty-cart">
     <img src="../img/empty-cart.png" alt="empty cart">
  </span>
  `)
    : (cartContent.innerHTML = getbyID(listDatas, cartData).map((item) => {
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
        <span><i class="fa-solid fa-minus"></i></span>
        <p>${item.productCount}</p>
        <span><i class="fa-solid fa-plus"></i></span>
      </div>

      <div class="cart__sub">${item.productPrice}</div>

      <div class="cart__total">${item.productCount * item.productPrice}</div>

      <div>
        <span class="cart__delete"
          ><i class="fa-solid fa-circle-xmark"></i
        ></span>
      </div>
      </div>
        `;
      }));
}
cartItemUI();

function totalUi() {
  let listCartData = getbyID(listDatas, cartData);

  const initialValue = 0;
  const sumWithInitial = listCartData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.productPrice * currentValue.productCount;
  }, initialValue);
  return sumWithInitial;
}

function totalCart() {
  let sum = totalUi();
  console.log(sum);
  totalPrice.innerHTML = `
  Total: ${sum} $
  `;
}
totalCart();
