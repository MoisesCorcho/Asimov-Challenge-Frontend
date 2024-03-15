import challengeApi from '../api/challengeApi.js'

const create = async (appointment) =>
{
    new Swal({
        title: 'Please, wait...',
        allowOutsideClick: false
    })
    Swal.showLoading()

    try {
        await challengeApi.post(`http://localhost/proyectos/Moises/Php/Asimov-Challenge/api/appointment`, appointment)

        Swal.fire(
            'Created',
            'Appointment successfully created',
            'success'
        )
    } catch (e) {

        let error = e.response.data.message

        Swal.fire(
            'Error',
            error,
            'error'
        )
    } 

}

export default {
    create
}