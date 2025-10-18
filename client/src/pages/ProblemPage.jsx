import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Code2,
  Users,
  ThumbsUp,
  Loader,
  ArrowLeft,
  BookOpen,
  LightbulbIcon,
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useProblemStore } from '../store/useProblemStore';
import { useExecutionStore } from '../store/useExecutionStore';
import { useSubmissionStore } from '../store/useSubmissionStore';
import { getLanguageId } from '../lib/languageId';
import Submission from '../components/Submission';
import SubmissionsList from '../components/SubmissionList';

const ProblemPage = () => {
  const { id } = useParams();

  // Store hooks
  const {
    fetchProblemById: getProblemById,
    specificProblem: problem,
    isLoadingSpecificProblem: isProblemLoading,
  } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const { executeCode, submission, isExecuting } = useExecutionStore();

  // Local state
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  // Effects
  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || '');
      setTestCases(
        problem.testcases?.map(tc => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === 'submissions' && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  // Handlers
  const handleLanguageChange = e => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || '');
  };

  const handleRunCode = e => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map(tc => tc.input);
      const expected_outputs = problem.testcases.map(tc => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  // Editorial content
  const editorialContent = problem && problem.editorial;

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 h-full flex flex-col min-h-0"
          >
            <div className="flex-shrink-0">
              <h2 className="text-xl font-semibold text-white mb-4">{problem.title}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === 'EASY'
                      ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                      : problem.difficulty === 'MEDIUM'
                      ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                  }`}
                >
                  {problem.difficulty}
                </span>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>{submissionCount}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-sm">{problem.description}</p>

                {problem.examples && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-base font-semibold text-white mb-4">Examples</h3>
                    <div className="space-y-4">
                      {Object.entries(problem.examples).map(([lang, example], idx) => (
                        <motion.div
                          key={lang}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm shadow-lg"
                        >
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-cyan-400 mb-2">Input:</p>
                              <div className="bg-slate-900/80 rounded-lg px-3 py-2 border border-slate-700/30">
                                <code className="text-gray-100 text-xs font-mono">
                                  {example.input}
                                </code>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-cyan-400 mb-2">Output:</p>
                              <div className="bg-slate-900/80 rounded-lg px-3 py-2 border border-slate-700/30">
                                <code className="text-gray-100 text-xs font-mono">
                                  {example.output}
                                </code>
                              </div>
                            </div>
                            {example.explanation && (
                              <div>
                                <p className="text-xs font-semibold text-cyan-400 mb-2">
                                  Explanation:
                                </p>
                                <p className="text-gray-300 text-xs leading-relaxed">
                                  {example.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {problem.constraints && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-base font-semibold text-white mb-4">Constraints</h3>
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm shadow-lg">
                      <pre className="text-gray-300 whitespace-pre-wrap text-xs font-mono">
                        {problem.constraints}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 'submissions':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="h-full overflow-hidden custom-scrollbar"
          >
            <SubmissionsList submissions={submissions} isLoading={isSubmissionsLoading} />
          </motion.div>
        );

      case 'editorial':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full overflow-y-auto custom-scrollbar"
          >
            <div className="space-y-6">
              <div className="prose prose-invert prose-sm max-w-[880px]">
                <div className="p-6 backdrop-blur-sm">
                  <div
                    className="text-gray-300 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: editorialContent
                        .split('\n')
                        .map(line => {
                          if (line.startsWith('## ')) {
                            return `<h3 class="text-lg font-semibold text-white mb-3 mt-4">${line.substring(
                              3
                            )}</h3>`;
                          } else if (line.startsWith('### ')) {
                            return `<h4 class="text-base font-semibold text-white mb-2 mt-3">${line.substring(
                              4
                            )}</h4>`;
                          } else if (line.trim() === '') {
                            return '<br>';
                          } else {
                            return `<p class="mb-3">${line}</p>`;
                          }
                        })
                        .join(''),
                    }}
                  />
                </div>

                {/* Code Examples */}
                <div className="mt-6">
                  <h4 className="text-base font-semibold text-white mb-4">Solution Code</h4>
                  <div className="grid gap-4">
                    {Object.entries(problem.codeSnippets || {}).map(([lang, codeSnippet]) => (
                      <motion.div
                        key={lang}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl border border-slate-700/50 backdrop-blur-sm overflow-hidden shadow-lg"
                      >
                        <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 px-4 py-2 border-b border-slate-700">
                          <span className="text-xs font-medium text-cyan-300 uppercase">
                            {lang}
                          </span>
                        </div>
                        <div className="p-4">
                          <pre className="text-gray-100 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {codeSnippet}
                          </pre>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Complexity Analysis */}
                <div className="mt-6">
                  <h4 className="text-base font-semibold text-white mb-4">Complexity Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm shadow-lg"
                    >
                      <h5 className="text-sm font-semibold text-blue-400 mb-2">Time Complexity</h5>
                      <p className="text-gray-300 text-sm">
                        O(n) where n is the length of the string
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-emerald-500/15 to-green-500/10 border border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm shadow-lg"
                    >
                      <h5 className="text-sm font-semibold text-emerald-400 mb-2">
                        Space Complexity
                      </h5>
                      <p className="text-gray-300 text-sm">O(1) for two-pointer approach</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'discussion':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="h-full flex items-center justify-center overflow-hidden"
          >
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No discussions yet</p>
            </div>
          </motion.div>
        );

      case 'hints':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="h-full overflow-y-auto custom-scrollbar"
          >
            {problem?.hints ? (
              <div className="bg-gradient-to-br from-amber-500/15 to-yellow-500/10 border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm shadow-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{problem.hints}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-12">
                  <Lightbulb className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No hints available</p>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Global custom scrollbar styles */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(30, 41, 59, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 4px;
          margin: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(139, 92, 246, 0.7));
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
          transform: scale(1.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246));
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(30, 41, 59, 0.3);
        }

        /* Smooth scrolling */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        /* Specific styling for different scrollbar types */
        .horizontal-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(30, 41, 59, 0.3);
        }

        .horizontal-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .horizontal-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 3px;
        }

        .horizontal-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.7), rgba(139, 92, 246, 0.7));
          border-radius: 3px;
        }

        /* Editor specific scrollbar */
        .monaco-scrollable-element .scrollbar {
          background: rgba(30, 41, 59, 0.3) !important;
        }

        .monaco-scrollable-element .slider {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.7),
            rgba(139, 92, 246, 0.7)
          ) !important;
          border-radius: 4px !important;
        }
      `}</style>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-b border-slate-700 px-4 py-2.5 backdrop-blur-sm relative z-10 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/app"
                className="p-2 hover:bg-slate-700/50 rounded-xl transition-all duration-200 flex items-center gap-2 text-slate-300 hover:text-white  hover:border-slate-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Run Button - Centered on medium screens and up */}
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-lg ${
                isExecuting
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400 border border-slate-600'
                  : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 hover:shadow-xl text-white border border-blue-500/30'
              }`}
              onClick={handleRunCode}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Play className="w-3 h-3" />
              )}
              Run
            </motion.button>
          </div>
        </div>

        {/* Run Button - For mobile screens */}
        <div className="flex md:hidden justify-center mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-lg ${
              isExecuting
                ? 'bg-slate-700 cursor-not-allowed text-slate-400 border border-slate-600'
                : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 hover:shadow-xl text-white border border-blue-500/30'
            }`}
            onClick={handleRunCode}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Play className="w-3 h-3" />
            )}
            Run
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content with Resizable Panels */}
      <main className="h-[calc(100vh-57px)] flex relative z-10">
        <PanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - Problem Description */}
          <Panel defaultSize={50} minSize={30} className="flex flex-col">
            <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-sm min-h-0 overflow-hidden border-r border-slate-700 shadow-lg">
              {/* Tabs */}
              <div className="border-b border-slate-700 flex items-center px-2 flex-shrink-0 bg-slate-800/50">
                {[
                  { id: 'description', label: 'Description', icon: FileText },
                  { id: 'submissions', label: 'Submissions', icon: Code2 },
                  { id: 'editorial', label: 'Editorial', icon: BookOpen },
                  { id: 'hints', label: 'Hints', icon: LightbulbIcon },
                ].map(tab => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-medium transition-all duration-200 relative ${
                      activeTab === tab.id
                        ? 'text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-b-2 border-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
              {/* Content */}
              <div className="flex-1 overflow-hidden p-6 min-h-0">{renderTabContent()}</div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-2 bg-gradient-to-b from-slate-800 to-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-500 transition-all duration-300 cursor-col-resize flex items-center justify-center group">
            <div className="w-1 h-8 bg-slate-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
          </PanelResizeHandle>

          {/* Right Panel - Code Editor and Test Cases */}
          <Panel defaultSize={50} minSize={40} className="flex flex-col">
            <PanelGroup direction="vertical" className="flex-1">
              {/* Code Editor Panel */}
              <Panel defaultSize={70} minSize={30} className="flex flex-col">
                <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 min-h-0 overflow-hidden shadow-lg">
                  {/* Editor Header */}
                  <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-b border-slate-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <motion.select
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                        className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                      >
                        {Object.keys(problem.codeSnippets || {}).map(lang => (
                          <option key={lang} value={lang} className="bg-slate-700">
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </option>
                        ))}
                      </motion.select>
                      <button className="text-xs text-slate-400 hover:text-slate-200 transition-colors"></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-1.5 rounded-xl hover:bg-slate-700 transition-all duration-200 border border-transparent hover:border-slate-600 ${
                          isBookmarked ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isBookmarked ? 'currentColor' : 'none'}
                        />
                      </motion.button>
                    </div>
                  </div>
                  {/* Editor */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <Editor
                      height="100%"
                      language={selectedLanguage.toLowerCase()}
                      theme="vs-dark"
                      value={code}
                      onChange={value => setCode(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16 },
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        scrollbar: {
                          vertical: 'visible',
                          horizontal: 'visible',
                          useShadows: false,
                          verticalScrollbarSize: 8,
                          horizontalScrollbarSize: 8,
                        },
                      }}
                    />
                  </div>
                </div>
              </Panel>

              {/* Resize Handle for Test Cases */}
              <PanelResizeHandle className="h-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-500 transition-all duration-300 cursor-row-resize flex items-center justify-center group">
                <div className="h-1 w-8 bg-slate-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
              </PanelResizeHandle>

              {/* Test Cases Panel */}
              <Panel defaultSize={30} minSize={20} className="flex flex-col">
                <div className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-t border-slate-700 flex-1 flex flex-col min-h-0 overflow-hidden shadow-lg">
                  {/* Test Case Tabs */}
                  <div className="border-b border-slate-700 flex items-center justify-between px-4 py-2 flex-shrink-0 bg-slate-800/50">
                    <div className="flex items-center gap-1 overflow-x-auto horizontal-scrollbar pb-1">
                      {testcases.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-200 border flex-shrink-0 ${
                            selectedTestCaseIndex === index
                              ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg border-transparent'
                              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-600'
                          }`}
                          onClick={() => setSelectedTestCaseIndex(index)}
                        >
                          Case {index + 1}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  {/* Test Case Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4 min-h-0">
                    {submission ? (
                      <Submission submission={submission} />
                    ) : (
                      <div className="h-full min-h-0 flex flex-col">
                        {testcases.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 flex-1 overflow-y-auto custom-scrollbar"
                          >
                            <div>
                              <p className="text-xs text-cyan-400 mb-2 font-semibold">Input:</p>
                              <div className="bg-slate-800 rounded-xl px-3 py-2 border border-slate-600">
                                <code className="text-slate-200 text-sm font-mono whitespace-pre-wrap break-words">
                                  {testcases[selectedTestCaseIndex].input}
                                </code>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-cyan-400 mb-2 font-semibold">
                                Expected Output:
                              </p>
                              <div className="bg-slate-800 rounded-xl px-3 py-2 border border-slate-600">
                                <code className="text-slate-200 text-sm font-mono whitespace-pre-wrap break-words">
                                  {testcases[selectedTestCaseIndex].output}
                                </code>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {testcases.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-slate-500 text-sm flex-1 flex items-center justify-center"
                          >
                            No test cases available
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>
    </motion.div>
  );
};

export default ProblemPage;
