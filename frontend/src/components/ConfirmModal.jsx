
//reusable confirmation dialog
function ConfirmModal({message, onConfirm, onCancel}){
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-sm w-full mx-4 shadow-lg">
                <p className="text-gray-800 font-medium mb-1">Are you sure?</p>
                <p className="text-gray-500 text-sm mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
                <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button 
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
            </div>
        </div>
    )
}

export default ConfirmModal