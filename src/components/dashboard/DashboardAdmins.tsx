import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from "../../App";

interface Admin {
  _id: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  isApproved: boolean;
  createdBy: string;
}

const DashboardAdmins: React.FC = () => {
  const { getToken } = useAuth();
  // Removed unused navigate to fix ReferenceError
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [approvedAdmins, setApprovedAdmins] = useState<Admin[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAdminData, setEditAdminData] = useState<Admin | null>(null);

  const fetchPendingAdmins = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${API_BASE_URL}/superadmin/pending-admins`, {
        params: {
          t: Date.now(), // cache buster
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setPendingAdmins(res.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch pending admins');
      setLoading(false);
    }
  };

  const fetchApprovedAdmins = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${API_BASE_URL}/superadmin/approved-admins`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setApprovedAdmins(res.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch approved admins');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'pending') {
      fetchPendingAdmins();
    } else {
      fetchApprovedAdmins();
    }
  }, [activeTab]);

  const approveAdmin = async (id: string) => {
    try {
      const token = getToken();
      await axios.put(`${API_BASE_URL}/superadmin/approve/${id}`, null, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      fetchPendingAdmins();
      fetchApprovedAdmins();
    } catch {
      setError('Failed to approve admin');
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/superadmin/admin/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      fetchPendingAdmins();
      fetchApprovedAdmins();
    } catch {
      setError('Failed to delete admin');
    }
  };

  const openEditModal = (admin: Admin) => {
    setEditAdminData(admin);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditAdminData(null);
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editAdminData) {
      setEditAdminData({
        ...editAdminData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveEditAdmin = async () => {
    if (!editAdminData) return;
    try {
      const token = getToken();
      await axios.put(`${API_BASE_URL}/superadmin/admin/${editAdminData._id}`, editAdminData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      closeEditModal();
      fetchApprovedAdmins();
    } catch {
      setError('Failed to update admin');
    }
  };

  const viewAdmin = (id: string) => {
    window.open(`/individual-admin/dashboard/${id}`,'_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h1 className="text-2xl text-blue-600 font-semibold mb-4">Admin Management</h1>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Admins
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          Approved Admins
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : activeTab === 'pending' ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 text-black py-2">Username</th>
              <th className="border px-4 text-black py-2">Email</th>
              <th className="border px-4 text-black py-2">Phone</th>
              <th className="border px-4 text-black py-2">Created By</th>
              <th className="border px-4 text-black py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAdmins.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No pending admins
                </td>
              </tr>
            ) : (
              pendingAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td className="border text-black px-4 py-2">{admin.username}</td>
                  <td className="border text-black px-4 py-2">{admin.email}</td>
                  <td className="border text-black px-4 py-2">{admin.phone}</td>
                  <td className="border text-black px-4 py-2">{admin.createdBy}</td>
                  <td className="border text-black px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 bg-green-600 text-white rounded"
                      onClick={() => approveAdmin(admin._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => deleteAdmin(admin._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border text-black px-4 py-2">Username</th>
              <th className="border text-black px-4 py-2">Email</th>
              <th className="border text-black px-4 py-2">Phone</th>
              <th className="border text-black px-4 py-2">Created By</th>
              <th className="border text-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedAdmins.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-black py-4">
                  No approved admins
                </td>
              </tr>
            ) : (
              approvedAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td className="border text-black px-4 py-2">{admin.username}</td>
                  <td className="border text-black px-4 py-2">{admin.email}</td>
                  <td className="border text-black px-4 py-2">{admin.phone}</td>
                  <td className="border text-black px-4 py-2">{admin.createdBy}</td>
                  <td className="border text-black px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={() => openEditModal(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="mr-2 px-3 py-1 bg-gray-600 text-white rounded"
                      onClick={() => viewAdmin(admin._id)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => deleteAdmin(admin._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Edit Admin Modal */}
      {isEditModalOpen && editAdminData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-black mb-4">Edit Admin</h2>
            <label className="block mb-2 text-black">
              Username:
              <input
                type="text"
                name="username"
                value={editAdminData.username}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 mt-1 text-black"
              />
            </label>
            <label className="block mb-2 text-black">
              Email:
              <input
                type="email"
                name="email"
                value={editAdminData.email}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 mt-1 text-black"
              />
            </label>
            <label className="block mb-2 text-black">
              Phone:
              <input
                type="text"
                name="phone"
                value={editAdminData.phone}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 mt-1 text-black"
              />
            </label>
            <label className="block mb-2 text-black">
              Password:
              <input
                type="password"
                name="password"
                value={editAdminData.password || ''}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2 mt-1 text-black"
              />
            </label>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEditAdmin}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmins;
