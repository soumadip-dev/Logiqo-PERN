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

// Export utility function
export { getJudge0LanguageId };
