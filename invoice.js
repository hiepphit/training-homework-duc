const productsList = JSON.parse(localStorage.getItem('productsList'))
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

const user = document.querySelector('.user-info')
const productListElement = document.querySelector('.product-list')
const orderDate = document.querySelector('.order-date')

function formatCurrency(price) {
   return price.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
   })
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

function getToday() {
   let now = new Date()
   let time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
   let date = now.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
   })
   return `${date} - ${time}`
}

function renderDate() {
   orderDate.innerHTML = getToday()
}

function renderUser() {
   user.innerHTML = `<p>Họ và tên người mua hàng: <span class="font-semibold capitalize">${userInfo.fullname}</span></p>
   <p>Số điện thoại: <span class="font-semibold">${userInfo.phone}</span></p>
   <p>Địa chỉ: <span class="font-semibold">${userInfo.address}</span></p>`
}

function renderProduct() {
   let temp = productsList
      .filter((product) => {
         return product.selected === true
      })
      .map((product, index) => {
         return `<tr class="border ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} product">
         <td class="p-3 border border-gray-400 text-center">${index + 1}</td>
         <td class="p-3 border border-gray-400 text-justify">${product.name}</td>
         <td class="p-3 border border-gray-400 text-center">${formatCurrency(product.price)}</td>
         <td class="p-3 border border-gray-400 text-center">${product.quantity}</td>
         <td class="p-3 border border-gray-400 text-center">${formatCurrency(product.price * product.quantity)}</td>
      </tr>`
      })

   let html = `<tr class="border font-bold">
      <th class="p-3 border border-gray-400 uppercase w-1/12">STT</th>
      <th class="p-3 border border-gray-400 uppercase w-6/12">Sản phẩm</th>
      <th class="p-3 border border-gray-400 uppercase w-2/12">Đơn giá</th>
      <th class="p-3 border border-gray-400 uppercase w-1/12">Số lượng</th>
      <th class="p-3 border border-gray-400 uppercase w-2/12">Thành tiền</th>
   </tr>
   ${temp.join('')}
   <tr class="h-12">
      <td class="text-right p-2 border border-gray-400 uppercase font-semibold pr-8" colspan="4">Tổng thanh toán</td>
      <td class="p-2 border border-gray-400 uppercase font-semibold text-center">${formatCurrency(totalPrice())}</td>
   </tr>`

   productListElement.innerHTML = html
}

function render() {
   renderDate()
   renderUser()
   renderProduct()
}
render()
