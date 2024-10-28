const renderCustomizations = async () => {
    try
    {
        const response = await fetch('/api/customizations/allCustomizations');
        const customizations = await response.json();

        const customParentContainer = document.querySelector('.grid-inquire-parent');

      

        customizations.forEach(customization => {
            const customContainerCard = document.createElement('div');
            customContainerCard.classList.add('custom-container');

            customContainerCard.innerHTML = `
        
              <div class="custom-username">
                <h1>${customization.username}</h1>
              </div>
              <div class="custom-fullname">
                <h4>Name: ${customization.firstName} ${customization.lastName}</h4>
              </div>
              <div class="custom-email">
                <h4>Email: ${customization.email}</h4>
              </div>
              <div class="custom-num">
                <h4>Contact Number: ${customization.contactNo}</h4>
              </div>
              <div class="custom-addy">
                <h4>Address: ${customization.houseNumber} ${customization.province}</h4>
              </div>
              <div class="custom-zip">
                <h4>Zip Code: ${customization.zipCode}</h4>
              </div>
              <div class="custom-images">
              </div>
               
              <div class="custom-desc">
                <p>${customization.specifications}</p>
              </div>
            `

            customParentContainer.append(customContainerCard);

            const imagesContainer = customContainerCard.querySelector('.custom-images');

 
            customization.fileUrls.forEach(url => {
                const imgCard = document.createElement('div');
                imgCard.classList.add('custom-inspiration-card');
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = 'Customization Image';
                imgCard.appendChild(imgElement);
                imagesContainer.appendChild(imgCard);
               
            });
            
            
        })

       


       
    }
    catch(error)
    {
        console.error(`Error encountered in fetching all customizations. ${error}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCustomizations();
})