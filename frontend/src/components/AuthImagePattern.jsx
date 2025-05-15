// IMPORTING MODULES
import { Braces, Code, FileCode, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

// CODE BACKGROUND COMPONENT
const CodeBackground = ({ title, subtitle }) => {
  // State to manage active code snippet and animation flag
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Python code snippets to display in the background
  const codeSnippets = [
    `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,

    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev`,

    `def is_valid(s):
    stack = []
    bracket_map = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in bracket_map.values():
            stack.append(char)
        elif char in bracket_map:
            if not stack or stack.pop() != bracket_map[char]:
                return False
        else:
            return False
    return len(stack) == 0`,
  ];

  // Rotate through code snippets
  useEffect(() => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % codeSnippets.length);
        setIsAnimating(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-slate-900 text-white p-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-purple-600/10 to-transparent"></div>
      </div>

      {/* Animated code icons */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[10%] left-[15%] animate-pulse">
          <Braces size={40} />
        </div>
        <div className="absolute top-[30%] left-[80%] animate-pulse delay-300">
          <FileCode size={50} />
        </div>
        <div className="absolute top-[70%] left-[20%] animate-pulse delay-700">
          <Terminal size={45} />
        </div>
        <div className="absolute top-[60%] left-[75%] animate-pulse delay-500">
          <Code size={55} />
        </div>
        <div className="absolute top-[85%] left-[45%] animate-pulse delay-200">
          <Braces size={35} />
        </div>
        <div className="absolute top-[15%] left-[60%] animate-pulse delay-100">
          <Terminal size={30} />
        </div>
      </div>

      {/* Main container */}
      <div className="z-10 max-w-2xl w-full flex flex-col items-center transform transition-all duration-500">
        {/* Code editor mockup */}
        <div className="w-full bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl mb-10 overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300">
          {/* Editor header */}
          <div className="bg-slate-700/80 px-4 py-2 flex items-center border-b border-slate-600">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            </div>
            <div className="text-xs font-mono opacity-80 tracking-wider">
              problem.py
            </div>
          </div>

          {/* Code content area */}
          <div className="p-5 font-mono text-xs sm:text-sm overflow-hidden relative h-72 bg-gradient-to-br from-slate-800/90 to-slate-900/90">
            <pre
              className={`whitespace-pre-wrap text-green-400/90 transition-all duration-500 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {codeSnippets[activeIndex]}
            </pre>

            {/* Blinking cursor */}
            <div className="absolute bottom-5 right-5 w-2 h-5 bg-primary animate-blink rounded-sm"></div>

            {/* Line numbers */}
            <div className="absolute left-3 top-5 text-slate-500 text-xs select-none">
              {Array.from({
                length: codeSnippets[activeIndex].split('\n').length,
              }).map((_, i) => (
                <div key={i} className="h-5 flex items-center pr-3">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logo container */}
        <div className="flex items-center justify-center mb-8 group">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 shadow-lg group-hover:bg-primary/20 transition-all duration-500 hover:rotate-6 hover:scale-105">
            <img
              src={logo}
              alt="Logo"
              className="w-9 h-9 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Heading and subtitle */}
        <h2 className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent tracking-tight">
          {title}
        </h2>
        <p className="text-slate-300/90 text-center max-w-md leading-relaxed tracking-wide">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// EXPORTING COMPONENT
export default CodeBackground;
