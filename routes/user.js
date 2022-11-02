const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({message: 'Hello GET!'});
})

router.post('/', (req, res) => {
    res.status(201).json({message: 'Hello POST!'});
})

router.put('/', (req, res) => {
    res.json({message: 'Hello PUT!'});
})

router.delete('/', (req, res) => {
    res.json({message: 'Hello DELETE!'});
})

module.exports = router;