const url = 'http://localhost:3000' 

axios.get('http://localhost:3000/')
    .then(function(res) {
        console.log(res.data)
    })
    .catch(function(err) {
        console.log(err)
    })

const Records = function() {

    axios.get(`${url}/patient`)
        .then(function(res) {
            console.log(res.data)
            const attachRecords = document.querySelector('#Form-section')
            console.log(attachRecords)
            attachRecords.innerHTML = ""

            const patients = res.data
            patients.forEach(function(patient) {
                const newDiv = document.createElement('div')
                newDiv.innerHTML = patientInfo(patient)

                attachRecords.append(newDiv)

                const deleteButton = document.querySelector(`#delete-x-${patient._id}`)
                deleteButton.addEventListener('click', function(event) {
                    console.log("DELETE BUTTON CLICKED")
                    console.log(event.target.id)
                    const patientId = event.target.id.split("-")
                    console.log(patientId)
                    deleteForm(patientId[2]) 
                })

                const inputDoctor = document.querySelector(`#doctor-edit-${patient._id}`)
                const updateButton = document.querySelector(`#update-button-${patient._id}`)
                const inputField = document.querySelector(`#input-field-${patient._id}`)

                updateButton.addEventListener('click', function(event) {
                    console.log("UPDATE BUTTON CLICKED")
                    console.log(inputField.value)
                    axios.patch(`${url}/patient/${patient._id}`, { physician: inputField.value })
                        .then(function(patient) {
                            console.log(patient)
                            Records()
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                    
                    inputDoctor.classList.add('vanish')
                })

                console.log(deleteButton)
            })
        })
        .catch(function(err) {
            console.log(err)
        })

}

// This is the function used to handle the form submission
function submitForm(event) {
    event.preventDefault()
    console.log(event.target)
    alert("Form Submitted")
    
    const formData = new FormData(patientForm)
    const plainFormData = Object.fromEntries(formData.entries())
    console.log("DISPLAYING THE FORM DATA")
    console.log(plainFormData)

    // Now we have to post the data to our API. 
    axios.post('http://localhost:3000/patient', plainFormData)
        .then(function (patientAdded) {
            console.log("New patient details added") 
            Records()
        })
        .then(function(err) {
            console.log(err)
        }) 
}

const patientForm = document.querySelector('#myForm')
patientForm.addEventListener('submit', submitForm)


const deleteForm = function(patientId) {

    axios.delete(`${url}/patient/${patientId}`)
        .then(function(patient) {
            console.log(patient)
            Records()
        })
        .catch(function(err) {
            console.log("ITEM NOT DELETED")
            console.log(err)
        })
}

const patientInfo = function(patientData) {
    const newHTML = `
        <div id="h">
            <p> ${patientData.physician} </p> 
            
            <form id="show">
            <fieldset>
                <h5>Edit the name of your physician here...</h5>
                <div class="edit-input vanish" id="doctor-edit-${patientData._id}">
                    <textarea name="physician" id="input-field-${patientData._id}" rows="2"></textarea> 
                </div>
                <h6 id="update-button-${patientData._id}"> UPDATE </h6>
                <h6 id="delete-x-${patientData._id}"> DELETE </h6>
            </fieldset>
            </form>
        </div> 
       
    `
    return newHTML
}

Records() 