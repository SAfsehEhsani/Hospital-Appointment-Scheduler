'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [doctors, setDoctors] = useState([])
  const [hospitalName, setHospitalName] = useState('City General Hospital')
  const [appointments, setAppointments] = useState([])
  const [output, setOutput] = useState({ message: '', success: false })

  useEffect(() => {
    const savedDoctors = localStorage.getItem('doctors')
    const savedHospital = localStorage.getItem('hospitalName')
    const savedAppts = localStorage.getItem('appointments')
    
    if (savedDoctors) setDoctors(JSON.parse(savedDoctors))
    if (savedHospital) setHospitalName(savedHospital)
    if (savedAppts) setAppointments(JSON.parse(savedAppts))
  }, [])

  const saveData = (newDoctors, newAppts) => {
    localStorage.setItem('doctors', JSON.stringify(newDoctors))
    localStorage.setItem('appointments', JSON.stringify(newAppts || appointments))
    localStorage.setItem('hospitalName', hospitalName)
  }

  const addDoctor = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const doctorId = formData.get('doctorId')
    const doctorName = formData.get('doctorName')
    const specialization = formData.get('specialization')
    const maxDailyPatients = parseInt(formData.get('maxDailyPatients'))

    if (doctors.find(d => d.doctorId === doctorId)) {
      setOutput({ message: 'Doctor ID already exists', success: false })
      return
    }

    const newDoctors = [...doctors, {
      doctorId,
      doctorName,
      specialization: specialization.toLowerCase(),
      maxDailyPatients,
      currentAppointments: 0
    }]

    setDoctors(newDoctors)
    saveData(newDoctors, appointments)
    setOutput({ message: `Dr. ${doctorName} added successfully`, success: true })
    e.target.reset()
  }

  const bookAppointment = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const patientName = formData.get('patientName')
    const specialization = formData.get('specialization').toLowerCase()

    const availableDoctors = doctors.filter(d => 
      d.specialization === specialization && d.currentAppointments < d.maxDailyPatients
    )

    if (availableDoctors.length === 0) {
      setOutput({ message: `No available doctors for ${specialization}`, success: false })
      return
    }

    availableDoctors.sort((a, b) => a.currentAppointments - b.currentAppointments)
    const selectedDoctor = availableDoctors[0]

    const newDoctors = doctors.map(d => 
      d.doctorId === selectedDoctor.doctorId 
        ? { ...d, currentAppointments: d.currentAppointments + 1 }
        : d
    )

    const newAppts = [...appointments, {
      patientName,
      doctorId: selectedDoctor.doctorId,
      doctorName: selectedDoctor.doctorName,
      specialization,
      date: new Date().toLocaleString()
    }]

    setDoctors(newDoctors)
    setAppointments(newAppts)
    saveData(newDoctors, newAppts)
    setOutput({ 
      message: `Appointment booked for ${patientName} with Dr. ${selectedDoctor.doctorName} (${selectedDoctor.currentAppointments + 1}/${selectedDoctor.maxDailyPatients})`, 
      success: true 
    })
    e.target.reset()
  }

  const editHospital = () => {
    const newName = prompt('Enter Hospital Name:', hospitalName)
    if (newName && newName.trim()) {
      setHospitalName(newName.trim())
      localStorage.setItem('hospitalName', newName.trim())
      setOutput({ message: `Hospital name updated to ${newName.trim()}`, success: true })
    }
  }

  return (
    <>
      <div className="medical-bg">
        {['⚕️', '💊', '🩺', '💉', '🏥', '❤️', '🔬', '🧬', '⚕️', '💊'].map((icon, i) => (
          <div key={i} className="medical-icon">{icon}</div>
        ))}
      </div>

      <div className="container">
        <div className="header">
          <div className="hospital-badge">
            <div className="badge-icon">🏥</div>
            <div className="badge-content">
              <h1>{hospitalName}</h1>
              <p className="tagline">Your Health, Our Priority</p>
            </div>
          </div>
          <button onClick={editHospital} className="edit-btn">✏️ Edit Hospital</button>
        </div>

        <div className="grid-layout">
          <div className="section card-elevated">
            <div className="section-header">
              <span className="icon">👨⚕️</span>
              <h2>Add Doctor</h2>
            </div>
            <form onSubmit={addDoctor}>
              <div className="input-group">
                <label>👤 Doctor ID</label>
                <input type="text" name="doctorId" placeholder="e.g., D001" required />
              </div>
              <div className="input-group">
                <label>📝 Doctor Name</label>
                <input type="text" name="doctorName" placeholder="Dr. John Smith" required />
              </div>
              <div className="input-group">
                <label>🩺 Specialization</label>
                <input type="text" name="specialization" placeholder="Cardiology" required />
              </div>
              <div className="input-group">
                <label>📊 Max Daily Patients</label>
                <input type="number" name="maxDailyPatients" placeholder="10" min="1" required />
              </div>
              <button type="submit" className="btn-primary">➕ Add Doctor</button>
            </form>
          </div>

          <div className="section card-elevated">
            <div className="section-header">
              <span className="icon">📅</span>
              <h2>Book Appointment</h2>
            </div>
            <form onSubmit={bookAppointment}>
              <div className="input-group">
                <label>👤 Patient Name</label>
                <input type="text" name="patientName" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label>🩺 Specialization</label>
                <input type="text" name="specialization" placeholder="Cardiology" required />
              </div>
              <button type="submit" className="btn-success">✅ Book Appointment</button>
            </form>
          </div>
        </div>

        <div className="section card-elevated">
          <div className="section-header">
            <span className="icon">👨⚕️</span>
            <h2>Available Doctors</h2>
          </div>
          <div className="doctors-list">
            {doctors.length === 0 ? (
              <p className="empty">No doctors added yet</p>
            ) : (
              doctors.map(d => {
                const isFull = d.currentAppointments >= d.maxDailyPatients
                return (
                  <div key={d.doctorId} className={`doctor-card ${isFull ? 'full' : ''}`}>
                    <h3>Dr. {d.doctorName}</h3>
                    <p className="doctor-id">ID: {d.doctorId}</p>
                    <p><strong>Specialization:</strong> {d.specialization}</p>
                    <p><strong>Appointments:</strong> {d.currentAppointments} / {d.maxDailyPatients}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="section card-elevated output-section">
          <div className="section-header">
            <span className="icon">📋</span>
            <h2>Status</h2>
          </div>
          <div className="output">
            {output.message && (
              <div className={output.success ? 'success' : 'error'}>
                {output.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
