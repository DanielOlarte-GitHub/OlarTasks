import {createPool} from 'mysql2/promise'

export const pool = createPool({
    user: "be0547ef1b7849",
    host: "us-cdbr-east-06.cleardb.net",
    database: "heroku_53d691c1bf945fe",
    password: "3240265632527ds47",
    ssl:{
        rejectUnauthorized: false
    }
    
})

