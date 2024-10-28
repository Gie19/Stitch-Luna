const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db } = require('../config');
const { collection, addDoc, getDocs, getDoc, doc} = require('firebase/firestore');
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
            houseNumber,
            province,
            zipCode,
            specifications,
            userId,
            fileUrls: [] 
        };

        if (contactNo)
        {
            inquiryData.contactNo = contactNo;
        }
        else
        {
            inquiryData.contactNo = 'N/A'
        }

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
        console.error('Error adding inquiry:', error); 
        res.status(500).json({ message: 'Failed to add inquiry', error: error.message });
    }
});


router.get('/allCustomizations', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'customizations'));
        const customizations = [];

        for (const docSnapshot of querySnapshot.docs) { 
            const customizationData = docSnapshot.data();
            const userId = customizationData.userId;

            const userDoc = await getDoc(doc(db, 'users', userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                customizations.push({
                    id: docSnapshot.id,
                    ...customizationData,
                    username: userData.username 
                });
            } else {
                
                customizations.push({
                    id: docSnapshot.id,
                    ...customizationData,
                    username: null 
                });
            }
        }

        res.json(customizations);
    } catch (error) {
        console.error('Error encountered in fetching all customizations: ', error);
        res.status(500).send('Error fetching all customizations.');
    }
});

module.exports = router;







