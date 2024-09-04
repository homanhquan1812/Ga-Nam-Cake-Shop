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
            console.log(staffID)
            const staffToUpdate = updatedStaffs[staffID] || {}
            const currentStaff = staffs.find(staff => staff._id === staffID)

            const updatedData = {
                csw_department: staffToUpdate.csw_department !== undefined ? staffToUpdate.csw_department : currentStaff.csw_department,
                csw_position: staffToUpdate.csw_position !== undefined ? staffToUpdate.csw_position : currentStaff.csw_position,
            }

            const response = await axios.put(`http://localhost:5000/staff/rap/${import.meta.env.VITE_APP_API_KEY}/${staffID}`, updatedData)

            if (response.status === 200) {
                alert('Staff updated successfully.')
            }
            
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
                                            <th>Department</th>
                                            <th>Position</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs.map((staff, index) => (
                                            <tr key={staff._id}>
                                                <td>{index + 1}</td>
                                                <td>{staff.csw_name}</td>
                                                <td>{staff.csw_gender}</td>
                                                <td>{staff.csw_phonenumber}</td>
                                                <td>{staff.csw_emailaddress}</td>
                                                <td>
                                                    <div className="changeCurrentPosition"> 
                                                        <input 
                                                            style={{width: '100px'}} 
                                                            type="text" 
                                                            className="form-control" 
                                                            defaultValue={staff.csw_department} 
                                                            onChange={(e) => handleInputChange(staff._id, 'csw_department', e.target.value)} 
                                                            name="position" 
                                                        />
                                                    </div>
                                                </td>
                                                <td> 
                                                    <div className="changeCurrentDepartment">
                                                        {staff.csw_position !== 'Manager' ? (
                                                            <input 
                                                                style={{width: '100px'}} 
                                                                type="text" 
                                                                className="form-control" 
                                                                defaultValue={staff.csw_position} 
                                                                onChange={(e) => handleInputChange(staff._id, 'csw_position', e.target.value)} 
                                                                name="role" 
                                                            />
                                                        ) : (
                                                            <input 
                                                                style={{width: '100px'}} 
                                                                type="text" 
                                                                className="form-control" 
                                                                defaultValue={staff.csw_position} 
                                                                name="role" 
                                                                disabled 
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: staff.csw_position === "Manager" ? 'center' : 'flex-start', gap: '10px' }}>
                                                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#edit-course-modal" onClick={() => handleEditModalShow(staff._id)}>Save changes</button>
                                                        {staff.csw_position !== "Manager" && (
                                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(staff._id)}>Remove</button>
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