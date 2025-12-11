import { useState } from 'react';

const AboutSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [formData, setFormData] = useState({
    image: '',
    title: "Thousand Of Top [Courses]\\Now in One Place",
  });

  const languages = ['English', 'Hindi', 'Arabic'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload the file and get the URL
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fileUrl }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving about section:', { language: selectedLanguage, ...formData });
    // You can add API call here
    alert('About section saved successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
        <p className="text-sm text-gray-600 mt-1">Configure the about section content</p>
      </div>

      {/* Available Translations Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Translations</h2>
        
        {/* Language Selection */}
        <div className="flex items-center gap-6 mb-4">
          {languages.map((language) => (
            <label
              key={language}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="language"
                value={language}
                checked={selectedLanguage === language}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{language}</span>
              {selectedLanguage !== language && (
                <svg
                  className="w-4 h-4 text-gray-400"
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
              )}
            </label>
          ))}
        </div>

        {/* Editing Mode Banner */}
        <div className="bg-red-600 text-white px-4 py-3 rounded-md">
          <span className="font-medium">Your editing mode : {selectedLanguage}</span>
        </div>
      </div>

      {/* About Section Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-6">About Section</h2>

        <form className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              {formData.image ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={formData.image}
                      alt="About section preview"
                      className="w-48 h-48 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('image', '')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <label className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition-colors">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <label className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition-colors">
                    IMAGE
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter title"
            />
            <p className="text-xs text-gray-500 mt-1">use \ for break</p>
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

export default AboutSection;
