const updateButton = document.querySelectorAll('.updateBtn')
const deleteButton = document.querySelectorAll('.deleteBtn')
const updateMessage = document.querySelector('.update-message')
const boxForm = document.querySelectorAll('.box-form')
const textBoxes = document.querySelectorAll('.textBox')
const messageDisplays = document.querySelectorAll('.message')
let currentTextBox
let formBox = []
let textBox = []
let messages = []


textBoxes.forEach(tb => {
    textBox.push(tb)
})

boxForm.forEach(fb => {
    formBox.push(fb)
})

messageDisplays.forEach((md,index) => {
    md.addEventListener('click', () => {
        currentUpdate(index)
    })
})

function currentUpdate(index) {
    messages.push(index)
    console.log(formBox)

    if (messages.length === 1) {
        formBox[messages[messages.length - 1]].style.display = "block"
    } else if (messages.length > 1) {
        formBox[messages[messages.length - 1]].style.display = "block"
        formBox[messages[messages.length - 2]].style.display = "none"
    }
    
    
    
}



async function updateData() {
    try {
        currentTextBox = textBox[messages[messages.length - 1]].value
        console.log(currentTextBox)
        const id = this.id
        const updated = await fetch('/quotes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id,
                message: currentTextBox,
            }),
        })
        
    } catch (error) {
       
    }
    window.location.reload()
}

async function deleteData() {
    const id = this.id
    const deleted = await fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: id
          }),
    })
    window.location.reload()
}

updateButton.forEach(button => {
    button.addEventListener('click',updateData)    
})

deleteButton.forEach(button => {
    button.addEventListener('click', deleteData)
})

