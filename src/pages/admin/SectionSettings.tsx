import { useState } from 'react';

interface Section {
  id: string;
  label: string;
  enabled: boolean;
}

const SectionSettings = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: 'hero', label: 'Hero Section', enabled: true },
    { id: 'top-category', label: 'Top Category Section', enabled: true },
    { id: 'brands', label: 'Brands Section', enabled: true },
    { id: 'about', label: 'About Section', enabled: true },
    { id: 'featured-course', label: 'Featured Course Section', enabled: true },
    { id: 'newsletter', label: 'News Letter Section', enabled: true },
    { id: 'featured-instructor', label: 'Featured Instructor Section', enabled: true },
    { id: 'counter', label: 'Counter Section', enabled: true },
    { id: 'faq', label: 'Faq Section', enabled: true },
    { id: 'our-features', label: 'Our Features Section', enabled: true },
    { id: 'banner', label: 'Banner section', enabled: true },
    { id: 'testimonial', label: 'Testimonial section', enabled: true },
    { id: 'latest-blog', label: 'Latest Blog section', enabled: true },
  ]);

  const toggleSection = (id: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving sections:', sections);
    // You can add a success message or API call here
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6">Section Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-3 cursor-pointer">
                {section.label}
              </label>
              <div className="flex items-center">
                <ToggleSwitch
                  enabled={section.enabled}
                  onChange={() => toggleSection(section.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-start mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="bg-primary text-white px-8 py-2.5 rounded-lg hover:bg-[#2d3db8] transition-colors font-medium text-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
        <p>2010-2024 skilloro.com. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Version: 2.7.0</p>
      </div>
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
      aria-label={enabled ? 'Enabled' : 'Disabled'}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default SectionSettings;

