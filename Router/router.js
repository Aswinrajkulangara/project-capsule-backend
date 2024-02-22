// to set up path to resolve 

//1) import express

const express =  require('express')


// import controller 

const userController=require('../controller/userController')
const projectController = require('../controller/projectController')
// import jwtmiddleware
    const jwtMiddleware=require('../Middleware/jwtMiddleware')

    const multerConfig = require('../Middleware/multerMiddleware')

    
//2) create an object for Router() in the express module

const router = new express.Router()

// 3) logic/path to resolve the request
//    syntax => router.httpreq('path',()=>{how to resolve})
//    a) register 

         router.post('/user/register',userController.register)

  //  b) login
        router.post('/user/login',userController.login)

 //   c) add project
       router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProject)

       // d) get homeproject
       router.get('/project/home-project',projectController.getHomeProject)

       // f) get allproject
       router.get('/project/all-project',jwtMiddleware,projectController.getAllProject)

        // f) get userproject
        router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)
        
        // g) 
        router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editUserProject)

        //  i) delete project 
        router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

        //  edit profile

        router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)



// 4) export router

module.exports=router 