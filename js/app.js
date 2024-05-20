const loadPhone = (search, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}` 
    fetch(url) 
    .then(res => res.json())
    .then(data => displayPhone(data.data, dataLimit))
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phoneContainer')
    phoneContainer.innerHTML = ``;
    const showAllBtn = document.getElementById('showAll')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
        showAllBtn.classList.remove('d-none')
    }else{
        showAllBtn.classList.add('d-none')
    }
    

    // no phone massege
    const noPhone = document.getElementById('noPhoneMassege')
    if(phones.length == 0){
        noPhone.classList.remove('d-none')
    }else{
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="col">
        <div class="card p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Brand Name : ${phone.brand}</h5>
            <p>Phone Name : ${phone.phone_name}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
          </div>
        </div>
        </div>
        `; 
        phoneContainer.appendChild(phoneDiv)
    })

    toggleSpinner(false)
    
}

function processData(dataLimit){
    toggleSpinner(true)
    const inputField = document.getElementById('phoneNameInputField')
    const inputValue = inputField.value 
    loadPhone(inputValue, dataLimit); 
    // inputField.value = ''
}


document.getElementById('searchButton').addEventListener('click', function(){
    processData(10);
})

document.getElementById('phoneNameInputField').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processData(10);
    }
})

const toggleSpinner = isRunning =>{
    const loderSection = document.getElementById('loader')
    if(isRunning == true){
        loderSection.classList.remove('d-none')
    }else{
        loderSection.classList.add('d-none')
    }
}

document.getElementById('btnShowall').addEventListener('click', function(){
    processData();
})


function loadPhoneDetails(id){
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

function displayPhoneDetails(phone){
    console.log(phone)
    const phoneName = document.getElementById('phoneDetailsModalLabel')
    phoneName.innerText = phone.name; 

    const phoneDetails = document.getElementById('phone-details') 
    phoneDetails.innerHTML = `
        <p>Brand : ${phone.brand}</p>
        <p>Phone Name : ${phone.name}</p>
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <h2>mainFeatures</h2>
        <p>ChipSet : ${phone.mainFeatures.chipSet}</p>   
        <p>DisplaySize : ${phone.mainFeatures.displaySize}</p>   
        <p>Memory : ${phone.mainFeatures.memory}</p>   
        <h2>Sensors</h2>
        <p>Memory : ${phone.mainFeatures.sensors}</p> 
    `;
}


// loadPhone('apple')
// /* <p>Sensors : ${phone.sensors[]}</p>    */