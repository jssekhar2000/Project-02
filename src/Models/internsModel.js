const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;


const internSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: "name is required",
        trim:true

    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        lowercase:true,
        trim:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    mobile: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required:"Mobile number is required",
        unique: true
        
    },
    collegeId: {
        type: ObjectId,
            ref: "college",
            required: "college id is required"
    },
    isDeleted: {
        type: boolean,
          default: false
    }
})
module.exports = mongoose.model('Intern',internSchema );