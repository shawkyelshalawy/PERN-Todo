const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { rows } = require("pg/lib/defaults");
//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes..//

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1) RETURNING *",
      [[description]]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todos");
    res.send(alltodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id=$1 ", [
      id,
    ]);
    res.send(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id =$2",
      [description, id]
    );
    res.json("todo was updated!1");
  } catch (err) {
    console.log(err.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id=$1", [
      id,
    ]);
    res.send("Todo deleted!!");
  } catch (err) {
    console.log(err.message);
  }
});
//Server listning
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
