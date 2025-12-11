import { useState } from 'react';

interface ToggleOption {
  id: string;
  label: string;
  enabled: boolean;
}

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    appName: 'SkillGro',
    siteAddress: '589 5th Ave, NY 10024, USA',
    siteEmail: 'contact@skillgro.com',
    timezone: 'Africa/Abidjan',
    mailSendTime: '5',
  });

  const [toggles, setToggles] = useState<ToggleOption[]>([
    { id: 'header-topbar', label: 'Header Topbar', enabled: true },
    { id: 'topbar-social-icons', label: 'Topbar Social Icons', enabled: true },
    { id: 'preloader', label: 'Preloader', enabled: false },
    { id: 'cursor-style', label: 'Cursor Style', enabled: true },
    { id: 'send-mails-queue', label: 'Send Mails In Queue', enabled: false },
  ]);

  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleOption = (id: string) => {
    setToggles(
      toggles.map((toggle) =>
        toggle.id === id ? { ...toggle, enabled: !toggle.enabled } : toggle
      )
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFavicon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Toggles:', toggles);
    console.log('Logo:', logo);
    console.log('Favicon:', favicon);
    // Handle form submission here
  };

  const timezones = [
    'Africa/Abidjan',
    'Africa/Accra',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Australia/Sydney',
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6">General Settings</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Website Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Website Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* App Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Name
                </label>
                <input
                  type="text"
                  name="appName"
                  value={formData.appName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter app name"
                />
              </div>

              {/* Site Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Address
                </label>
                <input
                  type="text"
                  name="siteAddress"
                  value={formData.siteAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter site address"
                />
              </div>

              {/* Site Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Email
                </label>
                <input
                  type="email"
                  name="siteEmail"
                  value={formData.siteEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter site email"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Mail Send Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mail send time before the live class starts{' '}
                  <span className="text-red-500">(in minutes)</span>
                </label>
                <input
                  type="number"
                  name="mailSendTime"
                  value={formData.mailSendTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter minutes"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Logo & Favicon Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Logo & Favicon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  {logoPreview && (
                    <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 text-center">
                        {logo ? 'Change Logo' : 'Upload Logo'}
                      </div>
                    </label>
                    {logo && (
                      <p className="text-xs text-gray-500 mt-1">{logo.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                </label>
                <div className="flex items-center space-x-4">
                  {faviconPreview && (
                    <div className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={faviconPreview}
                        alt="Favicon preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconChange}
                        className="hidden"
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 text-center">
                        {favicon ? 'Change Favicon' : 'Upload Favicon'}
                      </div>
                    </label>
                    {favicon && (
                      <p className="text-xs text-gray-500 mt-1">{favicon.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Options Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
            <div className="space-y-4">
              {toggles.map((toggle) => (
                <div key={toggle.id} className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                    {toggle.label}
                  </label>
                  <ToggleSwitch
                    enabled={toggle.enabled}
                    onChange={() => toggleOption(toggle.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Email Configuration Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="smtp.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="587"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your-email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="noreply@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your App Name"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2.5 rounded-lg hover:bg-[#2d3db8] transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ enabled, onChange }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        enabled ? 'bg-primary' : 'bg-gray-300'
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default GeneralSettings;

