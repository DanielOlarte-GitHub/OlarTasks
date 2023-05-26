import { useContext } from "react";
import { useState } from "react"
import { showTasks, deleteTask, showTask, createTaskRequest, updateTask, toggleTask } from "../api/tasks.api";
import { TaskContext } from "./TaskContextApart";


export const useTask = () => {
    const context = useContext(TaskContext)
    if (context === undefined) {
        throw new Error("useTask must be used within a TaskContextProvider")
    }
    return context
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    async function loadTask() {
        const response = await showTasks()
        setTasks(response.data)
    }

    const handleDelete = async (id) => {

        try {
            const response = await deleteTask(id)
            setTasks(tasks.filter(task => task.id !== id))

        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (values) => {
        try {
            const respons = await createTaskRequest(values)
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const response = await showTask(id)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateTasks = async (task, id) => {
        try {
            const respons = await updateTask(task, id)
        } catch (error) {
            console.log(error);
        }
    }

    const toggleTaskDone = async (id) => {
        try {
            const taskFound = tasks.find(t => t.id === id)
            await toggleTask(id, taskFound.done === 0 ? true : false)
            setTasks(tasks.map(t => t.id === id ? { ...t, done: t.done === 0 ? 1 : 0 } : t))
            

        } catch (error) {
            console.log(error);
        }
    }


    return <TaskContext.Provider value={{ tasks, loadTask, handleDelete, createTask, getTask, updateTasks, toggleTaskDone }}>
        {children}
    </TaskContext.Provider>
}