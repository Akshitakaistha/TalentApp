/**
 * Used to show the Bootcamps.
 */
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DashboardSection from './DashboardSection';
import BootcampModal from './modals/BootcampModal';
import { API_BASE_URL } from "../../App";

const DashboardBootcamps: React.FC = () => {
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
    <DashboardSection
      title="Bootcamps"
      apiEndpoint="bootcamps"
      modalComponent={BootcampModal}
      tableHeaders={tableHeaders}
      renderTableRow={renderTableRow}
    />
  );

};

export default DashboardBootcamps;
