// displays a single job application

function ApplicationCard({application}){
    const statusColors = {
        applied: "bg-blue-100 text-blue-700",
        interview: "bg-yellow-100 text-yellow-700",
        offer: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700"
    }

    const colorClass = statusColors[application.status] || "bg-gray-100 text-gray-700"

    return(
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-mediu, text-gray-900">
                        {application.role}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {application.company}
                    </p>
                </div>
                <span className= {'text-xs font-medium px-3 py-1 rounded-full ${colorClass'}>
                    {application.status}
                </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                <span>Applied: {application.date_applied}</span>
                {application.deadline && (
                    <span>Deadline: {application.deadline}</span>
                )}
            </div>
            {application.notes && (
                <p className="mt-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
                    {application.notes}
                </p>
            )}
        </div>
    )
}

export default ApplicationCard