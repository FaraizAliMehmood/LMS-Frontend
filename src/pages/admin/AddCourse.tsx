import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    instructor: 'Mark Davenport (instructortwo@gmail.com)',
    title: 'Artificial Intelligence in Business',
    slug: 'artificial-intelligence-in-business',
    seoDescription: 'Artificial Intelligence in Business',
    thumbnail: '/uploads/store/files/1001/my course images/flat-design-minimal-technology-youtube-thumbnail_23-2149153571_13_11zon.jpg',
    demoVideoStorage: 'youtube',
    demoVideoPath: 'https://www.youtube.com/watch?v=MHhlzlgFgJo',
    price: '100',
    discountPrice: '',
    description: '<p><strong>Laravel 10: Build Realtime Messaging App From Scratch (2024)</strong></p><p>Are you ready to take your Laravel skills to the next level? In this course, you will build a complete Realtime Messaging System project from scratch using Laravel 10 and Pusher. This project-based course is designed to help you become a professional Laravel developer and give you a competitive edge in the job market.</p><p><strong>Why Learn Laravel 10?</strong></p><p>Laravel 10 is the latest version of the popular PHP framework, packed with new features and improvements that make web development faster and more efficient.</p><p><strong>What Will You Learn?</strong></p><ul><li>User to User Live Chat</li></ul>',
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [chapters, setChapters] = useState<Array<{ id: string; title: string; type: 'lesson' | 'quiz'; lessons: Array<{ id: string; title: string; type: 'lesson' | 'quiz' }> }>>([]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterTitle, setChapterTitle] = useState('introduction');
  const [chapterType, setChapterType] = useState<'lesson' | 'quiz'>('lesson');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState({
    chapter: '',
    title: 'Promo: Introduction to laravel',
    source: 'YouTube',
    fileType: 'Video',
    path: 'https://www.youtube.com/watch?v=6qpsW1pZ8fw',
    duration: '20',
    description: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
    isFreePreview: true,
  });
  const [questionForm, setQuestionForm] = useState({
    question: '',
    numberOfOptions: 4,
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: '1',
  });

  const instructors = [
    'Mark Davenport (instructortwo@gmail.com)',
    'Jason Thorne (jason@example.com)',
    'Ethan Granger (ethan@example.com)',
  ];

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

  // Initialize editor content and word count once
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formData.description;
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;
      // In a real app, you would upload the file and get the path
      setFormData((prev) => ({ ...prev, thumbnail: `/uploads/store/files/1001/my course images/${fileName}` }));
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

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving course:', formData);
    // Navigate back to courses list or show success message
    navigate('/admin/courses');
  };

  const handleSaveCourse = async () => {
    try {
      // Prepare course data for upload
      const courseData = {
        ...formData,
        chapters: chapters.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          type: chapter.type,
          lessons: chapter.lessons,
        })),
        createdAt: new Date().toISOString(),
      };

      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(courseData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to create course');
      // }

      // For now, just log the data and show success message
      console.log('Course data to be uploaded:', courseData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message (you can replace this with a toast notification)
      alert('Course created successfully!');
      
      // Navigate back to courses list
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleCreateChapter = () => {
    if (chapterTitle.trim()) {
      const newChapter = {
        id: Date.now().toString(),
        title: chapterTitle.trim(),
        type: chapterType,
        lessons: [],
      };
      setChapters([...chapters, newChapter]);
      setChapterTitle('introduction');
      setChapterType('lesson');
      setShowChapterModal(false);
    }
  };

  const handleDeleteChapter = (id: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleAddLesson = (chapterId: string) => {
    const selectedChapter = chapters.find((ch) => ch.id === chapterId);
    setSelectedChapterId(chapterId);
    setLessonForm((prev) => ({
      ...prev,
      chapter: selectedChapter?.title || '',
    }));
    setOpenDropdownId(null);
    setShowLessonModal(true);
  };

  const handleLessonFormChange = (field: string, value: string | boolean) => {
    setLessonForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateLesson = () => {
    if (selectedChapterId && lessonForm.title.trim() && lessonForm.duration) {
      const newLesson = {
        id: Date.now().toString(),
        title: lessonForm.title.trim(),
        type: 'lesson' as const,
      };
      setChapters(
        chapters.map((chapter) =>
          chapter.id === selectedChapterId
            ? { ...chapter, lessons: [...chapter.lessons, newLesson] }
            : chapter
        )
      );
      // Reset form
      setLessonForm({
        chapter: '',
        title: 'Promo: Introduction to laravel',
        source: 'YouTube',
        fileType: 'Video',
        path: 'https://www.youtube.com/watch?v=6qpsW1pZ8fw',
        duration: '20',
        description: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
        isFreePreview: true,
      });
      setShowLessonModal(false);
      setSelectedChapterId(null);
    }
  };

  const handleAddQuiz = (chapterId: string) => {
    // Handle add quiz logic here
    console.log('Add quiz to chapter:', chapterId);
    setOpenDropdownId(null);
    // You can open a modal or navigate to add quiz page here
  };

  const handleAddQuestion = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setQuestionForm({
      question: '',
      numberOfOptions: 4,
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: '1',
    });
    setOpenDropdownId(null);
    setShowQuestionModal(true);
  };

  const handleQuestionFormChange = (field: string, value: string | number) => {
    setQuestionForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberOfOptionsChange = (count: number) => {
    const newOptions = Array(count).fill('').map((_, index) => 
      questionForm.options[index] || ''
    );
    setQuestionForm((prev) => ({
      ...prev,
      numberOfOptions: count,
      options: newOptions,
      correctAnswer: prev.correctAnswer && parseInt(prev.correctAnswer) < count ? prev.correctAnswer : '',
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm((prev) => ({ ...prev, options: newOptions }));
  };

  const handleCreateQuestion = () => {
    if (
      selectedChapterId &&
      questionForm.question.trim() &&
      questionForm.options.some((opt) => opt.trim()) &&
      questionForm.correctAnswer
    ) {
      const newQuestion = {
        id: Date.now().toString(),
        title: questionForm.question.trim(),
        type: 'quiz' as const,
      };
      setChapters(
        chapters.map((chapter) =>
          chapter.id === selectedChapterId
            ? { ...chapter, lessons: [...chapter.lessons, newQuestion] }
            : chapter
        )
      );
      // Reset form
      setQuestionForm({
        question: '',
        numberOfOptions: 4,
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: '1',
      });
      setShowQuestionModal(false);
      setSelectedChapterId(null);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Infos' },
    { id: 'more', label: 'More Infos' },
    { id: 'contents', label: 'Course Contents' },
    { id: 'finish', label: 'Finish' },
  ];

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.instructor}
                onChange={(e) => handleInputChange('instructor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {instructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
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
              />
            </div>

            {/* Seo Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seo description</label>
              <input
                type="text"
                value={formData.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <label className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
                  Choose
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            {/* Demo Video Storage and Path */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demo Video Storage <span className="text-gray-500">(optional)</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.demoVideoStorage}
                  onChange={(e) => handleInputChange('demoVideoStorage', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="youtube">youtube</option>
                  <option value="vimeo">vimeo</option>
                  <option value="self-hosted">self-hosted</option>
                </select>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={formData.demoVideoPath}
                    onChange={(e) => handleInputChange('demoVideoPath', e.target.value)}
                    placeholder="Path"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Price and Discount Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
                <input
                  type="text"
                  value={formData.discountPrice}
                  onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'more' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            {/* Rich Text Editor Toolbar */}
            <div className="border border-gray-300 rounded-md mb-0">
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
              <div className="border-t border-gray-300 px-4 py-2 bg-gray-50 flex justify-end">
                <span className="text-sm text-gray-600 italic">{wordCount} words</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setShowChapterModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Add new chapter
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Sort chapter
              </button>
            </div>

            {/* Chapters List */}
            {chapters.length > 0 && (
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border border-gray-300 rounded-md bg-white"
                  >
                    {/* Chapter Header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-900 font-medium text-lg">{chapter.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Add Menu Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === chapter.id ? null : chapter.id)}
                            className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                          {openDropdownId === chapter.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                              {chapter.type === 'quiz' ? (
                                <button
                                  onClick={() => handleAddQuestion(chapter.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Add Question
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleAddLesson(chapter.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Add Lesson
                                  </button>
                                  <button
                                    onClick={() => handleAddQuiz(chapter.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Add Quiz
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        {/* Edit Button */}
                        <button
                          className="w-8 h-8 border-2 border-red-500 rounded flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
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
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteChapter(chapter.id)}
                          className="w-8 h-8 text-red-600 hover:text-red-800 flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Chapter Content */}
                    <div className="px-4 pb-4">
                      {chapter.lessons.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No lessons found.</p>
                      ) : (
                        <div className="space-y-2">
                          {chapter.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-2 bg-gray-50 rounded border border-gray-200"
                            >
                              {lesson.type === 'lesson' ? '📖' : '📝'} {lesson.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {chapters.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No chapters added yet. Click "Add new chapter" to get started.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'finish' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Review Course Details</h2>
              <p className="text-sm text-blue-700">
                Please review all the course information before submitting. Once submitted, the course will be created.
              </p>
            </div>

            {/* Basic Information Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Instructor</label>
                  <p className="text-gray-900 mt-1">{formData.instructor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Title</label>
                  <p className="text-gray-900 mt-1">{formData.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Slug</label>
                  <p className="text-gray-900 mt-1">{formData.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">SEO Description</label>
                  <p className="text-gray-900 mt-1">{formData.seoDescription || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="text-gray-900 mt-1">${formData.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Discount Price</label>
                  <p className="text-gray-900 mt-1">{formData.discountPrice ? `$${formData.discountPrice}` : 'No discount'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Thumbnail</label>
                  <p className="text-gray-900 mt-1 truncate">{formData.thumbnail || 'Not uploaded'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Demo Video</label>
                  <p className="text-gray-900 mt-1">
                    {formData.demoVideoStorage} - {formData.demoVideoPath ? 'Configured' : 'Not configured'}
                  </p>
                </div>
              </div>
            </div>

            {/* Course Description Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Course Description
              </h3>
              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.description || 'No description provided' }}
              />
            </div>

            {/* Course Contents Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Course Contents
              </h3>
              {chapters.length > 0 ? (
                <div className="space-y-4">
                  {chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Chapter {chapterIndex + 1}:</span>
                          <span className="text-gray-900 font-medium">{chapter.title}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            chapter.type === 'quiz' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {chapter.type === 'quiz' ? 'Quiz Chapter' : 'Lesson Chapter'}
                          </span>
                        </div>
                      </div>
                      {chapter.lessons.length > 0 ? (
                        <div className="ml-6 space-y-2">
                          {chapter.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center gap-2 text-sm text-gray-700">
                              <span>
                                {lesson.type === 'quiz' ? '📝' : '📖'} {lesson.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="ml-6 text-sm text-gray-500">No content added yet</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No chapters added yet</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setActiveTab('contents')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back to Contents
              </button>
              <button
                onClick={handleSaveCourse}
                disabled={!formData.title || !formData.instructor || chapters.length === 0}
                className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        {/* Save Button */}
        {(activeTab === 'basic' || activeTab === 'more') && (
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {openDropdownId && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenDropdownId(null)}
        />
      )}

      {/* Add Chapter Modal */}
      {showChapterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Chapter</h3>
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setChapterTitle('introduction');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter chapter title"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateChapter();
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chapter Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={chapterType}
                  onChange={(e) => setChapterType(e.target.value as 'lesson' | 'quiz')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="lesson">Lesson Chapter</option>
                  <option value="quiz">Quiz Chapter</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {chapterType === 'quiz' 
                    ? 'Quiz chapters will show "Add Question" option instead of "Add Lesson" and "Add Quiz"'
                    : 'Lesson chapters will show "Add Lesson" and "Add Quiz" options'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={handleCreateChapter}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add Lesson</h3>
              <button
                onClick={() => {
                  setShowLessonModal(false);
                  setSelectedChapterId(null);
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Chapter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chapter <span className="text-red-500">*</span>
                </label>
                <select
                  value={lessonForm.chapter}
                  onChange={(e) => handleLessonFormChange('chapter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.title}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => handleLessonFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Source and File Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={lessonForm.source}
                    onChange={(e) => handleLessonFormChange('source', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Vimeo">Vimeo</option>
                    <option value="Self-hosted">Self-hosted</option>
                    <option value="AWS S3">AWS S3</option>
                    <option value="VdoCipher">VdoCipher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={lessonForm.fileType}
                    onChange={(e) => handleLessonFormChange('fileType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Document">Document</option>
                    <option value="PDF">PDF</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
              </div>

              {/* Path */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Path</label>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={lessonForm.path}
                    onChange={(e) => handleLessonFormChange('path', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span> (in minutes)
                </label>
                <input
                  type="number"
                  value={lessonForm.duration}
                  onChange={(e) => handleLessonFormChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="0"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={lessonForm.description}
                  onChange={(e) => handleLessonFormChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Is Free Preview Toggle */}
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Is Free Preview</label>
                <button
                  type="button"
                  onClick={() => handleLessonFormChange('isFreePreview', !lessonForm.isFreePreview)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    lessonForm.isFreePreview ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      lessonForm.isFreePreview ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={handleCreateLesson}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add Question</h3>
              <button
                onClick={() => {
                  setShowQuestionModal(false);
                  setSelectedChapterId(null);
                  setQuestionForm({
                    question: '',
                    numberOfOptions: 4,
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    marks: '1',
                  });
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => handleQuestionFormChange('question', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your question here..."
                />
              </div>

              {/* Number of Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Options <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs ml-2">(Typically 4-5 options for exams)</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumberOfOptionsChange(num)}
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        questionForm.numberOfOptions === num
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select the number of answer options. Most exams use 4-5 options.
                </p>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {questionForm.options.slice(0, questionForm.numberOfOptions).map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-medium text-gray-600">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={index.toString()}
                          checked={questionForm.correctAnswer === index.toString()}
                          onChange={(e) => handleQuestionFormChange('correctAnswer', e.target.value)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">Correct</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={questionForm.marks}
                  onChange={(e) => handleQuestionFormChange('marks', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowQuestionModal(false);
                  setSelectedChapterId(null);
                  setQuestionForm({
                    question: '',
                    numberOfOptions: 4,
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    marks: '1',
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQuestion}
                disabled={
                  !questionForm.question.trim() ||
                  !questionForm.options.some((opt) => opt.trim()) ||
                  !questionForm.correctAnswer
                }
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
