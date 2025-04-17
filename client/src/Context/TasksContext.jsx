import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../Api/task";

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
        const res = await createTaskRequest(task)
        console.log(res)

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



    return (

        <TaskContext.Provider value={{
            tasks,
            createTasks,
            loadTasks
        }}>
            {children}

        </TaskContext.Provider>

    )
}