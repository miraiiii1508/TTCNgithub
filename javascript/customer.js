const createdId = ()=>{
    let characterId = `QWERTYUIOPASDFGHJKLZXCVBNM0123456789`
    const randomId =()=>{
        
        let id ='';
        for(let i =0; i<16 ;i++)
        {
            let randomCharacter =  characterId[Math.floor(Math.random()*characterId.length)]
            id +=randomCharacter
        }
        return id;
    }
    const checkId = (id) => {
        let check = new Set();
        let hasId = id;
        check.add(hasId);
        if (check.has(hasId)) {
          hasId = randomId();
        }
        return hasId;
      }
    
      let id = randomId();
      let checkedId = checkId(id);
      return checkedId;
}
const id = createdId()
const getItemInCart1 = JSON.parse(localStorage.getItem('DANHSACHITEMCART'))
let createObj = ( arr,firstName ,lastName,mail , 
  phone , provices1,district1,wards1, moreAddress,
  message,totalPrices,dateBuy,quatityBuy) =>{
    const newObj={};
    newObj.id = createdId();
    newObj.name = firstName+" "+lastName;
    newObj.mail = mail
    newObj.phone = phone;
    newObj.address = moreAddress+"-"+wards1+"-"+district1+"-"+provices1;
    newObj.message= message
    newObj.array =  arr;
    newObj.totalPrices ="$"+totalPrices;
    newObj.dateBuy = dateBuy
    newObj.quatityBuy = quatityBuy
    return newObj
}


const testBill = document.querySelector('.list_bill')
const formHandle = document.querySelector('.form')
const btnCancel  = document.querySelector('.btn_cancel')
const hoInput = document.querySelector('.input_wrapper input:nth-child(1)');
const TenInput = document.querySelector('.input_wrapper input:nth-child(2)');
const emailInput = document.querySelector('.input_mail input');
const phoneInput = document.querySelector('.input_phone input');
const addressInput = document.querySelector('.form_addredss input');
const messageInput = document.querySelector('.input_message textarea');
const keyLocalStorateListBill ="DANHSACHBILL"
let newArr1 = JSON.parse(localStorage.getItem(keyLocalStorateListBill)) || []
  const onsubmits =(arr)=>{
    formHandle.onsubmit = function(e) {
      e.preventDefault();
          const total = totalItem();
          const valueFirstName = hoInput.value;
          const valueLastName = TenInput.value;
          const valueEmail = emailInput.value;
          const valuePhone = phoneInput.value;
          const valueAddress = addressInput.value;
          const valueProvince = getElementProvice.options[getElementProvice.selectedIndex].textContent;
          const valueDistrict = getElementDistrict.options[getElementDistrict.selectedIndex].textContent;
          const valueWard = getElementWadrs.options[getElementWadrs.selectedIndex].textContent;
          const valueMessage = messageInput.value;
          const date = new Date();
          const newObj = createObj(
            arr,
              valueFirstName,
              valueLastName,
              valueEmail,
              valuePhone,
              valueProvince,
              valueDistrict,
              valueWard,
              valueAddress,
              valueMessage,
              total.get('totalPrices'),
              date.getDate()+"-"+(date.getMonth()+1) +"-"+date.getFullYear(),
              total.get('totalProducts')
            );
            alert("Thêm đơn thành công !")
              newArr1.push(newObj)
              saveBill(newArr1);
              newArrItemInCart = []
              localStorage.removeItem("DANHSACHITEMCART")
              console.log(newArrItemInCart)
              getItemInCart();
              getPricesUI();
              getItemCount()
              overlay.classList.add('none');
              areaProducts.classList.remove('none')
              cartEmpty.classList.add('none')
              resetForm()
              resetDistrict()
              replaceOption(getElementWadrs)
              resetWard();
              bill()
    }
  }
  const resetForm = ()=>{
    hoInput.value = ''
    TenInput.value = ''
    emailInput.value = ''
    phoneInput.value = ''
    addressInput.value =''
  }
  const saveBill =(arr)=>{
    const convertBill = JSON.stringify(arr)
    if(arr!=null){
        localStorage.setItem(keyLocalStorateListBill,convertBill)
    }
  }
  btnCancel.addEventListener('click', function(event) {
    event.preventDefault();
    formHandle.reset();
    overlay.classList.add('none');
    getElementDistrict.selectedIndex = 0;
    getElementDistrict.innerHTML = '';
    resetDistrict()
    replaceOption(getElementWadrs)
    resetWard();
  });
onsubmits();

const bill = ()=>{

  const getBill = JSON.parse(localStorage.getItem(keyLocalStorateListBill))
  if(getBill && getBill.length >0){
    let htmls =  getBill.map(item =>{
      return  ` <ul class="bill__product">
      <span class="id--product">${item.id}</span>
      <span class="customer_name--product">${item.name}</span>
      <span class="date--product">${item.dateBuy}</span>
      <span class="item--product">${item.array.length}</span>
      <span class="total__quatity--product">${item.quatityBuy}</span>
      <span class="price--product">${item.totalPrices}</span>
      <span class="return--product">Return</span>
      </ul>`
    }).join('')
    billSection.children[1].innerHTML= htmls
   
  }
  else {
      billSection.classList.add('none')
  }
}
bill()













