import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBTuhevuFKGRA4ZFZiHTJJz0kunCnC72Es');

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const prompt = `You are an AI nutritionist. Provide helpful, accurate advice about nutrition, diet, and healthy eating habits. The user's message is: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI response:', error);
    return "I apologize, but I'm having trouble connecting to the AI service at the moment. Please try again later.";
  }
}