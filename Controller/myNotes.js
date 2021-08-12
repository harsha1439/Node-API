const { findByIdAndUpdate } = require('../Model/myNotesSchema')
const NotesModel = require('../Model/myNotesSchema')
const validators = require('../Utilities/validator')

exports.getNotes = async (req,res) => {
    console.log('get notes route handler')
    try {
        const notesModel = await NotesModel.find({})
        if(notesModel.length > 0){
            res.status(201).json({
                status: 'success',
                data: notesModel
            })
        }else{
            res.status(400).json({
                status: 'error',
                data: 'No notes available in the repo'
            })
        }
    }
    catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            })
    }
}

exports.newNotes = async (req,res) =>{
    console.log('newNotes route handler')
    try {
        if(validators.ValidateName(req.body.name)){
            const createNotes = await NotesModel.create(req.body)
            res.status(200).json({
                status: 'success',
                data: createNotes
            })
        }else{
            res.status(400).json({
                status: 'error',
                results: 'Enter a valid name'
            })
        }
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateNotes = async (req,res) => {
    console.log('updateNotes route handler')
    try {
        console.log(req.params)
        console.log(req.body)
        const notesModel = await NotesModel.findOneAndUpdate({notesId: req.params.id},req.body, {new:true, runValidators: true})
        if(notesModel!=null){
            res.status(200).json({
                status: 'success',
                data: notesModel
            })
        }else{
            res.status(400).json({
                status: 'success',
                data: {
                    message: `No notes available with ID ${req.params.id}`
                }
            })
        }  
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteNotes = async (req,res) =>{
    console.log('deleteNotes route handler')
        const deletNotes = await NotesModel.deleteOne({notesId:req.params.id})
        console.log(deletNotes)
        if(deletNotes.deletedCount === 0){
            res.status(404).json({
                status: 'fail',
                message: 'No Notes available for this id'
            })
        }else{
            res.status(200).json({
                status: 'success',
                message: `Notes with ${req.params.id} ID deleted`
            })
        }
}

exports.invalid = (req,res) =>{
    res.status(404).json({
        status: 'fail',
        message: 'Invalid path',
      });
}