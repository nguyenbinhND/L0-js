var listData = [
  {
    id: 1,
    name: "Nike Women's Air Force 1 Shoe",
    img: "https://m.media-amazon.com/images/I/31kVjJ4QODL._AC_.jpg",
    price: 100,
    soLuong: 1,
  },
  {
    id: 2,
    name: "Nike Women's Modern",
    img: "https://m.media-amazon.com/images/I/511+TfOOujL._AC_UL1100_.jpg",
    price: 94.91,
    soLuong: 20,
  },
  {
    id: 3,
    name: "Nike Men's Sneaker",
    img: "https://m.media-amazon.com/images/I/319ACRCmwtL._AC_.jpg",
    price: 99.0,
    soLuong: 20,
  },
  {
    id: 4,
    name: "Nike Gymnastics Shoes",
    img: "https://m.media-amazon.com/images/I/61eFsJgcGhL._AC_UL1100_.jpg",
    price: 102.07,
    soLuong: 12,
  },
  {
    id: 5,
    name: "Nike Women's Sneakers Hi-Top Trainers",
    price: 80.06,
    img: "https://m.media-amazon.com/images/I/51j5xtYS12L._AC_UL1280_.jpg",
    soLuong: 8,
  },
  {
    id: 6,
    name: "Nike Men's Air Force Basketball",
    price: 110.0,
    img: "https://m.media-amazon.com/images/I/41l1iOm08+L._AC_UL1200_.jpg",
    soLuong: 8,
  },
];
let keyLocalStorageListSP = "DANHSACHSP";
let keyLocalStorageItemCart = "DANHSACHITEMCART";
let listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
let dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
const cartItem = document.querySelector(".cart__account");
// let menu = document.querySelector(".menu");
let menuContent = document.querySelector(".menu__content");

function showMenu() {
  menuContent.classList.toggle("menu__content-active");
}

function saveData(listData) {
  if (!listCustomer.getListItem(listCustomer.keyLocalStorageListSP))
    listCustomer.saveData(listCustomer.keyLocalStorageListSP, listData);
}
saveData(listData);

function getData() {
  let listData = listCustomer.getListItem(listCustomer.keyLocalStorageListSP);
  let productList = document.querySelector(".category");
  productList.innerHTML =
    listData.length === 0
      ? ""
      : listData.map((product, index) => {
          return `
    <div class="category__items">
    <div class="">
      <span class="category__items-img">
        <img
          src= ${product.img}
          alt=""
        />
        <span class="add__cart" onClick="addSP(${product.id})">
          <i class="fa-solid fa-cart-shopping"></i>
        </span>
      </span>
    </div>
    <div class="category__items-info">
      <p class="category__items-name">${product.name}</p>
      <div class="category__items-des">
        <p class="prices">${product.price} $</p>
        <p class="quantity">Quantity:${product.soLuong}</p>
      </div>
    </div>
  </div>
    `;
        });
}
getData();

// bai 4

function addSP(productId) {
  let arr = [];
  let count = 1;
  let check = 0;
  let product = { productId, count: count };

  if (listCustomer.getListItem(listCustomer.keyLocalStorageItemCart)) {
    arr = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
  } else {
    arr = [];
  }
  let listDataCartItem = listCustomer.getListItem(
    listCustomer.keyLocalStorageListSP
  );
  let itemTemp = listDataCartItem.find((item) => item.id === Number(productId));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].productId === Number(productId)) {
      check = 1;

      if (arr[i].count < itemTemp.soLuong) {
        arr[i].count += count;

        createToast("success", "Thêm sản phẩm vào giỏ hàng thành công!");
        break;
      } else {
        createToast("warning", "Sản phẩm đã đạt đến giới hạn!");
      }
    }
  }
  if (check === 0 && itemTemp.soLuong > 0) {
    arr.push(product);
    createToast("success", "Thêm sản phẩm vào giỏ hàng thành công!");
  } else if (itemTemp.soLuong === 0) {
    createToast("warning", "Sản phẩm trong kho không đủ!");
  }
  // if (check == 0) arr.push(product);
  // localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
  listCustomer.saveData(listCustomer.keyLocalStorageItemCart, arr);
  cart();
}

// function cart() {
//   arrList = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
//   let initialValue = 0;
//   const sumWithInitial = arrList.reduce(
//     (accumulator, currentValue) => accumulator + currentValue.count,
//     initialValue
//   );
//   cartItem.innerHTML = sumWithInitial;
// }
// cart();

// function cartExport(cart) {
//   arrList = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
//   let initialValue = 0;
//   const sumWithInitial = arrList.reduce(
//     (accumulator, currentValue) => accumulator + currentValue.count,
//     initialValue
//   );
//   cart.innerHTML = sumWithInitial;
//   return initialValue;
// }

function cart() {
  arrList = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
  let initialValue = 0;
  const sumWithInitial = arrList.length;
  cartItem.innerHTML = sumWithInitial;
}
cart();

function cartExport(cart) {
  arrList = listCustomer.getListItem(listCustomer.keyLocalStorageItemCart);
  let initialValue = 0;
  const sumWithInitial = arrList.length;
  cartItem.innerHTML = sumWithInitial;
  cart.innerHTML = sumWithInitial;
  return initialValue;
}
