const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.get('/testing', ctrlUser.testing);
router.get('/datainsert', ctrlUser.dataInsert);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/tokentest', ctrlUser.tokenTest);
router.post('/test', ctrlUser.test);
router.post('/users', ctrlUser.users);
router.post('/check', ctrlUser.check);

module.exports = router;