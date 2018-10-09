const router = require('express').Router();
const staffController = require('../../controllers/staffController');

/******Student Info********/
router.route('/student/:orgId')
  .get(staffController.getAllStudents) //get all students

router.route('/student')
  .post(staffController.saveStudent)  //save a new studnet

router
  .route('/student/:studentId')
  .delete(staffController.deleteStudent) //delete a student
  .put(staffController.updateStudent);   //update a student
  
router.route('/allinfo/student/:studentId').get(staffController.getStudentInfo) //get a single student
router.route('/allinfo/students?users').get(staffController.getStudentsInfo)
/******Student Info********/

/******Parents Info********/
router.route('/parent').get(staffController.getAllParents); //get all parents

router.route('/student/:studentId/parent')
  .post(staffController.saveParent) //save a parent for a particular student
  .get(staffController.getStudentParentInfo); //get parents of a particular student

router.route('/parent/email/:email')
  .get(staffController.checkParentEmail)

router.route('/parentstudent')
  .post(staffController.createStudentParentAssociation)

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
router.route('/student/:studentId/diapering/:date')
  .get(staffController.getDiapering)    //get diapering info for a particular student and date

router.route('/student/:studentId/diapering')
  .post(staffController.saveDiapering)  //save diapering info for a prticular student and date
/******Diapering***********/

/******Nap***********/
router.route('/student/:studentId/nap/:date')
  .get(staffController.getNap)    //get nap info for a particular student and date

router.route('/student/:studentId/nap')
  .post(staffController.saveNap)  //save nap info for a prticular student and date
/******Nap***********/

/******Meal***********/
router.route('/student/:studentId/meal/:date')
  .get(staffController.getMeal)    //get meal info for a particular student and date

router.route('/student/:studentId/meal')
  .post(staffController.saveMeal)  //save meal info for a prticular student and date
/******Meal***********/

/******Incident***********/
router.route('/student/:studentId/incident/:date')
  .get(staffController.getIncident)    //get incident info for a particular student and date

router.route('/student/:studentId/incident')
  .post(staffController.saveIncident)  //save incident info for a prticular student and date
/******Incident***********/

/******Medicine***********/
router.route('/student/:studentId/medicine/:date')
  .get(staffController.getMedicine)    //get medicine info for a particular student and date

router.route('/student/:studentId/medicine')
  .post(staffController.saveMedicine)  //save medicine info for a prticular student and date
/******Medicine***********/

/******Invoice***********/
router.route("/invoice/student/:studentId").post(staffController.createInvoice); //save an invoice
router.route('/invoice/:invoiceId').put(staffController.updateInvoice) //updates an invoice
/******Invoice***********/

/******FixedSnack***********/
router.route("/fixedsnack").post(staffController.saveSnacks)  //saves fixed snack of the org day-wise
router.route("/fixedsnack/:snackId").put(staffController.updateSnacks) //updates fixed snack of the org day-wise
/******FixedSnack***********/


module.exports = router;
