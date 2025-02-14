'use client';
import { useState } from 'react';

export default function MathTutor() {
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState('');

  const solveProblem = async () => {
    const res = await fetch('/api/solve-math', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setSolution(data.solution || 'No solution found.');
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Math Tutor</h1>
      <div className="flex-grow overflow-y-auto">
        {solution && (
          <div className="mt-4 p-2 border rounded bg-gray-100">
            <h2 className="text-lg font-semibold text-black pb-10">
              Solution:
            </h2>
            <p
              className="text-black overflow-y-auto max-h-screen"
              dangerouslySetInnerHTML={{
                __html: solution.replace(/\n/g, '<br />')
              }}
            ></p>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <textarea
          className="w-full p-2 border rounded text-black"
          placeholder="Enter a math problem..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={solveProblem}
        >
          Solve
        </button>
      </div>
    </div>
  );
}
