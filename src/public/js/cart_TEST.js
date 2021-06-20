const products = [
    // {
    //     img: "gia-sach-go.jpg",
    //     inCart: 0,
    //     name: "Giá sách gỗ",
    //     price: "400",
    // },
    // {
    //     img: "giuong-ngu-go.jpg",
    //     inCart: 0,
    //     name: "Giường ngủ gỗ",
    //     price: "500",
    // }, 
    // {
    //     img: "tu-bep-gia-dinh.jpg",
    //     inCart: 0,
    //     name: "Tủ bếp gia đình",
    //     price: "350",
    // }
]

function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

// function removeProduct(index) {
//     products.splice(index, 1);
//     render();
// }

// function updateQuantity(index, quantity) {
//     if (quantity < 1) {
//         return;
//     }
//     products[index].quantity = quantity;
//     render();
// }

function render() {
    
    // const listProductDesktop = $('#order_items')
    // const listProductMobile = $('#order_items_mobile')

    
    //Render JS Desktop
    // const html = products.map(item => `
    //     <tr class="cart-items">
    //         <th scope="row">
    //             <div class="image">
    //                 <img src="${item.img}" alt="" width="150" height="auto">
    //             </div>
    //         </th>
    //         <td>
    //             <div>
    //                 <a href="" class="name">${item.name}</a>
    //             </div>
    //             <div>
    //                 <button id="deleteButton" class="btn btn-link">Xóa</button>
    //             </div>
    //         </td>
    //         <td>
    //             <div class="price">
    //                 <span id="dongia">${format(item.price)}</span>
    //             </div>
    //         </td>
    //         <td>
    //             <div class="custom-btn-number">
    //                 <button id="incs"class="btn-cts btn-minus">-</button>
    //                 <input type="text" id="qty" value="${item.quantity}">
    //                 <button id="decs" class="btn-cts btn-plus">+</button>
    //             </div>
    //         </td>
    //     </tr>
    //     `)
    // //Render JS Mobile
    // const htmlMobile = products.map(item => ` 
    //     <div class="d-flex justify-content-between mb-4 cart-mobile">
    //         <div class="d-flex product-block-mobile">
    //             <div class="image">
    //                 <img src="${item.img}" alt="" width="80" height="auto">
    //             </div>
    //             <div class="product-info">
    //                 <div class="name">
    //                     <span>${item.name}</span>    
    //                 </div>
    //                 <div class="price">
    //                     <span>${format(item.price)}</span>
    //                 </div> 
    //             </div>
    //         </div>
    //         <div class="d-flex mt-4" style="flex-direction: column;">
    //             <div class="custom-btn-number">
    //                 <button id="dec2" class="btn-cts btn-minus">-</button>
    //                 <input type="text" id="qty" value="${item.quantity}">
    //                 <button id="inc2" class="btn-cts btn-plus">+</button>
    //             </div>
    //             <button id="deleteButton2" class="btn btn-link">Xóa</button>
    //         </div>
    //     </div>`)
    
    // listProductDesktop.html(html.join(''))
    // listProductMobile.html(htmlMobile.join(''))


    onLoadCartNumbers()
    displayCart()

    
    
}



// ==== CART-NUMBER ====
const add_cart = document.getElementsByClassName("btn-cart");

for (let i = 0; i < add_cart.length; i++) {
    add_cart[i].addEventListener("click", (e) => {
        const button = e.target
        const product = button.parentElement.parentElement
        const img = product.getElementsByClassName("img-prd")[0].src
        const name = product.getElementsByClassName("pro-name")[0].innerText
        const price = product.getElementsByClassName("pro-price")[0].innerText
        addItemToCart(name, price, img)
        cartNumbers(products[i])
        totalCost(products[i])
    })

    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers')
        let cartCost = localStorage.getItem('totalCost')


        if( productNumbers) {
            document.querySelector('.count_item.mobile').textContent = productNumbers
            document.querySelector('.count_item.desktop').textContent = productNumbers
            $('.count-item').text('(' + productNumbers + ' sản phẩm)')
        }

        if ( cartCost ) {
            document.querySelector('.total-price.amount').textContent = format(cartCost)
            document.querySelector('.total-price').textContent = format(cartCost)    
        }
        
       
    }

    function cartNumbers(product) {
        let productNumbers = localStorage.getItem('cartNumbers')
        productNumbers = parseInt(productNumbers)
        if ( productNumbers ) {
            localStorage.setItem('cartNumbers', productNumbers + 1)
            document.querySelector('.count_item.desktop').textContent = productNumbers + 1
            document.querySelector('.count_item.mobile').textContent = productNumbers + 1

        } else {
            localStorage.setItem('cartNumbers', 1)
            document.querySelector('.count_item.desktop').textContent = 1
            document.querySelector('.count_item.mobile').textContent = 1
        }

        setItems(product)
    }


    function setItems(product) {
        let cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)

        if (cartItems != null) {
            if (cartItems[product.name] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.name]: product
                }
            }
            cartItems[product.name].inCart += 1
        } else {
            product.inCart = 1
            cartItems = {
                [product.name]: product
            }
        }
        localStorage.setItem('productsInCart', JSON.stringify(cartItems))

        removeItem(product)
    }

    function removeItem(product) {
        //const deleteButton = document.querySelectorAll('deleteButton')
        
        let cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)
        //console.log(cartItems)
        //console.log(cartItems[product.name].name)
        const arrayProduct = Object.keys(cartItems[product.name]);
        console.log(arrayProduct)
        
        
        //const deleteButton = document.querySelectorAll("#deleteButton")
        //console.log(deleteButton)
        
        for (let i = 0; i < deleteButton.length; i++) {
            //const name = document.getElementsByClassName("pro-name")[0].textContent
            //console.log(name)
            deleteButton[i].addEventListener('click', () => {

                arrayProduct.splice(0, 1);
                
            })
        }
        
    }

    function totalCost(product) {
        let cartCost = localStorage.getItem('totalCost')
        
        if (cartCost != null) {
            cartCost = parseInt(cartCost)
            product.price = parseInt(product.price)
            //console.log('Cart-cost: ', cartCost)
            localStorage.setItem('totalCost', cartCost + product.price)
            
        } else {
            localStorage.setItem('totalCost', product.price)
        }

    }

    function displayCart() {
        let cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)
        let listProductDesktop = document.querySelector('#order_items')
        let listProductMobile = document.querySelector('#order_items_mobile')
        
        if(cartItems && listProductDesktop) {
            listProductDesktop.innerHTML = ''
            Object.values(cartItems).map(item => {
                listProductDesktop.innerHTML += `
                    <tr class="cart-items">
                        <th scope="row">
                            <div class="image">
                                <img src="${item.img}" alt="" width="150" height="auto">
                            </div>
                        </th>
                        <td>
                            <div>
                                <a href="" class="name">${item.name}</a>
                            </div>
                            <div>
                                <button id="deleteButton" class="btn btn-link">Xóa</button>
                            </div>
                        </td>
                        <td>
                            <div class="price">
                                <span id="dongia">${format(item.price)}</span>
                            </div>
                        </td>
                        <td>
                            <div class="custom-btn-number">
                                <button id="incs"class="btn-cts btn-minus">-</button>
                                <input type="text" id="qty" value="${item.inCart}">
                                <button id="decs" class="btn-cts btn-plus">+</button>
                            </div>
                        </td>
                    </tr>`
            })
        }

        if(cartItems && listProductMobile) {
            listProductMobile.innerHTML = ''
            Object.values(cartItems).map(item => {
                listProductMobile.innerHTML += `
                    <tr class="cart-items">
                        <th scope="row">
                            <div class="image">
                                <img src="${item.img}" alt="" width="150" height="auto">
                            </div>
                        </th>
                        <td>
                            <div>
                                <a href="" class="name">${item.name}</a>
                            </div>
                            <div>
                                <button id="deleteButton" class="btn btn-link">Xóa</button>
                            </div>
                        </td>
                        <td>
                            <div class="price">
                                <span id="dongia">${format(item.price)}</span>
                            </div>
                        </td>
                        <td>
                            <div class="custom-btn-number">
                                <button id="incs"class="btn-cts btn-minus">-</button>
                                <input type="text" id="qty" value="${item.inCart}">
                                <button id="decs" class="btn-cts btn-plus">+</button>
                            </div>
                        </td>
                    </tr>`
            })
        }


        
    }

   
}

function addItemToCart(name, price, img) {
    products.push({
        img: img,
        name: name,
        price: price,
        inCart: 0,
    })
    render()
    
}
render()
