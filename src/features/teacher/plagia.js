// PlagiarismDetector.js
import React, { useState } from 'react';

const PlagiarismDetector = () => {
  const [files, setFiles] = useState([]);
  const [plagiarismPercentage, setPlagiarismPercentage] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handleDetectPlagiarism = () => {
    const fileContents = [];

    // Read contents of each file
    const fileReadPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          fileContents.push(content);
          resolve();
        };

        reader.readAsText(file);
      });
    });

    // After reading all files, compare contents
    Promise.all(fileReadPromises).then(() => {
      const totalFiles = fileContents.length;

      if (totalFiles > 1) {
        let commonWordCount = 0;

        // Simple plagiarism detection algorithm
        const wordsSet = new Set(fileContents[0].split(/\s+/));

        for (let i = 1; i < totalFiles; i++) {
          const currentWords = new Set(fileContents[i].split(/\s+/));

          for (const word of currentWords) {
            if (wordsSet.has(word)) {
              commonWordCount++;
            }
          }
        }

        const plagiarismPercentage = (commonWordCount / wordsSet.size) * 100;
        setPlagiarismPercentage(plagiarismPercentage.toFixed(2));
      } else {
        // Not enough files to compare
        setPlagiarismPercentage(0);
      }
    });
  };

  return (
    <div className="container mx-auto mt-8 max-w-md p-8 bg-white rounded-lg shadow-md">
      <input type="file" multiple onChange={handleFileChange} className="mb-4 p-2 border border-gray-300 rounded-md w-full" />
      {files.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-semibold">اختر الملفات:</p>
          <ul className="list-disc pl-4">
            {files.map((file, index) => (
              <li key={index} className="mt-1">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleDetectPlagiarism} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600">
        تفحص الامانة العلمية
      </button>
      {plagiarismPercentage > 0 && (
        <div className="mt-4">
          <p className="text-lg  text-right font-semibold">:نسبة البلاجيا %{plagiarismPercentage}</p>
        </div>
      )}
    </div>
  );
};

export default PlagiarismDetector;
