import { useState } from 'react';

const NewsletterSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [formData, setFormData] = useState({
    title: 'Subscribe to Our Newsletter',
    subtitle: 'Get the latest updates and news delivered to your inbox',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
  });

  const languages = ['English', 'Hindi', 'Arabic'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving newsletter section:', { language: selectedLanguage, ...formData });
    // You can add API call here
    alert('Newsletter section saved successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Section</h1>
        <p className="text-sm text-gray-600 mt-1">Configure the newsletter section content</p>
      </div>

      {/* Available Translations Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Translations</h2>
        
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

      {/* Newsletter Section Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-6">Newsletter Section</h2>

        <form className="space-y-6">
          {/* Title */}
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

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle (leave blank for hide)
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter subtitle"
            />
            <p className="text-xs text-gray-500 mt-1">use \ for break</p>
          </div>

          {/* Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Placeholder Text
            </label>
            <input
              type="text"
              value={formData.placeholder}
              onChange={(e) => handleInputChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter placeholder text"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => handleInputChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter button text"
            />
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

export default NewsletterSection;
