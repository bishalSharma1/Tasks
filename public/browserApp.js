const btn = document.querySelector('.formSubmit')
const input = document.querySelector('.formInput')
const tasksSection = document.querySelector('.sectionDiv')

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
      hElement.className = 'heading_3'
      const cbElement = document.createElement('input')
      cbElement.setAttribute('type', 'checkbox')
      if (completed === true) {
        cbElement.setAttribute('checked', completed)
      }
      const deleteButton = document.createElement('button')
      const editButton = document.createElement('button')
      editButton.innerHTML = 'edit task'
      deleteButton.innerHTML = 'delete task'
      const taskText = document.createTextNode(name)
      hElement.appendChild(taskText)
      const tasksDiv = document.createElement('div')
      tasksDiv.id = `tasksDiv${name}`
      tasksSection.appendChild(tasksDiv)
      tasksDiv.appendChild(hElement)
      tasksDiv.appendChild(cbElement)
      tasksDiv.appendChild(editButton)
      tasksDiv.appendChild(deleteButton)
      cbElement.id = `cbElement${taskID}`

      editButton.addEventListener('click', () => {
        editHandler(taskID)
      })
      deleteButton.addEventListener('click', () => {
        deleteHandler(taskID)
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
    const { data: task } = await axios.get(url)
    const checker = taskID
    if (checker === taskID) {
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
