import { useState } from 'react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string | File | null;
  iconPreview?: string;
}

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: '1',
      name: 'Facebook',
      url: 'https://www.facebook.com/',
      icon: null,
      iconPreview: 'f',
    },
    {
      id: '2',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/',
      icon: null,
      iconPreview: 'in',
    },
    {
      id: '3',
      name: 'WhatsApp',
      url: 'https://web.whatsapp.com/',
      icon: null,
      iconPreview: 'wa',
    },
    {
      id: '4',
      name: 'YouTube',
      url: 'https://www.youtube.com/',
      icon: null,
      iconPreview: 'yt',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: null as File | null,
    iconPreview: null as string | null,
  });

  const handleAddNew = () => {
    setEditingLink(null);
    setFormData({ name: '', url: '', icon: null, iconPreview: null });
    setShowModal(true);
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      url: link.url,
      icon: null,
      iconPreview: typeof link.icon === 'string' ? link.icon : link.iconPreview || null,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      setSocialLinks(socialLinks.filter((link) => link.id !== id));
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, icon: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, iconPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink) {
      // Update existing link
      setSocialLinks(
        socialLinks.map((link) =>
          link.id === editingLink.id
            ? {
                ...link,
                name: formData.name,
                url: formData.url,
                icon: formData.icon || link.icon,
                iconPreview: formData.iconPreview || link.iconPreview,
              }
            : link
        )
      );
    } else {
      // Add new link
      const newLink: SocialLink = {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        icon: formData.icon,
        iconPreview: formData.iconPreview || undefined,
      };
      setSocialLinks([...socialLinks, newLink]);
    }
    setShowModal(false);
    setFormData({ name: '', url: '', icon: null, iconPreview: null });
  };

  const getIconDisplay = (link: SocialLink) => {
    if (link.iconPreview && link.iconPreview.startsWith('data:')) {
      return <img src={link.iconPreview} alt={link.name} className="w-full h-full object-contain" />;
    }
    if (link.iconPreview) {
      return (
        <span className="text-white text-xs font-semibold uppercase">
          {link.iconPreview}
        </span>
      );
    }
    return <span className="text-white text-xs font-semibold uppercase">{link.name[0]}</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary mt-6">Social Links</h1>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#2d3db8] transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {socialLinks.map((link, index) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-gray-400 rounded flex items-center justify-center">
                    {getIconDisplay(link)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(link)}
                      className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {socialLinks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No social links found. Click "Add New" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingLink ? 'Edit Social Link' : 'Add New Social Link'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Media Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Facebook, Twitter, Instagram"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://www.example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="flex items-center space-x-4">
                  {formData.iconPreview && (
                    <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center">
                      {formData.iconPreview.startsWith('data:') ? (
                        <img
                          src={formData.iconPreview}
                          alt="Icon preview"
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <span className="text-white text-xs font-semibold uppercase">
                          {formData.iconPreview}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleIconChange}
                        className="hidden"
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 text-center">
                        {formData.iconPreview ? 'Change Icon' : 'Upload Icon'}
                      </div>
                    </label>
                    {formData.icon && (
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.icon as File).name}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload an icon image or leave empty to use text initials
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', url: '', icon: null, iconPreview: null });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#2d3db8] transition-colors"
                >
                  {editingLink ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;

