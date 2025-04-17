import { useEffect } from "react";
import { useTasks } from "../Context/TasksContext";

export const TaskPage = () => {
 
  const {loadTasks, tasks} = useTasks()
  
 
  useEffect(() => {
    console.log(tasks)
    loadTasks()
  
  }, [])  
  

 

return (
  <div>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>
      ))
    ) : (
      <p>No hay tareas para mostrar</p>
    )}
  </div>
);



}
