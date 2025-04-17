import { useForm } from "react-hook-form";
import { useTasks } from "../Context/TasksContext";

export const TaskFormPage = () => {

  const { register, handleSubmit } = useForm()
  const { createTasks } = useTasks()
  console.log(createTasks())
  

  const onSubmit = handleSubmit((data) => {
    createTasks(data)
  })

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md m-10">
      <form onSubmit={onSubmit}>

        <input type="text" placeholder="title"
          {...register('title')}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <textarea rows="3" placeholder="Description"
          {...register('description')}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button>
          Save
        </button>


      </form>

    </ div>
  )
}
