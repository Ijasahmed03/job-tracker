//root component , manages application state

import { useState, useEffect } from "react"
import ApplicationCard from "./components/ApplicationCard"
import AddApplicationForm from "./components/AddApplicationForm"
import Navbar from "./components/Navbar"

function App(){
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
  return(
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5x1 mx-auto px-6 py-8">
        <AddApplicationForm onAdd={handleAdd}/>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Applications({applications.length})
          </h2>

          {loading &&(
            <p className="text-gray-400 text-sm">Loading...</p>
          )}
          {error &&(
            <p className="text-red-500 tect-sm">{error}</p>
          )}

          {!loading && applications.length === 0 &&(
            <p className="text-gray-400 text-sm">
              No applications yet. Add one above.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4">
            {applications.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App