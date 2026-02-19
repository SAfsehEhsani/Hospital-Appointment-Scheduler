# Hospital-Appointment-Scheduler
Develop and deploy a working application that schedules doctor appointments fairly and efficiently

## Live Demo
🔗 [Deployment URL will be added here]

## Features
- ✅ Add Doctor with ID, specialization, and max daily patients
- ✅ View all doctors with current appointment status
- ✅ Book appointments with fair allocation (fewest appointments first)
- ✅ Automatic rejection when all doctors are full
- ✅ Persistent data storage using localStorage
- ✅ Clean, responsive UI

## Technology Stack
- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage for data persistence

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Hospital-Appointment-Scheduler
   ```

2. Open `index.html` in your browser
   - No build process required
   - Works directly in any modern browser

## Deployment Instructions

### Deploy to Netlify
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Deploy (no build command needed)

### Deploy to Vercel
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy

### Deploy to GitHub Pages
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select branch (main) and root folder
4. Save and get your URL

## How It Works

### Data Model
```javascript
{
  doctorId: string,
  specialization: string,
  maxDailyPatients: number,
  currentAppointments: number
}
```

### Booking Algorithm
1. Filter doctors by specialization
2. Filter only available doctors (currentAppointments < maxDailyPatients)
3. Sort by currentAppointments (ascending)
4. Allocate to doctor with fewest appointments
5. Increment their currentAppointments

### Error Handling
- Duplicate doctor ID validation
- No available doctors message
- Input validation (required fields, min values)

## Usage Example
1. Add Doctor: `ID: D001, Specialization: cardiology, Max: 5`
2. Add Doctor: `ID: D002, Specialization: cardiology, Max: 3`
3. Book Appointment: `Specialization: cardiology` → Allocates to D001 (0 appointments)
4. Book Appointment: `Specialization: cardiology` → Allocates to D002 (0 appointments)
5. Continue booking → Fair distribution based on current load

## Project Structure
```
Hospital-Appointment-Scheduler/
├── index.html          # Main UI
├── style.css           # Styling
├── script.js           # Core logic
└── README.md           # Documentation
```

## Author
[Your Name]

## License
MIT
