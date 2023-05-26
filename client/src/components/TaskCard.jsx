import { deleteTask } from "../api/tasks.api"
import { useTask } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";



export function TaskCard({ t }) {
    const { handleDelete, toggleTaskDone } = useTask()
    const navigate = useNavigate()
    const handleDone = async () => {
        await toggleTaskDone(t.id)
    }

    return <div className="bg-slate-300 rounded-xl p-4">
        <header className="flex justify-between ">
            <h2 className="text-xl font-bold">{t.title}</h2>
            <button className="text-2xl" onClick={() => {
                handleDone()
            }}>
                {t.done === 1 ? "✅" : "❌"}
            </button>
        </header>

        <p className="text-s">{t.description}</p>
        <span className="text-xs">{t.createAt}</span>
        <div className="flex gap-x-1 mt-2 ">
            <button className="bg-red-600 px-2 py-1 text-white rounded-s" onClick={() => {
                handleDelete(t.id)
            }}>Delete</button>

            <button className="bg-zinc-800 px-2 py-1 text-white rounded-s" onClick={() => {
                navigate(`/edit/${t.id}`)
            }}>Edit</button>

            
        </div>
    </div>
}

