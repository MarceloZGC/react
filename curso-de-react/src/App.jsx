import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Interacting with an external API
  /*
  useEffect(() => {
    const fetchTasks = async () => {
      // Call the API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      // Capture the returned data
      const data = await response.json();

      // Store/Persist the data in local storage
      setTasks(data);
    };

    fetchTasks();
  }, []);
  */

  function onTaskClick(taskId) {
    const newTasks = tasks.map((taskItem) => {
      // Need update the task
      if (taskItem.id === taskId) {
        return { ...taskItem, isCompleted: !taskItem.isCompleted };
      }

      // No need to update the task
      return taskItem;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((taskItem) => taskItem.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), // Generate a unique ID for the task
      title, // Use the title from the form
      description, // Use the description from the form
      isCompleted: false, // Default to not completed
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Task Manager</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
