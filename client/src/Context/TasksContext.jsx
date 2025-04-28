import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../Api/task";

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("UseTasks must be used whitin a TaskProvider");

    }

    return context
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])

    const createTasks = async (task) => {
       try {
           const res = await createTaskRequest(task)
           console.log(res)
        
       } catch (error) {
        console.log(error)
       }
       
    }


    const loadTasks = async () => {
        try {
            const res = await getTasksRequest()
            console.log("Datos recibidos de la api:", res.data)
            setTasks(res.data)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteTask = async (id) => {

        try {

            const res = await deleteTaskRequest(id)
            console.log(res)
            if (res.status === 204) setTasks(tasks.filter(task => task._id != id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async(id, task) => {
        try {
            await updateTaskRequest(id, task)
            
        } catch (error) {
           console.log(error) 
        }
    }

    return (

        <TaskContext.Provider value={{
            tasks,
            createTasks,
            loadTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}

        </TaskContext.Provider>

    )
}