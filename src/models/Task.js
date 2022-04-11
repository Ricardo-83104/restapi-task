//modelo de la tabla de la bd

import {Schema, model} from 'mongoose'
import paginate from 'mongoose-paginate-v2'

//que voy a guardar en la bd
const taskSchema = new Schema({

    title : {
        type: String,
        require: true,
        trim: true
    },
    description :{
        type: String,
        trim: true
    
    }, 
    done : {
        type: Boolean,
        default: false
    },
},{
        versionKey: false,
        timestamps: true
    
})

//exportarlo como modelo

taskSchema.plugin(paginate);
export default model('Task', taskSchema)