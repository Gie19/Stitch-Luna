const getFormData = async () => {
    const form = document.querySelector('#contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#inputEmail4').value;
        const contactNo = document.querySelector('#contactNum').value;
        const inquiries = document.querySelector('#inquiries').value;

      
        form.reset();

        const userId = await retrieveId();
        console.log(`User ID: ${userId}`);

    
        const inquiryData = {
            firstName,
            lastName,
            email,
            contactNo: contactNo || null, 
            inquiries,
            userId
        };

       
        try {
            const response = await fetch('/api/inquiries/addInquiry', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inquiryData)
            });

            const result = await response.json();
            if (response.ok)
            {
                alert('Inquiry has been added successfully.')
                console.log(result.message); 
            } 
            else 
            {
                console.error('Failed to add inquiry:', result.message);
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    });
}

const retrieveId = async () => {
    try {
        const response = await fetch('/api/users/status');
        const data = await response.json();
        const id = data.user;
        console.log(`retrieveId: ${id}`);
        return id;    
    } catch (error) {
        console.error('Error encountered in fetching userId.', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getFormData();
});
