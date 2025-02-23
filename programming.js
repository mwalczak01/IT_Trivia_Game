const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which is not a programming language?',
        choice1: 'CSS',
        choice2: 'Python',
        choice3: 'C',
        choice4: 'JavaScript',
        answer: 1,
    },
    {
        question: 'Which came first?',
        choice1: 'C++',
        choice2: 'C',
        choice3: 'Java',
        choice4: 'Ruby',
        answer: 2,
    },
    {
        question: 'What does SQL',
        choice1: 'Standard Query Log',
        choice2: 'Simplified Quest Ledger',
        choice3: 'Structured Query Language',
        choice4: 'Stored Quick Log',
        answer: 3,
    },
    {
        question: 'The primary language used for the game engine Unity is?',
        choice1: 'Java',
        choice2: 'Python',
        choice3: 'C++',
        choice4: 'C#',
        answer: 4,
    },
    {
        question: 'Which language is most commonly used for machine learning?',
        choice1: 'Kotlin',
        choice2: 'C',
        choice3: 'JavaScript',
        choice4: 'Python',
        answer: 4,
    },
    {
        question: 'An error in a program is commonly referred to as a...',
        choice1: 'Virus',
        choice2: 'Failure',
        choice3: 'Bug',
        choice4: 'Intruder',
        answer: 3,
    },
    {
        question: 'What does IDE stand for?',
        choice1: 'Innovative Debugging Equipment',
        choice2: 'Integrated Development Environment',
        choice3: 'Intercepted Device Emulator',
        choice4: 'Internet Data Encryption',
        answer: 2,
    },
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Text Markup Language',
        choice2: 'High-Level Text Management Language',
        choice3: 'Hyperlink and Text Markup Language',
        choice4: 'High Technology Managed Language',
        answer: 1,
    },
    {
        question: 'Which language was developed by Apple for iOS app development?',
        choice1: 'Java',
        choice2: 'Swift',
        choice3: 'Ruby',
        choice4: 'Kotlin',
        answer: 2,
    },
    {
        question: 'What language is most commonly used for website development?',
        choice1: 'Java',
        choice2: 'C#',
        choice3: 'JavaScript',
        choice4: 'Python',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./gameResults.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

