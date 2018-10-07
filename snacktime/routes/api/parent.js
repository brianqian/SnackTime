const router = require('express').Router();
const staffController = require('../../controllers/parentController');

router.route('/parent/parentinfo/:parentId') 
  .get(parentController.getStudentInfo) //get children's info
  .put(parentController.updateParentInfo)   //update their own info

router.route('/parent/childinfo/:studentId')
  .put(parentController.updateStudentInfo); //  update child's info

router.route("/parent/fixedsnack")
    .post(parentController.getSnacks)  //get fixed snack of the org day-wise

router.route('parent/student/:studentId/report/:date')
  .get(parentController.getReport)   //get report of a student for a prticular date

//update report(notes-to-staff)

router.route('/parent/pickup/:pickupId')
  .put(parentController.updatePickupInfo) //update a particular pickup
  .delete(parentController.deletePickup)  //delete a pickup

router.route('/parent/orgstaff/:orgId')
    .get(parentController.getOrgStaff); //get all staff info of org

router.route('/parent/org/:studentId')
    .get(parentController.getChildOrg)  //get org info of child

module.exports = router;