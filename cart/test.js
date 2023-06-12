var keyLocalStorageListSP = "DANHSACHSP";
var keyLocalStorageItemCart = "DANHSACHITEMCART";
var listDataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
var dataCartItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
var cartCategory = document.querySelector(".cart__category");
var tbodyCart = document.querySelector("tbody");

// console.log(listDataCartItem);
// console.log(dataCartItem);
console.log(tbodyCart);

// function carItems() {
//   for (let i = 0; i < dataItem.length; i++) {
//     for (let j = 0; j < listData.length; j++) {
//       if (dataItem[i].id === listData[j].id) {
//         cartCategory.innerHTML = dataItem.map((item) => {
//           return `
//             <table>
//                 <thead>
//                   <tr>
//                     <th>Product Name</th>
//                   </tr>
//                   <tr>
//                     <th>Quantity</th>
//                   </tr>
//                   <tr>
//                     <th>Subtotal</th>
//                   </tr>
//                   <tr>
//                     <th>Total</th>
//                   </tr>
//                   <tr>
//                     <th>Clear Cart</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td class="cart__productName">
//                       <span class="cart__productName-img">
//                         <img src="${listData[j].img}" alt="" />
//                       </span>
//                       <div class="">
//                         <h1 class="title">${listData[j].name}</h1>
//                         <p class="quantity">Quantity: ${item.count}</p>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span><i class="fa-solid fa-minus"></i></span>
//                       6
//                       <span><i class="fa-solid fa-plus"></i></span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>40000000</td>
//                   </tr>
//                   <tr>
//                     <td>900</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span class="cart__delete"
//                         ><i class="fa-solid fa-circle-xmark"></i
//                       ></span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div class="cart__category-footer">
//                 <button class="btn btn-back">
//                   <i class="fa-solid fa-backward"></i>
//                   Back to Shopping
//                 </button>
//                 <div class="cart__category-total">
//                   <p>Total: $20</p>
//                   <button class="btn btn-buy">Buy</button>
//                 </div>
//               </div>`;
//         });
//       }
//     }
//   }
// }

// carItems();

function getItemByID(listDataCartItem, dataCartItem) {
  const listNewdata = [];

  //   for (let i = 0; i < dataCartItem.length; i++) {
  //     for (let j = 0; j < listDataCartItem.length; j++) {
  //       if (dataCartItem[i].id === listDataCartItem[j].id) {
  //         let carItem = {
  //           productName: listDataCartItem[j].name,
  //           productImg: listDataCartItem[j].img,
  //           productPrice: listDataCartItem[j].price,
  //           productId: listDataCartItem[j].id,
  //           productQuantity: listDataCartItem[j].soLuong,
  //           productCount: dataCartItem[i].count,
  //         };
  //         listNewdata.push(carItem);
  //       }
  //     }
  //   }

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
  console.log(listCart);
  console.log(cartCategory);
  return listCart;
}

function cartItemUI() {
  cartData.length === 0
    ? (cartCategory.innerHTML = `  
     <span class="empty-cart">
     <img src="../img/empty-cart.png" alt="empty cart">
  </span>
  `)
    : (tbodyCart.innerHTML = getbyID(listDatas, cartData).map((item) => {
        return `
                            <td class="cart__productName">
                              <span class="cart__productName-img">
                                <img src="${item.productImg}" alt="" />
                              </span>
                              <div class="">
                                <h1 class="title">${item.productName}</h1>
                                <p class="quantity">Quantity: ${item.productQuantity}</p>
                              </div>
                            </td>
                          </d>
                          <tr>
                            <td>
                              <span><i class="fa-solid fa-minus"></i></span>
                             ${item.productCount}
                              <span><i class="fa-solid fa-plus"></i></span>
                            </td>
                          </tr>
                          <tr>
                            <td>40000000</td>
                          </tr>
                          <tr>
                            <td>900</td>
                          </tr>
                          <tr>
                            <td>
                              <span class="cart__delete"
                                ><i class="fa-solid fa-circle-xmark"></i
                              ></span>
                            </td>
                          </tr>
              
        `;
      }));
}

// cartItemUI();
