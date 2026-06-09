// displays a single job application
// with status update and delete functionality
import {useState} from 'react'
import ConfirmModal from './ConfirmModal'

function ApplicationCard({application, onDelete, onUpdate}){

    const [updating,setUpdating] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const statusColors = {
        applied: "bg-blue-100 text-blue-700",
        interview: "bg-yellow-100 text-yellow-700",
        offer: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700"
    }

    const colorClass = statusColors[application.status] || "bg-gray-100 text-gray-700"

    async function handleStatusChange(e) {
        const newStatus = e.target.value
        setUpdating(true)

        try{
            const response = await fetch(`http://127.0.0.1:8000/applications/${application.id}`,
                {
                    method:'PATCH',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ status: newStatus})
                }
            )
            if( !response.ok)throw new Error("Failed to update ") 
                const updated = await response.json()
            onUpdate(updated)
        }catch (err){
            console.error(err)
        }finally{
            setUpdating(false)
        }
    }

    async function handleDelete() {
        try{
            const response = await fetch(
                `http://127.0.0.1:8000/applications/${application.id}`,
                {method:"DELETE"}
            )
            if (!response.ok) throw new Error("Failed to delete")
            onDelete(application.id)
        }catch(err){
            console.error(err)
        } finally {
            setShowConfirm(false)
        }
    }


    return(
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        {application.role}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {application.company}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                <span className= {`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
                    {application.status}
                </span>
                <button 
                onClick={() => setShowConfirm(true)}
                className = "text-gray-400 hover:text-red-400 transition-colors text-lg leading-none">
                    x
                </button> 
            </div>
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

            <div className="mt-4 border-t border-gray-100 pt-3">
                <label className='text-xs text-gray-400 mr-2'>
                    Update status:
                </label>
                <select
                value={application.status}
                onChange={handleStatusChange}
                disabled={updating}
                className='bg-white text-sm border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>

            </div>
            {showConfirm && (
                <ConfirmModal
                    message={`Delete ${application.role} at ${application.company}? This cannot be undone`}  
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}              
                >
                </ConfirmModal>
            )}
        </div>
    )
}

export default ApplicationCard