import * as main from './main.mjs'

const workoutList = document.createElement('div')
const logIn = document.querySelector('#logIn')
export const submitBtn = document.createElement('button')
const workoutName = document.createElement('input')

export function getAll() {
    $.get('http://localhost:8000/api/ironT', (data) => {
        displayExercises(data) 
    })
}

export function getSimilar(movement) { 
    movement = main.searchBar.value;
    $.get(`http://localhost:8000/api/ironT/${movement}`, (data) => {
        console.log(data);
        displayExercises(data)
    })
}

//SUBMIT
export function submit() {
    
    $.ajax({
        url: 'http://localhost:8000/api/ironT',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: workoutName.value,
                    script: workoutList.textContent
                }),
                success: () => {
                    alert('Workout Has Been Saved');
                },
                error: () => {
                    console.error('Error:', error);
                }
    })
    console.log(workoutList.textContent);
}
//CREATE DISPLAY EXERCISES
function displayExercises(data) {
    main.createBtn.textContent = 'HOME'
    main.createBtn.addEventListener('click', () => {
        location.reload()
    })
    main.loremDiv.innerHTML = ''
    console.log(data);
    data.forEach(obj => {

        const holder = document.createElement('div')
        holder.style.display = 'block'
        holder.style.height = '440px'
        holder.style.width = '500px'
        holder.style.borderRadius = '20px'
        holder.style.backgroundColor = 'white'
        holder.addEventListener('click', () => {
            const text = document.createElement('h1')
            text.style.color = 'rgb(42, 42, 77)'
            text.style.fontSize = '30px'
            text.style.cursor = 'pointer'
            text.textContent = ' ' +holder.textContent
            text.addEventListener('dblclick', () => {
                text.style.display = 'none'
            })
            workoutList.append(text)
        })

        const movement = document.createElement('h1')
        movement.textContent = `${obj.movement}`
        holder.append(movement)
        main.loremDiv.append(holder)

    });
}

//CREATE WORKOUT
export function getCreator() {
    getAll()
    main.createBtn.textContent = 'HOME'
    main.createBtn.addEventListener('click', () => {
        location.reload()
    })
    main.loremDiv.style.marginLeft = '37%'
    main.bottomDiv.innerHTML = '';
    main.bottomDiv.style.display = 'block'
    
    workoutName.style.height = '100px'
    workoutName.style.width = '700px'
    workoutName.style.borderRadius = '12px'
    workoutName.style.textAlign = 'center'
    workoutName.style.display = 'flex'
    workoutName.style.fontSize = '80px'
    workoutName.style.marginBottom = '30px'
    workoutName.placeholder = 'Name Your Workout'

    workoutList.style.height = '90%'
    workoutList.style.width = '900px'
    workoutList.style.backgroundColor = 'white'
    workoutList.contentEditable = true
    workoutList.style.fontFamily = 'Teko'
    workoutList.style.fontSize = '40px'
    workoutList.style.overflow = 'auto'
    workoutList.style.color = 'black'
    workoutList.style.borderRadius = '12px'
    workoutList.placeholder = 'List your exercises !'
    workoutList.style.height = '300px'

    submitBtn.style.height = '75px'
    submitBtn.style.width = '200px'
    submitBtn.textContent = 'SUBMIT'
    submitBtn.style.textAlign = 'center'
    submitBtn.style.alignContent = 'center'
    submitBtn.style.cursor = 'pointer'
    submitBtn.style.borderRadius = '50px'
    submitBtn.style.backgroundColor = 'transparent'
    submitBtn.style.border = '7px solid white'
    submitBtn.style.color = 'white'
    submitBtn.style.fontSize = '50px'
    submitBtn.addEventListener('mouseover', () => {
        submitBtn.style.transition = 'background-color 0.5s ease'
        submitBtn.style.backgroundColor = 'rgb(42, 42, 77)'
    })
    submitBtn.addEventListener('mouseout', () => {
        submitBtn.style.transition = 'background-color 0.7s ease'
        submitBtn.style.backgroundColor = 'transparent'
    })

    main.bottomDiv.append(workoutName, workoutList, submitBtn)
}