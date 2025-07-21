// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AdminLayout from '../components/layout/AdminLayout';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// interface Global {
//   _id: string;
//   courseName: string;
//   courseDetails: string;
// }

// const API_BASE_URL = 'http://localhost:3000/api';

// const IndividualAdminGlobals: React.FC = () => {
//   const { adminId } = useParams<{ adminId: string }>();
//   const { getToken } = useAuth();

//   const [globals, setGlobals] = useState<Global[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchGlobals = async () => {
//     if (!adminId) {
//       setError('Admin ID is missing');
//       return;
//     }
//     try {
//       setLoading(true);
//       const token = getToken();
//       const res = await axios.get(`${API_BASE_URL}/individual-admin/dashboard/${adminId}/globals`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });
//       setGlobals(res.data.data);
//       setLoading(false);
//     } catch {
//       setError('Failed to fetch global programs');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGlobals();
//   }, [adminId]);

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Global Programs for Admin: {adminId}</h1>
//         {loading && <p>Loading global programs...</p>}
//         {error && <p className="text-red-600">{error}</p>}
//         {!loading && !error && globals.length === 0 && <p>No global programs found.</p>}
//         <ul>
//           {globals.map((global) => (
//             <li key={global._id} className="mb-3 border p-3 rounded">
//               <p><strong>ID:</strong> {global._id}</p>
//               <p><strong>Name:</strong> {global.courseName}</p>
//               <p><strong>Description:</strong> {global.courseDetails}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </AdminLayout>
//   );
// };

// export default IndividualAdminGlobals;

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from '../components/dashboard/DashboardSection';
import GlobalModal from '../components/dashboard/modals/GlobalModal';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import { API_BASE_URL } from '../App';

const IndividualAdminGlobals: React.FC = () => {
  const { user } = useAuth();
    const adminId = user?.id;

  const tableHeaders = [
    'Banner',
    'Course',
    'Organization',
    'Specialization',
    'Location',
    'Duration',
    'CourseFee',
    'Created'
  ];

  const renderTableRow = (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => (
    <tr key={item._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.banner && (
          <img
            src={`${API_BASE_URL}${item.banner}`}
            alt="Banner"
            className="h-12 w-20 object-cover rounded"
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.courseName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.organizationName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.specialization}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.duration}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {item.courseFee}
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
        title="Global Programs"
        apiEndpoint={`individual-admin/dashboard/${adminId}/globals`}
        modalComponent={GlobalModal}
        tableHeaders={tableHeaders}
        renderTableRow={renderTableRow}
      />
    </AdminLayout>
  );
};

export default IndividualAdminGlobals;

