import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: [String],
        default: ['STUDENT'],
        enum: ['MODERATOR', 'STUDENT']
    }

},{
    timestamps: true
});


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
    }
})

export const UserModel = mongoose.model('User', userSchema);