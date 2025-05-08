// IMPORTS
import axios from 'axios';

// RETURN JUDGE0 LANGUAGE ID BASED ON LANGUAGE NAME
export const getJudge0LanguageId = language => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };
  return languageMap[language.toUpperCase()];
};

// SEND MULTIPLE SUBMISSIONS TO JUDGE0 AND RETURN THE RESPONSE (INCLUDING TOKENS)
export const submissionBatch = async submissions => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions }
  );

  return data;
};

// HELPER FUNCTION TO PAUSE CODE FOR A GIVEN TIME
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// KEEP POLLING JUDGE0 UNTIL ALL SUBMISSIONS ARE FINISHED
export const pollBatchResults = async tokens => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch/`,
      {
        params: { tokens: tokens.join(','), base64_encoded: false },
      }
    );

    const results = data.submissions;

    // Check if all submissions are completed (not in queue or running)
    const isAllDone = results.every(
      result => result.status.id !== 1 && result.status.id !== 2
    );

    // If all submissions are done, return the results
    if (isAllDone) return results;

    console.log(isAllDone);

    // Wait for 1 second before polling again
    await sleep(1000);
  }
};

// RETURN JUDGE0 LANGUAGE NAME BASED ON LANGUAGE ID
export const getJudge0LanguageName = id => {
  const languageMap = {
    71: 'PYTHON',
    62: 'JAVA',
    63: 'JAVASCRIPT',
  };
  return languageMap[id] || 'Unknown';
};
