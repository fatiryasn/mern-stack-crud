const express = require('express');
const Contact = require('../models/Contact');
const verifyToken = require('../middleware/verifyToken')

const router = express.Router();

//get all contacts
router.get('/contact', verifyToken ,async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        let sort = req.query.sort || 'default'; 

        const skip = (page - 1) * limit;

        const query = {
            user: req.user._id,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { nohp: { $regex: search, $options: 'i' } }
            ]
        };

        //sort config
        if (sort === 'a-z') {
            sort = { name: 1 };
        } else if (sort === 'z-a') {
            sort = { name: -1 }; 
        } else {
            sort = '_id';
        }

        

        // limit config
        const validLimits = [10, 20, 50];
        const selectedLimit = validLimits.includes(limit) ? limit : 10;

        const collation = { locale: 'en', strength: 2 };
        //send response
        const contacts = await Contact.find(query)
            .collation(collation)
            .sort(sort)
            .limit(selectedLimit)
            .skip(skip)
            .exec();
        console.log(req.user._id)
        res.status(200).json({
            totalContacts: await Contact.countDocuments({user: req.user._id}),
            totalPages: Math.ceil(await Contact.countDocuments(query) / selectedLimit),
            currentPage: page,
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get one contact
router.get('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id
        const contact = await Contact.findById(id)
    
        res.status(200).json(contact)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//post a contact
router.post('/contact', verifyToken, async (req, res) => {
    try {
        if (
            !req.body.name || !req.body.nohp || !req.body.email
        ){
            return res.status(400).json({message: 'need all request'})
        }

        const newContact = {
            name: req.body.name,
            nohp: req.body.nohp,
            email: req.body.email,
            user: req.user._id
        }

        const contact = await Contact.create(newContact)

        return res.status(201).send(contact)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a contact
router.put('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = await Contact.findByIdAndUpdate(id, req.body)

        if (!updatedBook) return res.status(404).send({message: "Book not found"})

        return res.status(200).send(updatedBook)

    } catch (error) {
        res.status(500).send(error)
    }
})


//delete a contact
router.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedBook = await Contact.findByIdAndDelete(id)

        if (!deletedBook) return res.status(404).send({message: "Book not found"})

        return res.status(200).send(deletedBook)

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;
