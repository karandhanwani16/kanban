import { XMarkIcon } from "@heroicons/react/24/solid"
import Card from "./card";
import { useContext } from "react";
import { taskContext } from "../App";



function Column({ title, columnTasks }) {

    const { tasks } = useContext(taskContext);

    return (
        <div className="h-full w-[224px] bg-slate-100 rounded-lg overflow-y-auto">
            {/* column header div */}
            <div className="p-1 px-3 flex justify-between items-center bg-slate-200 rounded-[inherit]">
                <h2 className="text-md font-semibold">{title}</h2>
                <span className="bg-black text-white px-1 py-0.5 text-xs font-bold rounded-md">{columnTasks.length}</span>
            </div>
            {/* column header div */}
            {
                columnTasks.map((ts, _i) => {
                    const currentTask = tasks.find((task) => task.id === ts);
                    return <div key={_i}><Card title={currentTask.title} description={currentTask.description} assignee={currentTask.assignee} /></div>;

                })
            }
        </div>

    )
}

export default Column
