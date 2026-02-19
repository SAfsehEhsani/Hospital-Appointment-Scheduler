let doctors = [];

function addDoctor(doctorId, specialization, maxDailyPatients) {
    if (doctors.find(d => d.doctorId === doctorId)) {
        return { success: false, message: 'Doctor ID already exists' };
    }
    
    doctors.push({
        doctorId,
        specialization: specialization.toLowerCase(),
        maxDailyPatients: parseInt(maxDailyPatients),
        currentAppointments: 0
    });
    
    saveDoctors();
    return { success: true, message: `Doctor ${doctorId} added successfully` };
}

function bookAppointment(specialization) {
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
    
    saveDoctors();
    return { 
        success: true, 
        message: `Appointment booked with Dr. ${selectedDoctor.doctorId} (${selectedDoctor.currentAppointments}/${selectedDoctor.maxDailyPatients})` 
    };
}

function displayDoctors() {
    const list = document.getElementById('doctorsList');
    
    if (doctors.length === 0) {
        list.innerHTML = '<p class="empty">No doctors added yet</p>';
        return;
    }
    
    list.innerHTML = doctors.map(d => `
        <div class="doctor-card">
            <h3>Dr. ${d.doctorId}</h3>
            <p><strong>Specialization:</strong> ${d.specialization}</p>
            <p><strong>Appointments:</strong> ${d.currentAppointments} / ${d.maxDailyPatients}</p>
        </div>
    `).join('');
}

function showOutput(message, isSuccess) {
    const output = document.getElementById('output');
    const className = isSuccess ? 'success' : 'error';
    output.innerHTML = `<div class="${className}">${message}</div>`;
}

function saveDoctors() {
    localStorage.setItem('doctors', JSON.stringify(doctors));
}

function loadDoctors() {
    const saved = localStorage.getItem('doctors');
    if (saved) {
        doctors = JSON.parse(saved);
    }
}

document.getElementById('addDoctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const doctorId = document.getElementById('doctorId').value.trim();
    const specialization = document.getElementById('specialization').value.trim();
    const maxDailyPatients = document.getElementById('maxDailyPatients').value;
    
    const result = addDoctor(doctorId, specialization, maxDailyPatients);
    showOutput(result.message, result.success);
    
    if (result.success) {
        e.target.reset();
        displayDoctors();
    }
});

document.getElementById('bookAppointmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const specialization = document.getElementById('bookSpecialization').value.trim();
    
    const result = bookAppointment(specialization);
    showOutput(result.message, result.success);
    
    if (result.success) {
        e.target.reset();
        displayDoctors();
    }
});

loadDoctors();
displayDoctors();
