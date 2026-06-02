// form to create a new job application
import { useState } from "react";

const inputClass = "w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
function AddApplicationForm({ onAdd }){
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        status: "applied",
        date_applied: "",
        deadline: "",
        notes: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            const response = await fetch("http://127.0.0.1:8000/applications/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })

            if (!response.ok){
                throw new Error("Failed to add application")
            }

            const newApp = await response.json()
            onAdd(newApp)
            setFormData({
                company: "",
                role: "",
                status: "applied",
                date_applied: "",
                deadline: "",
                notes: ""
            })
        }catch (err){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
                Add Application
            </h2>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray600 mb-1">Company</label>
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Role</label>
                     <input
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <select
                         name="status"
                         value={formData.status}
                         onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                        </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Date Applied</label>
                    <input
                    type="date"
                    name="date_applied"
                    value={formData.date_applied}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    />
                </div>


                <div>
                    <label className="block text-sm text-gray-600 mb-1">Deadline(optional)</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={inputClass}
                        />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Notes(optional)</label>
                    <input
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
            </div>

            <button 
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {loading ? "Adding..." : "Add Application"}
            </button>
        </form>
    )

}

export default AddApplicationForm