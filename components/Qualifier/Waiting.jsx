
import React from "react"

export default function Waiting(props){


  return(
      <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center bg-[#0e0e0e]">
          {/* <h1 className={styles.waiting}>Evaluation of your company is {parseFloat(vps)*100}</h1> */}
          <p className="text-white">{props.text}</p>
          
          
          {/* { 
            props.next && <button className="text-white border p-2 rounded" onClick={()=>{
              router.push('/levels/level'+props.next)
            }}>Next Round</button>
          }
           */}
      </div>
  )
}
