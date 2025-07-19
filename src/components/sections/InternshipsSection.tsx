// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SectionTitle from '../ui/SectionTitle';
// import CustomFilterBar from '../ui/CustomFilterBar';
// import InternshipCard from '../ui/InternshipCard';
// import { Internship } from '../../types';

// const API_BASE_URL = 'http://localhost:3000/api';
// const ITEMS_PER_PAGE = 3;

// const InternshipsSection: React.FC = () => {
//   const [internships, setInternships] = useState<Internship[]>([]);
//   const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
//   const [filters, setFilters] = useState<Record<string, string>>({});
//   const [filterConfig, setFilterConfig] = useState<any>({});
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchInternships = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/internships`);
//         const data = res.data;
//         setInternships(data);
//         setFilteredInternships(data);
//         generateFilterConfig(data);
//       } catch (error) {
//         console.error('Error fetching internships:', error);
//       }
//     };

//     fetchInternships();
//   }, []);

//   const generateFilterConfig = (data: Internship[]) => {
//     const getUniqueOptions = (key: keyof Internship): FilterOption[] => {
//       const values = [...new Set(data.map((item) => item[key]?.toString().trim()).filter(Boolean))];
//       return values.map((val) => ({ label: val, value: val }));
//     };

//     const config = {
//       domain: {
//         label: 'Domain',
//         options: getUniqueOptions('domain'),
//         type: 'dropdown',
//       },
//       duration: {
//         label: 'Duration',
//         options: getUniqueOptions('duration'),
//         type: 'dropdown',
//       },
//       shiftType: {
//         label: 'Shift Type',
//         options: getUniqueOptions('shiftType'),
//         type: 'radio',
//       },
//       jobType: {
//         label: 'Job Type',
//         options: getUniqueOptions('jobType'),
//         type: 'dropdown',
//       },
//     };

//     setFilterConfig(config);
//   };

//   const handleFilterChange = (key: string, value: string) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//     setCurrentPage(1);

//     const filtered = internships.filter((item) => {
//       return Object.entries(newFilters).every(([fKey, fVal]) =>
//         fVal ? item[fKey]?.toString().trim() === fVal : true
//       );
//     });

//     setFilteredInternships(filtered);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
//   const paginatedInternships = filteredInternships.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <section id="internships" className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <SectionTitle
//           title="Internships & Experiential Learning"
//           subtitle="Gain practical experience through on-job training with industry leaders"
//         />
//         {Object.keys(filterConfig).length > 0 && (
//           <CustomFilterBar
//             filters={filterConfig}
//             selectedFilters={filters}
//             onFilterChange={handleFilterChange}
//           />
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
//           {paginatedInternships.map((internship) => (
//             <InternshipCard key={internship._id} internship={internship} />
//           ))}
//         </div>
//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-10 space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-white text-black border rounded hover:bg-gray-100 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === i + 1
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-white text-black hover:bg-gray-100'
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-white text-black border rounded hover:bg-gray-100 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default InternshipsSection;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from '../ui/SectionTitle';
import CustomFilterBar from '../ui/CustomFilterBar';
import InternshipCard from '../ui/InternshipCard';
import { Internship } from '../../types';

const API_BASE_URL = 'http://localhost:3000/api';
const ITEMS_PER_PAGE = 3;

const InternshipsSection: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterConfig, setFilterConfig] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/internships`);
        const data = res.data;
        setInternships(data);
        setFilteredInternships(data);
        generateFilterConfig(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  const generateFilterConfig = (data: Internship[]) => {
    const getUniqueOptions = (key: keyof Internship): FilterOption[] => {
      const values = [...new Set(data.map((item) => item[key]?.toString().trim()).filter(Boolean))];
      return values.map((val) => ({ label: val, value: val }));
    };

    const config = {
      domain: {
        label: 'Domain',
        options: getUniqueOptions('domain'),
        type: 'dropdown',
      },
      duration: {
        label: 'Duration',
        options: getUniqueOptions('duration'),
        type: 'dropdown',
      },
      shiftType: {
        label: 'Shift Type',
        options: getUniqueOptions('shiftType'),
        type: 'radio',
      },
      jobType: {
        label: 'Job Type',
        options: getUniqueOptions('jobType'),
        type: 'dropdown',
      },
    };

    setFilterConfig(config);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    const filtered = internships.filter((item) => {
      return Object.entries(newFilters).every(([fKey, fVal]) =>
        fVal ? item[fKey]?.toString().trim() === fVal : true
      );
    });

    setFilteredInternships(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
  const paginatedInternships = filteredInternships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="internships" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Internships & Experiential Learning"
          subtitle="Gain practical experience through on-job training with industry leaders"
        />

        {Object.keys(filterConfig).length > 0 && (
          <div className="mb-6">
            <CustomFilterBar
              filters={filterConfig}
              selectedFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {paginatedInternships.map((internship) => (
            <InternshipCard key={internship._id} internship={internship} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border text-sm text-blue-600 font-medium disabled:opacity-50 bg-white hover:bg-gray-100"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border text-sm text-blue-600 font-medium disabled:opacity-50 bg-white hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InternshipsSection;
