const express = require('express');
const router = express.Router();
const seviceAreaController = require('../controllers/serviceArea');

router.post('/', seviceAreaController.createSeviceArea);

// GET all sevice areas
router.get('/', seviceAreaController.getAllSeviceAreas);

// GET a sevice area by ID
router.get('/:id', seviceAreaController.getSeviceAreaById);

// UPDATE a sevice area
router.put('/:id', seviceAreaController.updateSeviceArea);

// DELETE a sevice area
router.delete('/:id', seviceAreaController.deleteSeviceArea);

module.exports = router;
