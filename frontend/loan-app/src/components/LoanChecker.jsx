import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/card";
import { Button } from "../components/button";
import { Progress } from "../components/progress";

const questions = [
  {
    question: "What is your employment status?",
    options: ["Employed", "Self-Employed", "Unemployed", "Student"],
    correct: "Employed",
    weight: 15
  },
  {
    question: "What is your approximate monthly income?",
    options: ["Less than $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "More than $10,000"],
    correct: "$5,000 - $10,000",
    weight: 20
  },
  {
    question: "What is your credit score range?",
    options: ["Below 500", "500-650", "650-750", "Above 750"],
    correct: "650-750",
    weight: 20
  },
  {
    question: "What type of loan are you applying for?",
    options: ["Personal Loan", "Home Loan", "Car Loan", "Business Loan"],
    correct: "Personal Loan",
    weight: 5
  },
  {
    question: "What is the loan amount you need?",
    options: ["Less than $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "More than $100,000"],
    correct: "$10,000 - $50,000",
    weight: 5
  },
  {
    question: "Do you have any existing loans?",
    options: ["Yes", "No"],
    correct: "No",
    weight: 10
  },
  {
    question: "What is your age group?",
    options: ["18-25", "26-35", "36-50", "Above 50"],
    correct: "26-35",
    weight: 5
  },
  {
    question: "Do you have any collateral for the loan?",
    options: ["Yes", "No"],
    correct: "Yes",
    weight: 10
  },
  {
    question: "What is the purpose of the loan?",
    options: ["Education", "Business", "Home Improvement", "Medical Expenses"],
    correct: "Business",
    weight: 5
  },
  {
    question: "How long do you plan to repay the loan?",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"],
    correct: "3-5 years",
    weight: 5
  },
];

export default function LoanChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score += q.weight;
      } else if (answers[index]) {
        // Partial points based on the option selected
        const optionIndex = q.options.indexOf(answers[index]);
        const correctIndex = q.options.indexOf(q.correct);
        const diff = Math.abs(optionIndex - correctIndex);
        
        // The closer to the correct answer, the more points
        if (diff === 1) score += q.weight * 0.5;
        else if (diff === 2) score += q.weight * 0.25;
      }
    });
    return score;
  };

  const calculateEligibleAmount = () => {
    const score = calculateScore();
    const baseAmount = 50000; // Maximum amount
    
    // Calculate eligible amount based on score percentage
    const percentage = score / 100;
    const eligibleAmount = Math.round(baseAmount * percentage / 1000) * 1000; // Round to nearest thousand
    
    return eligibleAmount;
  };

  const score = calculateScore();
  const eligibleAmount = calculateEligibleAmount();
  
  // Calculate risk level
  const getRiskLevel = (score) => {
    if (score >= 85) return { level: "Low Risk", color: "text-green-600" };
    if (score >= 65) return { level: "Moderate Risk", color: "text-yellow-600" };
    if (score >= 40) return { level: "High Risk", color: "text-orange-600" };
    return { level: "Very High Risk", color: "text-red-600" };
  };
  
  const riskLevel = getRiskLevel(score);

  // Get suggested interest rate based on risk
  const getInterestRate = (score) => {
    if (score >= 85) return "5.75%";
    if (score >= 65) return "8.25%";
    if (score >= 40) return "12.5%";
    return "18.75%";
  };

  const suggestedRate = getInterestRate(score);

  const isFormComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-2xl text-center">Loan Eligibility Checker</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!submitted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round((currentStep / questions.length) * 100)}% Complete</span>
                </div>
                <Progress value={(currentStep / questions.length) * 100} className="h-2 bg-gray-200" />
              </div>
              
              <div className="py-4">
                <h3 className="text-xl font-medium mb-6">{questions[currentStep].question}</h3>
                <div className="grid gap-3">
                  {questions[currentStep].options.map((option, i) => (
                    <Button
                      key={i}
                      variant={answers[currentStep] === option ? "default" : "outline"}
                      className="justify-start text-left h-auto py-3 px-4"
                      onClick={() => handleAnswer(currentStep, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto flex gap-3">
                  {currentStep < questions.length - 1 ? (
                    <Button 
                      disabled={!answers[currentStep]}
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      disabled={!isFormComplete}
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Check Eligibility
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="py-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Loan Eligibility Results</h2>
              
              <div className="text-center mb-8">
                <div className="inline-block rounded-full bg-blue-100 p-3">
                  <div className="text-4xl font-bold text-blue-700">${eligibleAmount.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">Eligible Loan Amount</div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-1">
                  <span>Score:</span>
                  <span className="font-bold">{score}/100</span>
                </div>
                <Progress value={score} className="h-3 mb-4" />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">Risk Level</div>
                    <div className={`font-bold ${riskLevel.color}`}>{riskLevel.level}</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">Suggested Rate</div>
                    <div className="font-bold text-blue-600">{suggestedRate}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Details</h3>
                <ul className="text-sm space-y-1">
                  <li className="flex justify-between">
                    <span>Employment Status:</span>
                    <span className="font-medium">{answers[0] || "Not provided"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Monthly Income:</span>
                    <span className="font-medium">{answers[1] || "Not provided"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Credit Score:</span>
                    <span className="font-medium">{answers[2] || "Not provided"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Loan Type:</span>
                    <span className="font-medium">{answers[3] || "Not provided"}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 border-t p-4">
          {submitted && (
            <div className="w-full">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="w-full"
              >
                Start New Assessment
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}