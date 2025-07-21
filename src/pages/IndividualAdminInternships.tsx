import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from '../components/dashboard/DashboardSection';
import InternshipModal from '../components/dashboard/modals/InternshipModal';
import AdminLayout from '../components/layout/AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../App';

const IndividualAdminInternships: React.FC = () => {
  const { user } = useAuth();
  const adminId = user?.id;

  const tableHeaders = [
    'Banner',
    'Name',
    'Company',
    'Domain',
    'Location',
    'Duration',
    'Stipend/Certificate',
    'Created'
  ];

  const renderTableRow = (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => (
    <tr key={item._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.internshipBanner && (
          <img
            src={`${API_BASE_URL}${item.internshipBanner}`}
            alt="Banner"
            className="h-12 w-20 object-cover rounded"
          />
        )}
      </td>
  
      {/* Internship Name + Job Type */}
      <td className="px-6 py-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-900" title={`${item.internshipName} - ${item.jobType}`}>
        <div className="font-medium">{item.internshipName}</div>
        <div className="text-gray-500">{item.jobType}</div>
      </td>
  
      {/* Company Name */}
      <td
        className="px-6 py-4 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900"
        title={item.companyName}
      >
        {item.companyName}
      </td>
  
      {/* Domain */}
      <td className="px-6 py-4 max-w-[120px] truncate whitespace-nowrap text-sm text-gray-900" title={item.domain}>
        {item.domain}
      </td>
  
      {/* Location */}
      <td className="px-6 py-4 max-w-[120px] truncate whitespace-nowrap text-sm text-gray-900" title={item.location}>
        {item.location}
      </td>
  
      {/* Duration */}
      <td className="px-6 py-4 max-w-[100px] truncate whitespace-nowrap text-sm text-gray-900" title={item.duration}>
        {item.duration}
      </td>
  
      {/* Stipend */}
      <td className="px-6 py-4 max-w-[140px] truncate whitespace-nowrap text-sm text-gray-900" title={item.stipend}>
        {item.stipend}
      </td>
  
      {/* Created Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
  
      {/* Action Buttons */}
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
        title="Internships"
        apiEndpoint={`individual-admin/dashboard/${adminId}/internships`}
        modalComponent={InternshipModal}
        tableHeaders={tableHeaders}
        renderTableRow={renderTableRow}
      />
    </AdminLayout>
  );
};

export default IndividualAdminInternships;
