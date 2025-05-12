const { pool } = require('../../../config/db')

class NoteController
{
    // [GET] /note
    async readAllNotes(req, res, next) {
        try {
            const noteQuery = 'SELECT * FROM notes;'
            const noteResult = await pool.query(noteQuery)

            res.status(200).json({
                note: noteResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /note
    async createANote(req, res, next) {
        try {
            const { note } = req.body
            const query = `
                INSERT INTO notes (note)
                VALUES ($1)
                RETURNING id;
            `
            const values = [note]

            await pool.query(query, values)

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
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM notes WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Note deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'Note not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NoteController