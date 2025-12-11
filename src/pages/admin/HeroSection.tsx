import { useState } from 'react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    subTitle: "Every teaching and learning journey is unique Following\\We'll help guide your way.",
    actionButtonText: 'Check Our Courses',
    actionButtonUrl: '/courses',
    videoButtonText: 'Watch Our\\Class Demo',
    videoButtonUrl: 'https://www.youtube.com/watch?v=pMzGDBP6Bic',
    totalStudents: '80k',
    totalInstructors: '30k',
    bannerImage: '',
    bannerBackground: '',
    heroBackground: '',
    enrolledStudentsImage: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload the file and get the URL
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: fileUrl }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving hero section:', formData);
    // You can add API call here
    alert('Hero section saved successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-sm text-gray-600 mt-1">Configure the hero section content and appearance</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          {/* Sub Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Title (leave blank for hide)
            </label>
            <textarea
              value={formData.subTitle}
              onChange={(e) => handleInputChange('subTitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter sub title"
            />
            <p className="text-xs text-gray-500 mt-1">use \ for break</p>
          </div>

          {/* Action Button Text & URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action button text (leave blank for hide)
              </label>
              <input
                type="text"
                value={formData.actionButtonText}
                onChange={(e) => handleInputChange('actionButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action button url
              </label>
              <input
                type="text"
                value={formData.actionButtonUrl}
                onChange={(e) => handleInputChange('actionButtonUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="/courses"
              />
            </div>
          </div>

          {/* Video Button Text & URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video button text (leave blank for hide)
              </label>
              <input
                type="text"
                value={formData.videoButtonText}
                onChange={(e) => handleInputChange('videoButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Watch Our\\Class Demo"
              />
              <p className="text-xs text-gray-500 mt-1">use \ for break</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video button url
              </label>
              <input
                type="text"
                value={formData.videoButtonUrl}
                onChange={(e) => handleInputChange('videoButtonUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Total Students & Total Instructors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Students (leave blank for hide)
              </label>
              <input
                type="text"
                value={formData.totalStudents}
                onChange={(e) => handleInputChange('totalStudents', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="80k"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Instructors (leave blank for hide)
              </label>
              <input
                type="text"
                value={formData.totalInstructors}
                onChange={(e) => handleInputChange('totalInstructors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="30k"
              />
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.bannerImage ? (
                  <div className="relative">
                    <img
                      src={formData.bannerImage}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('bannerImage', '')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload banner image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('bannerImage', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Banner Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Background <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.bannerBackground ? (
                  <div className="relative">
                    <img
                      src={formData.bannerBackground}
                      alt="Banner background preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('bannerBackground', '')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload banner background</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('bannerBackground', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Hero Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Background <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.heroBackground ? (
                  <div className="relative">
                    <img
                      src={formData.heroBackground}
                      alt="Hero background preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('heroBackground', '')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer min-h-[192px]">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload hero background</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('heroBackground', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Enrolled Students Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enrolled students image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.enrolledStudentsImage ? (
                  <div className="relative">
                    <img
                      src={formData.enrolledStudentsImage}
                      alt="Enrolled students preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('enrolledStudentsImage', '')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer min-h-[192px]">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload enrolled students image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('enrolledStudentsImage', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
