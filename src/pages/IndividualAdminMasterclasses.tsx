// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AdminLayout from '../components/layout/AdminLayout';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// interface Masterclass {
//   _id: string;
//   masterClassName: string;
//   masterClassDesc: string;
// }

// const API_BASE_URL = 'http://localhost:3000/api';

// const IndividualAdminMasterclasses: React.FC = () => {
//   const { adminId } = useParams<{ adminId: string }>();
//   const { getToken } = useAuth();

//   const [masterclasses, setMasterclasses] = useState<Masterclass[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchMasterclasses = async () => {
//     if (!adminId) {
//       setError('Admin ID is missing');
//       return;
//     }
//     try {
//       setLoading(true);
//       const token = getToken();
//       const res = await axios.get(`${API_BASE_URL}/individual-admin/dashboard/${adminId}/masterclasses`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });
//       setMasterclasses(res.data.data);
//       setLoading(false);
//     } catch {
//       setError('Failed to fetch masterclasses');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMasterclasses();
//   }, [adminId]);

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Masterclasses for Admin: {adminId}</h1>
//         {loading && <p>Loading masterclasses...</p>}
//         {error && <p className="text-red-600">{error}</p>}
//         {!loading && !error && masterclasses.length === 0 && <p>No masterclasses found.</p>}
//         <ul>
//           {masterclasses.map((masterclass) => (
//             <li key={masterclass._id} className="mb-3 border p-3 rounded">
//               <p><strong>ID:</strong> {masterclass._id}</p>
//               <p><strong>Name:</strong> {masterclass.masterClassName}</p>
//               <p><strong>Description:</strong> {masterclass.masterClassDesc}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </AdminLayout>
//   );
// };

// export default IndividualAdminMasterclasses;

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from '../components/dashboard/DashboardSection';
import MasterClassModal from '../components/dashboard/modals/MasterClassModal';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';

const IndividualAdminMasterclasses: React.FC = () => {
   const { user } = useAuth();
    const adminId = user?.id;

  const tableHeaders = [
    'Banner',
    'MasterClass',
    'IndustryType',
    'Viewers',
    'Speaker',
    'Location',
    'Created' 
  ];

  const renderTableRow = (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => (
    <tr key={item._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.masterClassBanner && (
          <img
            src={`http://localhost:3000${item.masterClassBanner}`}
            alt="Banner"
            className="h-12 w-20 object-cover rounded"
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.masterClassName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.industryType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.viewers}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.keynoteSpeaker}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminLayout>
      <DashboardSection
        title="Master Classes"
        apiEndpoint={`individual-admin/dashboard/${adminId}/masterclasses`}
        modalComponent={MasterClassModal}
        tableHeaders={tableHeaders}
        renderTableRow={renderTableRow}
      />
    </AdminLayout>
  );

};

export default IndividualAdminMasterclasses;
