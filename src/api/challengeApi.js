import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm'

const appointmentApi = axios.create({
    baseURL: 'http://localhost/proyectos/Moises/Php/Asimov-Challenge/api/appointment'
})


export default appointmentApi