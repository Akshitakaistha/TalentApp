
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface DashboardSectionProps {
  title: string;
  apiEndpoint: string;
  modalComponent: React.ComponentType<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    editData?: any;
  }>;
  tableHeaders: string[];
  renderTableRow: (item: any, onEdit: (item: any) => void, onDelete: (id: string) => void) => React.ReactNode;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  apiEndpoint,
  modalComponent: ModalComponent,
  tableHeaders,
  renderTableRow,
}) => {
  const { getToken , user } = useAuth(); 
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [user?.id]);



  // const fetchItems = async () => {
  //   try {
  //     const token = getToken();
  //     const { data } = await axios.get(
  //       `http://localhost:3000/api/${apiEndpoint}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log('API response data:', data);
  //     if(data?.data !== null){
  //       setItems(data?.data);
  //     }
  //     setItems(data) ;
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchItems = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `http://localhost:3000/api/${apiEndpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('API response data:', data);
  
      // Handle flexible API response structures
      if (data?.data && Array.isArray(data.data)) {
        setItems(data.data); // preferred nested format
      } else if (Array.isArray(data)) {
        setItems(data); // flat array directly in response
      } else {
        console.warn('Unexpected data format:', data);
        setItems([]); // fallback to empty
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };  

  // Removed authHeader function and reverted handleSubmit to original code

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(`http://localhost:3000/api/${apiEndpoint}/${editingItem._id}`, formData, {
          headers: {
            Authorization: getToken() ? `Bearer ${getToken()}` : '',
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new item
        await axios.post(`http://localhost:3000/api/${apiEndpoint}`, formData, {
          headers: {
            Authorization: getToken() ? `Bearer ${getToken()}` : '',
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchItems();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = getToken();
        await axios.delete(
          `http://localhost:3000/api/${apiEndpoint}/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!items || items.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length + 1} className="px-6 py-4 text-center text-gray-500">
                    No items found. Create your first {title.toLowerCase()} entry.
                  </td>
                </tr>
              ) : (
                items?.map((item) => renderTableRow(item, handleEdit, handleDelete))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        editData={editingItem}
      />
    </div>
  );
};

export default DashboardSection;
