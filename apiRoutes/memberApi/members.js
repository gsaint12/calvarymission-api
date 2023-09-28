const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(
        { 
         message: 'This is the membership routes'   
        }
    )
});

router.get(
    '/:memberId', (req, res) => {
        const id = parseInt(req.params.memberId);
        if(id === 'special') {
            res.status(200).json(
                {
                 message: 'Your id is special'
                });
     } else {
        res.status(200).json({
            message: `Your id is ${id}`
        });
     }
            });

module.exports = router;