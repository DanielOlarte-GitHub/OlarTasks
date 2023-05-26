import { Formik, Form } from 'formik'
import { createTaskRequest } from '../api/tasks.api'
import { useTask } from '../context/TaskContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


function TaskForm() {

    const { createTask, getTask, updateTasks } = useTask()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const tasks = await getTask(params.id)
                setTask({
                    title: tasks.title,
                    description: tasks.description
                })
            }
        }
        loadTask()
    }, [])

    return (
        <div >


            <Formik
                initialValues={task}
                enableReinitialize={true}

                onSubmit={async (values, actions) => {
                    if (params.id) {
                        await updateTasks(values, params.id)
                    } else {
                        await createTask(values)
                    }
                    navigate('/')

                    setTask({
                        title: "",
                        description: ""
                    })
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10'>
                        <h1 className='text-xl font-bold uppercase text-center'>{params.id ? "Edit Task" : "New Task"}</h1>

                        <label className='block text-xs mt-3 font-bold'>Title</label>
                        <input type="text" name="title" onChange={handleChange} placeholder='Write a title' value={values.title} className='px-2 py-1 rounded-sm w-full' />
                        <label className='block text-xs mt-3 font-bold' >Description</label>
                        <textarea name="description" rows="3" onChange={handleChange} placeholder='Write a description' value={values.description} className='px-2 py-1 rounded-sm w-full' />
                        <button type='submit' disabled={isSubmitting} className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md'>
                            {params.id ? "Edit" : isSubmitting ? "Saving..." : "Save"}
                        </button>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm