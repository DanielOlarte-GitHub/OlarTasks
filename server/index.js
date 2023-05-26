import express from 'express'
import cors from 'cors'
import {PORT} from './config.js';
import indexRoutes from './routes/index.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors())

app.use(indexRoutes)
app.use(tasksRoutes)

app.use(express.static(join(__dirname , '../client/dist')))

app.use((req,res,next)=>{
    res.send("<h1>NOT FOUND</h1>")
})

app.listen(process.env.PORT || PORT )
console.log(`Server on the port ${process.env.PORT || PORT}`);
