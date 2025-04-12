import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import Script from '../../component/Script'
import axios from 'axios'
import Sidebar from '../../component/Sidebar'

const Note = () => {
    const [notes, setNotes] = useState([])
    const [noteID, setNoteID] = useState([])
    const [csw_notes, setNoteSaved] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        try {
          await axios.post(`${import.meta.env.VITE_APP_WEB_SERVICE}/note`, {
            note: csw_notes
          })
        } catch (error) {
          console.log(error)
        }
      }

    const handleDeleteModalShow = (id) => {
        setNoteID(id)
    }

    const handleDeleteNotes = async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_APP_WEB_SERVICE}/note/${noteID}`)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const fetchNotesData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_APP_WEB_SERVICE}/note`)
            const data = await response.json()
            setNotes(data.note)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
    
        fetchNotesData()

    const intervalId = setInterval(() => {
        fetchNotesData()
    }, 2000)

    return () => clearInterval(intervalId)
      }, [])

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/notes.css"
        ]} additionalTitle={[
            "Notes - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <Sidebar></Sidebar>
        <main id="dynamic-content">
        {/*
            <div class="date">
                <input type="date">
            </div>
            */}
        <div className="mt-4">
            <div className="insights">
            <div className="sales">
                <div className="middle">
                <div className="left">
                    <button type="button" className="btn btn-primary" id="addNoteBtn">Add more notes</button>
                    <button type="submit" style={{marginLeft: '10px'}} className="btn btn-success" form="addNoteForm" id="saveNoteBtn" onClick={submit}>Save this note</button>
                    <button style={{marginLeft: '10px'}} type="button" className="btn btn-danger" id="discardNoteBtn" onclick="window.location.href='/managers/notes'">Discard this note</button>
                </div>
                </div>
                <div id="warning2" style={{marginTop: '10px', fontSize: '15px', display: 'none'}}>
                <div style={{color: 'red', fontWeight: 'bold'}}>Notes: </div>
                - Click <b>Enter</b> to save this note.
                </div>
                <div className="add-data">
                    <input type="text" id="csw_notes" name="csw_notes" placeholder="Write a note here." required onChange={(e) => {setNoteSaved(e.target.value)}} />
                </div>
                <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                    <th style={{width: '10%'}}>No</th>
                    <th style={{width: '80%'}}>Notes</th>
                    <th style={{width: '10%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0
                        return notes && notes.map((note) => (
                            !note.deleted && (
                                <tr key={note._id}>
                                <td>{++counter}</td>
                                <td>{note.note}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={note.id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(note.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                            )
                        ))
                    })()}
                </tbody>
                </table>
                {/*
                    <div class="showall">
                        <a href="#">Show All</a>
                    </div>
                    */}
            </div>
            </div> 
        </div></main>
        <form method="POST" name="delete-course-form" />
        <div id="delete-course-modal" className="modal" tabIndex={-1} role="dialog" style={{fontSize: '15px'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize: '15px!important'}}>Delete Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure that you want to delete this note?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteNotes}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top" />
        </div>
    </div>
    <div className="right">
        <div className="top">
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Note