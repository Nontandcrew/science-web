
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const categoryButtonsContainer = document.getElementById('category-buttons-container');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score-value');
const percentageElement = document.getElementById('percentage-value');

let shuffledQuestions, currentQuestionIndex, currentCategory, correctAnswers;


nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => startGame(button.dataset.category));
});

function startGame(category) {
    if (category) {
      currentCategory = category;
    }
    categoryButtonsContainer.classList.remove('show');
    categoryButtonsContainer.classList.add('hide');
    
    resultsContainer.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = getQuestionsForCategory(currentCategory).sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    setNextQuestion();
  }
  
function getQuestionsForCategory(category) {
    switch (category) {
      case 'math':
        return mathQuestions;
      case 'biology':
        return biologyQuestions;
      case 'physics':
        return physicsQuestions;
      case 'chemistry':
        return chemistryQuestions;
      case 'gs21':
        return gs21Questions;
      default:
        return [];
    }
  }
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
      showResults();
    }
  }
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
      correctAnswers++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
      button.removeEventListener('click', selectAnswer);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
  } else {
      showResults();
  }
}
  
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
function showResults() {
    const totalQuestions = shuffledQuestions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
  
    questionContainerElement.classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreElement.innerText = correctAnswers;
    percentageElement.innerText = `${percentage.toFixed(2)}%`;
  }
const mathQuestions = [
    {
        question: 'Find the sum of the roots of the equation x²-199x+9900?',
        answers: [
            { text: '100', correct: false },
            { text: '199', correct: true },
            { text: '200', correct: false },
            { text: '204', correct: false },
        ]
    },
    {
        question: 'Aut is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?',
        answers: [
            { text: '(99.95 + 0.08x) + 5', correct: false },
            { text: '1.08(99.95x) + 5', correct: true },
            { text: '1.08(99.95x + 5)', correct: false },
            { text: '1.08(99.95 + 5)x', correct: false }
        ]
    },
    {
        question: 'x² + y² = 153 and y = −4x. If (x, y) is a solution to the system of equations above, what is the value of x²?',
        answers: [
            { text: '-51', correct: false },
            { text: '3', correct: false },
            { text: '9', correct: true },
            { text: '144', correct: false }
        ]
    },
    {
        question: 'The function f is defined by f(x) = 2x³ + 3x² + cx + 8, where c is a constant. In the xy-plane, the graph of f intersects the x-axis at the three points (−4, 0), (1/2, 0), and (p, 0). What is the value of c?',
        answers: [
            { text: '2', correct: false },
            { text: '-2', correct: false },
            { text: '10', correct: false },
            { text: '-18', correct: true }
        ]
    },
    {
        question: '1.	Let the function f be defined by f(x)=x²+18. If a is a positive number such that f(2a)=3f(a), what is the value of a? ',
        answers: [
            { text: '4', correct: false },
            { text: '-4', correct: false },
            { text: '6', correct: true },
            { text: '-6', correct: false }
        ]
    },
];


  
  const biologyQuestions = [
    {
      question: 'How many molecules of acetyl CoA, an acetyl group attached to ‘coenzyme A’, are produced from a single molecule of glucose for participation in the Krebs cycle?',
      answers: [
        { text: '1', correct: false },
        { text: '2', correct: true },
        { text: '3', correct: false },
        { text: '4', correct: false }
      ]
    },
    {
      question: 'What products of glucose oxidation are essential for oxidative phosphorylation?',
      answers: [
        { text: 'Acetyl CoA', correct: false },
        { text: 'Pyruvate', correct: false },
        { text: 'NADH and FADH2', correct: true },
        { text: 'NADPH and ATP', correct: false }
      ]
    },
    {
        question: 'High cellular concentrations of what molecule would inhibit the entry of pyruvate into the citric acid cycle?',
        answers: [
          { text: 'Coenzyme A', correct: false },
          { text: 'Pyruvate', correct: false },
          { text: 'AMP', correct: false },
          { text: 'NADH', correct: true }
        ]
      },
      {
        question: 'The pancreas arises from which embryonic germ layer?',
        answers: [
          { text: 'Mesoderm', correct: false },
          { text: 'Ectoderm', correct: false },
          { text: 'Mesendoderm', correct: false },
          { text: 'Endoderm', correct: true }
        ]
      },
      {
        question: 'Steatorrhea is the presence of increased fat in feces. Which organ is least likely to be the cause of a patient’s steatorrhea?',
        answers: [
          { text: 'Liver', correct: false },
          { text: 'Small intestine', correct: false },
          { text: 'Pancreas', correct: false },
          { text: 'Stomach', correct: true }
        ]
      },
      {
        question: 'Lactose intolerance is the inability to digest lactose, due to insufficient amounts of the enzyme lactase. Where is lactase usually found?',
        answers: [
          { text: 'Brush border of duodenum', correct: true },
          { text: 'Lumen of the small intestine', correct: false },
          { text: 'Lumen of the stomach', correct: false },
          { text: 'Brush border of the jejunum', correct: false }
        ]
      },
      {
        question: 'Which of the following would most likely be found in the esophagus of a patient suffering from gastroesophageal reflux disease?',
        answers: [
          { text: 'Pepsin', correct: true },
          { text: 'Trypsin', correct: false },
          { text: 'Chymotrypsin', correct: false },
          { text: 'Carboxypeptidase', correct: false }
        ]
      },
      {
        question: 'Instead of phylum, plants use which category?',
        answers: [
        { text: 'subspecies', correct: false },
        { text: 'class', correct: false },
        { text: 'division', correct: true },
        { text: 'subkingdom', correct: false }
      ]
    },
  
  ];
  
  const physicsQuestions = [
    {
      question: 'What is the formula for force?',
      answers: [
        { text: 'Mass times acceleration', correct: true },
        { text: 'Velocity divided by time', correct: false },
        { text: 'Distance divided by time', correct: false },
        { text: 'Energy times power', correct: false }
      ]
    },
    {
      question: 'What is the SI unit of energy?',
      answers: [
        { text: 'Watt', correct: false },
        { text: 'Joule', correct: true },
        { text: 'Newton', correct: false },
        { text: 'Pascal', correct: false }
      ]
    },
    {
      question: 'In a normal projectile motion, what will be the condition for maximum range?',
      answers: [
        { text: '45°', correct: true },
        { text: '60°', correct: false },
        { text: '30°', correct: false },
        { text: '0°', correct: false }
      ]
    },
    {
      question: 'An object of mass 2000 g covers a maximum vertical distance of 6 m when it is projected at an angle of 45° from the ground. Calculate the velocity with which it was thrown. Take g = 10 m/s2,',
      answers: [
        { text: '12.10 m/s', correct: true },
        { text: '15.49 m/s', correct: false },
        { text: '2.155 m/s', correct: false },
        { text: '12.0 m/s', correct: false }
      ]
    },
  ];
  
  const chemistryQuestions = [
    {
      question: 'What is the chemical symbol for water?',
      answers: [
        { text: 'O2', correct: false },
        { text: 'CO2', correct: false },
        { text: 'H2O', correct: true },
        { text: 'N2', correct: false }
      ]
    },
    {
      question: 'Which element has the symbol "Na"?',
      answers: [
        { text: 'Sodium', correct: true },
        { text: 'Nickel', correct: false },
        { text: 'Neon', correct: false },
        { text: 'Nitrogen', correct: false }
      ]
    },
    {
      question: 'The product of atomic mass and metal specific heat is about 6.4. This information was provided by?',
      answers: [
        { text: 'Dalton’s law', correct: false },
        { text: 'Dulong Petit’s law', correct: true },
        { text: 'Newton’s law', correct: false },
        { text: 'Avogadro’s law', correct: false }
      ]
    },
    {
      question: '1 mole of K4[Fe(CN)6] contains carbon = 6g atoms. 0.5 mole of K4[Fe(CN)6] contain carbon = 3g atoms. The mass of carbon present in 0.5 mole of K4[Fe(CN)6] is?',
      answers: [
        { text: '1.8 g', correct: false },
        { text: '3.6 g', correct: false },
        { text: '18 g', correct: false },
        { text: '36 g', correct: true }
      ]
    },
  ];
   const gs21Questions = [
    {
      question: 'ใครอกหักบ่อยที่สุดใน GS21?',
      answers: [
        { text: 'Aut', correct: true },
        { text: 'Wanas', correct: true },
        { text: 'Siri', correct: true },
        { text: 'Pong', correct: true }
      ]
    },
    {
      question: 'สวัสดี เรา...GS21 เราชอบแกอ่ะ เป็นแฟนกันมั้ย ประโยคนี้เป็นคำพูดของใคร',
      answers: [
        { text: 'Aut', correct: true },
        { text: 'Max', correct: false },
        { text: 'Ete', correct: false },
        { text: 'NongPete', correct: false }
      ]
    },
    {
        question: 'จงหาผลต่างของอายุครูคธากับณัฐวัชร์',
        answers: [
          { text: '4', correct: false },
          { text: '5', correct: true },
          { text: '7', correct: false },
          { text: '93853850', correct: false }
        ]
    },
    {
      question: 'ใครมาจากโรงเรียนสวนกุหลาบ',
      answers: [
        { text: 'Aut', correct: false },
        { text: 'Kenji', correct: false },
        { text: 'Asia', correct: true },
        { text: 'Ken', correct: false }
      ]
    },
    {
      question: 'ใครมีแฟนแล้ว',
      answers: [
        { text: 'Aut', correct: false },
        { text: 'Kenji', correct: true },
        { text: 'Ken', correct: true },
        { text: 'LouisVitton', correct: true }
      ]
    },
    {
      question: 'GS21 ชอบเรียนวิชาอะไรมากที่สุด',
      answers: [
        { text: 'การออกแบบและเทคโนโลยี', correct: true },
        { text: 'คณิตศาสตร์', correct: false },
        { text: 'ฟิสิกส์', correct: false },
        { text: 'เคมี', correct: false }
      ]
    },
];