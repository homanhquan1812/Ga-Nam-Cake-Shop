const Notes = require('../model/Notes')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class NoteController
{
    // [GET] /note
    async readAllNotes(req, res, next) {
        try {
            const note = await Notes.find({})

            res.status(200).json({
                note: multipleMongooseToObject(note)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /note
    async createANote(req, res, next) {
        try {
            const { csw_notes } = req.body
            const newNote = new Notes(req.body)

            await newNote.save()

            res.status(201).json({
                message: 'New note added.'
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /note/:id
    async deleteANote(req, res, next) {
        try {
            const note = await Notes.findById(req.params.id)

            if (!note) {
                return res.status(404).json('No note found.')
            }

            await note.delete()

            res.status(200).json({
                message: 'Note deleted successfully.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NoteController