const express = require('express');
const settingController = require('../controllers/settingController');

const router = express.Router();
router
  .route('/')
  .get(settingController.getAllSettings)
  .post(settingController.createSetting);

router
  .route('/:id')
  .patch(settingController.updateSetting)
  .delete(settingController.deleteSetting);

module.exports = router;
