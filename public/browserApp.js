const btn = document.querySelector('.formSubmit')
const input = document.querySelector('.formInput')
input.value = ''
const tasksSection = document.querySelector('.sectionDiv')
let checker = true

btn.addEventListener('click', async (e) => {
  e.preventDefault()
  const taskName = input.value
  console.log(taskName)
  try {
    await axios.post('/api/v1/tasks/', {
      name: taskName,
    })
    location.reload()
  } catch (error) {
    console.log(error)
  }
})

const showAllTasks = async () => {
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      const less = document.createTextNode('there are no tasks')
      hElement.appendChild(less)
    }
    const newTasks = tasks.map((task) => {
      const { name, completed, _id } = task
      const taskID = _id
      const hElement = document.createElement('h3')
      const cbElement = document.createElement('input')
      cbElement.setAttribute('type', 'checkbox')
      cbElement.id = `cbElement${taskID}`
      label = document.createElement('label')
      label.setAttribute('for', `cbElement${taskID}`)
      label.innerHTML = 'completed status: '
      if (completed === true) {
        cbElement.setAttribute('checked', completed)
      }
      const deleteButton = document.createElement('button')
      const editButton = document.createElement('button')
      editButton.innerHTML = 'edit task'
      deleteButton.innerHTML = 'delete task'
      breakLine = document.createElement('br')
      const taskText = document.createTextNode(name)
      hElement.appendChild(taskText)
      const tasksDiv = document.createElement('div')
      tasksDiv.id = `tasksDiv${name}`
      tasksSection.appendChild(tasksDiv)
      tasksDiv.appendChild(hElement)
      tasksDiv.appendChild(label)
      tasksDiv.appendChild(cbElement)
      tasksDiv.appendChild(breakLine)
      tasksDiv.appendChild(editButton)
      tasksDiv.appendChild(deleteButton)

      editButton.addEventListener('click', () => {
        editHandler(taskID)
      })
      deleteButton.addEventListener('click', () => {
        deleteHandler(taskID)
      })
      cbElement.addEventListener('click', async () => {
        try {
          await axios.patch(`/api/v1/tasks/${taskID}`, {
            completed: cbElement.checked,
          })
          location.reload()
        } catch (error) {
          console.log(error)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

showAllTasks()

const editHandler = async (taskID) => {
  try {
    const url = '/api/v1/tasks/' + taskID
    console.log(url)
    if (checker === true) {
      const { data: task } = await axios.get(url)
      const inputElem = document.createElement('input')
      const submitElem = document.createElement('button')
      inputElem.setAttribute('type', 'text')
      inputElem.setAttribute('placeholder', 'edit...')
      inputElem.id = `inputElem${taskID}`
      submitElem.setAttribute('type', 'button')
      submitElem.innerHTML = 'change'
      const editDiv = document.createElement('div')
      editDiv.id = `editDiv${taskID}`
      const tasksDiv = document.getElementById(`tasksDiv${task.name}`)
      tasksDiv.appendChild(editDiv)
      editDiv.appendChild(inputElem)
      editDiv.appendChild(submitElem)
      checker = false
      submitElem.addEventListener('click', () => editSubmitHandler(taskID))
    } else {
      alert('edit one at a time')
    }
  } catch (error) {
    console.log(error)
  }
}

const editSubmitHandler = async (taskID) => {
  try {
    const editValue = document.getElementById(`inputElem${taskID}`).value
    const completedValue = document.getElementById(`cbElement${taskID}`).checked
    if (editValue === '') {
      const editDiv = document.getElementById(`editDiv${taskID}`)
      const errorP = document.createElement('p')
      errorP.id = 'errorMessage'
      errorP.innerHTML = 'you cannot enter empty value'
      editDiv.appendChild(errorP)
      setTimeout(() => {
        errorP.parentNode.removeChild(errorP)
      }, 2000)
    }
    const { data: task } = await axios.patch(`/api/v1/tasks/${taskID}`, {
      name: editValue,
      completed: completedValue,
    })
    console.log(task)
    location.reload()
    showAllTasks()
  } catch (error) {
    console.log(error)
  }
}

const deleteHandler = async (taskID) => {
  try {
    console.log(taskID)
    await axios.delete(`/api/v1/tasks/${taskID}`)
    location.reload()
  } catch (error) {
    console.log(error)
  }
}
