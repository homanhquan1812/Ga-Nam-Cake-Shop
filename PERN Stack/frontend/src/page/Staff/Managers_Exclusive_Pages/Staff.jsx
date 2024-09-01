import { React, useState, useEffect } from 'react'
import Head from '../../../component/Head'
import { Header2 } from '../../../component/Header2'
import Script from '../../../component/Script'
import axios from 'axios'
import Sidebar from '../../../component/Sidebar'

const Customer = () => {
    const [staffs, setStaffs] = useState([])
    const [staffID, setStaffID] = useState(null)
    const [updatedStaffs, setUpdatedStaffs] = useState({})

    const handleInputChange = (id, field, value) => {
        setUpdatedStaffs(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }))
    }

    const handleEditStaffs = async (e) => {
        e.preventDefault()
        if (!staffID) return

        try {
            const staffToUpdate = updatedStaffs[staffID] || {}
            const currentStaff = staffs.find(staff => staff.id === staffID)

            const updatedData = {
                role: staffToUpdate.role !== undefined ? staffToUpdate.role : currentStaff.role,
                position: staffToUpdate.position !== undefined ? staffToUpdate.position : currentStaff.position,
            }

            await axios.put(`http://localhost:5000/staff/rap/${import.meta.env.VITE_APP_API_KEY}/${staffID}`, updatedData)
            alert('Staff updated successfully.')
            fetchStaffsData()
        } catch (error) {
            console.log(error)
            alert('Failed to update staff.')
        }
    }

    const handleEditModalShow = (id) => {
        setStaffID(id)
    }

    const handleDeleteModalShow = (id) => {
        setStaffID(id)
    }

    const handleDeleteStaffs = async () => {
        try {
            await axios.delete(`http://localhost:5000/staff/${import.meta.env.VITE_APP_API_KEY}/${staffID}`)
            alert('Staff deleted successfully.')
            fetchStaffsData()
        } catch (error) {
            console.error('Error deleting staff:', error)
            alert('Failed to delete staff.')
        }
    }

    const fetchStaffsData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/staff/${import.meta.env.VITE_APP_API_KEY}`)
            const data = await response.json()
            setStaffs(data.staff)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchStaffsData()
        const intervalId = setInterval(fetchStaffsData, 2000)
        return () => clearInterval(intervalId)
    }, [])

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/staffs.css"
        ]} additionalTitle={[
            "Staffs - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <Sidebar></Sidebar>
        {/* <form name="container-form" method="POST" action="/managers/handle-form-actions"> */}
        <main id="dynamic-content">
                    <div className="mt-4">
                        <div className="insights">
                            <div className="sales">
                                <table style={{marginTop: '20px'}}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Member</th>
                                            <th>Gender</th>
                                            <th>Phone number</th>
                                            <th>Email address</th>
                                            <th>Position</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs.map((staff, index) => (
                                            <tr key={staff.id}>
                                                <td>{index + 1}</td>
                                                <td>{staff.name}</td>
                                                <td>{staff.gender}</td>
                                                <td>{staff.phonenumber}</td>
                                                <td>{staff.email}</td>
                                                <td>
                                                    <div className="changeCurrentPosition"> 
                                                        <input 
                                                            style={{width: '100px'}} 
                                                            type="text" 
                                                            className="form-control" 
                                                            defaultValue={staff.position} 
                                                            onChange={(e) => handleInputChange(staff.id, 'position', e.target.value)} 
                                                            name="position" 
                                                        />
                                                    </div>
                                                </td>
                                                <td> 
                                                    <div className="changeCurrentDepartment">
                                                        {staff.role !== 'Manager' ? (
                                                            <input 
                                                                style={{width: '100px'}} 
                                                                type="text" 
                                                                className="form-control" 
                                                                defaultValue={staff.role} 
                                                                onChange={(e) => handleInputChange(staff.id, 'role', e.target.value)} 
                                                                name="role" 
                                                            />
                                                        ) : (
                                                            <input 
                                                                style={{width: '100px'}} 
                                                                type="text" 
                                                                className="form-control" 
                                                                defaultValue={staff.role} 
                                                                name="role" 
                                                                disabled 
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: staff.role === "Manager" ? 'center' : 'flex-start', gap: '10px' }}>
                                                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#edit-course-modal" onClick={() => handleEditModalShow(staff.id)}>Save changes</button>
                                                        {staff.role !== "Manager" && (
                                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(staff.id)}>Remove</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
        {/* </form> */}
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
                <p>Are you sure that you want to delete this member?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteStaffs}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div id="edit-course-modal" className="modal" tabIndex={-1} role="dialog" style={{fontSize: '15px'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize: '15px!important'}}>Update Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure that you want to adjust this staff's information?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleEditStaffs}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top" />
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Customer