import { useForm } from "react-hook-form";
import { useTasks } from "../Context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const TaskFormPage = () => {

  const { register, handleSubmit, setValue } = useForm()
  const { createTasks, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
   async function loadTask() {
    if(params.id){
      const task = await getTask(params.id)
      console.log(task)
       setValue('title', task.title)
       setValue('description', task.description)
     }
   }
   loadTask()
  }, [])

  const onSubmit = handleSubmit((data) => {
    if(params.id){
      updateTask(params.id, data)

    }else{
      createTasks(data)
    }
    navigate('/tasks')
  })

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md m-10">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title"
          {...register('title')}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Description</label>
        <textarea rows="3" placeholder="Description"
          {...register('description')}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <label htmlFor="date">Date</label>
        <input type="date" {...register('date')} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"/>
        <button className="bg-indigo-500 px-3 py-2 rounded-md">
          Save
        </button>


      </form>

    </ div>
  )
}
