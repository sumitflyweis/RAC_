const express = require('express');
const router = express.Router();
const seviceNameController = require('../controllers/service');

router.post('/', seviceNameController.createSeviceArea);

// GET all sevice areas
router.get('/', seviceNameController.getAllSeviceAreas);

// GET a sevice area by ID
router.get('/:id', seviceNameController.getSeviceAreaById);

// UPDATE a sevice area
router.put('/:id', seviceNameController.updateSeviceArea);

// DELETE a sevice area
router.delete('/:id', seviceNameController.deleteSeviceArea);

module.exports = router;
