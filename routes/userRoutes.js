const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const {  getAdminDetail} = require('../controller/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controller/classController.js');
const { registeruser, loginuser, currentuser, countUser, getAllUsers } = require("../controller/userController");
const  validateToken  = require("../middleware/validateToken");

const {
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controller/studentsController.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controller/subjectController.js');
const {  getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controller/teacherController.js');

// Admin

router.get("/Admin/:id", getAdminDetail)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher



router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice



// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)
router.post("/register", registeruser)
router.post("/login", loginuser)
router.get("/current", validateToken, currentuser)
router.get ("/getAllUsers", getAllUsers)
router.get("/row-count", countUser)

module.exports = router;