const router = require('express').Router();
const staffController = require('../../controllers/staffController');

router.route('/student')
  .get(staffController.getAllStudents) 
  .post(staffController.saveStudent); 

router.route('/parent').get(staffController.getAllParents); 
router.route('/student/:studentId/parent').post(staffController.saveParent); 
router.route('/student/:studentId/pickup').post(staffController.savePickup); 

router.route('/student/:studentId/report/:date')
  .get(staffController.getReport) 
  .post(staffController.saveReport)
  .put(staffController.updateReport);

router.route('/diapering/report/:reportId')
  .get(staffController.getDiapering)
  .post(staffController.saveDiapering)

router.route('/allinfo/student/:studentId').get(staffController.getStudentInfo) 
router.route('/parentinfo/student/:studentId').get(staffController.getStudentParentInfo) 
router.route('/pickupinfo/student/:studentId').get(staffController.getStudentPickupInfo)  

router
  .route('/student/:studentId/delete')
  .delete(staffController.deleteStudent);

//invoice
//fixedsnacks


module.exports = router;
