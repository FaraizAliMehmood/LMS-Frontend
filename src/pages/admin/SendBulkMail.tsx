import { useRef, useState, useEffect } from 'react';

const SendBulkMail = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formData.description;
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
    }
  }, []);

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
    console.log('Sending bulk mail:', formData);
    alert('Bulk mail sent (demo).');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send bulk mail</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
      >
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter subject"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="border-b border-gray-300 bg-gray-50 px-2 py-1 flex items-center gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => formatText('undo')}
                className="p-1.5 hover:bg-gray-200 rounded"
                title="Undo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => formatText('redo')}
                className="p-1.5 hover:bg-gray-200 rounded"
                title="Redo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
                  />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h10M4 14h14M4 18h12"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => formatText('justifyCenter')}
                className="p-1.5 hover:bg-gray-200 rounded"
                title="Align Center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 6h12M4 10h16M6 14h12M8 18h8"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => formatText('justifyRight')}
                className="p-1.5 hover:bg-gray-200 rounded"
                title="Align Right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M10 10h10M8 14h12M6 18h14"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => formatText('justifyFull')}
                className="p-1.5 hover:bg-gray-200 rounded"
                title="Justify"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {/* Editor content */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorChange}
              className="min-h-[250px] px-4 py-3 focus:outline-none"
              style={{ wordBreak: 'break-word' }}
            />
            <div className="border-t border-gray-300 px-4 py-2 bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-600 italic">p</span>
              <span className="text-sm text-gray-600 italic">{wordCount} words</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendBulkMail;


