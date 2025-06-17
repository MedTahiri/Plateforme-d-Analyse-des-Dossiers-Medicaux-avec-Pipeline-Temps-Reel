import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8686/api',
})

export const loginAdmin = (admin) => API.post('/login/Admin', admin)
export const loginPatient = (id) => API.post('/authPatient', { id: id }); 
export const addClient = (client)=> API.post('/addClient',client)

export const allPatients=()=>API.get('/patients')
export const sendAlerteClick = (clickCount, patient) =>
  API.post('/alerte', {
    clickCount: clickCount,
    patient: patient
  });
