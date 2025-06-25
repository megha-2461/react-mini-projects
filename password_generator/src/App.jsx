import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumAllowed]=useState(false);
   const [charAllowed, setCharAllowed]=useState(false);
   const [pwd, setPwd]=useState("")

   //useRef hook
   const pwdRef=useRef(null)

const pwdGenerator=useCallback(()=>{
    let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str+="0123456789"
if (charAllowed) str+="!@#$%^&*()_+={}[]~|`"
for(let i=1; i<=length; i++){
  let pos=Math.floor(Math.random()*length+1)
  pass+=str.charAt(pos)
}


setPwd(pass)     //keeps in memory //state update
  } , [length, numberAllowed, charAllowed, setPwd]) //if you pass "pass" instead of setPwd , infinte loop will happen and password will keep on changing


const copyPwdToClipboard=useCallback(()=>{
  //pwdRef.current && (pwdRef.current.style.backgroundColor = "red")
  pwdRef.current?.select();//highlights the selected text
  pwdRef.current?.setSelectionRange(0, 101) //u can give range what characters you want to select
 window.navigator.clipboard.writeText(pwd)
}, [pwd])



  useEffect(()=>{
  pwdGenerator();
}, [length, numberAllowed, charAllowed, pwdGenerator]) //if there is any change in any of these parameters, page is reloaded and this function runs everytime u reload the page



  return (
    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-700">
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
       type='text'
       value={pwd}
       className='outline-none w-full py-1 px-3'
       readOnly
       ref={pwdRef}
        />
        <button onClick={copyPwdToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover: cursor-pointer hover:bg-blue-600'>copy</button>
    </div>

    <div className='flex text-sm gap-x-1'>
      <input
      type='range'
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
      />
        <label>Length: {length}</label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input 
      type='checkbox'
      defaultChecked={numberAllowed}
      id='numberInput'
      onChange={(e)=>{
        setNumAllowed((prev)=>!prev)
      }}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>

     <div className='flex items-center gap-x-1'>
      <input 
      type='checkbox'
      defaultChecked={charAllowed}
      id='charInput'
      onChange={(e)=>{
        setCharAllowed((prev)=>!prev)
      }}
      />
      <label htmlFor='charInput'>Characters</label>
    </div>

   </div>
    </>
  )
}

export default App


// cd 06_password_generator
// npm run dev