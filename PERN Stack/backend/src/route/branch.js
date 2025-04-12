const express = require('express');
const router = express.Router();
const branchController = require('../app/controller/BranchController');

router.get('/', branchController.readAllBranches)
router.post('/', branchController.createABranch)
router.delete('/:id', branchController.deleteABranch)

module.exports = router;