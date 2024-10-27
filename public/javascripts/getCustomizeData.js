const getFormData = async () => {
    const form = document.querySelector('#custom-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#inputEmail4').value;
        const contactNo = document.querySelector('#customNum').value;
        const houseNumber = document.querySelector('#inputCity').value;
        const province = document.querySelector('#province').value;
        const zipCode = document.querySelector('#inputZip').value;
        const specifications = document.querySelector('#inquiries').value;
        const fileInput = document.querySelector('#file-upload');

        const images = fileInput.files;

        const userId = await retrieveId();
        console.log(`User ID: ${userId}`);

        // Check for empty required fields
        if (!firstName || !lastName || !email || !houseNumber || !province || !zipCode || !specifications || !userId) {
            alert('Please fill in all required fields.');
            return;
        }

        const customizationData = new FormData();
        customizationData.append('firstName', firstName);
        customizationData.append('lastName', lastName);
        customizationData.append('email', email);
        customizationData.append('contactNo', contactNo || null);
        customizationData.append('houseNumber', houseNumber);
        customizationData.append('province', province);
        customizationData.append('zipCode', zipCode);
        customizationData.append('specifications', specifications);
        customizationData.append('userId', userId);

        // Append files to the FormData object
        Array.from(images).forEach((image) => {
            customizationData.append('files', image);
        });

        try {
            const response = await fetch('/api/customizations/addCustomization', { 
                method: 'POST',
                body: customizationData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Inquiry has been added successfully.');
                console.log(result.message); 
                form.reset(); // Reset form only after successful submission
                fileInput.value = ''; // Reset file input
                document.querySelector('#file-upload-filename').textContent = 'No file chosen'; // Reset filename display
            } else {
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

    // Update the filename display when files are selected
    document.querySelector('#file-upload').addEventListener('change', function() {
        const fileNames = Array.from(this.files).map(file => file.name).join(', ');
        document.querySelector('#file-upload-filename').textContent = fileNames || 'No file chosen';
    });
});
