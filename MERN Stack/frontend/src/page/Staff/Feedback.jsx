import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import Sidebar from '../../component/Sidebar'

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const fetchFeedbacksData = async () => {
          try {
            const response = await fetch('http://localhost:5000/feedback')
            const data = await response.json()
            setFeedbacks(data.feedback)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
    
        fetchFeedbacksData()

    const intervalId = setInterval(() => {
        fetchFeedbacksData()
    }, 2000)
  
    // Cleanup function
    return () => clearInterval(intervalId)
      }, [])

  return (
    <div>
    <Head />
    <Head additionalStylesheets={[
            "/css/dashboard.css"
        ]} additionalTitle={[
            "Feedbacks - Gà Nấm Cake Shop"
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
            <div className="sales" style={{marginTop: '20px', width: '1100px'}}>
                {/*
                        <div class="middle">
                            <div class="left">
                                <button type="button" class="btn btn-primary">Add more members</button>
                            </div>
                        </div>
                        */}
                <table style={{marginTop: '20px', width: '100%'}}>
                <thead>
                    <tr>
                    <th style={{width: '5%'}}>No</th>
                    <th style={{width: '15%'}}>Full Name</th>
                    <th style={{width: '15%'}}>Phone number</th>
                    <th style={{width: '25%'}}>Email Address</th>
                    <th style={{width: '40%'}}>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      feedbacks && feedbacks.slice().reverse().map((feedback, index) => (
                        <tr key={feedback.id}>
                        <td style={{width: '5%'}}>{index + 1}</td>
                        <td style={{width: '15%'}}>{feedback.last_name} {feedback.first_name}</td>
                        <td style={{width: '15%'}}>{feedback.phone}</td>
                        <td style={{width: '25%'}}>{feedback.email}</td>
                        <td style={{width: '40%'}}>{feedback.message}</td>
                    </tr>
                      ))
                    }
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
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    </div>
  )
}

export default Feedback