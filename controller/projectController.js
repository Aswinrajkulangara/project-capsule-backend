const projects = require('../Modals/projectSchema')


exports.addProject = async (req,res)=>{
    console.log('inside project controller');
    userId=req.payload
    console.log(userId);

    const projectimage = req.file.filename
    // console.log(projectimage);
     
    const {title,language,github,website,overview} = req.body

    console.log(`${title},${language},${github},${website},${overview},${projectimage},${userId}`);

    try {
        const existingProjects = await projects.findOne({github})

    if(existingProjects)
    {
        res.status(406).json('project already added ... Please add a New project')
    }
    else
    {
        const newProject= new projects(
            {
                title,
                language,
                github,
                website,
                overview,
                projectimage,
                userId

            }
        )
        await newProject.save()
        res.status(200).json(newProject)

    }
        
    } catch (err) {
        res.status(401).json(`error due to ${err}`)
        
    }

   
    

}

// to get in homeproject

exports.getHomeProject = async (req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
    res.status(200).json(homeProject)
        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
        
    }

}

//  all projects

exports.getAllProject = async (req,res)=>{
    const searchKey= req.query.search
    console.log(searchKey);
    const query = {
        language:{
            // regular expession,options:i -> it remmoves case sensitive 
            $regex:searchKey,$options:'i'
        }
    }

    try {
        const allProject = await projects.find(query)
    res.status(200).json(allProject)
        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
        
    }

}

// get usersproject 

exports.getUserProject = async (req,res)=>{
    try {

        const userId = req.payload
    const userProject = await projects.find({userId})
    res.status(200).json(userProject)
        
    } catch (err) {
        

        res.status(401).json(`request failed due to ${err}`)

    }
}

// edit
exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectimage} = req.body

    const uploadedProjectimage = req.file?req.file.filename:projectimage

    
    
    

    // logic

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectimage:uploadedProjectimage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
        
    } catch (err) {
        res.status(401).json({err})

        
    }
    
}

// delete user project 

exports.deleteUserProject = async(req,res)=>{
    const {id}= req.params

    try {
        const removeProject= await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        
    } catch (err) {
        res.status(401).json(err)
        
    }

}

