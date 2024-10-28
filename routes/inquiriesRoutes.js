const express = require('express');
const router = express.Router();
const { db } = require('../config');
const { collection, addDoc, doc, getDocs, getDoc } = require('firebase/firestore');

router.post('/addInquiry', async (req, res) => {
    const { firstName, lastName, email, contactNo, inquiries, userId } = req.body;

    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
            return res.status(404).json({ message: 'User not found' });
        }

        const username = userDoc.data().username;

        const inquiryData = {
            firstName,
            lastName,
            email,
            inquiries,
            userId,
            username,
            createdAt: new Date().toISOString().slice(0, 10),
        };

        if (contactNo) {
            inquiryData.contactNo = contactNo;
        }
        else
        {
            inquiryData.contactNo = 'N/A';
        }

        const inquiriesCollectionRef = collection(db, 'inquiries');
        const docRef = await addDoc(inquiriesCollectionRef, inquiryData);

        res.status(201).json({ message: 'Inquiry added successfully', inquiryId: docRef.id });
    } catch (error) {
        console.error('Error adding inquiry:', error);
        res.status(500).json({ message: 'Failed to add inquiry', error: error.message });
    }
});





router.get('/allInquiries', async (req, res) => {
    try
    {
        const querySnapshot = await getDocs(collection(db, 'inquiries'));
        const inquiries = [];

        querySnapshot.forEach((doc) => {
            const inquiryData = doc.data();
            inquiries.push({ id: doc.id, ...inquiryData});
        });

        res.json(inquiries);
    }
    catch(error)
    {
        console.error('Error encountered in fetching all user inquiries. ', error);
        res.status(500).send('Error fetching all user inquiries.');
    }
})


module.exports = router;
