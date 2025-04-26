import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: 'No question provided' },
        { status: 400 }
      );
    }

    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: `You are a highly knowledgeable and patient math tutor. Your task is to solve the following math problem step by step, providing clear and detailed explanations. Only answer mathematics-related questions and format your response as follows:\n\n1. Restate the problem.\n2. Identify the key concepts involved.\n3. Provide a step-by-step solution.\n4. Summarize the solution.\n\nIf the problem does not involve any mathematical concepts, respond with: "The problem does not involve any mathematical concepts, so I cannot assist in providing an answer for this question." and stop.\n\nProblem: ${question}`,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ solution: data.response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
