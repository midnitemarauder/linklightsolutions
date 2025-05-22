import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  name: string;
  location: string;
  score: number;
  explanation: string;
  status: string;
}

// Using environment variable for API URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.linklight.solutions";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const HrDashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [confirmAction, setConfirmAction] = useState<{id: string, type: 'approve' | 'reject'} | null>(null);

  const loadCandidates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_BASE}/results`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      setCandidates(data.filter((c: Candidate) => c.status === "pending"));
    } catch (err) {
      console.error("Failed to load candidates:", err);
      setError("Failed to load candidates. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    if (!id || typeof id !== 'string') {
      setNotification({
        message: "Invalid candidate ID",
        type: 'error'
      });
      return;
    }
    
    setConfirmAction({id, type: action});
  };

  const confirmActionHandler = async () => {
    if (!confirmAction) return;
    
    const {id, type} = confirmAction;
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_BASE}/${type}/${id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      
      setNotification({
        message: `Candidate ${type === 'approve' ? 'approved' : 'rejected'} successfully`,
        type: 'success'
      });
      
      await loadCandidates();
    } catch (err) {
      console.error(`Failed to ${type} candidate:`, err);
      setNotification({
        message: `Failed to ${type} candidate. Please try again.`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      setConfirmAction(null);
    }
  };

  const runScan = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_BASE}/run-scan`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      
      setNotification({
        message: "Scan triggered successfully",
        type: 'info'
      });
    } catch (err) {
      console.error("Failed to run scan:", err);
      setNotification({
        message: "Failed to run scan. Please try again.",
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);
  
  // Auto-hide notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filtered = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Notification Toast */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
            notification.type === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' :
            'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <p>{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to {confirmAction.type} this candidate?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmActionHandler}
                className={`px-4 py-2 text-white rounded ${
                  confirmAction.type === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">HR Sourcing Dashboard</h1>
        <button
          onClick={runScan}
          disabled={isLoading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Run Scan'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <input
        type="text"
        placeholder="Search candidates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      
      {isLoading && !candidates.length ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.location}</td>
                  <td className="px-4 py-2">{c.score}</td>
                  <td className="px-4 py-2">{c.explanation}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleAction(c.id, 'approve')}
                      disabled={isLoading}
                      className={`bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="Approve candidate"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => handleAction(c.id, 'reject')}
                      disabled={isLoading}
                      className={`bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="Reject candidate"
                    >
                      ✘
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !isLoading && (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan={5}>
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;
