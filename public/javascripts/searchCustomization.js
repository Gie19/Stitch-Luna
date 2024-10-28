const searchAllCustomizations = (event) => {
    const searchTerm = event.target.value.toLowerCase() || '';

    let customCards = document.getElementsByClassName('custom-container');
    let customNameElements = document.getElementsByClassName('custom-username');
    let noCustomFound = document.querySelector('.no-item-found');

    let customFound = false;

    for (let i = 0; i < customNameElements.length; i++) { //loops through all productNames for every input inside the searchbar.
        let customName = customNameElements[i].innerText.trim().toLowerCase(); 
        let customNameFirstLetter = customName.length > 0 ? customName[0] : '';
        let searchTermFirstLetter = searchTerm.length > 0 ? searchTerm[0] : '';  

    
        if (searchTerm === '' || (customName.includes(searchTerm) && customNameFirstLetter === searchTermFirstLetter)) //displays matching outputs conisting of product cards derived from the searchBar input
        {
            noCustomFound.style.display = "none";
            customCards[i].style.display = "grid";
            customFound = true; 
        } 
        else //hides all incompatible product cards
        {
            customCards[i].style.display = "none";
        }
    }

    if (!customFound) //displays no item found banner if no matches were found.
    {
        noCustomFound.style.display = "flex";
    }


};



const searchInput = document.querySelector('input[type="search"]').addEventListener('input', searchAllCustomizations)