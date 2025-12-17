import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AddTestimonial = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    testimonial: '',
    image: '',
    status: 'Active',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;
      // In a real app, you would upload the file and get the path
      setFormData((prev) => ({ ...prev, image: `/uploads/testimonials/${fileName}` }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log the data; in real app this would call API
    console.log(isEdit ? 'Updating testimonial:' : 'Creating testimonial:', formData);
    alert(isEdit ? 'Testimonial updated (demo).' : 'Testimonial created (demo).');
    navigate('/admin/testimonials');
  };

  return (
    <div className="p-4">
      {/* Header with Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Dashboard / Testimonials / {isEdit ? 'Edit' : 'Add New'}
          </div>
          <Link
            to="/admin/testimonials"
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={formData.image}
                    alt="Testimonial"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                    }}
                  />
                </div>
              )}
              <div>
                <label className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors inline-block">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {formData.image && (
                  <p className="mt-2 text-sm text-gray-600">{formData.image}</p>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter designation"
              required
            />
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonial <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.testimonial}
              onChange={(e) => handleInputChange('testimonial', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              placeholder="Enter testimonial text"
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
              {isEdit ? 'Update' : 'Create'} Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;

