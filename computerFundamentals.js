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
        question: 'What does CPU mean?',
        choice1: 'Computer Programming Umbrella',
        choice2: 'Central Processing Unit',
        choice3: 'Computer Processing Unit',
        choice4: 'Conductor Processor Unix',
        answer: 2,
    },
    {
        question: 'Which is not a peripheral device?',
        choice1: 'Mouse',
        choice2: 'Speakers',
        choice3: 'Keyboard',
        choice4: 'Motherboard',
        answer: 4,
    },
    {
        question: 'What does RAM mean?',
        choice1: 'Raw Accessable Memory',
        choice2: 'Real Actual Medium',
        choice3: 'Random Access Memory',
        choice4: 'Rigid Arbitrary Marks',
        answer: 3,
    },
    {
        question: 'What does DVD stand for?',
        choice1: 'Digital Versatile Disk',
        choice2: 'Disk Video Digital',
        choice3: 'Drive Versus Disk',
        choice4: 'Dolby Video Disk',
        answer: 1,
    },
    {
        question: 'Which holds more storage?',
        choice1: '1 gigabyte',
        choice2: '1 kilobyte',
        choice3: '1 megabyte',
        choice4: '1 terrabyte',
        answer: 4,
    },
    {
        question: 'What kind of intelligence does a computer have?',
        choice1: 'Mouse',
        choice2: 'Human',
        choice3: 'Artificial',
        choice4: 'Celestial',
        answer: 3,
    },
    {
        question: 'What language does a computer speak in?',
        choice1: 'Hexadecimal',
        choice2: 'Binary',
        choice3: 'Latin',
        choice4: 'Morse Code',
        answer: 2,
    },
    {
        question: 'Which binary number represents the value 4?',
        choice1: '0100',
        choice2: '1111',
        choice3: '0110',
        choice4: '1000',
        answer: 1,
    },
    {
        question: 'What animal represents Linux?',
        choice1: 'Lynx',
        choice2: 'Elephant',
        choice3: 'Koala',
        choice4: 'Penguin',
        answer: 4,
    },
    {
        question: 'Where do principle components of a computer reside?',
        choice1: 'Motherboard',
        choice2: 'CPU',
        choice3: 'RAM',
        choice4: 'Graphical User Interface',
        answer: 1,
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
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`

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

