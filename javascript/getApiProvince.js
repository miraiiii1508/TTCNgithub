const apiProvices = 'https://provinces.open-api.vn/api/'
const apiDistricts = 'https://provinces.open-api.vn/api/d/'
const apiWards = 'https://provinces.open-api.vn/api/w/'
const getElementProvice = document.querySelector('.province')
const getElementDistrict = document.querySelector('.district')
const getElementWadrs = document.querySelector('.wards')
const getApiProvices  = async()=>{
    try{ 
        const response =await fetch(apiProvices);
        let data = await response.json()
        return data;
    }
    catch(e){
        console.log(e.message)
    }
   
}
const getApiDistrict = async()=>{
    try{
    const response = await fetch(apiDistricts)
    const data = await response.json()
    return data;
    }
    catch(e){
        console.log(e.message)
    }
}
const getApiWards = async() =>{
    try{
    const response = await fetch(apiWards)
    const data = await response.json();
    return data;
    }
    catch(e){
        console.log(e.message)
    }
}
getApiProvices().then(data =>{
    if(data)
    {
        data.map(item =>{
            let option = document.createElement("option")
            option.value= `${item.code}`
            option.text = `${item.name}`
            getElementProvice.add(option)
        })
    } 
})


getApiDistrict().then(data =>{
    if(data){
        getElementProvice.onchange = ()=>{
          
             codeProvices = parseInt(getElementProvice.value)
            let getDistrict = data.filter(item => item.province_code === codeProvices)
            replaceOption(getElementDistrict)
            resetDistrict()
            replaceOption(getElementWadrs)
            resetWard();
            getDistrict.map(item => {
              
                let option = document.createElement('option')
                option.value = `${item.code}`
                option.text = `${item.name}` 
                getElementDistrict.add(option)    
            })
        }
        
        
    }
})
getApiWards().then(data=>{

    if(data){
        getElementDistrict.onchange = function(){
            let codeDistrict = parseInt(getElementDistrict.value)
            const arrWards = data.filter(item => item.district_code === codeDistrict)
            replaceOption(getElementWadrs)
            resetWard()
            arrWards.map(item =>{
                let option = document.createElement('option')
                option.value =`${item.code}`
                option.text= `${item.name}`
                getElementWadrs.add(option)
            })
           
        }
    }
  
})
const replaceOption = (selecElement)=>{
    while(selecElement.firstChild){
        selecElement.firstChild.remove()
    }
}

const resetDistrict = ()=>{
    
            let defaultOptionDistrict = document.createElement('option');
            defaultOptionDistrict.value = "";
            defaultOptionDistrict.text = "Chọn quận/huyện";
            defaultOptionDistrict.disabled = true;
            defaultOptionDistrict.selected = true;
            getElementDistrict.add(defaultOptionDistrict);
}
const resetWard = ()=>{
    let defaultOptionWards = document.createElement('option');
    defaultOptionWards.value = "";
    defaultOptionWards.text = "Chọn Xã/Phường";
    defaultOptionWards.disabled = true;
    defaultOptionWards.selected = true;
    getElementWadrs.add(defaultOptionWards);
}