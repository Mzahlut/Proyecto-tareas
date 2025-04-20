import { useEffect } from "react";
import { useTasks } from "../Context/TasksContext";
import {TaskCard} from "../Components/TaskCard";

export const TaskPage = () => {
 
  const {loadTasks, tasks} = useTasks()
  
 
  useEffect(() => {
    console.log(tasks)
    loadTasks()
  
  }, [])  
  

 

return (
  <div className="grid grid-cols-3 gap-2">
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <TaskCard task = {task} key = {task._id}/>
      ))
    ) : (
      <p>No hay tareas para mostrar</p>
    )}
  </div>
);



}
