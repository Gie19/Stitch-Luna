const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db } = require('../config');
const { collection, addDoc, getDocs } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL} = require('firebase/storage');

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/addCustomization', upload.array('files'), async (req, res) => {
    const { firstName, lastName, email, contactNo, houseNumber, province, zipCode, specifications, userId } = req.body;

    try {
   
        const inquiryData = {
            firstName,
            lastName,
            email,
            contactNo: contactNo || null,
            houseNumber,
            province,
            zipCode,
            specifications,
            userId,
            fileUrls: [] 
        };

        const files = req.files; 
        
    
        if (!files || files.length === 0) {
            console.error('No files uploaded.');
            return res.status(400).json({ message: 'No files uploaded.' });
        }

        for (const file of files) {
            const storageRef = ref(storage, `customizations/${userId}/${file.originalname}`); 

          
            const snapshot = await uploadBytes(storageRef, file.buffer);
            console.log(`Uploaded ${file.originalname} to storage.`); 

        
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(`Generated download URL: ${downloadURL}`); 

            inquiryData.fileUrls.push(downloadURL);
        }

  
        console.log('Final inquiry data:', JSON.stringify(inquiryData));

        const inquiriesCollectionRef = collection(db, 'customizations');
        const docRef = await addDoc(inquiriesCollectionRef, inquiryData);

        res.status(201).json({ message: 'Inquiry added successfully', inquiryId: docRef.id });
    } 
    catch (error) 
    {
        console.error('Error adding inquiry:', error); // Log any errors
        res.status(500).json({ message: 'Failed to add inquiry', error: error.message });
    }
});


router.get('/allCustomizations', async (req, res) => {
    try
    {
        const querySnapshot = await getDocs(collection(db, 'customizations'));
        const customizations = [];

        querySnapshot.forEach((doc) => {
            const customizationData = doc.data();
            customizations.push({ id: doc.id, ...customizationData});
        });

        res.json(customizations);
    }
    catch(error)
    {
        console.error('Error encountered in fetching all user inquiries. ', error);
        res.status(500).send('Error fetching all user inquiries.');
    }
});

module.exports = router;







