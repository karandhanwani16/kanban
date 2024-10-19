import { useContext } from "react"
import { employeeContext } from "../App";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Card({
    title,
    description,
    assignee
}) {


    const { employees } = useContext(employeeContext);

    console.log(employees);

    const getNameInitials = (name) => {
        if (!name) return "";
        return name.split(' ').map(el => {
            return el.slice(0, 1);
        }).join("").toUpperCase()
    }

    return (
        <div className="w-full h-full flex-col gap-2 p-2">
            {/* Card */}
            <div className="w-full h-[148px] bg-slate-200 rounded-lg p-2 flex flex-col gap-2 justify-between">
                <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="text-xs">{description}</p>
                </div>
                <div className="w-full flex justify-between items-center">

                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 rounded-full h-6 w-6 flex justify-center items-center text-xs font-semibold text-green-900">{getNameInitials(employees.find((emp) => emp.id === assignee)?.name)}</div>
                        <div>{employees.find((emp) => emp.id === assignee)?.name}</div>
                    </div>

                    <div className="bg-black rounded-lg p-1 hover:bg-red-500 hover:cursor-pointer">
                        <XMarkIcon className="w-4 h-4 text-white" />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Card
