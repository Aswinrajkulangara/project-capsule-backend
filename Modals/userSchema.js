// import mongoose
const mongoose=require('mongoose')

// schema 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be at least 3 characters, but we got only {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true

    },
    github:{
        type:String

    },

    linkedin:{
        type:String


    },
    profile:{
        type:String

    }

})

const  users = mongoose.model("users",userSchema)



// export
module.exports=users
