import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  ArrowLeft,
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useProblemStore } from '../store/useProblemStore';

const problemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  constraints: z.string().min(1, 'Constraints are required'),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, 'Input is required'),
        output: z.string().min(1, 'Output is required'),
      })
    )
    .min(1, 'At least one test case is required'),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, 'JavaScript code snippet is required'),
    PYTHON: z.string().min(1, 'Python code snippet is required'),
    JAVA: z.string().min(1, 'Java solution is required'),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, 'JavaScript solution is required'),
    PYTHON: z.string().min(1, 'Python solution is required'),
    JAVA: z.string().min(1, 'Java solution is required'),
  }),
});

const sampledpData = {
  title: 'Climbing Stairs',
  category: 'dp', // Dynamic Programming
  description:
    'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
  difficulty: 'EASY',
  tags: ['Dynamic Programming', 'Math', 'Memoization'],
  constraints: '1 <= n <= 45',
  hints: 'To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.',
  editorial:
    'This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.',
  testcases: [
    {
      input: '2',
      output: '2',
    },
    {
      input: '3',
      output: '3',
    },
    {
      input: '4',
      output: '5',
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 'n = 2',
      output: '2',
      explanation: 'There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps',
    },
    PYTHON: {
      input: 'n = 3',
      output: '3',
      explanation:
        'There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step',
    },
    JAVA: {
      input: 'n = 4',
      output: '5',
      explanation:
        'There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});
rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);
console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;
class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}
// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
return dp[n];
/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps
for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}
return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});
rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);
console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;
class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      # Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

// Sample problem data for another type of question
const sampleStringProblem = {
  title: 'Check Palindrome String',
  description:
    'Given a string s, return true if s is a palindrome, otherwise return false. A palindrome is a string that reads the same backward as forward. Note: Ignore case and non-alphanumeric characters.',
  difficulty: 'EASY',
  tags: ['String', 'Two Pointers', 'Palindrome'],
  constraints: '1 <= s.length <= 10^5',
  hints:
    'Normalize the string by removing non-alphanumeric characters and converting to lowercase before checking. Compare from both ends or use string reversal.',
  editorial:
    '## Solution Approach\n\n### Algorithm\n1. Remove all non-alphanumeric characters and convert to lowercase.\n2. Compare the cleaned string with its reverse.\n3. If they match, it is a palindrome.\n\n### Alternative Approach\n- Use two pointers, one at the start and one at the end.\n- Move inward while characters match.\n- Skip non-alphanumeric characters.\n\n### Time Complexity\n- O(n) for scanning and comparison.\n\n### Space Complexity\n- O(n) for the cleaned string or O(1) for two-pointer method.',
  testcases: [
    { input: 'madam', output: 'true' },
    { input: 'hello', output: 'false' },
    { input: 'A man, a plan, a canal: Panama', output: 'true' },
    { input: 'No lemon, no melon', output: 'true' },
    { input: 'Was it a car or a cat I saw?', output: 'true' },
    { input: 'Palindrome', output: 'false' },
    { input: ' ', output: 'true' },
    { input: 'a', output: 'true' },
    { input: '0P', output: 'false' },
    { input: 'Able , was I, I saw elba', output: 'true' },
  ],
  examples: {
    PYTHON: {
      input: 'A man, a plan, a canal: Panama',
      output: 'true',
      explanation:
        "After ignoring non-alphanumeric characters and case, the string becomes 'amanaplanacanalpanama', which is a palindrome.",
    },
    JAVASCRIPT: {
      input: 'race a car',
      output: 'false',
      explanation: "After cleaning, the string becomes 'raceacar', which is not a palindrome.",
    },
    JAVA: {
      input: 'No lemon, no melon',
      output: 'true',
      explanation:
        'After removing spaces and punctuation, the string reads the same backward and forward.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `const fs = require('fs');

function isPalindrome(s) {
    // Write your code here
    // Return true if s is palindrome, false otherwise
}

const input = fs.readFileSync(0, 'utf-8').trim();
console.log(isPalindrome(input));`,
    PYTHON: `def is_palindrome(s):
    # Write your code here
    # Return True if s is palindrome, False otherwise
    pass

import sys
input_line = sys.stdin.read().strip()
print('true' if is_palindrome(input_line) else 'false')`,
    JAVA: `import java.util.*;

public class Main {
    public static boolean isPalindrome(String s) {
        // Write your code here
        // Return true if s is palindrome, false otherwise
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isPalindrome(s));
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

const clean = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
const reversed = clean.split('').reverse().join('');
console.log(clean === reversed ? 'true' : 'false');`,
    PYTHON: `import sys, re
s = sys.stdin.read().strip()
clean = re.sub(r'[^A-Za-z0-9]', '', s).lower()
print('true' if clean == clean[::-1] else 'false')`,
    JAVA: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        s = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        String rev = new StringBuilder(s).reverse().toString();
        System.out.println(s.equals(rev));
    }
}`,
  },
};

const CreateProblemForm = () => {
  const [sampleType, setSampleType] = useState('DP');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isProblemCreating, createProblem } = useProblemStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: '', output: '' }],
      tags: [''],
      examples: {
        JAVASCRIPT: { input: '', output: '', explanation: '' },
        PYTHON: { input: '', output: '', explanation: '' },
        JAVA: { input: '', output: '', explanation: '' },
      },
      codeSnippets: {
        JAVASCRIPT: 'function solution() {\n  // Write your code here\n}',
        PYTHON: 'def solution():\n    # Write your code here\n    pass',
        JAVA: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}',
      },
      referenceSolutions: {
        JAVASCRIPT: '// Add your reference solution here',
        PYTHON: '# Add your reference solution here',
        JAVA: '// Add your reference solution here',
      },
    },
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: 'testcases',
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmit = async data => {
    try {
      setIsSubmitting(true);
      await createProblem(data);
      toast.success('Problem created successfully!');
      navigate('/app');
    } catch (error) {
      console.error('Error creating problem:', error);
      toast.error(error?.response?.data?.message || 'Failed to create problem');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === 'DP' ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map(tag => tag));
    replacetestcases(sampleData.testcases.map(tc => tc));
    // Reset the form with sample data
    reset(sampleData);
  };

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  // Determine if the button should be disabled and show loader
  const isCreating = isSubmitting || isProblemCreating;
  const isButtonDisabled = isCreating || isFormSubmitting;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl relative z-10">
      <div className="backdrop-blur-sm ">
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-600/40">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="p-2 hover:bg-slate-600/50 rounded-xl transition-all duration-200 flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Create Problem
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <div className="flex rounded-xl overflow-hidden bg-slate-700/50 p-1">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    sampleType === 'DP'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setSampleType('DP')}
                >
                  DP Problem
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    sampleType === 'string'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setSampleType('string')}
                >
                  String Problem
                </button>
              </div>
              <button
                type="button"
                className="bg-slate-700/50 text-white px-4 py-2 rounded-xl hover:bg-slate-600/50 flex items-center gap-2 border border-slate-600/30 transition-all duration-200 hover:scale-105"
                onClick={loadSampleData}
              >
                <Download className="w-4 h-4" />
                Load Sample
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-3">
                  <span className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-600/30 rounded-xl px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                  {...register('title')}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <div className="mt-2">
                    <span className="text-red-400 text-sm">{errors.title.message}</span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block mb-3">
                  <span className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Description
                  </span>
                </label>
                <textarea
                  className="w-full border border-slate-600/30 rounded-xl min-h-32 text-base md:text-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                  {...register('description')}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <div className="mt-2">
                    <span className="text-red-400 text-sm">{errors.description.message}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-3">
                  <span className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Difficulty
                  </span>
                </label>
                <select
                  className="w-full border border-slate-600/30 rounded-xl px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white transition-all duration-200"
                  {...register('difficulty')}
                >
                  <option value="EASY" className="bg-slate-700">
                    Easy
                  </option>
                  <option value="MEDIUM" className="bg-slate-700">
                    Medium
                  </option>
                  <option value="HARD" className="bg-slate-700">
                    Hard
                  </option>
                </select>
                {errors.difficulty && (
                  <div className="mt-2">
                    <span className="text-red-400 text-sm">{errors.difficulty.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Tags</h3>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  onClick={() => appendTag('')}
                >
                  <Plus className="w-4 h-4" /> Add Tag
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center group">
                    <input
                      type="text"
                      className="border border-slate-600/30 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                      {...register(`tags.${index}`)}
                      placeholder="Enter tag"
                    />
                    <button
                      type="button"
                      className="p-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => removeTag(index)}
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.tags && (
                <div className="mt-3">
                  <span className="text-red-400 text-sm">{errors.tags.message}</span>
                </div>
              )}
            </div>

            {/* Test Cases */}
            <div className="bg-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Test Cases</h3>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  onClick={() => appendTestCase({ input: '', output: '' })}
                >
                  <Plus className="w-4 h-4" /> Add Test Case
                </button>
              </div>
              <div className="space-y-6">
                {testCaseFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-slate-800/50 rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        Test Case #{index + 1}
                      </h4>
                      <button
                        type="button"
                        className="text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-200"
                        onClick={() => removeTestCase(index)}
                        disabled={testCaseFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-3">
                          <span className="font-medium text-white">Input</span>
                        </label>
                        <textarea
                          className="w-full border border-slate-600/30 rounded-xl min-h-24 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                          {...register(`testcases.${index}.input`)}
                          placeholder="Enter test case input"
                        />
                        {errors.testcases?.[index]?.input && (
                          <div className="mt-2">
                            <span className="text-red-400 text-sm">
                              {errors.testcases[index].input.message}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block mb-3">
                          <span className="font-medium text-white">Expected Output</span>
                        </label>
                        <textarea
                          className="w-full border border-slate-600/30 rounded-xl min-h-24 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                          {...register(`testcases.${index}.output`)}
                          placeholder="Enter expected output"
                        />
                        {errors.testcases?.[index]?.output && (
                          <div className="mt-2">
                            <span className="text-red-400 text-sm">
                              {errors.testcases[index].output.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.testcases && !Array.isArray(errors.testcases) && (
                <div className="mt-3">
                  <span className="text-red-400 text-sm">{errors.testcases.message}</span>
                </div>
              )}
            </div>

            {/* Code Editor Sections */}
            <div className="space-y-8">
              {['JAVASCRIPT', 'PYTHON', 'JAVA'].map(language => (
                <div
                  key={language}
                  className="bg-slate-700/30 rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Code2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{language}</h3>
                  </div>
                  <div className="space-y-6">
                    {/* Starter Code */}
                    <div className="bg-slate-800/50 rounded-2xl p-6">
                      <h4 className="font-semibold text-base md:text-lg mb-4 text-white">
                        Starter Code Template
                      </h4>
                      <div className="rounded-xl overflow-hidden border border-slate-600/30">
                        <Controller
                          name={`codeSnippets.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="300px"
                              language={language.toLowerCase()}
                              theme="vs-dark"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      {errors.codeSnippets?.[language] && (
                        <div className="mt-3">
                          <span className="text-red-400 text-sm">
                            {errors.codeSnippets[language].message}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Reference Solution */}
                    <div className="bg-slate-800/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <h4 className="font-semibold text-base md:text-lg text-white">
                          Reference Solution
                        </h4>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-slate-600/30">
                        <Controller
                          name={`referenceSolutions.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="300px"
                              language={language.toLowerCase()}
                              theme="vs-dark"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      {errors.referenceSolutions?.[language] && (
                        <div className="mt-3">
                          <span className="text-red-400 text-sm">
                            {errors.referenceSolutions[language].message}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Examples */}
                    <div className="bg-slate-800/50 rounded-2xl p-6">
                      <h4 className="font-semibold text-base md:text-lg mb-4 text-white">
                        Example
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-3">
                            <span className="font-medium text-white">Input</span>
                          </label>
                          <textarea
                            className="w-full border border-slate-600/30 rounded-xl min-h-20 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                          />
                          {errors.examples?.[language]?.input && (
                            <div className="mt-2">
                              <span className="text-red-400 text-sm">
                                {errors.examples[language].input.message}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block mb-3">
                            <span className="font-medium text-white">Output</span>
                          </label>
                          <textarea
                            className="w-full border border-slate-600/30 rounded-xl min-h-20 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                          />
                          {errors.examples?.[language]?.output && (
                            <div className="mt-2">
                              <span className="text-red-400 text-sm">
                                {errors.examples[language].output.message}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block mb-3">
                            <span className="font-medium text-white">Explanation</span>
                          </label>
                          <textarea
                            className="w-full border border-slate-600/30 rounded-xl min-h-24 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="bg-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Additional Information
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block mb-3">
                    <span className="font-medium text-white">Constraints</span>
                  </label>
                  <textarea
                    className="w-full border border-slate-600/30 rounded-xl min-h-24 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                    {...register('constraints')}
                    placeholder="Enter problem constraints"
                  />
                  {errors.constraints && (
                    <div className="mt-2">
                      <span className="text-red-400 text-sm">{errors.constraints.message}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-3">
                    <span className="font-medium text-white">Hints (Optional)</span>
                  </label>
                  <textarea
                    className="w-full border border-slate-600/30 rounded-xl min-h-24 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                    {...register('hints')}
                    placeholder="Enter hints for solving the problem"
                  />
                </div>
                <div>
                  <label className="block mb-3">
                    <span className="font-medium text-white">Editorial (Optional)</span>
                  </label>
                  <textarea
                    className="w-full border border-slate-600/30 rounded-xl min-h-32 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400 transition-all duration-200"
                    {...register('editorial')}
                    placeholder="Enter problem editorial/solution explanation"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-600/40">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg hover:shadow-2xl flex items-center gap-3 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={isButtonDisabled}
              >
                {isCreating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Creating Problem...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemForm;
