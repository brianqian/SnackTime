const router = require('express').Router();
const staffController = require('../../controllers/staffController');

// router.route('/test')
// .get(function(req,res){
//   res.send("Hello");
// })
router
  .route('/student')
  .get(staffController.getAllStudents) //done
  .post(staffController.saveStudent); //done

router.route('/parent').get(staffController.getAllParents); //done
router.route('/student/:studentId/parent').post(staffController.saveParent); //done

router
  .route('/student/:studentId/report/:date')
  .get(staffController.getReport) //done
  // .put(staffController.updateReport);

router.route('/allinfo/student/:studentId').get(staffController.getStudentAllInfo)
//router.route('/student/:studentId/report').post(staffController.saveReport);
//router
  //.route('/student/:studentId/report/:reportId')
  // .post(staffController.saveDiapering);

router
  .route('/student/:studentId/delete')
  .delete(staffController.deleteStudent); //done

// router
//   .route('/parent/:id')
//   .put(staffController.addStudent)
//   .delete(staffController.remove);


//individual kids;
//all info
module.exports = router;
