function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

function renderCart(items) {
    const $cart = document.querySelector("#order_items")
    const $cartMobile = document.querySelector('#order_items_mobile')
    const $total = document.querySelector(".total")
    const $totalPrice = document.querySelector(".total.amount")
    const $countItemsDesktop = document.querySelector(".count_item.desktop")
    const $countItemsMobile = document.querySelector(".count_item.mobile")
    const $countItemsCart = document.querySelector(".count-item")

    if (items.length == 0) {

        $(".cart-empty").removeClass("d-none")
        $(".cart-in-stock").addClass("d-none")

    } else {
        $cart.innerHTML = items.map((item) => `
            <tr class="cart-items">
                <th scope="row">
                    <div class="image">
                        <img src="./assets/img/All-products/${item.img}.jpg" alt="" width="150" height="auto">
                    </div>
                </th>
                <td>
                    <div>
                        <a href="" class="name">${item.name}</a>
                    </div>
                    <div>
                        <button id="deleteButton" class="btn btn-link" onClick="cartLS.remove(${item.id})">Xóa</button>
                    </div>
                </td>
                <td>
                    <div class="price">
                        <span id="dongia">${format(item.price)}</span>
                    </div>
                </td>
                <td>
                    <div class="custom-btn-number">
                        <button id="incs"class="btn-cts btn-minus" onClick="cartLS.quantity(${item.id},-1)">-</button>
                        <input type="text" id="qty" value="${item.quantity}">
                        <button id="decs" class="btn-cts btn-plus" onClick="cartLS.quantity(${item.id},1)">+</button>
                    </div>
                </td>
            </tr>`).join("")
    }

    

    $cartMobile.innerHTML = items.map((item) => `
    <div class="d-flex justify-content-between mb-4 cart-mobile">
        <div class="d-flex product-block-mobile">
            <div class="image">
                <img src="./assets/img/All-products/${item.img}.jpg" alt="" width="80" height="auto">
            </div>
            <div class="product-info">
                <div class="name">
                    <span>${item.name}</span>    
                </div>
                <div class="price">
                    <span>${format(item.price)}</span>
                </div> 
            </div>
        </div>
        <div class="d-flex mt-4" style="flex-direction: column;">
            <div class="custom-btn-number">
                <button id="incs"class="btn-cts btn-minus" onClick="cartLS.quantity(${item.id},-1)">-</button>
                <input type="text" id="qty" value="${item.quantity}">
                <button id="decs" class="btn-cts btn-plus" onClick="cartLS.quantity(${item.id},1)">+</button>
            </div>
            <button id="deleteButton2" class="btn btn-link" onClick="cartLS.remove(${item.id})">Xóa</button>
        </div>
    </div>`).join("")   

    $total.innerHTML = format(cartLS.total())
    $totalPrice.innerHTML = format(cartLS.total())
    $countItemsDesktop.innerHTML = cartLS.totalCount()
    $countItemsMobile.innerHTML = cartLS.totalCount()
    $countItemsCart.innerHTML = '(' + cartLS.totalCount() + ' sản phẩm)'
}
renderCart(cartLS.list())
cartLS.onChange(renderCart)

function renderCartModal(items) {
    const $cartModal = document.querySelector(".tbody-popup")
    const $totalModal = document.querySelector("#total-price")
    const $countItemsDesktop = document.querySelector(".count_item.desktop")
    const $countItemsMobile = document.querySelector(".count_item.mobile")

    $cartModal.innerHTML = items.map((item) => `
        <div class="item-popup">
            <div style="width: 55%" class="text-left">
                <div class="item-image">
                    <img src="./assets/img/All-products/${item.img}.jpg" alt="" width="80">
                </div>
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-remove">
                        <button class="btn remove-item-cart" onClick="cartLS.remove(${item.id})">
                            <i class="fas fa-times"></i>
                            Bỏ sản phẩm
                        </button>
                    </p>
                </div>
            </div>
            <div style="width: 15%" class="text-center">
                <div class="item-price">
                    <span class="price price-change">${format(item.price)}</span>
                </div>
            </div>
            <div style="width: 15%;">
                <div class="item-count">
                    <div class="custom-btn-number">
                        <button class="btn-cts btn-minus" onClick="cartLS.quantity(${item.id},-1)">-</button>
                        <input type="text" id="qty" value="${item.quantity}">
                        <button class="btn-cts btn-plus" onClick="cartLS.quantity(${item.id},1)">+</button>
                    </div>
                </div>
            </div>
            <div style="width: 15%" class="text-center">
                <span class="cart-price">
                    <span class="price">${format(item.quantity * item.price)}</span>
                </span>
            </div>
        </div>`).join("")

    $totalModal.innerHTML = format(cartLS.total())
    $countItemsDesktop.innerHTML = cartLS.totalCount()
    $countItemsMobile.innerHTML = cartLS.totalCount()
}
renderCartModal(cartLS.list())
cartLS.onChange(renderCartModal)

