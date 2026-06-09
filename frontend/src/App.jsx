
//root component , manages application state

import { useState, useEffect } from "react"
import ApplicationCard from "./components/ApplicationCard"
import AddApplicationForm from "./components/AddApplicationForm"
import Navbar from "./components/Navbar"

function StatsBar({ applications }) {
  const total = applications.length
  const interviews = applications.filter(a => a.status === "interview").length
  const offers = applications.filter(a => a.status === "offer").length
  const rejected = applications.filter(a => a.status === "rejected").length
  const rate = total === 0 ? 0 : Math.round((interviews / total) * 100)

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-medium text-gray-900 mt-1">{total}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Interviews</p>
        <p className="text-2xl font-medium text-yellow-600 mt-1">{interviews}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Offers</p>
        <p className="text-2xl font-medium text-green-600 mt-1">{offers}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Interview rate</p>
        <p className="text-2xl font-medium text-blue-600 mt-1">{rate}%</p>
      </div>
    </div>
  )
}

function App(){
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchApplications()
  },[])

  async function fetchApplications(){
    try {
      const response = await fetch("http://127.0.0.1:8000/applications/")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setApplications(data)
    } catch(err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  function handleAdd(newApplication){
    setApplications([...applications, newApplication])
  }

  function handleDelete(id){
    setApplications(applications.filter(app => app.id !== id))
  }

  function handleUpdate(updatedApp){
    setApplications(applications.map(app =>
      app.id === updatedApp.id ? updatedApp : app
    ))
  }

  const filteredApplications = statusFilter === "all"
    ? applications
    : applications.filter(app => app.status === statusFilter)

  const counts = {
    all: applications.length,
    applied: applications.filter(a => a.status === "applied").length,
    interview: applications.filter(a => a.status === "interview").length,
    offer: applications.filter(a => a.status === "offer").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  }

  return(
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5x1 mx-auto px-6 py-8">
        <StatsBar applications={applications} />
        <AddApplicationForm onAdd={handleAdd}/>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Applications({applications.length})
           </h2>
          <div className="flex gap-2">
              {["all", "applied", "interview", "offer", "rejected"].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors capitalize
                    ${statusFilter === status
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                    }`}
                >
                  {status} ({counts[status]})
                </button>
              ))}
            </div>
          </div>
          
          {loading &&(
            <p className="text-gray-400 text-sm">Loading...</p>
          )}
          {error &&(
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {!loading && applications.length === 0 &&(
            <p className="text-gray-400 text-sm">
              No applications yet. Add one above.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map(app => (
              <ApplicationCard key={app.id} application={app} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App