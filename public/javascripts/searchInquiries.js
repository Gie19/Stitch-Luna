const searchAllInquiries = (event) => {
    const searchTerm = event.target.value.toLowerCase() || '';

    let inquiriesCards = document.getElementsByClassName('inquire-container');
    let inquiriesNameElements = document.getElementsByClassName('inquire-username');
    let noInquiriesFound = document.querySelector('.no-item-found');

    let inquiriesFound = false;

    for (let i = 0; i < inquiriesNameElements.length; i++) { //loops through all productNames for every input inside the searchbar.
        let inquiryName = inquiriesNameElements[i].innerText.trim().toLowerCase(); 
        let inquiryNameFirstLetter = inquiryName.length > 0 ? inquiryName[0] : '';
        let searchTermFirstLetter = searchTerm.length > 0 ? searchTerm[0] : '';  

    
        if (searchTerm === '' || (inquiryName.includes(searchTerm) && inquiryNameFirstLetter === searchTermFirstLetter)) //displays matching outputs conisting of product cards derived from the searchBar input
        {
            noInquiriesFound.style.display = "none";
            inquiriesCards[i].style.display = "grid";
            inquiriesFound = true; 
        } 
        else //hides all incompatible product cards
        {
            inquiriesCards[i].style.display = "none";
        }
    }

    if (!inquiriesFound) //displays no item found banner if no matches were found.
    {
        noInquiriesFound.style.display = "flex";
    }


};



const searchInput = document.querySelector('input[type="search"]').addEventListener('input', searchAllInquiries)