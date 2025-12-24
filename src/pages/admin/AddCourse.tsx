import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    instructor: 'Mark Davenport (instructortwo@gmail.com)',
    title: 'Artificial Intelligence in Business',
    category: 'Business',
    slug: 'artificial-intelligence-in-business',
    seoDescription: 'Artificial Intelligence in Business',
    thumbnail: '/uploads/store/files/1001/my course images/flat-design-minimal-technology-youtube-thumbnail_23-2149153571_13_11zon.jpg',
    demoVideoStorage: 'youtube',
    demoVideoPath: 'https://www.youtube.com/watch?v=MHhlzlgFgJo',
    courseType: 'paid', // 'free' or 'paid'
    price: '100',
    hasDiscount: false,
    discountPrice: '',
    status: 'Publish', // 'Draft' or 'Publish'
    description: '<p><strong>Laravel 10: Build Realtime Messaging App From Scratch (2024)</strong></p><p>Are you ready to take your Laravel skills to the next level? In this course, you will build a complete Realtime Messaging System project from scratch using Laravel 10 and Pusher. This project-based course is designed to help you become a professional Laravel developer and give you a competitive edge in the job market.</p><p><strong>Why Learn Laravel 10?</strong></p><p>Laravel 10 is the latest version of the popular PHP framework, packed with new features and improvements that make web development faster and more efficient.</p><p><strong>What Will You Learn?</strong></p><ul><li>User to User Live Chat</li></ul>',
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [chapters, setChapters] = useState<Array<{ id: string; title: string; type: 'lesson' | 'quiz'; lessons: Array<{ id: string; title: string; type: 'lesson' | 'quiz'; timeLimit?: string; attempts?: string; questions?: Array<{ id: string; title: string; type: 'quiz' }> }> }>>([]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterTitle, setChapterTitle] = useState('introduction');
  const [chapterType, setChapterType] = useState<'lesson' | 'quiz'>('lesson');
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [showSortChapters, setShowSortChapters] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewType, setPreviewType] = useState<'frontend' | 'player' | null>(null);
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
  const [questionForm, setQuestionForm] = useState<{
    question: string;
    numberOfOptions: number;
    options: string[];
    correctAnswer: string;
    marks: string;
  }>({
    question: '',
    numberOfOptions: 4,
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: '1',
  });
  const [quizForm, setQuizForm] = useState({
    chapter: '',
    title: 'QUIZ: This is a demo quiz test',
    timeLimit: '10',
    attempts: '10',
  });
  const [faqs, setFaqs] = useState<Array<{ id: string; question: string; answer: string }>>([]);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);



  const categories = [
    'Business',
    'Development',
    'Design',
    'Marketing',
    'Photography',
    'Music',
    'Health & Fitness',
    'Language',
    'Science',
    'Technology',
    'Art',
    'Finance',
    'Education',
    'Other',
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

  const handleInputChange = (field: string, value: string | boolean) => {
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
        faqs: faqs,
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
      if (editingChapterId) {
        // Update existing chapter
        setChapters(
          chapters.map((chapter) =>
            chapter.id === editingChapterId
              ? { ...chapter, title: chapterTitle.trim(), type: chapterType }
              : chapter
          )
        );
      } else {
        // Create new chapter
      const newChapter = {
        id: Date.now().toString(),
        title: chapterTitle.trim(),
        type: chapterType,
        lessons: [],
      };
      setChapters([...chapters, newChapter]);
      }
      setChapterTitle('introduction');
      setChapterType('lesson');
      setEditingChapterId(null);
      setShowChapterModal(false);
    }
  };

  const handleEditChapter = (chapterId: string) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    if (chapter) {
      setEditingChapterId(chapterId);
      setChapterTitle(chapter.title);
      setChapterType(chapter.type);
      setShowChapterModal(true);
    }
  };

  const handleSortChapter = (chapterId: string, direction: 'up' | 'down') => {
    const index = chapters.findIndex((ch) => ch.id === chapterId);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const newChapters = [...chapters];
      [newChapters[index - 1], newChapters[index]] = [newChapters[index], newChapters[index - 1]];
      setChapters(newChapters);
    } else if (direction === 'down' && index < chapters.length - 1) {
      const newChapters = [...chapters];
      [newChapters[index], newChapters[index + 1]] = [newChapters[index + 1], newChapters[index]];
      setChapters(newChapters);
    }
  };

  const handleSortLesson = (chapterId: string, lessonId: string, direction: 'up' | 'down') => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const index = chapter.lessons.findIndex((lesson) => lesson.id === lessonId);
          if (index === -1) return chapter;

          const newLessons = [...chapter.lessons];
          if (direction === 'up' && index > 0) {
            [newLessons[index - 1], newLessons[index]] = [newLessons[index], newLessons[index - 1]];
          } else if (direction === 'down' && index < newLessons.length - 1) {
            [newLessons[index], newLessons[index + 1]] = [newLessons[index + 1], newLessons[index]];
          }
          return { ...chapter, lessons: newLessons };
        }
        return chapter;
      })
    );
  };

  const handleDeleteChapter = (id: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleAddLesson = (chapterId: string) => {
    const selectedChapter = chapters.find((ch) => ch.id === chapterId);
    setSelectedChapterId(chapterId);
    setSelectedLessonId(null);
    setLessonForm((prev) => ({
      ...prev,
      chapter: selectedChapter?.title || '',
    }));
    setOpenDropdownId(null);
    setShowLessonModal(true);
  };

  const handleEditLesson = (chapterId: string, lessonId: string) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    const lesson = chapter?.lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.type === 'lesson') {
      setSelectedChapterId(chapterId);
      setSelectedLessonId(lessonId);
      const lessonData = lesson as any;
      setLessonForm({
        chapter: chapter?.title || '',
        title: lesson.title,
        source: lessonData.source || 'YouTube',
        fileType: lessonData.fileType || 'Video',
        path: lessonData.path || '',
        duration: lessonData.duration || '20',
        description: lessonData.description || '',
        isFreePreview: lessonData.isFreePreview || false,
      });
      setShowLessonModal(true);
    }
  };

  const handleLessonFormChange = (field: string, value: string | boolean) => {
    setLessonForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateLesson = () => {
    if (selectedChapterId && lessonForm.title.trim() && lessonForm.duration) {
      if (selectedLessonId) {
        // Update existing lesson
        setChapters(
          chapters.map((chapter) =>
            chapter.id === selectedChapterId
              ? {
                  ...chapter,
                  lessons: chapter.lessons.map((lesson) =>
                    lesson.id === selectedLessonId
                      ? {
                          ...lesson,
                          title: lessonForm.title.trim(),
                          ...(lesson.type === 'lesson' && {
                            source: lessonForm.source,
                            fileType: lessonForm.fileType,
                            path: lessonForm.path,
                            duration: lessonForm.duration,
                            description: lessonForm.description,
                            isFreePreview: lessonForm.isFreePreview,
                          }),
                        }
                      : lesson
                  ),
                }
              : chapter
          )
        );
      } else {
        // Create new lesson
      const newLesson = {
        id: Date.now().toString(),
        title: lessonForm.title.trim(),
        type: 'lesson' as const,
          source: lessonForm.source,
          fileType: lessonForm.fileType,
          path: lessonForm.path,
          duration: lessonForm.duration,
          description: lessonForm.description,
          isFreePreview: lessonForm.isFreePreview,
      };
      setChapters(
        chapters.map((chapter) =>
          chapter.id === selectedChapterId
            ? { ...chapter, lessons: [...chapter.lessons, newLesson] }
            : chapter
        )
      );
      }
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
      setSelectedLessonId(null);
    }
  };

  const handleAddQuiz = (chapterId: string) => {
    const selectedChapter = chapters.find((ch) => ch.id === chapterId);
    setSelectedChapterId(chapterId);
    setSelectedLessonId(null);
    setQuizForm((prev) => ({
      ...prev,
      chapter: selectedChapter?.title || '',
      title: 'QUIZ: This is a demo quiz test',
      timeLimit: '10',
      attempts: '10',
    }));
    setOpenDropdownId(null);
    setShowQuizModal(true);
  };

  const handleEditQuiz = (chapterId: string, quizId: string) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    const quiz = chapter?.lessons.find((l) => l.id === quizId);
    if (quiz && quiz.type === 'quiz') {
      setSelectedChapterId(chapterId);
      setSelectedLessonId(quizId);
      const quizData = quiz as any;
      setQuizForm({
        chapter: chapter?.title || '',
        title: quiz.title,
        timeLimit: quizData.timeLimit || '10',
        attempts: quizData.attempts || '10',
      });
      setShowQuizModal(true);
    }
  };

  const handleQuizFormChange = (field: string, value: string) => {
    setQuizForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateQuiz = () => {
    if (selectedChapterId && quizForm.title.trim()) {
      if (selectedLessonId) {
        // Update existing quiz
        setChapters(
          chapters.map((chapter) =>
            chapter.id === selectedChapterId
              ? {
                  ...chapter,
                  lessons: chapter.lessons.map((lesson) =>
                    lesson.id === selectedLessonId && lesson.type === 'quiz'
                      ? {
                          ...lesson,
                          title: quizForm.title.trim(),
                          timeLimit: quizForm.timeLimit || '',
                          attempts: quizForm.attempts || '',
                        }
                      : lesson
                  ),
                }
              : chapter
          )
        );
      } else {
        // Create new quiz
      const newQuiz = {
        id: Date.now().toString(),
        title: quizForm.title.trim(),
        type: 'quiz' as const,
        timeLimit: quizForm.timeLimit || '',
        attempts: quizForm.attempts || '',
        questions: [],
      };
      setChapters(
        chapters.map((chapter) =>
          chapter.id === selectedChapterId
            ? { ...chapter, lessons: [...chapter.lessons, newQuiz] }
            : chapter
        )
      );
      }
      // Reset form
      setQuizForm({
        chapter: '',
        title: 'QUIZ: This is a demo quiz test',
        timeLimit: '10',
        attempts: '10',
      });
      setShowQuizModal(false);
      setSelectedChapterId(null);
      setSelectedLessonId(null);
    }
  };

  const handleAddQuestion = (quizId: string) => {
    setSelectedQuizId(quizId);
    setEditingQuestionId(null);
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

  const handleEditQuestion = (quizId: string, questionId: string) => {
    // Find the question in the chapters
    const quiz = chapters
      .flatMap(ch => ch.lessons)
      .find(lesson => lesson.id === quizId && lesson.type === 'quiz') as any;
    
    if (quiz && quiz.questions) {
      const question = quiz.questions.find((q: any) => q.id === questionId);
      if (question) {
        setSelectedQuizId(quizId);
        setEditingQuestionId(questionId);
        // Try to parse question data - adjust based on your data structure
        const questionData = question.data || {};
        setQuestionForm({
          question: questionData.question || question.title || '',
          numberOfOptions: questionData.options?.length || 4,
          options: questionData.options || ['', '', '', ''],
          correctAnswer: questionData.correctAnswer || '',
          marks: questionData.marks || '1',
        });
        setShowQuestionModal(true);
      }
    }
  };

  const handleDeleteQuestion = (quizId: string, questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setChapters(
        chapters.map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson) =>
            lesson.id === quizId && lesson.type === 'quiz'
              ? { 
                  ...lesson, 
                  questions: ((lesson as any).questions || []).filter((q: any) => q.id !== questionId) 
                }
              : lesson
          ),
        }))
      );
    }
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
      selectedQuizId &&
      questionForm.question.trim() &&
      questionForm.options.some((opt) => opt.trim()) &&
      questionForm.correctAnswer
    ) {
      const questionData = {
        id: editingQuestionId || Date.now().toString(),
        title: questionForm.question.trim(),
        type: 'quiz' as const,
        data: {
          question: questionForm.question.trim(),
          options: questionForm.options,
          correctAnswer: questionForm.correctAnswer,
          marks: questionForm.marks,
        },
      };
      
      // If editing, update the question; otherwise add new
      if (editingQuestionId) {
        setChapters(
          chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === selectedQuizId && lesson.type === 'quiz'
                ? { 
                    ...lesson, 
                    questions: ((lesson as any).questions || []).map((q: any) =>
                      q.id === editingQuestionId ? questionData : q
                    ) 
                  }
                : lesson
            ),
          }))
        );
      } else {
        // Adding new question
        setChapters(
          chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === selectedQuizId && lesson.type === 'quiz'
                ? { ...lesson, questions: [...((lesson as any).questions || []), questionData] }
                : lesson
            ),
          }))
        );
      }
      
      // Reset form but keep selectedQuizId open for adding more questions
      setQuestionForm({
        question: '',
        numberOfOptions: 4,
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: '1',
      });
      setEditingQuestionId(null);
      setShowQuestionModal(false);
      // Keep selectedQuizId so user can add more questions by clicking "Add More Questions"
    }
  };

  const handleCreateQuestionAndAddAnother = () => {
    if (
      selectedQuizId &&
      questionForm.question.trim() &&
      questionForm.options.some((opt) => opt.trim()) &&
      questionForm.correctAnswer
    ) {
      const questionData = {
        id: Date.now().toString(),
        title: questionForm.question.trim(),
        type: 'quiz' as const,
        data: {
          question: questionForm.question.trim(),
          options: questionForm.options,
          correctAnswer: questionForm.correctAnswer,
          marks: questionForm.marks,
        },
      };
      
      // Adding new question
      setChapters(
        chapters.map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson) =>
            lesson.id === selectedQuizId && lesson.type === 'quiz'
              ? { ...lesson, questions: [...((lesson as any).questions || []), questionData] }
              : lesson
          ),
        }))
      );
      
      // Reset form but keep modal open
      setQuestionForm({
        question: '',
        numberOfOptions: 4,
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: '1',
      });
      // Keep modal open and selectedQuizId for adding more questions
    }
  };

  const handleAddFaq = () => {
    if (faqForm.question.trim() && faqForm.answer.trim()) {
      if (editingFaqId) {
        setFaqs(faqs.map(faq => 
          faq.id === editingFaqId 
            ? { ...faq, question: faqForm.question.trim(), answer: faqForm.answer.trim() }
            : faq
        ));
        setEditingFaqId(null);
      } else {
        const newFaq = {
          id: Date.now().toString(),
          question: faqForm.question.trim(),
          answer: faqForm.answer.trim(),
        };
        setFaqs([...faqs, newFaq]);
      }
      setFaqForm({ question: '', answer: '' });
    }
  };

  const handleEditFaq = (id: string) => {
    const faq = faqs.find(f => f.id === id);
    if (faq) {
      setFaqForm({ question: faq.question, answer: faq.answer });
      setEditingFaqId(id);
    }
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    if (editingFaqId === id) {
      setEditingFaqId(null);
      setFaqForm({ question: '', answer: '' });
    }
  };

  const handleCancelFaqEdit = () => {
    setEditingFaqId(null);
    setFaqForm({ question: '', answer: '' });
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
        <div className="flex justify-between items-center border-b border-gray-200">
          <div className="flex">
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
          {/* Preview Buttons */}
          <div className="flex items-center gap-2 px-4">
            <button
              onClick={() => {
                setPreviewType('frontend');
                setShowPreviewModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              title="Preview Course Frontend View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Frontend
            </button>
            <button
              onClick={() => {
                setPreviewType('player');
                setShowPreviewModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              title="Preview Course Player View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Preview Player
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
           

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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
                    {/* Left aligned lines */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h10M4 10h14M4 14h12M4 18h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyCenter')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Align Center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Center aligned lines */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12M4 10h16M6 14h12M8 18h8" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyRight')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Align Right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Right aligned lines */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h10M6 10h14M8 14h12M4 18h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('justifyFull')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Justify"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Fully justified lines */}
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
                    {/* Bulleted list */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 6h.01M5 12h.01M5 18h.01" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('insertOrderedList')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Numbered List"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Numbered list (1,2,3 style) */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 6h9M11 12h9M11 18h9" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h1v2M5 11h2l-2 2h2M5 17h2v2H5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('outdent')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Decrease Indent"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Outdent arrow and lines */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6h13M7 10h9M7 14h13M7 18h9" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 10l3-2v4l-3-2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('indent')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                  title="Increase Indent"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Indent arrow and lines */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h13M8 10h12M4 14h13M8 18h12" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l-3-2v4l3-2z" />
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

            {/* Pricing Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="courseType"
                    value="paid"
                    checked={formData.courseType === 'paid'}
                    onChange={(e) => {
                      handleInputChange('courseType', e.target.value);
                      if (e.target.value === 'free') {
                        handleInputChange('hasDiscount', false);
                        handleInputChange('discountPrice', '');
                      }
                    }}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Paid</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="courseType"
                    value="free"
                    checked={formData.courseType === 'free'}
                    onChange={(e) => {
                      handleInputChange('courseType', e.target.value);
                      if (e.target.value === 'free') {
                        handleInputChange('hasDiscount', false);
                        handleInputChange('discountPrice', '');
                      }
                    }}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Free</span>
                </label>
              </div>

              {/* Price - Only show for paid courses */}
              {formData.courseType === 'paid' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹0) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Enter your course price (₹0)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Discount Checkbox */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasDiscount}
                        onChange={(e) => {
                          handleInputChange('hasDiscount', e.target.checked);
                          if (!e.target.checked) {
                            handleInputChange('discountPrice', '');
                          }
                        }}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Check if this course has discount</span>
                    </label>
                  </div>

                  {/* Discounted Price - Only show when discount checkbox is checked */}
                  {formData.hasDiscount && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discounted price
                      </label>
                      <input
                        type="text"
                        value={formData.discountPrice}
                        onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                        placeholder="Enter your discount price (₹0)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* FAQs Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Frequently Asked Questions (FAQs)
                </label>
                <span className="text-xs text-gray-500">Students will see these before purchasing</span>
              </div>
              
              {/* FAQ Form */}
              <div className="border border-gray-300 rounded-md p-4 mb-4 bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question {editingFaqId ? '(Editing)' : ''}
                    </label>
                    <input
                      type="text"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      placeholder="Enter question..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <textarea
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Enter answer..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddFaq}
                      disabled={!faqForm.question.trim() || !faqForm.answer.trim()}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editingFaqId ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                    {editingFaqId && (
                      <button
                        onClick={handleCancelFaqEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* FAQs List */}
              {faqs.length > 0 ? (
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-300 rounded-md p-4 bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditFaq(faq.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit FAQ"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete FAQ"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-md bg-gray-50">
                  <p>No FAQs added yet. Add questions and answers that students might have.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowChapterModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Add new chapter
              </button>
              <button
                onClick={() => setShowSortChapters(!showSortChapters)}
                className="bg-primary text-white px-3 py-1.5 text-sm rounded-md hover:bg-primary-dark transition-colors"
              >
                {showSortChapters ? 'Done Sorting' : 'Sort chapter'}
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
                        {/* Sort Buttons */}
                        {showSortChapters && (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleSortChapter(chapter.id, 'up')}
                              disabled={chapters.findIndex((ch) => ch.id === chapter.id) === 0}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move Up"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleSortChapter(chapter.id, 'down')}
                              disabled={chapters.findIndex((ch) => ch.id === chapter.id) === chapters.length - 1}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move Down"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        )}
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditChapter(chapter.id)}
                          className="w-8 h-8 border-2 border-red-500 rounded flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                          title="Edit Chapter"
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
                        <div className="space-y-3">
                          {chapter.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              {/* Lesson/Quiz Header */}
                              <div className={`p-3 ${lesson.type === 'quiz' ? 'bg-purple-50' : 'bg-gray-50'} flex items-center justify-between`}>
                                <div className="flex items-center gap-2">
                                  <span>{lesson.type === 'lesson' ? '📖' : '📝'}</span>
                                  <span className="font-medium text-gray-900">{lesson.title}</span>
                                  {lesson.type === 'quiz' && (lesson as any).timeLimit && (
                                    <span className="text-xs text-gray-500">
                                      • {(lesson as any).timeLimit} min
                                    </span>
                                  )}
                                  {lesson.type === 'quiz' && (lesson as any).attempts && (
                                    <span className="text-xs text-gray-500">
                                      • {(lesson as any).attempts} attempts
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Sort Buttons */}
                                  <div className="flex flex-col gap-1">
                                    <button
                                      onClick={() => handleSortLesson(chapter.id, lesson.id, 'up')}
                                      disabled={chapter.lessons.findIndex((l) => l.id === lesson.id) === 0}
                                      className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title="Move Up"
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => handleSortLesson(chapter.id, lesson.id, 'down')}
                                      disabled={chapter.lessons.findIndex((l) => l.id === lesson.id) === chapter.lessons.length - 1}
                                      className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title="Move Down"
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                  </div>
                                  {/* Edit Button */}
                                  <button
                                    onClick={() => lesson.type === 'quiz' ? handleEditQuiz(chapter.id, lesson.id) : handleEditLesson(chapter.id, lesson.id)}
                                    className="w-7 h-7 border border-blue-500 rounded flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
                                    title={`Edit ${lesson.type === 'quiz' ? 'Quiz' : 'Lesson'}`}
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  {/* Delete Button */}
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Are you sure you want to delete this ${lesson.type}?`)) {
                                        setChapters(
                                          chapters.map((ch) =>
                                            ch.id === chapter.id
                                              ? { ...ch, lessons: ch.lessons.filter((l) => l.id !== lesson.id) }
                                              : ch
                                          )
                                        );
                                      }
                                    }}
                                    className="w-7 h-7 border border-red-500 rounded flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                                    title={`Delete ${lesson.type === 'quiz' ? 'Quiz' : 'Lesson'}`}
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                  {lesson.type === 'quiz' && (
                                    <button
                                      onClick={() => handleAddQuestion(lesson.id)}
                                      className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition-colors"
                                    >
                                      + Add More Questions
                                    </button>
                                  )}
                                </div>
                              </div>
                              {/* Questions List for Quiz */}
                              {lesson.type === 'quiz' && (lesson as any).questions && (lesson as any).questions.length > 0 && (
                                <div className="p-3 bg-white border-t border-gray-200">
                                  <div className="space-y-2">
                                    {(lesson as any).questions.map((question: any, qIndex: number) => (
                                      <div
                                        key={question.id}
                                        className="flex items-start justify-between p-2 bg-gray-50 rounded border border-gray-200"
                                      >
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-gray-500">
                                              Q{qIndex + 1}:
                                            </span>
                                            <span className="text-sm text-gray-900">
                                              {question.data?.question || question.title}
                                            </span>
                                          </div>
                                          {question.data?.options && (
                                            <div className="ml-6 text-xs text-gray-600">
                                              {question.data.options.map((opt: string, optIdx: number) => (
                                                <div key={optIdx} className="flex items-center gap-1">
                                                  <span>{String.fromCharCode(65 + optIdx)}:</span>
                                                  <span className={question.data.correctAnswer === optIdx.toString() ? 'font-semibold text-green-600' : ''}>
                                                    {opt}
                                                    {question.data.correctAnswer === optIdx.toString() && ' ✓'}
                                                  </span>
                            </div>
                          ))}
                        </div>
                      )}
                                          {question.data?.marks && (
                                            <span className="ml-6 text-xs text-gray-500">
                                              ({question.data.marks} marks)
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex gap-1 ml-2">
                                          <button
                                            onClick={() => handleEditQuestion(lesson.id, question.id)}
                                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                            title="Edit Question"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteQuestion(lesson.id, question.id)}
                                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                            title="Delete Question"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {lesson.type === 'quiz' && (!(lesson as any).questions || (lesson as any).questions.length === 0) && (
                                <div className="p-3 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
                                  No questions added yet. Click "Add More Questions" to get started.
                                </div>
                              )}
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
                  <label className="text-sm font-medium text-gray-500">Title</label>
                  <p className="text-gray-900 mt-1">{formData.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900 mt-1">{formData.category || 'Not provided'}</p>
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
                  <label className="text-sm font-medium text-gray-500">Course Type</label>
                  <p className="text-gray-900 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      formData.courseType === 'free' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {formData.courseType === 'free' ? 'Free Course' : 'Paid Course'}
                    </span>
                  </p>
                </div>
                {formData.courseType === 'paid' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Price</label>
                      <p className="text-gray-900 mt-1">₹{formData.price}</p>
                    </div>
                    {formData.hasDiscount && formData.discountPrice && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Discounted Price</label>
                        <p className="text-gray-900 mt-1">₹{formData.discountPrice}</p>
                      </div>
                    )}
                  </>
                )}
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

            {/* FAQs Summary */}
            {faqs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Q{index + 1}: {faq.question}
                      </h4>
                      <p className="text-sm text-gray-600 ml-4">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Status Field */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Draft">Draft</option>
                  <option value="Publish">Publish</option>
                </select>
              </div>
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
                disabled={
                  !formData.title || 
                  !formData.instructor || 
                  chapters.length === 0 ||
                  (formData.courseType === 'paid' && !formData.price)
                }
                className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingChapterId ? 'Edit Chapter' : 'Add Chapter'}
              </h3>
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setChapterTitle('introduction');
                  setChapterType('lesson');
                  setEditingChapterId(null);
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
           
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setChapterTitle('introduction');
                  setChapterType('lesson');
                  setEditingChapterId(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChapter}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                {editingChapterId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedLessonId ? 'Edit Lesson' : 'Add Lesson'}
              </h3>
              <button
                onClick={() => {
                  setShowLessonModal(false);
                  setSelectedChapterId(null);
                  setSelectedLessonId(null);
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
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowLessonModal(false);
                  setSelectedChapterId(null);
                  setSelectedLessonId(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLesson}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                {selectedLessonId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedLessonId ? 'Edit Quiz' : 'Add Quiz'}
              </h3>
              <button
                onClick={() => {
                  setShowQuizModal(false);
                  setSelectedChapterId(null);
                  setSelectedLessonId(null);
                  setQuizForm({
                    chapter: '',
                    title: 'QUIZ: This is a demo quiz test',
                    timeLimit: '10',
                    attempts: '10',
                  });
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
              {/* Chapter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chapter <span className="text-red-500">*</span>
                </label>
                <select
                  value={quizForm.chapter}
                  onChange={(e) => handleQuizFormChange('chapter', e.target.value)}
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
                  value={quizForm.title}
                  onChange={(e) => handleQuizFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter quiz title"
                />
              </div>

              {/* Time Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit <span className="text-red-500 text-xs">(leave empty for unlimited)</span>
                </label>
                <input
                  type="text"
                  value={quizForm.timeLimit}
                  onChange={(e) => handleQuizFormChange('timeLimit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter time limit in minutes"
                />
              </div>

              {/* Attempts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attempts <span className="text-red-500 text-xs">(leave empty for unlimited)</span>
                </label>
                <input
                  type="text"
                  value={quizForm.attempts}
                  onChange={(e) => handleQuizFormChange('attempts', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter number of attempts"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowQuizModal(false);
                  setSelectedChapterId(null);
                  setSelectedLessonId(null);
                  setQuizForm({
                    chapter: '',
                    title: 'QUIZ: This is a demo quiz test',
                    timeLimit: '10',
                    attempts: '10',
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQuiz}
                disabled={!quizForm.title.trim() || !quizForm.chapter}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedLessonId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingQuestionId ? 'Edit Question' : 'Add Question'}
                </h3>
                {selectedQuizId && (
                  <p className="text-sm text-gray-500 mt-1">
                    {editingQuestionId ? 'Editing question in' : 'Adding question to'} quiz: {(chapters
                      .flatMap(ch => ch.lessons)
                      .find(lesson => lesson.id === selectedQuizId) as any)?.title || 'Quiz'}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowQuestionModal(false);
                  setSelectedChapterId(null);
                  setSelectedQuizId(null);
                  setEditingQuestionId(null);
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
            <div className="flex justify-end p-6 border-t border-gray-200 gap-3">
              <button
                onClick={() => {
                  setShowQuestionModal(false);
                  setSelectedChapterId(null);
                  setSelectedQuizId(null);
                  setEditingQuestionId(null);
                  setQuestionForm({
                    question: '',
                    numberOfOptions: 4,
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    marks: '1',
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
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
                {editingQuestionId ? 'Update Question' : 'Create Question'}
              </button>
              {!editingQuestionId && (
                <button
                  onClick={handleCreateQuestionAndAddAnother}
                  disabled={
                    !questionForm.question.trim() ||
                    !questionForm.options.some((opt) => opt.trim()) ||
                    !questionForm.correctAnswer
                  }
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save & Add Another
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {previewType === 'frontend' ? 'Course Frontend Preview' : 'Course Player Preview'}
              </h3>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setPreviewType(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {previewType === 'frontend' ? (
                <div className="max-w-4xl mx-auto">
                  {/* Course Card Preview */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                        {!formData.thumbnail.includes('http') && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded">
                              {formData.category || 'Category'}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${
                              formData.courseType === 'free' 
                                ? 'text-green-700 bg-green-100' 
                                : 'text-blue-700 bg-blue-100'
                            }`}>
                              {formData.courseType === 'free' ? 'Free' : 'Paid'}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || 'Course Title'}</h2>
                          <p className="text-sm text-gray-600 mb-4">{formData.instructor}</p>
                        </div>
                        <div className="text-right">
                          {formData.courseType === 'paid' && (
                            <div>
                              {formData.hasDiscount && formData.discountPrice ? (
                                <>
                                  <span className="text-2xl font-bold text-gray-900">₹{formData.discountPrice}</span>
                                  <span className="text-lg text-gray-500 line-through ml-2">₹{formData.price}</span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-gray-900">₹{formData.price || '0'}</span>
                              )}
                            </div>
                          )}
                          {formData.courseType === 'free' && (
                            <span className="text-2xl font-bold text-green-600">Free</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Course Description</h3>
                        <div
                          className="text-gray-700 prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: formData.description || '<p>No description provided.</p>' }}
                        />
                      </div>

                      {chapters.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Course Content</h3>
                          <div className="space-y-2">
                            {chapters.map((chapter, index) => (
                              <div key={chapter.id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-500">Chapter {index + 1}:</span>
                                  <span className="font-medium text-gray-900">{chapter.title}</span>
                                </div>
                                {chapter.lessons.length > 0 && (
                                  <div className="ml-6 space-y-1">
                                    {chapter.lessons.map((lesson) => (
                                      <div key={lesson.id} className="text-sm text-gray-600">
                                        {lesson.type === 'lesson' ? '📖' : '📝'} {lesson.title}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {faqs.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
                          <div className="space-y-3">
                            {faqs.map((faq, index) => (
                              <div key={faq.id} className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium text-gray-900 mb-1">Q{index + 1}: {faq.question}</h4>
                                <p className="text-sm text-gray-600">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-6xl mx-auto">
                  {/* Course Player Preview */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Player Header */}
                    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{formData.title || 'Course Title'}</h2>
                        <p className="text-sm text-gray-300">{formData.instructor}</p>
                      </div>
                      <button className="text-white hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex">
                      {/* Sidebar - Course Content */}
                      <div className="w-80 border-r border-gray-200 bg-gray-50 h-[600px] overflow-y-auto">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
                          <div className="space-y-2">
                            {chapters.length > 0 ? (
                              chapters.map((chapter, chapterIndex) => (
                                <div key={chapter.id} className="mb-4">
                                  <div className="flex items-center gap-2 mb-2 p-2 bg-gray-200 rounded">
                                    <span className="text-xs font-medium text-gray-600">{chapterIndex + 1}.</span>
                                    <span className="text-sm font-medium text-gray-900">{chapter.title}</span>
                                  </div>
                                  <div className="ml-4 space-y-1">
                                    {chapter.lessons.map((lesson, lessonIndex) => (
                                      <div
                                        key={lesson.id}
                                        className={`p-2 rounded cursor-pointer transition-colors ${
                                          lessonIndex === 0 && chapterIndex === 0
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-gray-200 text-gray-700'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs">
                                            {lesson.type === 'lesson' ? '▶' : '📝'}
                                          </span>
                                          <span className="text-sm">{lesson.title}</span>
                                          {lesson.type === 'lesson' && (lesson as any).duration && (
                                            <span className="text-xs opacity-75 ml-auto">
                                              {(lesson as any).duration}m
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-8">No content added yet</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Main Player Area */}
                      <div className="flex-1 bg-black">
                        <div className="relative aspect-video bg-black">
                          {formData.demoVideoPath ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-gray-800 rounded-lg p-8 text-white text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                                <p className="text-sm">Video Player</p>
                                <p className="text-xs text-gray-400 mt-2">{formData.demoVideoPath}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <div className="text-center">
                                <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>No video content</p>
                              </div>
                            </div>
                          )}
                          {/* Video Controls Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="flex items-center gap-4">
                              <button className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 4l15 8-15 8V4z" />
                                </svg>
                              </button>
                              <div className="flex-1 bg-gray-600 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                              </div>
                              <span className="text-white text-sm">10:24 / 25:30</span>
                              <button className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button className="text-white hover:text-gray-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Lesson Info */}
                        <div className="p-6 bg-white">
                          {chapters.length > 0 && chapters[0].lessons.length > 0 ? (
                            <>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {chapters[0].lessons[0].title}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {chapters[0].lessons[0].type === 'lesson' && (chapters[0].lessons[0] as any).description
                                  ? (chapters[0].lessons[0] as any).description.substring(0, 200) + '...'
                                  : 'Lesson description will appear here.'}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {chapters[0].lessons[0].type === 'lesson' && (chapters[0].lessons[0] as any).duration && (
                                  <span>Duration: {(chapters[0].lessons[0] as any).duration} minutes</span>
                                )}
                                <span>Chapter 1 of {chapters.length}</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <p>No lessons available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
