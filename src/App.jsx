
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')
  const [editingDeadline, setEditingDeadline] = useState(null)
  const [newDeadline, setNewDeadline] = useState('')

  function addTask(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('Please enter a task title.')
      return
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      status: 'To Do',
    }

    setTasks((previousTasks) => [...previousTasks, newTask])
    setTitle('')
    setDescription('')
    setDueDate('')
    setError('')
  }

  function updateStatus(id, status) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  function startEditingDeadline(task) {
    setEditingDeadline(task.id)
    setNewDeadline(task.dueDate)
  }

  function saveDeadline(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, dueDate: newDeadline } : task
      )
    )

    setEditingDeadline(null)
    setNewDeadline('')
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">YOUR ACADEMIC PLANNER</p>
          <h1>Student Task Manager</h1>
          <p className="subtitle">Organize your studies, one task at a time.</p>
        </div>
        <div className="task-count">{tasks.length} tasks</div>
      </header>

      <section className="form-card">
        <h2>Add Academic Task</h2>
        <p className="muted">Enter the details of your assignment or study task.</p>

        <form onSubmit={addTask}>
          <label htmlFor="title">Task title *</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Complete Software Engineering assignment"
            maxLength={120}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add task details..."
            rows={3}
          />

          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">+ Add Task</button>
        </form>
      </section>

      <section className="tasks-section">
        <h2>Your Tasks</h2>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Add your first academic task using the form above.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}

                  {editingDeadline === task.id ? (
                    <div>
                      <label htmlFor={`deadline-${task.id}`}>
                        Update deadline
                      </label>
                      <input
                        id={`deadline-${task.id}`}
                        type="date"
                        value={newDeadline}
                        onChange={(event) =>
                          setNewDeadline(event.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => saveDeadline(task.id)}
                      >
                        Save Deadline
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingDeadline(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="due-date">
                        Due date: {task.dueDate || 'Not set'}
                      </p>
                      <button
                        type="button"
                        onClick={() => startEditingDeadline(task)}
                      >
                        Edit Deadline
                      </button>
                    </>
                  )}
                </div>

                <div className="task-actions">
                  <select
                    aria-label={`Status for ${task.title}`}
                    value={task.status}
                    onChange={(event) =>
                      updateStatus(task.id, event.target.value)
                    }
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
