import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const List = ({ todo, onDelete, onCheckboxChange }) => {
  return (
    <li className={`item list-group-item bg-dark text-light ${todo.completed ? 'completed' : ''}`}>
      <input
        type='checkbox'
        className='me-2 form-check-input'
        checked={todo.completed}
        onChange={() => onCheckboxChange(todo.id)}
      ></input>
      <label>{todo.text}</label>
      <i className='delete ms-3 far fa-trash-alt' onClick={() => onDelete(todo.id)}></i>
    </li>
  );
};

const App = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
    console.log('input stored');
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (todoText.trim() !== '') {
      let newItem = { id: Date().toString(), text: todoText, completed: false };
      setTodos([...todos, newItem]);
      setTodoText('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

    return (
        <>
        <form className='form-items ms-auto me-auto w-75' onSubmit={handleAddTodo}>
            <div className='forme-group'>
            <h2 className='text-info'>New item</h2>
            <input className='w-100 form-control' type='text' onChange={handleInputChange} value={todoText} />
            <div className='form-text text-success ms-2'>Write what you want to add</div>
            <button type='submit' className='btn btn-outline-primary w-100 mt-2'>
                Add
            </button>
            </div>
        </form>

        <div>
            <ul className='list list-group mt-4 text-center w-75 ms-auto me-auto'>
            <h1 className='text-secondary mb-3'>Todo List</h1>
            {todos.map((todo) => (
                <List
                key={todo.id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onCheckboxChange={handleCheckboxChange}
                />
            ))}
            </ul>
        </div>
        </>
    );
    };

export default App;  