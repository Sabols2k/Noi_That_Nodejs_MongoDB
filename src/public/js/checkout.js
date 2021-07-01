// =============================================
        // VALIDATE INPUT
        // =============================================
        Validator({
            form: '#form-4',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#fullname', 'Vui lòng nhập họ tên của bạn!'),
                Validator.isRequired('#phoneNumber', 'Vui lòng nhập số điện thoại!'),
                Validator.isPhoneNumber('#phoneNumber', 'Số máy quý khách vừa nhập là số không có thực!'),
                Validator.isRequired('#email', 'Vui lòng nhập email!'),
                Validator.isEmail('#email'),
            ]
        })

        // =============================================
        // SELECT-COUNTRY
        // =============================================
        var stateObject = {
                    "TP Hồ Chí Minh": {
                    "Quận 1": ["Phường Đa Kao", "Phường Bến Nghé"],
                    "Quận 2": ["Phường Thảo Điền", "Phường An Phú"],
                    "Quận 3": ["Phường ", "Phường "],
                    "Quận 4": ["Phường ", "Phường "],
                    "Quận 5": ["Phường ", "Phường "],
                    "Quận 6": ["Phường ", "Phường "],
                    "Quận 7": ["Phường ", "Phường "],
                    "Quận 8": ["Phường ", "Phường "],
                    "Quận 9": ["Phường ", "Phường "],
                }, 
            }
        window.onload = function () {

                var city = document.getElementById("city"),
                district = document.getElementById("district"),
                ward = document.getElementById("ward");

                for (var country in stateObject) {
                    city.options[city.options.length] = new Option(country, country);
                }
                city.onchange = function () {
                    district.length = 1; 
                    ward.length = 1; 

                    if (this.selectedIndex < 1) return; 
                    for (var state in stateObject[this.value]) {
                        district.options[district.options.length] = new Option(state, state);
                    }
                }
                city.onchange();
                
                district.onchange = function () {
                    ward.length = 1; 

                    if (this.selectedIndex < 1) return; // done
                    var district = stateObject[city.value][this.value];

                    for (var i = 0; i < district.length; i++) {
                        ward.options[ward.options.length] = new Option(district[i], district[i]);
                    }
                }
            }


        // =============================================
        // RENDER FROM CART LOCAl-STORAGE
        // =============================================
        function format(n) {
            return (n * 1000).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND'
            })
        }
        function render(items){
            // console.log(items);
        }
        var data = [];
        var total;
        function renderCartCheckout(items) {
            
            const $cartCheckout = document.querySelector("#order-summary")
            const $totalCheckout = document.querySelector(".total")
            const $totalCheckoutPrice = document.querySelector(".total.amount")
            const $countItemsCheckout = document.querySelector(".count-item")
            console.log($totalCheckout);
            // console.log(items)
            // req.session.pricetotal=$totalCheckout
            const formData = {
                cartCheckout: $cartCheckout
            }
            console.log(formData)
            $cartCheckout.innerHTML = items.map((item) => `
                <tr>
                    <th class="product-image">
                        <div class="product-thumbnail">
                            <div class="product-thumbnail-wrapper">
                                <img src="../img/All-products/${item.img}.jpg" alt="">
                            </div>
                            <span class="product-thumbnail-quantily">${item.quantity}</span>
                        </div>
                    </th>
                    <th class="product-description">
                        <span class="product-description-name">
                            ${item.name}
                        </span>
                    </th>
                    <th class="product-price">
                        ${format(item.price)}
                    </th>
                </tr>`).join("")

            $totalCheckout.innerHTML = format(cartLS.total())
            // console.log(cartLS.total())
            total = cartLS.total();
            console.log(total)
            $totalCheckoutPrice.innerHTML = format(cartLS.total() + 40)
            $countItemsCheckout.innerHTML = '(' + cartLS.totalCount() + ' sản phẩm)'

        }


        renderCartCheckout(cartLS.list())
        cartLS.onChange(renderCartCheckout)
        
        // =============================================
        // MAIL PRODUCT TO CUSTOMER
        // =============================================
        function showToastWarn() {
            toast({
                title: 'Warning',
                message: 'Vui lòng nhập thông tin của bạn!',
                type: 'warn',
                duration: 3000
            })
        }

        function showToastSuccess() {
            toast({
                title: 'Success',
                message: 'Đã gửi tới email của bạn!',
                type: 'success',
                duration: 3000
            })
        }

        // =============================================
        // RENDER CART TO EMAIL
        // =============================================
        var bd

        function cartMail(items) {

            const totalCheckout = document.querySelector("#total")
            const totalCheckoutMail = format(cartLS.total(totalCheckout))
            
            const item = Array.from(items).map(item => `
                <tbody>
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${format(item.price)}</td>
                        </tr>
                </tbody>
                `).join('');
                bd = `  Xin chào, đơn hàng của Anh/chị đã được tiếp nhận, chúng tôi sẽ nhanh chóng liên hệ với Anh/chị.<br><br>
                        <table style="width:500px; text-align:center" cellspacing=”0” cellpadding=”0” width=”640” align=”center” border=”1”>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>` + item + `<tfoot>
                                <tr>
                                    <th colspan="2">
                                        <div class="text-left">
                                            <h4 style="color: #f68e2e;margin-top: 13px">Tổng tiền cần thanh toán:</h4>
                                        </div>
                                    </th>
                                    <th>
                                        <span class="pl-2" style="color: #f68e2e; font-size: 18px;" id="total">`+totalCheckoutMail+`</span>
                                    </th>
                                </tr>
                            </tfoot>
                        </table> `
                
        }
        cartMail(cartLS.list())
        console.log(bd)
            
        function sendEmail(items) {
            console.log("sendEmail")
            // console.log(cartLS.list())

            const name= document.querySelector('#fullname').value;
            const email= document.querySelector('#email').value;

            if(email==='' || name===''){
                showToastWarn()
                return;
            }

            Email.send({

                Host: "smtp.gmail.com",
                Username: "evofurniture.vlog@gmail.com",
                Password: "Da123456",
                From: "evofurniture.vlog@gmail.com",
                To: email,
                Subject: "Xác nhận đơn hàng: ",
                Body: bd

            }).then(  
                message => showToastSuccess().then(
                    window.location="http://localhost:3000/account"
                
                )
                
               
            );
             // cartLS.add({id: 2, name: "Product 2", price: 100}, 2)
             console.log("sendEmail")
             const data = [];
             data.push({totalPrice: cartLS.total()})
             data.push(cartLS.list())
             console.log(data)
             $.ajax({
                 type: "POST",
                 url: "http://localhost:3000/checkout/create",
                 data:  JSON.stringify(data),
                 contentType: 'application/json',
                 encode: true,
             }).done(function(res){
               
             } )

             cartLS.destroy();


            
            


        }
        sendEmail(cartLS.list())
        

       