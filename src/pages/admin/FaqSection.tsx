import { useState } from 'react';

interface FAQ {
  id: string;
  sn: number;
  question: string;
  answer: string;
  status: 'Active' | 'Inactive';
}

const FaqSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [formData, setFormData] = useState({
    image: '',
    title: "Start Learning From World's Pro Instructors",
  });

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      sn: 1,
      question: 'What kind of courses do you offer?',
      answer: 'We offer a wide variety of courses across multiple categories including programming, design, business, marketing, and more.',
      status: 'Active',
    },
    {
      id: '2',
      sn: 2,
      question: 'Who are your instructors?',
      answer: 'Our instructors are industry professionals with years of experience in their respective fields.',
      status: 'Active',
    },
    {
      id: '3',
      sn: 3,
      question: 'How do I enroll in a course?',
      answer: 'Simply browse our course catalog, select a course, and click the enroll button to get started.',
      status: 'Active',
    },
    {
      id: '4',
      sn: 4,
      question: 'Can I get a certificate after completion?',
      answer: 'Yes, you will receive a certificate of completion for each course you finish.',
      status: 'Active',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
  });

  const languages = ['English', 'Hindi', 'Arabic'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fileUrl }));
    }
  };

  const handleAddNew = () => {
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '' });
    setShowAddModal(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFaqForm({ question: faq.question, answer: faq.answer });
    setShowAddModal(true);
  };

  const handleSaveFaq = () => {
    if (faqForm.question.trim() && faqForm.answer.trim()) {
      if (editingFaq) {
        setFaqs(
          faqs.map((faq) =>
            faq.id === editingFaq.id
              ? { ...faq, question: faqForm.question, answer: faqForm.answer }
              : faq
          )
        );
      } else {
        const newFaq: FAQ = {
          id: Date.now().toString(),
          sn: faqs.length + 1,
          question: faqForm.question,
          answer: faqForm.answer,
          status: 'Active',
        };
        setFaqs([...faqs, newFaq]);
      }
      setShowAddModal(false);
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter((faq) => faq.id !== id).map((faq, index) => ({ ...faq, sn: index + 1 })));
    }
  };

  const toggleStatus = (id: string) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id ? { ...faq, status: faq.status === 'Active' ? 'Inactive' : 'Active' } : faq
      )
    );
  };

  const handleSave = () => {
    console.log('Saving FAQ section:', { language: selectedLanguage, ...formData, faqs });
    alert('FAQ section saved successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FAQ Section</h1>
        <p className="text-sm text-gray-600 mt-1">Configure the FAQ section content</p>
      </div>

      {/* Available Translations Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Translations</h2>
        
        <div className="flex items-center gap-6 mb-4">
          {languages.map((language) => (
            <label key={language} className="flex items-center gap-2 cursor-pointer">
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
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <div className="bg-red-600 text-white px-4 py-3 rounded-md">
          <span className="font-medium">Your editing mode : {selectedLanguage}</span>
        </div>
      </div>

      {/* FAQ Section Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-primary mb-6">Faq Section</h2>

        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 relative">
              {formData.image ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={formData.image}
                      alt="FAQ section preview"
                      className="w-full max-w-md h-64 object-cover rounded"
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
                  <label className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                    IMAGE
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer min-h-[256px] relative">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 mb-4">Click to upload image</span>
                  <div className="absolute bottom-4 bg-gray-600 text-white px-4 py-2 rounded-md">
                    IMAGE
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter title"
            />
            <p className="text-xs text-gray-500 mt-1">
              wrap your word with [] for highlight and \ for break and {'{}'} for bold
            </p>
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">FAQs</h2>
          <button
            onClick={handleAddNew}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </button>
        </div>

        {/* FAQs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Answer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <tr key={faq.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{faq.sn}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{faq.question}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 max-w-md">{faq.answer}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(faq.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        faq.status === 'Active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {faq.status}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
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
                        onClick={() => handleDelete(faq.id)}
                        className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors"
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
        </div>
      </div>

      {/* Add/Edit FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                  setFaqForm({ question: '', answer: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                <input
                  type="text"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                <textarea
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter answer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                  setFaqForm({ question: '', answer: '' });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFaq}
                disabled={!faqForm.question.trim() || !faqForm.answer.trim()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingFaq ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FaqSection;
