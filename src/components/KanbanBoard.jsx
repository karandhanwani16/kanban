import { PlusIcon } from "@heroicons/react/24/solid"
import Column from "./Column"
import { employeeContext, kanbanBoardColumnContext, taskContext } from "../App";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";






function KanbanBoard() {


  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { employees } = useContext(employeeContext);
  const { kanbanBoardColumns, setKanbanBoardColumns } = useContext(kanbanBoardColumnContext);
  const { tasks, setTasks } = useContext(taskContext);

  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data) => {
    reset();

    const newTaskId = tasks.length + 1;

    setTasks(prev => [...prev, { id: newTaskId, title: data.title, description: data.description, assignee: data.assignee }]);

    const firstColumn = kanbanBoardColumns.find(cl => cl.id === 1);

    firstColumn.tasks.push(newTaskId);

    let updatedKanbanBoardColumns = kanbanBoardColumns.filter(cl => cl.id !== firstColumn.id);


    setKanbanBoardColumns(prev => [firstColumn, ...updatedKanbanBoardColumns,]);


  }

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-between items-center">
        <h1>Kanban Board</h1>
        <div>
          <button className="bg-black text-white px-2 py-1 rounded-md flex items-center" onClick={() => setShowPopup(true)}>
            <PlusIcon className="w-4 h-4" />
            <p className="text-sm font-semibold">Add New Card</p>
          </button>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-start gap-4 py-4">
        {
          kanbanBoardColumns.map((cl) => (
            <Column key={cl.id} title={cl.title} columnTasks={cl.tasks} />
          ))
        }
      </div>

      {showPopup && <div className="absolute top-0 left-0 w-full h-full bg-black/50" onClick={() => setShowPopup(false)}></div>}
      {showPopup && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-4 bg-white rounded-lg">

        <h2 className="text-lg font-semibold">Add New task</h2>
        <form className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title", { required: { value: true, message: "Title is required" } })} placeholder="Enter Task Title" className="border-2 border-gray-600 rounded-md p-2" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <input type="text" {...register("description", { required: { value: true, message: "Description is required" } })} placeholder="Enter Task Description" className="border-2 border-gray-600 rounded-md p-2" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="assignee">Assignee</label>
            <select {...register("assignee", { required: { value: true, message: "Assignee is required" } })} className="border-2 border-gray-600 rounded-md p-2">
              <option value="">Select Assignee</option>
              {
                employees.map((el) => (
                  <option value={el.id}>{el.name}</option>
                ))
              }
            </select>
            {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee.message}</p>}
          </div>
          <button type="submit" className="bg-black text-white px-2 py-2.5 mt-3 rounded-md flex items-center justify-center" onClick={handleSubmit(onSubmit)}>Add task</button>

          <button className="bg-slate-100 text-black px-2 py-2.5 mt-1.5 rounded-md flex items-center justify-center border border-black" onClick={() => setShowPopup(false)}>Close Popup</button>

        </form>
      </div>
      }

    </div>
  )
}

export default KanbanBoard
