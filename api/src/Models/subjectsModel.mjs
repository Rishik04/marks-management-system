import {model, Schema} from "mongoose";

const subjectSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    teacher:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'teachers'
    }

});

const subjectModel = model('subjects', subjectSchema);

export default subjectModel;