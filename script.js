let doctors = [];
let hospitalName = 'City General Hospital';
let appointments = [];

function addDoctor(doctorId, doctorName, specialization, maxDailyPatients) {
    if (doctors.find(d => d.doctorId === doctorId)) {
        return { success: false, message: 'Doctor ID already exists' };
    }
    
    doctors.push({
        doctorId,
        doctorName,
        specialization: specialization.toLowerCase(),
        maxDailyPatients: parseInt(maxDailyPatients),
        currentAppointments: 0
    });
    
    saveDoctors();
    return { success: true, message: `Dr. ${doctorName} added successfully` };
}

function bookAppointment(patientName, specialization) {
    const spec = specialization.toLowerCase();
    const availableDoctors = doctors.filter(d => 
        d.specialization === spec && d.currentAppointments < d.maxDailyPatients
    );
    
    if (availableDoctors.length === 0) {
        return { success: false, message: `No available doctors for ${specialization}` };
    }
    
    availableDoctors.sort((a, b) => a.currentAppointments - b.currentAppointments);
    const selectedDoctor = availableDoctors[0];
    selectedDoctor.currentAppointments++;
    
    appointments.push({
        patientName,
        doctorId: selectedDoctor.doctorId,
        doctorName: selectedDoctor.doctorName,
        specialization: spec,
        date: new Date().toLocaleString()
    });
    
    saveDoctors();
    return { 
        success: true, 
        message: `Appointment booked for ${patientName} with Dr. ${selectedDoctor.doctorName} (${selectedDoctor.currentAppointments}/${selectedDoctor.maxDailyPatients})` 
    };
}

function displayDoctors() {
    const list = document.getElementById('doctorsList');
    
    if (doctors.length === 0) {
        list.innerHTML = '<p class="empty">No doctors added yet</p>';
        return;
    }
    
    list.innerHTML = doctors.map(d => {
        const isFull = d.currentAppointments >= d.maxDailyPatients;
        return `
        <div class="doctor-card ${isFull ? 'full' : ''}">
            <h3>Dr. ${d.doctorName}</h3>
            <p class="doctor-id">ID: ${d.doctorId}</p>
            <p><strong>Specialization:</strong> ${d.specialization}</p>
            <p><strong>Appointments:</strong> ${d.currentAppointments} / ${d.maxDailyPatients}</p>
        </div>
    `}).join('');
}

function showOutput(message, isSuccess) {
    const output = document.getElementById('output');
    const className = isSuccess ? 'success' : 'error';
    output.innerHTML = `<div class="${className}">${message}</div>`;
}

function saveDoctors() {
    localStorage.setItem('doctors', JSON.stringify(doctors));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('hospitalName', hospitalName);
}

function loadDoctors() {
    const saved = localStorage.getItem('doctors');
    if (saved) doctors = JSON.parse(saved);
    
    const savedAppts = localStorage.getItem('appointments');
    if (savedAppts) appointments = JSON.parse(savedAppts);
    
    const savedHospital = localStorage.getItem('hospitalName');
    if (savedHospital) {
        hospitalName = savedHospital;
        document.getElementById('hospitalName').textContent = hospitalName;
    }
}

document.getElementById('addDoctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const doctorId = document.getElementById('doctorId').value.trim();
    const doctorName = document.getElementById('doctorName').value.trim();
    const specialization = document.getElementById('specialization').value.trim();
    const maxDailyPatients = document.getElementById('maxDailyPatients').value;
    
    const result = addDoctor(doctorId, doctorName, specialization, maxDailyPatients);
    showOutput(result.message, result.success);
    
    if (result.success) {
        e.target.reset();
        displayDoctors();
    }
});

document.getElementById('bookAppointmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const patientName = document.getElementById('patientName').value.trim();
    const specialization = document.getElementById('bookSpecialization').value.trim();
    
    const result = bookAppointment(patientName, specialization);
    showOutput(result.message, result.success);
    
    if (result.success) {
        e.target.reset();
        displayDoctors();
    }
});

document.getElementById('editHospital').addEventListener('click', () => {
    const newName = prompt('Enter Hospital Name:', hospitalName);
    if (newName && newName.trim()) {
        hospitalName = newName.trim();
        document.getElementById('hospitalName').textContent = hospitalName;
        saveDoctors();
        showOutput(`Hospital name updated to ${hospitalName}`, true);
    }
});

loadDoctors();
displayDoctors();
