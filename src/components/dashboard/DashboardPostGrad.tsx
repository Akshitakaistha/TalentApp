/**
 * Used to show the PGP courses in the table.
 */
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from './DashboardSection';
import PostGradModal from './modals/PostGradModal';
import { API_BASE_URL } from '../../App';
const DashboardPostGrad: React.FC = () => {
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
    <>
    <DashboardSection
      title="PGP Programs"
      apiEndpoint="postgrad"
      modalComponent={PostGradModal}
      tableHeaders={tableHeaders}
      renderTableRow={renderTableRow}
    />
    <div>gfysgauyfgsgfsgif</div>
    </>
  );
};

export default DashboardPostGrad;
