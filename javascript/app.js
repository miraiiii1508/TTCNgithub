const listData =[
     {
        id:1,
        image:"image/img01.webp",
        name:"Sản Phẩm 1",
        price:1000,
        quatity:10
    },
    {
        id:2,
        image:"image/img18.webp",
        name:"Jordan 1 Retro High OG Spider-Man Across the Spider-Verse",
        price:1000,
        quatity:10
    },
    {
        id:3,
        image:"image/img02.webp",
        name:"Sản Phẩm 3",
        price:1000,
        quatity:10
    }, 
    {
        id:4,
        image:"image/img03.webp",
        name:"Sản Phẩm 4",
        price:1000,
        quatity:10
    },
    {
        id:5,
        image:"image/img04.webp",
        name:"Sản Phẩm 5",
        price:1000,
        quatity:10
    },
    {
        id:6,
        image:"image/img05.webp",
        name:"Sản Phẩm 6",
        price:1000,
        quatity:10
    },
 {
        id:7,
        image:"image/img06.webp",
        name:"Sản Phẩm 7",
        price:1000,
        quatity:10
    },
   {
        id:8,
        image:"image/img08.webp",
        name:"Sản Phẩm 8",
        price:1000,
        quatity:10
    }

]
 const clickCart = document.querySelector('.item-cart i')
 const clickHome = document.querySelector('.item-home a')
 const areaCart = document.querySelector('.list__cart')
 const areaProducts = document.querySelector('.list__product')
 const  overlay = document.querySelector('.overlay__customer--form')
 const keyLocalStorateListSP =  "DANHSACHSANPHAM";
 const keyLocalStorateItemCART = "DANHSACHITEMCART";
 const cartEmpty = document.querySelector('.cart__empty');
 const cartSection = document.querySelector('.cart_section')
 const billSection = document.querySelector('.bill_section')
 const btnBill = document.querySelector('.item-bills a')
 const btnBack = document.querySelectorAll('.btn_backtomenu')
 var newArrItemInCart = JSON.parse(localStorage.getItem(keyLocalStorateItemCART)) || [];
var btnAddItem;

const saveData = ()=>{
    var convertList = JSON.stringify(listData)
    if(listData != null){
        localStorage.setItem(keyLocalStorateListSP,convertList)
    }
}
const renderItem = ()=>{
    var arrGetItem = JSON.parse(localStorage.getItem(keyLocalStorateListSP))
    const renderLocation = document.querySelector('.list__product')
    var htmls = arrGetItem.map(item =>{
        return `<li class="product--item">
        <div class="item-image">
            <img class="image" src="${item.image}" alt="">
            <i id="${item.id}" class="fa-solid fa-cart-arrow-down btn__addToCart"></i>
        </div>
        <div class="item-decription">
        <div class="item-name">
            <span>${item.name}</span>
        </div>
        <div class="item-detail">
            <span>$${item.price}</span>
            <span>Quality:${item.quatity}</span>
        </div>
        </div>
        
    </li>`
    }).join('')
    renderLocation.innerHTML = htmls
}
const addItemCart = ()=>{   
    var getItemInListSP = JSON.parse(localStorage.getItem(keyLocalStorateListSP))
    btnAddItem = document.querySelectorAll('.btn__addToCart');  
    btnAddItem.forEach(btn =>{
        btn.onclick = ()=>{
           
       var id = parseInt(btn.getAttribute('id'))
       const filteredItem = getItemInListSP.filter(item => item.id === id);
        filteredItem.map(item =>{
        const listId = item.id
        const  listName  =  item.name;
        const  listimage  =  item.image;
        const  listprice  =  item.price;
        var objectItemInCart =  {
            idItemInCart : listId ,
            imageItemInCart: listimage,
            nameItemInCart: listName,
            priceItemInCart: listprice,
            qualityItemInCart :1,
            
       }
       const checkItemInArray = newArrItemInCart.find(item => item.idItemInCart === objectItemInCart.idItemInCart);
        if (checkItemInArray) {
        checkItemInArray.qualityItemInCart += 1;
        } else {
          
        newArrItemInCart.push(objectItemInCart);   
        localStorage.setItem(keyLocalStorateItemCART, JSON.stringify(newArrItemInCart));
        }
          localStorage.setItem(keyLocalStorateItemCART,JSON.stringify(newArrItemInCart))
          onsubmits(newArrItemInCart);
            getItemCount()
            getItemInCart()
            getPricesUI()
            addSucces();
            cartEmpty.classList.add('none')
           
       })
        }
    })
}
const getItemInCart = ()=>{
    const getListCart = document.querySelector('.list__cart')
    var converItemInCart = JSON.parse(localStorage.getItem(keyLocalStorateItemCART))
    if (converItemInCart && converItemInCart.length > 0) {
        var htmls = converItemInCart.map(item =>{
            return `
            <ul class="cartitem">
            <li class="cartItem--name">
                <div class="cartitem--producdecription">
                    <img src="${item.imageItemInCart}" alt="">
                    <div class="caritem--detail">
                        <span class="detail--name">${item.nameItemInCart}</span>
                        <span>Quatity :${item.qualityItemInCart}</span>
                    </div>
                  
                </div>
            </li>
            <li class="cartItem--handlequatity">
               
                <div class="quatity--handle">
                    <button id ="${item.idItemInCart}" class="btn__minus">-</button>
                    <input class="text__quatity" type="text" value="${item.qualityItemInCart}">
                    <button id ="${item.idItemInCart}" class="btn__plus">+</button>
                </div>
            </li>
            <li class="cartItem--subtotal">
                
                <span class="subtotal--money">${item.priceItemInCart}</span>
            </li>
            <li class="cartItem--total">
                <span class="total--money">${item.priceItemInCart}</span>
            </li>
            <li class="cartItem--clear">
                <i id ="${item.idItemInCart}" class="fa-regular fa-circle-xmark btn__delete"></i>
            </li>
        </ul>`
        }).join('')
       
        if (getListCart && getListCart.children[1]) {
            getListCart.children[1].innerHTML= htmls;
          
          }
          else{
            cartEmpty.classList.remove('none')
          }
        }
        
    else {

        getListCart.classList.add('none')
        cartEmpty.classList.remove('none')
        }
        
        let btnPlus = document.querySelectorAll('.btn__plus')
        let btnMinus =document.querySelectorAll('.btn__minus')
        let textQuatity = document.querySelectorAll('.text__quatity')
  
        btnPlus.forEach(button => {
            button.onclick = ()=> {
                
                let itemId = parseInt(button.getAttribute('id'));
                let item = converItemInCart.find(item => item.idItemInCart === itemId);
                if(item){
                    item.qualityItemInCart +=1;
                    localStorage.setItem(keyLocalStorateItemCART, JSON.stringify(converItemInCart));
                    getItemInCart();
                    getPricesUI()
                   
                }
            };
        });
        btnMinus.forEach(button => {
            button.onclick = ()=> {
                
                let itemId = parseInt(button.getAttribute('id'));
                let item = converItemInCart.find(item => item.idItemInCart === itemId);
                if(item){

                    if(item.qualityItemInCart ===1){
                        
                    }
                    else{
                        item.qualityItemInCart -=1;
                        localStorage.setItem(keyLocalStorateItemCART, JSON.stringify(converItemInCart));
                        getItemInCart();
                        getPricesUI() 
                    }
                }
            };
        });
        textQuatity.forEach(txt => {
            txt.oninput = ()=> {
              let itemId = parseInt(txt.parentNode.querySelector('.btn__plus').getAttribute('id'));
              let item = converItemInCart.find(item => item.idItemInCart === itemId);
              if (item) {
                let value = parseInt(txt.value);
                if (value === 0 || isNaN(value) || value < 0) {
                  txt.value = item.qualityItemInCart; // Đặt lại giá trị ban đầu
                  return; // Không thực hiện các thao tác tiếp theo
                }
                item.qualityItemInCart = value;
                localStorage.setItem(keyLocalStorateItemCART, JSON.stringify(converItemInCart));
                getItemInCart();
                getPricesUI();
              }
            };
        });
        Delete();
        
}
const Delete = ()=>{
    let popupDelete = document.querySelector('.overlay__message--delete')
    let messageBtn = document.querySelector('.message--btn button:nth-child(1)')
    let messageCancel = document.querySelector('.message--btn button:nth-child(2)')
    var arrayItem = JSON.parse(localStorage.getItem(keyLocalStorateItemCART))
    let btnDelete = document.querySelectorAll('.btn__delete')
    btnDelete.forEach(button =>{
        button.onclick = ()=>{
            popupDelete.classList.remove('none')
            messageBtn.onclick =()=>{
                const itemId = parseInt(button.getAttribute('id'))
                let item = arrayItem.findIndex(item =>item.idItemInCart === itemId)
                if(item !== -1){
                    arrayItem.splice(item,1)
                 
                }
                newArrItemInCart = arrayItem
                localStorage.setItem(keyLocalStorateItemCART, JSON.stringify(newArrItemInCart));
                getItemInCart();
                getPricesUI();
                getItemCount()
                popupDelete.classList.add('none')
            }
          
        }
    })
    messageCancel.onclick = ()=>{
        popupDelete.classList.add('none')
    }
}
const totalItem = ()=>{
    var getItemInLocalStorate = JSON.parse(localStorage.getItem(keyLocalStorateItemCART))||[]
    const totalProducts = getItemInLocalStorate.reduce((sum, product) => sum + product.qualityItemInCart, 0);
    const totalPrices  = getItemInLocalStorate.reduce((sum , product) => sum +product.priceItemInCart*product.qualityItemInCart,0)
    const results = new Map();
    results.set('totalProducts' , totalProducts);
    results.set('totalPrices',totalPrices)
    return results;
    
}
const getPricesUI = ()=>{
    const total = totalItem();
    var cartPrices = document.querySelector('.cartprices');
    var htmls = `<Span>Total : $${total.get('totalPrices')}</Span>
    <input type="button" value="Buy">`
    cartPrices.innerHTML = htmls
    handleClick() 

}
const getItemCount = ()=> {
    var existingElement = document.querySelector('.item-cart__count');
    var newArrItemInCart = JSON.parse(localStorage.getItem(keyLocalStorateItemCART)) ||[];
    var count = newArrItemInCart.length;
    existingElement.innerHTML = count;
    existingElement.textContent = count > 0 ? count : '0'
};
const handleClick=()=>{
  
    const btnBuy = document.querySelector('.cartprices input')
    clickCart.onclick = ()=>{
        cartSection.classList.remove('none')
        let itemLocal = JSON.parse(localStorage.getItem(keyLocalStorateItemCART))
        if(itemLocal && itemLocal.length !== 0 ){
            areaCart.classList.remove('none');
            cartEmpty.classList.add('none')
        }
        else{
            cartEmpty.classList.remove('none');
        }
        areaProducts.classList.add('none')
        billSection.classList.add('none')
    
     }
  
    clickHome.onclick  =()=>{
        areaProducts.classList.remove('none')
        cartSection.classList.add('none')
        billSection.classList.add('none')
     }
     btnBuy.onclick=()=>{
        overlay.classList.remove('none')
     }
     btnBill.onclick = ()=>{
        billSection.classList.remove('none')
        areaProducts.classList.add('none')
        cartSection.classList.add('none')
     }
     btnBack.forEach(btn =>{
        btn.onclick = ()=>{
            areaProducts.classList.remove('none')
        cartSection.classList.add('none')
        billSection.classList.add('none')
        }
     })
}
const toast =({title = '', type = '' ,icon= '' , msg = '' , duration = 1000})=>{
    const testmain = document.querySelector('.toast__message')
    if(testmain){
        const toast = document.createElement("div")
        const delay = (duration/1000).toFixed(2)
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.classList.add('message' , `message--${type}`)
        toast.innerHTML = `<i class="${icon} ${type}"></i>
        <div>
            <div class="message__title ${type}">${title}</div>
        <div class="message__content">${msg}</div>
        </div>`
        testmain.appendChild(toast)
        setTimeout(function(){
            testmain.removeChild(toast)
        },duration+1000)
    }
}
const addSucces =()=>{
    toast({
        title : 'Thành Công !',
        msg : 'Đã thêm sản phẩm vào giỏ hàng',
        icon :'fa-regular fa-circle-check',
        type: 'success'
    })

} 

saveData()
renderItem()
getItemCount();
addItemCart()
getItemInCart();
getPricesUI()
