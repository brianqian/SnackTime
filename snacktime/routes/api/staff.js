const router = require('express').Router();
const staffController = require('../../controllers/staffController');

router
  .route('/child')
  .get(staffController.getAll)
  .post(staffController.save);

router
  .route('/parent')
  .get(staffController.getAll)
  .post(staffController.save);

router
  .route('/child/:id')
  .put(staffController.update)
  .delete(staffController.remove);

router
  .route('/parent/:id')
  .put(staffController.update)
  .delete(staffController.remove);



module.exports = router;
