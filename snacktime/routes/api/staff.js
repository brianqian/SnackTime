const router = require('express').Router();
const staffController = require('../../controllers/staffController');

router
  .route('/child')
  .get(staffController.getAllChilren)
  .post(staffController.saveChild);

router
  .route('/parent')
  .get(staffController.getAllParents)
  .post(staffController.saveParent);

router
  .route('/child/:id/report')
  .put(staffController.updateReport)
  .delete(staffController.deleteReport);

router.route('/child/:id/delete').delete(staffController.deleteChild);

router
  .route('/parent/:id')
  .put(staffController.addChild)
  .delete(staffController.remove);

module.exports = router;
