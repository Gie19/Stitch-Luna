const searchAllUsers = (event) => {
    const searchTerm = event.target.value.toLowerCase() || '';

    let userCards = document.getElementsByClassName('user-container-card');
    let userNameElements = document.getElementsByClassName('name');
    let noUserFound = document.querySelector('.no-item-found');
    
    let userFound = false;

    for (let i = 0; i < userNameElements.length; i++) { //loops through all productNames for every input inside the searchbar.
        let userName = userNameElements[i].innerText.trim().toLowerCase(); 
        let userNameFirstLetter = userName.length > 0 ? userName[0] : '';
        let searchTermFirstLetter = searchTerm.length > 0 ? searchTerm[0] : '';  

    
        if (searchTerm === '' || (userName.includes(searchTerm) && userNameFirstLetter === searchTermFirstLetter)) //displays matching outputs conisting of product cards derived from the searchBar input
        {
            noUserFound.style.display = "none";
            userCards[i].style.display = "grid";
            // userCards[i].style.placeItems = "center";
            userFound = true; 
        } 
        else //hides all incompatible product cards
        {
            userCards[i].style.display = "none";
        }
    }

    if (!userFound) //displays no item found banner if no matches were found.
    {
        noUserFound.style.display = "flex";
    }

};

const searchInput = document.querySelector('input[type="search"]').addEventListener('input', searchAllUsers)
