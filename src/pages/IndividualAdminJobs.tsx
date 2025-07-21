// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AdminLayout from '../components/layout/AdminLayout';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// interface Job {
//   _id: string;
//   jobName: string;
//   description: string;
// }

// const API_BASE_URL = 'http://localhost:3000/api';

// const IndividualAdminJobs: React.FC = () => {
//   const { adminId } = useParams<{ adminId: string }>();
//   const { getToken } = useAuth();

//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchJobs = async () => {
//     if (!adminId) {
//       setError('Admin ID is missing');
//       return;
//     }
//     try {
//       setLoading(true);
//       const token = getToken();
//       const res = await axios.get(`${API_BASE_URL}/individual-admin/dashboard/${adminId}/jobs`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });
//       setJobs(res.data.data);
//       setLoading(false);
//     } catch {
//       setError('Failed to fetch jobs');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [adminId]);

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Jobs for Admin: {adminId}</h1>
//         {loading && <p>Loading jobs...</p>}
//         {error && <p className="text-red-600">{error}</p>}
//         {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}
//         <ul>
//           {jobs.map((job) => (
//             <li key={job._id} className="mb-3 border p-3 rounded">
//               <p><strong>ID:</strong> {job._id}</p>
//               <p><strong>Name:</strong> {job.jobName}</p>
//               <p><strong>Description:</strong> {job.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </AdminLayout>
//   );
// };

// export default IndividualAdminJobs;

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from '../components/dashboard/DashboardSection';
import JobModal from '../components/dashboard/modals/JobModal';
import AdminLayout from '../components/layout/AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../App';

const IndividualAdminJobs: React.FC = () => {
  const { user } = useAuth();
  const adminId = user?.id;

   const tableHeaders = [
     'Banner',
     'jobType',
     'jobName',
     'company',
     'salaryPackage',
     'location',
     'experience',
     'Created',
   ];
 
   /**
    * Function is used to add the row in dahsboard.
    */
   const renderTableRow = (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => (
     <tr key={item._id}>
       <td className="px-6 py-4 whitespace-nowrap">
         {item.jobBanner && (
           <img
             src={`${API_BASE_URL}${item.jobBanner}`}
             alt="Banner"
             className="h-12 w-20 object-cover rounded"
           />
         )}
       </td>
       <td className="px-6 py-4 whitespace-nowrap">
         <div className="text-sm text-gray-500">{item.jobType}</div>
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
         {item.jobName}
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
         {item.companyName}
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
         {item.salaryPackage}
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
         {item.location}
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
         {item.experience}
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
  if (!adminId) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <DashboardSection
        title="Jobs"
        apiEndpoint={`individual-admin/dashboard/${adminId}/jobs`}
        modalComponent={JobModal}
        tableHeaders={tableHeaders}
        renderTableRow={renderTableRow}
      />
    </AdminLayout>
  );
};

export default IndividualAdminJobs;
