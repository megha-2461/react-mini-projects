import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './Context'
import { TodoForm, TodoItem } from './components'

function App() {
const [todos, setTodos]=useState([])   //todos here is a array with a lot of todos


const addTodo=(todo)=>{
  setTodos((prev)=>[{id:Date.now(), ...todo}, ...prev])
}

const updateTodo=(id, todo)=>{
  setTodos((prev)=>prev.map((it)=>(it.id===id ? todo : it)))
}

const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((it)=>it.id!==id))
}

const toggleComplete=(id)=>{
  setTodos((prev)=>prev.map((it)=>it.id===id ? {...it, completed: !it.completed} : it))
}

useEffect(()=>{
  const todos=JSON.parse(localStorage.getItem("todos"))
  if (todos && todos.length>0){
setTodos(todos)
  }
}, [])

useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

  return (
<TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                       {todos.map((todo)=>(
                        <div key={todo.id} className='w-full'>
                          <TodoItem todo={todo}/>
                        </div>
                       ))}
                       
                          </div>
        
                    </div>
            </div>

    </TodoProvider>

  )
}

export default App
