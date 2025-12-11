import { useState } from 'react';

const Footer = () => {
  const [formData, setFormData] = useState({
    logo: '',
    footerAddress: '123 Main Street, City, Country',
    footerText: 'Your trusted platform for online learning',
    footerPhone: '+1 234 567 890',
    getInTouchText: 'Get in touch with us for any inquiries',
    googlePlayLink: 'https://play.google.com/store/apps',
    appleStoreLink: 'https://apps.apple.com/app',
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
    console.log('Saving footer settings:', formData);
    // You can add API call here
    alert('Footer settings saved successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Footer Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Configure footer content and links</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {formData.logo ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="max-w-[200px] max-h-[80px] object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('logo', '')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <label className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition-colors">
                    Change Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('logo', e)}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">Click to upload logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('logo', e)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Footer Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Address
            </label>
            <textarea
              value={formData.footerAddress}
              onChange={(e) => handleInputChange('footerAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter footer address"
            />
          </div>

          {/* Footer Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Text
            </label>
            <textarea
              value={formData.footerText}
              onChange={(e) => handleInputChange('footerText', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter footer description text"
            />
          </div>

          {/* Footer Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Phone
            </label>
            <input
              type="text"
              value={formData.footerPhone}
              onChange={(e) => handleInputChange('footerPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          {/* Get in Touch Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Get in Touch Text
            </label>
            <input
              type="text"
              value={formData.getInTouchText}
              onChange={(e) => handleInputChange('getInTouchText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter get in touch text"
            />
          </div>

          {/* App Store Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Play Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Play Link
              </label>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <input
                  type="url"
                  value={formData.googlePlayLink}
                  onChange={(e) => handleInputChange('googlePlayLink', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://play.google.com/store/apps"
                />
              </div>
            </div>

            {/* Apple Store Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apple Store Link
              </label>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <input
                  type="url"
                  value={formData.appleStoreLink}
                  onChange={(e) => handleInputChange('appleStoreLink', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://apps.apple.com/app"
                />
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

export default Footer;
