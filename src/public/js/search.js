function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

$('#search-form').submit(function (e) {
    e.preventDefault()
    const query = $('#search-form input[name=query]').val()
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/search/${query}`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        if (Array.from(res.product).length != 0) {
            // $('.no-result').css('display', 'none')
            console.log('no-result')
            render(res.product)
        } else {
            console.log('false')
            $('#list-products-search').html('')
            // $('.no-result').css('display', 'block')
        }
    })
})


function render(arr) {
    $('#list-products-search').html('')
    Array.from(arr).forEach(item => {
        $('#list-products-search').append(`
            <div class="col-xs-6 col-sm-4 col-md-15">
                <div class="evo-product-block-item ">
                    <div class="product-img">
                        <a href="/detail-sanpham">
                            <img class="img-prd" src="../img/All-products/${item.img}.jpg" alt="">
                        </a>
                    </div>
                    <div class="button-add">
                        <button>
                            <i class="far fa-check-square"></i>
                        </button>
                        <button class="btn-cart" type="submit"
                        data-bs-toggle="modal" data-bs-target="#cartModal" onClick="cartLS.add({id: ${item._id}, name: '${item.name}', img:'${item.img}', price: ${item.price}})">
                            <i class="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                    <div class="product-detail">
                        <div class="pro-brand">
                            <a href="">Evo Nội Thất</a>
                        </div>
                        <h3>
                            <a href="/detail-sanpham" class="pro-name">${item.name}</a>
                        </h3>
                        <p class="pro-price">${item.price}</p>
                    </div>
                </div>
            </div>
        `)
    })
}