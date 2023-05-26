import axios from 'axios'

export const createTaskRequest = async task => 
    await axios.post('https://olartasks.herokuapp.com/tasks/', task)

export const showTasks = async () => 
    await axios.get('https://olartasks.herokuapp.com/tasks/')


export const deleteTask = async id =>
    await axios.delete(`https://olartasks.herokuapp.com/tasks/${id}`)

export const showTask = async id =>
    await axios.get(`https://olartasks.herokuapp.com/tasks/${id}`)

export const updateTask = async (task, id) =>
await axios.put(`https://olartasks.herokuapp.com/tasks/${id}`, task)


export const toggleTask = async (id, done)=>{
        await axios.put(`https://olartasks.herokuapp.com/tasks/${id}`, {
            done
        })

}

