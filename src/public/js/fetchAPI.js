// =============================================
// API-ALL-PRODUCT 
// =============================================
var productAPI = 'http://localhost:3000/products'
function start() {
    getProducts(renderProducts)
}
start()
function getProducts(callback) {
    fetch(productAPI)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function renderProducts(products) {
    var listProductsBlock = document.querySelector('#list-product')
    console.log(listProductsBlock)
    var htmls = products.map(function(product) {
        return `
            <div class="evo-product-block-item">
                <div class="product-img">
                    <a href="">
                        <img class="img-prd" src="./assets/img/All-products/${product.img}.jpg" alt="">
                    </a>
                </div>
                <div class="button-add">
                    <button>
                        <i class="far fa-check-square"></i>
                    </button>
                    <button class="btn-cart" onClick="cartLS.add({id: ${product.id}, name: '${product.name}', img:'${product.img}', price: ${product.price}})">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
                <div class="product-detail">
                    <div class="pro-brand">
                        <a href="">Evo Nội Thất</a>
                    </div>
                    <h3>
                        <a href="" class="pro-name">${product.name}</a>
                    </h3>
                    <p class="pro-price">${product.price}</p>
                </div>
            </div>`
    })
    listProductsBlock.innerHTML = htmls.join('')
}