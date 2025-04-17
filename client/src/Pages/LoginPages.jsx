import { useForm } from "react-hook-form";
import { useAuth } from "../Context/Auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPages = () => {

  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signIn, errors: signInErrors, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signIn(data)
    console.log(data)
  })


  useEffect(() => {
    if(isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className="flex h-calc[(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p10 m-10 rounded-md">
        {signInErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input type="email"{...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {
            errors.email && <p className="text-red-500">Email is required</p>
          }
          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            errors.password && <p className="text-red-500">Password is required</p>
          }
          <button type="submit" className="btn border-t-cyan-500">
            Login
          </button>

        </form>

          <p className="flex gap-x-2 justify-between">
            Don´t you have an account? <Link to ="/register" className="text-sky-500">Sign Up</Link>
          </p>

      </div>


    </div>
  )
}
