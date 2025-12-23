import { useState, useRef, useEffect } from 'react';
import {  Link } from 'react-router-dom';

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '',
    slug: '',
    category: '',
    description: '',
    showHomepage: false,
    popular: false,
    status: false,
    tags: '',
    seoTitle: '',
    seoDescription: '',
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Initialize editor content and word count
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formData.description;
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
    }
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;
      // In a real app, you would upload the file and get the path
      setFormData((prev) => ({ ...prev, thumbnail: `/uploads/blogs/${fileName}` }));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
      setFormData((prev) => ({ ...prev, description: content }));
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleEditorChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log the data; in real app this would call API
    console.log('Saving blog post:', formData);
    alert('Blog saved (demo).');
    // navigate('/admin/blogs');
  };

  return (
    <div className="p-4">
      {/* Header with Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Dashboard / Blog List / Create Post
          </div>
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            title="Preview Blog Frontend View"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Frontend
          </button>
          <Link
            to="/admin/blogs"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ←Back
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image <span className="text-red-500">*</span>
              <span className="text-pink-500 ml-2">(Recommended: 620X415 PX)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer inline-block"
              >
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    IMAGE
                  </button>
                  {formData.thumbnail && (
                    <p className="mt-2 text-sm text-gray-600">{formData.thumbnail}</p>
                  )}
                </div>
              </label>
            </div>
          </div>

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
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter slug"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Evaluation">Evaluation</option>
              <option value="Strategies">Strategies</option>
            </select>
          </div>

          {/* Description with Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="border-b border-gray-300 bg-gray-50 px-2 py-1 flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => formatText('undo')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Undo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('redo')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Redo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                  </svg>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <select
                  onChange={(e) => formatText('formatBlock', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                </select>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  className="p-1.5 hover:bg-gray-200 rounded font-bold"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  className="p-1.5 hover:bg-gray-200 rounded italic"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => formatText('underline')}
                  className="p-1.5 hover:bg-gray-200 rounded underline"
                  title="Underline"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => formatText('strikeThrough')}
                  className="p-1.5 hover:bg-gray-200 rounded line-through"
                  title="Strikethrough"
                >
                  S
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => formatText('createLink', prompt('Enter URL:') || '')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Link"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => formatText('justifyLeft')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Align Left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyCenter')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Align Center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyRight')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Align Right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H3M21 14H3M21 18H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyFull')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Justify"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => formatText('insertUnorderedList')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Bullet List"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13m-13 6h13M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('insertOrderedList')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Numbered List"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('outdent')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Decrease Indent"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12H3m18 0l-4-4m4 4l-4 4M3 12l4-4m-4 4l4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('indent')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Increase Indent"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </button>
              </div>
              {/* Rich Text Editor Content */}
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="min-h-[400px] px-4 py-3 focus:outline-none"
                style={{ wordBreak: 'break-word' }}
              />
              <div className="border-t border-gray-300 px-4 py-2 bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-600 italic">p</span>
                <span className="text-sm text-gray-600 italic">{wordCount} words</span>
              </div>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-4">
            {/* Show on homepage */}
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Show on homepage</label>
              <button
                type="button"
                onClick={() => handleInputChange('showHomepage', !formData.showHomepage)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.showHomepage ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.showHomepage ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          

            {/* Status */}
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <button
                type="button"
                onClick={() => handleInputChange('status', !formData.status)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.status ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.status ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SEO Fields */}
          <div className="space-y-4">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter tags (comma separated)"
              />
            </div>

            {/* SEO Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter SEO title"
              />
            </div>

            {/* SEO Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                placeholder="Enter SEO description"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Blog Frontend Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Blog Header Image */}
                {formData.thumbnail && (
                  <div className="relative h-64 bg-gray-200">
                    <img
                      src={formData.thumbnail}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {!formData.thumbnail.includes('http') && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-8">
                  {/* Category and Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    {formData.category && (
                      <span className="px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                        {formData.category}
                      </span>
                    )}
                    {formData.popular && (
                      <span className="px-3 py-1 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full">
                        Popular
                      </span>
                    )}
                    {formData.showHomepage && (
                      <span className="px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Blog Post Title'}
                  </h1>

                  {/* Tags */}
                  {formData.tags && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {formData.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose max-w-none">
                    {formData.description ? (
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formData.description }}
                      />
                    ) : (
                      <p className="text-gray-500 italic">No content added yet. Add content to see the preview.</p>
                    )}
                  </div>

                  {/* SEO Info (if available) */}
                  {(formData.seoTitle || formData.seoDescription) && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">SEO Information</h3>
                      {formData.seoTitle && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-600">SEO Title: </span>
                          <span className="text-sm text-gray-900">{formData.seoTitle}</span>
                        </div>
                      )}
                      {formData.seoDescription && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">SEO Description: </span>
                          <span className="text-sm text-gray-900">{formData.seoDescription}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Blog Card Preview (for listing view) */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">How it appears in blog listing:</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {formData.thumbnail && (
                        <div className="relative h-48 bg-gray-200">
                          <img
                            src={formData.thumbnail}
                            alt={formData.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {formData.category && (
                            <span className="px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded">
                              {formData.category}
                            </span>
                          )}
                          {formData.popular && (
                            <span className="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {formData.title || 'Blog Post Title'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {formData.description
                            ? editorRef.current?.innerText?.substring(0, 150) || 'Blog post description...'
                            : 'No description available'}
                          ...
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span className="text-primary hover:underline cursor-pointer">Read More →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
