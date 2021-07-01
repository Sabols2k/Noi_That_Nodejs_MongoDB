function format(n) {
  return (n * 1000).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
}

const products = [
  {
    id: 1,
    img: "giuong-ngu-go",
    name: "Giường ngủ gỗ chất lượng cao cho gia đình",
    price: "300",
  },
  {
    id: 2,
    img: "gia-sach-go",
    name: "Giá sách gỗ tự nhiên thiết kế đẹp",
    price: "350",
  },
  {
    id: 3,
    img: "tu-bep-gia-dinh",
    name: "Tủ bếp gia đình gỗ sồi tự nhiên thiết kế hiện đại",
    price: "400",
  },
  {
    id: 4,
    img: "tu-bep-go-hien-dai",
    name: "Tủ bếp gỗ tự nhiên thiết kế đa năng đẹp hiện đại",
    price: "550",
  },
  {
    id: 5,
    img: "tu-bep-go-hien-dai",
    name: "Tủ bếp gỗ tự nhiên thiết kế đa năng đẹp hiện đại",
    price: "550",
  },
];

$("#search-form").submit(function (e) {
  e.preventDefault();
  const query = $("#search-form input[name=query]").val();
  console.log(query);

  let searchByName = (str) => products.filter(({ name }) => name.includes(str));
  const productsResult = searchByName(query);
  console.log(productsResult);

  function render(productsResult) {
    const listProductSearch = document.querySelector("#list-products-search");
    const html = productsResult.map(
      (product) => `   
                        <div class="col-xs-6 col-sm-4 col-md-15">
                            <div class="evo-product-block-item ">
                                <div class="product-img">
                                    <a href="/detail-sanpham">
                                        <img class="img-prd" src="./assets/img/All-products/${
                                          product.img
                                        }.jpg" alt="">
                                    </a>
                                </div>
                                <div class="button-add">
                                    <button>
                                        <i class="far fa-check-square"></i>
                                    </button>
                                    <button class="btn-cart" type="submit"
                                    data-bs-toggle="modal" data-bs-target="#cartModal" onClick="cartLS.add({id: ${
                                      product.id
                                    }, name: '${product.name}', img:'${
        product.img
      }', price: ${product.price}})">
                                        <i class="fas fa-shopping-bag"></i>
                                    </button>
                                </div>
                                <div class="product-detail">
                                    <div class="pro-brand">
                                        <a href="">Evo Nội Thất</a>
                                    </div>
                                    <h3>
                                        <a href="/detail-sanpham" class="pro-name">${
                                          product.name
                                        }</a>
                                    </h3>
                                    <p class="pro-price">${format(
                                      product.price
                                    )}</p>
                                </div>
                            </div>
                        </div>`
    );
    listProductSearch.innerHTML = html.join("");
  }

  if (Array.from(productsResult).length != 0) {
    render(productsResult);
    $("#result-title").css("display", "block");
    $("#no-result-title").css("display", "none");
  } else {
    render(productsResult);
    $("#no-result-title").css("display", "block");
    $("#result-title").css("display", "none");
  }
});
