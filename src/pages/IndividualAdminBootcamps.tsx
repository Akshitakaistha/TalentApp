// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AdminLayout from '../components/layout/AdminLayout';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// interface Bootcamp {
//   _id: string;
//   bootcampName: string;
//   bootCampDesc: string;
// }

// const API_BASE_URL = 'http://localhost:3000/api';

// const IndividualAdminBootcamps: React.FC = () => {
//   const { adminId } = useParams<{ adminId: string }>();
//   const { getToken } = useAuth();

//   const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchBootcamps = async () => {
//     if (!adminId) {
//       setError('Admin ID is missing');
//       return;
//     }
//     try {
//       setLoading(true);
//       const token = getToken();
//       const res = await axios.get(`${API_BASE_URL}/individual-admin/dashboard/${adminId}/bootcamps`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });
//       setBootcamps(res.data.data);
//       setLoading(false);
//     } catch {
//       setError('Failed to fetch bootcamps');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBootcamps();
//   }, [adminId]);

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Bootcamps for Admin: {adminId}</h1>
//         {loading && <p>Loading bootcamps...</p>}
//         {error && <p className="text-red-600">{error}</p>}
//         {!loading && !error && bootcamps.length === 0 && <p>No bootcamps found.</p>}
//         <ul>
//           {bootcamps.map((bootcamp) => (
//             <li key={bootcamp._id} className="mb-3 border p-3 rounded">
//               <p><strong>ID:</strong> {bootcamp._id}</p>
//               <p><strong>Name:</strong> {bootcamp.bootcampName}</p>
//               <p><strong>Description:</strong> {bootcamp.bootCampDesc}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </AdminLayout>
//   );
// };

// export default IndividualAdminBootcamps;

/**
 * Used to show the Bootcamps.
 */
// import React from 'react';
// import { Edit, Trash2 } from 'lucide-react';
// import DashboardSection from './DashboardSection';
// import BootcampModal from './modals/BootcampModal';


import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from '../components/dashboard/DashboardSection';
import BootcampModal from '../components/dashboard/modals/BootcampModal';
import AdminLayout from '../components/layout/AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../App';

const IndividualAdminBootcamps: React.FC = () => {
    const { user } = useAuth();
    const adminId = user?.id;

  const tableHeaders = [
    'Banner',
    'BootcampName',
    'IndustryType',
    'Viewers',
    'Speaker',
    'Location',
    'Created' 
  ];

  const renderTableRow = (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => (
    <tr key={item._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.bootcampBanner && (
          <img
            src={`${API_BASE_URL}${item.bootcampBanner}`}
            alt="Banner"
            className="h-12 w-20 object-cover rounded"
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.bootcampName}</div>
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
        title="Bootcamps"
        apiEndpoint={`individual-admin/dashboard/${adminId}/bootcamps`}
        modalComponent={BootcampModal}
        tableHeaders={tableHeaders}
        renderTableRow={renderTableRow}
      />
    </AdminLayout>
  );

};

export default IndividualAdminBootcamps;
