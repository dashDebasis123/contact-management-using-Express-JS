const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // user is the name of our user model
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    mail: {
        type: String,
        required: [true, "Email is required"],
    },
    mobile:{
        type:String,
        required: [true, "Mobile is required"],
    
    }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contact', contactSchema);