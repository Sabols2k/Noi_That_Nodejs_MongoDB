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
        function renderCartCheckout(items) {
            const $cartCheckout = document.querySelector("#order-summary")
            const $totalCheckout = document.querySelector(".total")
            const $totalCheckoutPrice = document.querySelector(".total.amount")
            const $countItemsCheckout = document.querySelector(".count-item")
            
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
            
        function sendEmail() {
            
            const name= document.querySelector('#fullname').value;
            const email= document.querySelector('#email').value;

            if(email==='' || name===''){
                showToastWarn()
                return;
            }

            const bd="Hi " +name+", đơn hàng của bạn đã được đăng kí thành công."

            Email.send({

                Host: "smtp.gmail.com",
                Username: "minhchuong.org@gmail.com",
                Password: "mchuong145",
                From: "minhchuong.org@gmail.com",
                To: email,
                Subject: "Xác nhận đơn hàng: PHIEU ",
                Body: bd

            }).then(  
                message => alert("mail sent successfully")
            );
        }
