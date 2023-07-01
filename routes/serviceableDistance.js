const express = require('express');
const router = express.Router();
const seviceDistController = require('../controllers/serviceableDistance');

router.post('/', seviceDistController.createSeviceArea);

// GET all sevice areas
router.get('/', seviceDistController.getAllSeviceAreas);

// GET a sevice area by ID
router.get('/:id', seviceDistController.getSeviceAreaById);

// UPDATE a sevice area
router.put('/:id', seviceDistController.updateSeviceArea);

// DELETE a sevice area
router.delete('/:id', seviceDistController.deleteSeviceArea);

module.exports = router;
