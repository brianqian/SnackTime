const router = require('express').Router();
const staffController = require('../../controllers/staffController');

/******Student Info********/
router.route('/student')
  .get(staffController.getAllStudents) //get all students
  .post(staffController.saveStudent)  //save a new studnet

router
  .route('/student/:studentId')
  .delete(staffController.deleteStudent) //delete a student
  .put(staffController.updateStudent);   //update a student
  
router.route('/allinfo/student/:studentId').get(staffController.getStudentInfo) //get a single student
/******Student Info********/

/******Parents Info********/
router.route('/parent').get(staffController.getAllParents); //get all parents

router.route('/student/:studentId/parent')
  .post(staffController.saveParent) //save a parent for a particular student
  .get(staffController.getStudentParentInfo); //get parents of a particular student

router.route('/parent/email/:email')
  .get(staffController.checkParentEmail)

router.route('/parent/:parentId').put(staffController.updateParent) //update a particular parent
/******Parents Info********/

/******Pickup Info********/
router.route('/student/:studentId/pickup')
  .post(staffController.savePickup) //save a pickup for a particular student
  .get(staffController.getStudentPickupInfo)  //get pickups info for a particular student

router.route('/pickup/:pickupId')
  .put(staffController.updatePickup)     //update a particular pickup
  .delete(staffController.deletePickup)  //delete a particular pickup
/******Pickup Info********/

/******Report***********/
router.route('/student/:studentId/report/:date')
  .get(staffController.getReport)   //get report of a student for a prticular date
 
router.route('/student/:studentId/report')
  .post(staffController.saveReport) //saves report of a student for current date

router.route('/report/:reportId')
  .put(staffController.updateReport); //updates report of a student for current date
/******Report***********/

/******Diapering***********/
router.route('/diapering/report/:reportId')
  .get(staffController.getDiapering)    //get diapering info for a particular report
  .post(staffController.saveDiapering)  //save diapering info for a prticular report
/******Diapering***********/

/******Invoice***********/
router.route("/invoice/student/:studentId").post(staffController.createInvoice); //save an invoice
router.route('/invoice/:invoiceId').put(staffController.updateInvoice) //updates an invoice
/******Invoice***********/

/******FixedSnack***********/
router.route("/fixedsnack").post(staffController.saveSnacks)  //saves fixed snack of the org day-wise
router.route("/fixedsnack/:snackId").put(staffController.updateSnacks) //updates fixed snack of the org day-wise
/******FixedSnack***********/


module.exports = router;
