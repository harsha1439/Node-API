const mongoose = require('mongoose')

//schema
const myNotesSchema = new mongoose.Schema({
    notesId: {
        type: Number,
        required: [true, 'Required Field'],
        unique:true
    },
    name: {
        type:String,
        required: [true, 'Required Field']
    },
    data: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

//model
const NotesModel = mongoose.model('myNotes',myNotesSchema)

module.exports = NotesModel