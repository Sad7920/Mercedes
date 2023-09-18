const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createRaceWeekend, checkRaceDates, getRaceWeekends, updateUsedAndNewTyres, deleteRaceWeekend, getSavedRaceWeekends } = require('../controller/weekendFormatController');
const authenticateJWT = require('../middleware/jwtVerification');

router.use(authenticateJWT);

router.post('/create', createRaceWeekend);
router.post('/check-race-dates', checkRaceDates);
router.post('/fetch', getRaceWeekends);
router.post('/fetch-saved', getSavedRaceWeekends);
router.post('/update', updateUsedAndNewTyres);
router.post('/delete', deleteRaceWeekend);

module.exports = router;