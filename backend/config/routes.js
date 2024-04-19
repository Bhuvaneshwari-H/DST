/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */


module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /signupform': 'SignupformController.signupform',
  'POST /login': 'AuthController.login',
  'POST /User': 'UserController.User',
  'POST /create': 'DoctorController.create',
  'GET /doctors': 'DoctorController.doctors',
  'GET /doctors/:id': 'DoctorController.fetch',
  'GET /doctors/:id': 'DoctorController.fetchById',
  'GET /doctors/count': 'DoctorController.countDoctors',
  'PUT /update/:id': 'DoctorController.update',
  'DELETE /deleteDoctor/:id':'DoctorController.deleteDoctor',
  'GET /doctors/getCountByDepartment': 'DoctorController.getCountByDepartment',
  'POST /plus': 'DoctorController.plus',
  'GET /doctors/fetchExperiencedDoctors': 'DoctorController.fetchExperiencedDoctors',
  'GET /doctors/fetchDoctorAvailability/:doctorId': 'DoctorController.fetchDoctorAvailability',
  'GET /doctors/countByDepartment' : 'DoctorController.countByDepartment',
  'GET /doctors/getDoctorsByDepartment':'DoctorController.getDoctorsByDepartment',


  'POST /add': 'PatientsController.add',
  'GET /patients': 'PatientsController.patients',
  'DELETE /deletepatient/:id':'PatientsController.deletepatient',
  'PUT /update1/:id': 'PatientsController.update1',
  'GET /patients/:id': 'PatientsController.fetch',
  'GET /patients/:id': 'PatientsController.fetchById',
  'GET /patients/count': 'PatientsController.countpatients',
  'GET /patients/getCountByDisease': 'PatientsController.getCountByDisease',
  'GET /patients/getSeverePatients' :'PatientsController.getSeverePatients',
  'GET /patients/getByDoctor': 'PatientsController.getByDoctor',
  'GET /patients/getByFilter': 'PatientsController.getByFilter',
  'GET /patients/countByDisease' : 'PatientsController.countByDisease',
  'GET /patients/getPatientsByDisease': 'PatientsController.getPatientsByDisease',





  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
