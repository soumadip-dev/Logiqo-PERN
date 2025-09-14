//* Return the Judge0 language ID based on the language name
function getJudge0LanguageId(language) {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
    CPP: 105,
    GO: 60,
    CSHARP: 51,
  };
  return languageMap[language.toUpperCase()];
}

//* Export utils
export { getJudge0LanguageId };
