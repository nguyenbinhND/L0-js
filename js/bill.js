var billContent = document.querySelector(".bill__container");
let overLay = document.querySelector(".overlay");
let closeBill = document.querySelector(".overlay__content-header-close");

function billTotalQuantity(arrList) {
  let initialValue = 0;
  const sumWithInitial = arrList.cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    initialValue
  );

  console.log(sumWithInitial);
  return sumWithInitial;
}

async function getDataCustomer() {
  let customerData = await listCustomer().getDataCustomer();
  billContent.innerHTML = customerData.map((customer) => {
    return `
    <div class="bill__content">
    <div class="bill__code">
      <p class="bill__code-id">${customer.idUser}</p>
      <div class="bill__code-detail" onclick="Details(${customer.id})">
        <p class="bill__code-detail-title">Details</p>
        <span class="bill__code-detail-icon">
          <i class="fa-solid fa-arrow-down"></i>
        </span>
      </div>
    </div>
    <div class="bill__content-customer">
      <p class="bill__content-name">${customer.fullName}</p>
    </div>
    <div class="bill__content-date">
      <p class="bill__date-time">${customer.buyTime}</p>
    </div>
    <div class="bill__content-item">
      <p class="bill__content-item-number">${customer.itemNumber}</p>
    </div>
    <div class="bill__content-quantity">
      <p class="bill__toal-quantity"> ${billTotalQuantity(customer)}</p>
    </div>
    <div class="bill__content-price"> 
      <p class="bill__content-price-total">$ ${customer.totalPrice}</p>
    </div>
    <div>
      <span class="bill__delete " onclick="listCustomer().deleteCustomer(${
        customer.id
      })"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
    </div>
  </div>`;
  });

  // console.log(customerData);
}
getDataCustomer();

//on-off overlay
function Details(id) {
  overLay.style.display = "block";
  displayBillDetail(id);
}

closeBill.addEventListener("click", () => {
  overLay.style.display = "none";
});

function data() {
  let arr = listCustomer().getItemById();
  console.log(arr);
}

// bill detail
let billDetail = document.querySelector(".bill__detail-content");
const displayBillDetail = async (id) => {
  let data = await listCustomer().getDataCustomer();
  let dataLength = data.length;
  console.log(id);
  for (let i = 0; i < dataLength; i++) {
    if ((data[i].id = id)) {
      billDetail.innerHTML = data[i].listBillItem?.map((product) => {
        return `
        <div class="bill__detail">
        <div class="bill__detail-img">
          <img src=${product.productImg} alt="" />
        </div>
        <div class="bill__detail-customer">
          <p class="bill__detail-name">${product.productName}</p>
        </div>
        <div class="bill__detail-quantity">
          <p class="bill__detail-quantity">${product.productCount}</p>
        </div>
        <div class="bill__detail-pirece-subtotal">
          <p class="bill__detail-subtotal">$ ${product.productPrice}</p>
        </div>
        <div class="bill__detail-totalPrice">
          <p class="bill__detail-totalPrice">$ ${product.totalPrice}</p>
        </div>
      </div>
        `;
      });
    }
  }
};
// displayBillDetail();
