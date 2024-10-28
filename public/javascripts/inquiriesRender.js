const renderInquiries = async () => {
    try 
    {
        const response = await fetch('/api/inquiries/allInquiries');
        const inquiries = await response.json();

        const gridParent = document.querySelector('.grid-inquire-parent');


        inquiries.forEach(inquiry => {
            const inquireCardContainer = document.createElement('div');
            inquireCardContainer.classList.add('inquire-container')

            inquireCardContainer.innerHTML = `
          <div class="inquire-username">
            <h1>${inquiry.username}</h1>
          </div>
          <div class="inquire-date">
            <h5>Created at: ${inquiry.createdAt}</h5>
          </div>
          <div class="inquire-fullname">
            <h4>Name: ${inquiry.firstName} ${inquiry.lastName}</h4>
          </div>
          <div class="inquire-email">
            <h4>Email: ${inquiry.email}</h4>
          </div>
          <div class="inquire-num">
            <h4>Contact Number:  ${inquiry.contactNo} </h4>
          </div>
          <div class="inquire-desc">
            <p> ${inquiry.inquiries} </p>
          </div>
            `
        
            gridParent.appendChild(inquireCardContainer);
        })
    } 
    catch (error) 
    {
        console.error(`Error encountered in fetching all inquiries: ${error}`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderInquiries();
})