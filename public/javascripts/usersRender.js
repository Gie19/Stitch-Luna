const renderAllUsers = async () => {
    try
    {
        const response = await fetch('/api/admin/allUsers');
        const users = await response.json();
    
    

    const usersContainer = document.querySelector('.user-grid-parent');

    users.forEach(user => {
        const userContainerCard = document.createElement('div');
        userContainerCard.classList.add('user-container-card');
        
        userContainerCard.innerHTML = ` <div class="user-deets name">
                <h1>${user.username}</h1>
            </div>
            <div class="user-deets email">
                <p>Email:<br> ${user.email}</p>
            </div>

            <div class="user-deets address">
                <p>Address: <br>${user.address}</p>
            </div>`

            usersContainer.append(userContainerCard);
    });
    }
    catch(error)
    {
        console.error(`Error encountered in fetching all users: ${error}`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderAllUsers();
})