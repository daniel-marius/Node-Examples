const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: ""
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("Error connection: ", err.message);
  }

  initDB();
  setupDB();
  insertTodaysTodos("Todo");
  fetchTodaysTodos();
  deleteTodos();
});

const initDB = () => {
  const createTodosDB = "CREATE DATABASE IF NOT EXISTS APP_DB";
  connection.query(createTodosDB);
  connection.changeUser({ database: "APP_DB" });
};

const setupDB = () => {
  const createTodoQuery = `CREATE TABLE IF NOT EXISTS todos(id int primary key auto_increment, title varchar(255) not null, completed tinyint(1) not null default 0)`;
  connection.query(createTodoQuery, (err) => {
    if (err) {
      console.error("Cannot create table & rows", err.message);
    }
  });
};

const insertTodaysTodos = (title) => {
  const insertTodos = `INSERT INTO todos(title, completed) VALUES('${title}', false)`;
  connection.query(insertTodos, (err) => {
    if (err) {
      console.error("Cannot insert", err.message);
    }
  });
};

const fetchTodaysTodos = () => {
  const fetchTodos = 'SELECT * FROM todos WHERE completed=0';
  connection.query(fetchTodos, (err, result) => {
    if (err) {
      console.error("Cannot insert", err.message);
    }
    console.log("DATA: ", result);
  });
};

const deleteTodos = () => {
  const deleteQuery = 'DELETE FROM todos WHERE completed=0';
  connection.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Cannot delete", err.message);
    }
    console.log("DATA: ", result);
  });
};

const updateTodos = () => {
  const updateQuery = 'UPDATE todos SET completed=1 WHERE completed=0';
  connection.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Cannot delete", err.message);
    }
    console.log("DATA: ", result);
  });
};
