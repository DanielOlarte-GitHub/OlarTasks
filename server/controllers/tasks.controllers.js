import { pool } from '../db.js'


export const getTasks = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM tasks ORDER BY createAt ASC")

        res.send(rows)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getTask = async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ? ", [req.params.id])

        if (rows.length === 0) {
            return res.status(404).send("Not Found")
        }

        res.send(rows[0])
    } catch (error) {
        return res.status(500).send(error)
    }

}

export const createTask = async (req, res) => {

    try {

        const { title, description } = req.body
        const [rows] = await pool.query("INSERT INTO tasks(title, description) VALUES (?,?)", [title, description])

        res.json({
            id: rows.insertId,
            title,
            description
        })
    } catch (error) {
        return res.status(500).send(error)
    }

}

export const updateTask = async (req, res) => {

    try {
        const { title, description } = req.body
        const [rows] = await pool.query("UPDATE tasks SET ? WHERE id = ?", [req.body, req.params.id])

        if (rows.affectedRows === 0) {
            return res.status(404).send("Not Found")
        }

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).send(error)
    }


}

export const deleteTask = async (req, res) => {

    try {
        const [rows] = await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id])

        if (rows.affectedRows === 0) {
            return res.status(404).send("Not Found")
        }

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).send(error)
    }


}
