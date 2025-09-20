import axios from 'axios';

import { ENV } from '../config/env.config.js';

//* Get the Judge0 language ID for a given language name
function getJudge0LanguageId(language) {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
    CPP: 105,
    GO: 60,
    CSHARP: 51,
  };

  // Return the corresponding language ID
  return languageMap[language.toUpperCase()];
}

//* Send multiple code submissions to Judge0 and return the response with tokens
async function submissionBatch(submissions) {
  const { data } = await axios.post(
    `${ENV.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        'x-rapidapi-key': ENV.RAPIDAPI_KEY,
        'x-rapidapi-host': ENV.RAPIDAPI_HOST,
      },
    }
  );

  // Return response data from Judge0
  return data;
}

//* Export utility functions
export { getJudge0LanguageId, submissionBatch };
