import React from 'react'
import './App.css'
import Card from './Card'
import { useState, useEffect } from 'react';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [filter, setFilter] = useState('all'); 
  const [editTodoId, setEditTodoId] = useState(null); 

  // useEffect(() => {
  //   const dummyTodos = [
  //     // { id: 1, name: 'Task 1', description: 'Description for Task 1', status: 'notCompleted' },
  //   ];
  //   setTodos(dummyTodos);
  // }, []);


  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTodoDescription(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (editTodoId !== null) {
      // Update the existing todo
      const updatedTodos = todos.map(todo => {
        if (todo.id === editTodoId) {
          return { ...todo, name: todoName, description: todoDescription };
        }
        return todo;
      });
      setTodos(updatedTodos);
      // Reset edit state
      setEditTodoId(null);
    } else {
      // Add a new todo
      const newTodo = {
        id: todos.length + 1,
        name: todoName,
        description: todoDescription,
        status: 'notCompleted',
      };
      setTodos([...todos, newTodo]);
    }
    // Clear input fields
    setTodoName('');
    setTodoDescription('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter value when dropdown selection changes
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return true; // Show all todos
    } else {
      return todo.status === filter; // Show todos with matching status
    }
  });

  const handleEdit = (id, name, description) => {
    // Set the todo being edited
    setEditTodoId(id);
    setTodoName(name);
    setTodoDescription(description);
  };

  return (
    <div>
      <h1>My todo</h1>
      <form className="todoform" onSubmit={handleSubmit}>
        <input type="text" id="name" name="name" placeholder='TodoName' value={todoName}
          onChange={handleNameChange}></input>
        <input type="text" id="Desc" name="Desc" placeholder='TodoDescription' value={todoDescription}
          onChange={handleDescriptionChange}></input>
        <div className="todo-button">
        <button type="submit">{editTodoId !== null ? 'Update Todo' : 'Add Todo'}</button>
        </div>
      </form>

      <div className="filter">
        <h3>My Todos</h3>
        <div className="filterdropdown">
        <h3>Status Filter: </h3>
        <select id="filterDropdown" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
        </div>
      </div>

      <div className="container">
        <div className="row">
        {filteredTodos.map(todo => (
            <Card key={todo.id} todo={todo}  onDelete={handleDeleteTodo} onUpdateStatus={handleUpdateStatus} onEdit={handleEdit}/>
          ))}
        </div>
      </div>

    </div>

   
  )
}

export default App