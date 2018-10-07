const router = require('express').Router();
const staffController = require('../../controllers/parentController');

/**************Parent*****************/
router.route('/parent/parentinfo/:parentId') 
  .get(parentController.getStudentInfo) //get children's info
  .put(parentController.updateParentInfo)   //update their own info
/**************Parent*****************/

/**************Student*****************/
router.route('/parent/childinfo/:studentId')
  .put(parentController.updateStudentInfo); //  update child's info
/**************Student*****************/

/**************FixedSnack*****************/
router.route("/parent/fixedsnack")
    .post(parentController.getSnacks)  //get fixed snack of the org day-wise
/**************FixedSnack*****************/

/**************Report*****************/
router.route('/parent/student/:studentId/report/:date')
  .get(parentController.getReport)   //get report of a student for a prticular date

//update report(notes-to-staff)
router.route('/student/:studentId/report')
  .post(parentController.saveReport) //creates new report with notes to staff

router.route('/report/:reportId')
  .put(parentController.updateReport); //updates report of a student for current date to send notes to staff
/**************Report*****************/

/**************Pickup*****************/
router.route('/parent/pickup/:pickupId')
  .put(parentController.updatePickupInfo) //update a particular pickup
  .delete(parentController.deletePickup)  //delete a pickup
/**************Pickup*****************/

/**************Organization & Staff*****************/
router.route('/parent/orgstaff/:orgId')
    .get(parentController.getOrgStaff); //get all staff info of org + org info

router.route('/parent/org/:studentId')
    .get(parentController.getChildOrg)  //get org info of child
/**************Organization & Staff*****************/
module.exports = router;