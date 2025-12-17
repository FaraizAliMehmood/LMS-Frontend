import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CustomPage {
  id: string;
  sn: number;
  name: string;
  url: string;
  status: 'Active' | 'Inactive';
}

const PageBuilder = () => {
  const [pages, setPages] = useState<CustomPage[]>([
    {
      id: '1',
      sn: 1,
      name: 'privacy policy',
      url: '/page/privacy-policy',
      status: 'Active',
    },
    {
      id: '2',
      sn: 2,
      name: 'terms and conditions',
      url: '/page/terms-and-conditions',
      status: 'Active',
    },
  ]);

  const toggleStatus = (id: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id ? { ...page, status: page.status === 'Active' ? 'Inactive' : 'Active' } : page
      )
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages((prev) => prev.filter((page) => page.id !== id).map((p, index) => ({ ...p, sn: index + 1 })));
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Page Builder</h1>
        <Link
          to="/admin/page-builder/add"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </Link>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  url
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{page.sn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {page.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-500">
                    {page.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {page.status}
                      </span>
                      <button
                        onClick={() => toggleStatus(page.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          page.status === 'Active' ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            page.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {/* Edit Button */}
                      <Link
                        to={`/admin/page-builder/edit/${page.id}`}
                        className="w-8 h-8 border-2 border-blue-500 rounded flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="w-8 h-8 border-2 border-red-500 rounded flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;


