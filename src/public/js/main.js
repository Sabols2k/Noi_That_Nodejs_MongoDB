// =============================================
// MENU - NAVBAR
// =============================================
const openMegaMenu = $('.open-mega-content')
const menuMega = $('.mega-content')

openMegaMenu.hover(() => {
    menuMega.toggle()
})

const openMenuBar = $('#intro-page')
const menuBar =  $('.nav-cate')
openMenuBar.hover(() => {
    menuBar.toggle()
})

// =============================================
// NEW-PRODUCT & FURNITURE-WOOD - OWL CAROUSEL
// =============================================
const owlNewProduct =  $(".owl-product")

owlNewProduct.owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    smartSpeed: 800,
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:3,
        },
        1000:{
            items:4,
            loop:false
        }
    }
})


// =============================================
// BLOGS - OWL CAROUSEL
// =============================================
const owlBlogs =  $(".owl-carousel.owl-blogs")

owlBlogs.owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    smartSpeed: 800,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        300:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:true
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        }
    }
})

// =============================================
// BRANDS - OWL CAROUSEL
// =============================================
const owlBrand =  $(".owl-carousel.owl-brands")

owlBrand.owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    smartSpeed: 800,
    responsive:{
        0:{
            items:3,
        },
        600:{
            items:5,
        },
        1000:{
            items:6,
            loop:false
        }
    }
})

// =============================================
// BUTTON - BACK-TO-TOP
// =============================================
const btnBackTop = $(".back-to-top")

jQuery(document).ready(function($){ 
    if( btnBackTop.length > 0 ) {
        $(window).scroll(() => {
            var e = $(window).scrollTop();
            if (e > 200) {
                btnBackTop.addClass('show')
            } else {
                btnBackTop.removeClass('show')
            }
        })

        btnBackTop.click(function () {
            $('body,html').animate({
                scrollTop: 0
            })
        })
    }
})

// =============================================
// SEARCH - AUTOCOMPLETE - INPUT
// =============================================
// const searchAuto =  $( "#tags" )
// console.log(searchAuto)

// $( function() {
//     var availableTags = [
//       "Bàn",
//       "Bộ bàn ăn",
//       "Giường",
//       "Ghế",
//       "Tủ",
//       "Sofa",
//       "Ghế phòng khách",
//       "Nệm",
//       "Đồng hồ",
//       "Khung & Tranh ảnh",
//       "Tinh dầu & Túi thơm",
//       "Nến",
//       "Đồ dùng văn phòng",
//     ];
//     searchAuto.autocomplete({
//       source: availableTags
//     });
//   } );

// =============================================
// ALL-PRODUCT - CATEGORY-OWL-CAROUSEL
// =============================================
const owlCategory =  $(".owl-carousel.owl-category")

owlCategory.owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    smartSpeed: 800,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:4,
            nav:true
        },
        1000:{
            items:6,
            nav:true,
            loop:false
        },
    }
})


// =============================================
// OPEN-MENU - SIDEBAR
// =============================================
const dropMenu = $(".dropdown-menu1")
const plus =  $(".nav-item")

plus.click(() => {
    dropMenu.toggle()
})

// =============================================
// RELATED-PRODUCT - OWL-CAROUSEL-CENTER
// =============================================
const owlRelated =  $(".owl-carousel.owl-related-product")

owlRelated.owlCarousel({
    
    loop: false,
    loop:true,
    margin:10,
    responsive:{
        0:{
            items:2,
        },
        1000:{
            items:3,
            loop: false
        }
    }
})

// =============================================
// TAB-UI-PRODUCT 
// =============================================

const tabs = document.querySelectorAll('.tab-item')
const panes = document.querySelectorAll('.tab-pane')
const tabActive = document.querySelector('.tab-item.active')
const line = document.querySelector('.tabs .line')

line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

tabs.forEach((tab, index) => {
    const pane = panes[index]

    tab.onclick = function() {
        const tabActive = document.querySelector('.tab-item.active')
        const tabPane = document.querySelector('.tab-pane.active')

        tabActive.classList.remove('active')
        tabPane.classList.remove('active')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'

        this.classList.add('active')
        pane.classList.add('active')
    }
})


// =============================================
// DETAIL-PRODUCT - OWL-CAROUSEL
// =============================================
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

}
