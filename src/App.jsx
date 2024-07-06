import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished]=useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)}
  }, [])

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>{
      return i.id == id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs()
  }
  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleDelete = (e, id) => {
    if (confirm("Are You sure you want to delete")) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos)
    }
    saveToLs()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()
  }


  return (
    <>
      <Navbar />
      <div className="container md:mx-auto  my-2 md:p-5 p-2 bg-violet-200 rounded-2xl min-h-[80vh] md:w-[70%]">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo mb-8 flex flex-col gap-4 mt-5">
          <h2 className='text-lg font-bold '>Add a todo</h2>
          <div className='flex gap-2 '>
          <input type="text" className='w-full rounded-full px-4 py-1' onChange={handleChange} value={todo} />
          <button onClick={handleAdd} disabled={todo.length<=3}  className='bg-violet-800 hover:cursor-pointer  disabled:bg-violet-500 hover:bg-violet-900  px-3 text-white rounded-full py-1 border-2 border-black '>Save</button>
          </div>
        </div>

        <input onChange={togglefinished} type="checkbox" name="" id="" checked={showfinished}/>See Finishesdtasks
        <h2 className='text-xl font-bold py-4'>Your Todos</h2>
        <div className="Todos">
          {todos.length == 0 && <div className='m-5 font-bold'>No todos to display</div>}
          {todos.map(item => {


            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 w-full">
              <div className='flex gap-5 w-full'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full ">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:cursor-pointer mx-3 hover:bg-violet-900 p-2   text-white rounded-md'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:cursor-pointer mx-1 hover:bg-violet-900 p-2  text-white rounded-md'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
