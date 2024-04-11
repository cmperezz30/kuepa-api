import mongoose, { Schema } from "mongoose";



const messageSchema = new mongoose.Schema({

    content: {
        type: String,
        required: [true, 'Name is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,        
    },

},{
    timestamps: true
});

messageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
    }
})

export const MessageModel = mongoose.model('Message', messageSchema);