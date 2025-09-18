import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import openai

#load api key 
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize FastAPI app
app = FastAPI()

# Request schemas (for structured inputs from frontend)
class QuestionRequest(BaseModel):
    company: str = "General"
    role: str = "Software Engineer"
    count: int = 3

class EvalRequest(BaseModel):
    company: str = "General"
    question: str
    answer: str

# Hardcoded company interview styles
company_profiles = {
    "Google": "Focus on algorithms, system design, and problem-solving depth.",
    "Infosys": "Practical coding, OOP basics, and database concepts.",
    "Microsoft": "System design, product sense, and engineering trade-offs.",
    "TCS": "Scenario-based questions, programming fundamentals, and aptitude."
}

# Endpoint: Generate questions
@app.post("/generate-questions")
async def generate_questions(req: QuestionRequest):
    style = company_profiles.get(req.company, "Balanced technical + behavioral.")
    prompt = (
        f"Generate {req.count} interview questions for {req.role} role at {req.company}. "
        f"Company style: {style}. "
        f"Return JSON array with fields id, question, type, hint."
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"system", "content":"You are an interview question generator."},
            {"role":"user", "content":prompt}
        ],
        temperature=0.7,
        max_tokens=600
    )

    text = response["choices"][0]["message"]["content"]
    return {"company": req.company, "role": req.role, "questions": text}

# Endpoint: Evaluate answers
@app.post("/evaluate-answer")
async def evaluate_answer(req: EvalRequest):
    style = company_profiles.get(req.company, "Balanced.")
    prompt = (
        f"Company: {req.company}, Style: {style}\n"
        f"Question: {req.question}\n"
        f"Answer: {req.answer}\n\n"
        "Evaluate correctness (correct/partial/incorrect), clarity, and suggest improvement. "
        "Return JSON with fields correctness, explanation, improvements."
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"system", "content":"You are an interview evaluator."},
            {"role":"user", "content":prompt}
        ],
        temperature=0.3,
        max_tokens=400
    )

    text = response["choices"][0]["message"]["content"]
    return {"evaluation": text}

# Run with:
# uvicorn server:app --reload
