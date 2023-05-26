import { useEffect } from "react"
import { TaskCard } from "../components/TaskCard"
import { useTask } from "../context/TaskContext"

function TasksPage(){

    const {tasks, loadTask} = useTask()


    useEffect(()=>{
        
        loadTask()
   }, [])


   function renderMain(){
        return tasks.map(t=>(
            <TaskCard t={t} key={t.id}/>
        ))
   }

    return (
        <div >
            <h1 className="text-5xl text-white font-bold text-center mt-5">
                {tasks.length === 0 ? "NO TASKS YET" : "TASKS"}
            </h1>

            <div className="grid grid-cols-3 gap-2 mt-7">
            {renderMain()}

            </div>
        </div>
    )
}

export default TasksPage