const { insertUser, completionModule, loginUser, insertReport, getReport, getReportsByUser } = require('../Controllers/HbiController');

const router = require('express').Router();

router.post('/user', insertUser);
router.post('/login', loginUser);
router.post('/module', completionModule);
router.post('/report', insertReport);
router.get('/report/:idLearner/:idModule', getReport);
router.get('/reportsByUser/:idLearner', getReportsByUser);

module.exports = router;