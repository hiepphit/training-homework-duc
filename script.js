const productsList = [
   {
      name: 'Ly giữ nhiệt LocknLock 550ml LHC3249 - Hàng chính hãng, mở nắp một chạm, chất liệu thép không gỉ miệng ly rộng - JoyMall',
      img: 'https://down-vn.img.susercontent.com/file/vn-11134201-23020-n6k7vm1g9qnv75_tn',
      price: 319000,
      quantity: 1,
      selected: true,
   },
   {
      name: 'Combo 2 Túi Nước Xả Vải DOWNY Nắng Mai 2.3L/ Đam Mê 2.2L/ Huyền Bí 2.2L',
      img: 'https://down-vn.img.susercontent.com/file/98a4170ea0a37070f53afbeba83e9d92_tn',
      price: 327000,
      quantity: 3,
      selected: true,
   },
   {
      name: 'Apple AirPods Pro 2nd gen (2022)',
      img: 'https://down-vn.img.susercontent.com/file/141b2cc2ce15628a237a34ca5f8405b5',
      price: 5790000,
      quantity: 1,
      selected: false,
   },
   {
      name: 'iPhone 14 Pro Max 128 GB',
      img: 'https://down-vn.img.susercontent.com/file/93b3f6d4799b06f9279f817540daa4d1_tn',
      price: 28000000,
      quantity: 1,
      selected: false,
   },
   {
      name: 'Tai nghe Gaming Dareu EH416 LED RGB giả lập 7.1',
      img: 'https://down-vn.img.susercontent.com/file/sg-11134201-22120-e1g3n9381alvf5_tn',
      price: 358000,
      quantity: 1,
      selected: true,
   },
   {
      name: 'Hộp 12 gói bánh Orion ChocoPie Dưa Hấu (372g)',
      img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfdpi6ww3iise1_tn',
      price: 64000,
      quantity: 1,
      selected: false,
   },
   {
      name: 'Thịt gác bếp Tây Bắc (TẶNG CHẨM CHÉO) thịt trâu, lợn gác bếp chuẩn vị.Thịt trâu lợn sấy khô gác bếp TẶNG CHẨM CHÉO',
      img: 'https://down-vn.img.susercontent.com/file/853eae1c31e3b1554419f7da448b4862_tn',
      price: 280000,
      quantity: 2,
      selected: true,
   },

   {
      name: 'Đèn Phi Hành Gia chiếu sao phiên bản mới nhất',
      img: 'https://down-vn.img.susercontent.com/file/1c98a7f884771a14235eb2c7591e3767_tn',
      price: 358000,
      quantity: 1,
      selected: false,
   },
   {
      name: 'Tivi OLED Sony 4K Ultra HD 55 inch XR-55A90J - Miễn Phí Lắp Đặt',
      img: 'https://down-vn.img.susercontent.com/file/vn-11134207-23020-h7muk08hmhnv24_tn',
      price: 43790000,
      quantity: 1,
      selected: false,
   },
   {
      name: 'Combo Nước Xả Vải Downy Tinh Dầu Thiên Nhiên Cao Cấp Túi 3.5Lx2',
      img: 'https://down-vn.img.susercontent.com/file/sg-11134201-22120-cohuyphcrjlv78_tn',
      price: 448000,
      quantity: 1,
      selected: false,
   },
]

const userInfo = {}

const cartListElement = document.querySelector('.cart-list')
const totalPriceElement = document.querySelector('.total-price')
const userFormElement = document.querySelector('#user-form')
const orderButton = document.querySelector('.order-btn-js')
const modalOverlay = document.querySelector('.modal-overlay')
const modalUser = modalOverlay.querySelector('.modal-user')
const modalAlert = modalOverlay.querySelector('.modal-alert')
const closeModalButton = document.querySelectorAll('.close-modal-btn')
const fullNameInput = document.querySelector('input#fullname')
const phoneInput = document.querySelector('input#phone')
const addressInput = document.querySelector('input#address')

function renderCart() {
   let html = productsList.map((item, index) => {
      return `<div class="bg-white rounded-md cart-item flex justify-center p-5 items-center mt-1 cart-item" data-index=${index}>
        <div class="w-1/12 text-center">
            <input type="checkbox" ${
               item.selected === true ? 'checked' : ''
            }  class="border-[#00000024] rounded-sm   focus:outline-0" onchange="selectedProduct(this, ${index})">
        </div>
        <div class="w-4/12">
            <div class="flex items-center" title='${item.name}'>
                <img src="${item.img}" alt="${item.name}" width="80px">
                <p class="pl-4 pr-16 line-clamp-2 text-sm">${item.name}</p>
            </div>
        </div>
        <div class="w-2/12 text-center text-sm">${formatCurrency(item.price)}</div>
        <div class="w-2/12 flex justify-center items-center">
            <div class="w-[104px] flex justify-between rounded  border border-[#00000017] ">
                <button ${item.quantity === 1 ? 'disabled' : ''} class="h-8 w-8 flex items-center justify-center  ${
         item.quantity === 1 ? 'opacity-30' : 'cursor-pointer hover:opacity-60'
      }" onclick="decreaseQuantity(this, ${index})">
                  <img src='./assets/img/decrease.svg' alt='decrease button'/>
                </button>
                <input class="w-11 focus:outline-none focus:ring-0 text-center h-8 border-none quantity-product text-sm" type="text" value="${
                   item.quantity
                }">
                <div class="h-8 w-8 flex items-center justify-center cursor-pointer hover:opacity-60 " onclick="increaseQuantity(this, ${index})">
                  <img src='./assets/img/increase.svg' alt='increase button'/>
                </div>
            </div>
        </div>
        <div class="w-2/12 text-center text-[#ee4d2d] text-sm">${formatCurrency(item.price * item.quantity)}</div>
        <div class="w-1/12 text-center" onclick="deleteProduct(${index})">
            <span class="cursor-pointer inline-block mx-auto hover:text-red-500">Xóa</span>
        </div>
    </div>`
   })

   cartListElement.innerHTML = html.join('')
   totalPriceElement.innerHTML = `${formatCurrency(totalPrice())}`
}

cartListElement && renderCart()

function formatCurrency(price) {
   return price.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
   })
}

function selectedProduct(element, id) {
   productsList[id].selected = element.checked
   let isCheckedAll = productsList.every((item) => {
      return item.selected === true
   })
   document.querySelector('.select-all-js').checked = isCheckedAll
   renderCart()
}

function checkAllProduct(element) {
   let isChecked = element.checked
   if (isChecked) {
      productsList.forEach((item) => {
         item.selected = true
      })
   } else {
      productsList.forEach((item) => {
         item.selected = false
      })
   }
   renderCart()
}

function decreaseQuantity(element, id) {
   let parentElement = element.closest('.cart-item')
   if (productsList[id].quantity > 0) {
      productsList[id].quantity = Number(parentElement.querySelector('.quantity-product').value) - 1
      if (productsList[id].quantity === 0) {
         deleteProduct(id)
      }
   } else {
      productsList[id].quantity = 0
   }

   renderCart()
}

function increaseQuantity(element, id) {
   let parentElement = element.closest('.cart-item')
   productsList[id].quantity = Number(parentElement.querySelector('.quantity-product').value) + 1
   renderCart()
}

function deleteProduct(id) {
   productsList.splice(id, 1)
   renderCart()
}

function totalPrice() {
   return productsList
      .filter((item) => {
         return item.selected === true
      })
      .reduce((acc, item) => {
         return (acc += item.price * item.quantity)
      }, 0)
}

function getUserInfo() {
   userInfo.fullname = fullNameInput.value
   userInfo.phone = phoneInput.value
   userInfo.address = addressInput.value
}

const convertError = {
   fullname: 'họ và tên',
   phone: 'số điện thoại',
   address: 'địa chỉ',
}

function validateInput(input) {
   if (!input.checkValidity()) {
      const errorMessageElement = input.nextElementSibling
      //input.checkValidity() trả về false nếu input không hợp lệ
      if (input.validity.valueMissing) {
         errorMessageElement.textContent = `Vui lòng nhập ${convertError[input.id]}`
      } else if (input.validity.typeMismatch) {
         errorMessageElement.textContent = `Dữ liệu bạn nhập không phải là một ${convertError[input.id]}`
      } else if (input.validity.patternMismatch) {
         errorMessageElement.textContent = `Dữ liệu bạn nhập không phải là một ${convertError[input.id]}`
      } else if (input.validity.tooShort) {
         errorMessageElement.textContent = `Bạn phải nhập tối thiểu ${input.minLength} kí tự`
      } else errorMessageElement.textContent = `Dữ liệu bạn nhập không phải là một ${convertError[input.id]}`
      return false
   }
   return true
}

function delErrorMessage(input) {
   const errorMessageElement = input.nextElementSibling
   errorMessageElement.textContent = ''
}

function validateForm(form) {
   const inputs = form.querySelectorAll('input')
   let isValid = true
   inputs.forEach((input) => {
      if (!validateInput(input)) isValid = false
   })
   return isValid
}

userFormElement.querySelectorAll('input').forEach((input) => {
   input.onblur = () => {
      validateInput(input)
   }
})

function checkEmptyProduct() {
   return productsList.some((product) => {
      return product.selected === true
   })
}

orderButton.onclick = () => {
   modalOverlay.style.display = 'flex'
   document.querySelector('body').setAttribute('style', `overflow: hidden; height: 100vh`)
   if (checkEmptyProduct()) {
      modalUser.style.display = 'block'
   } else {
      modalAlert.style.display = 'block'
   }
   userFormElement.querySelectorAll('input').forEach((input) => {
      delErrorMessage(input)
   })
}

closeModalButton.forEach((button) => {
   button.onclick = () => {
      modalOverlay.style.display = ''
      modalUser.style.display = ''
      modalAlert.style.display = ''
      document.querySelector('body').style = {}
   }
})

userFormElement.onsubmit = (e) => {
   e.preventDefault()
   let isValid = validateForm(e.target)
   getUserInfo()
   localStorage.setItem('productsList', JSON.stringify(productsList))
   localStorage.setItem('userInfo', JSON.stringify(userInfo))
   isValid && (window.location.href = '/invoice.html')
}
