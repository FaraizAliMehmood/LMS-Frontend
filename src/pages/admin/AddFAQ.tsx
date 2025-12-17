import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AddFAQ = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    status: 'Active',
  });

  useEffect(() => {
    // In a real app, you would fetch the FAQ data by id here
    if (isEdit && id) {
      // For demo purposes, you can set default values
      // In production, fetch from API
    }
  }, [id, isEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log the data; in real app this would call API
    console.log(isEdit ? 'Updating FAQ:' : 'Creating FAQ:', formData);
    alert(isEdit ? 'FAQ updated (demo).' : 'FAQ created (demo).');
    navigate('/admin/faqs');
  };

  return (
    <div className="p-4">
      {/* Header with Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit FAQ' : 'Add FAQ'}</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Dashboard / FAQs / {isEdit ? 'Edit' : 'Add New'}
          </div>
          <Link
            to="/admin/faqs"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ←Back
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit FAQ' : 'Add FAQ'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => handleInputChange('question', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter question"
              required
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => handleInputChange('answer', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              placeholder="Enter answer"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              {isEdit ? 'Update' : 'Create'} FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFAQ;

