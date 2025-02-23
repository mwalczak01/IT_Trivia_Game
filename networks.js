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
        question: 'Which is a valid IP address?',
        choice1: '192.169.0.1',
        choice2: '164.256.1.2',
        choice3: '2C:54:91:88:C9',
        choice4: '300.01.10',
        answer: 1,
    },
    {
        question: 'Which is a valid MAC address?',
        choice1: 'AA:4F:32:76',
        choice2: '3D:45:19:88:D7',
        choice3: 'J1:91:17:A2:11',
        choice4: 'A8.41.FF.34',
        answer: 2,
    },
    {
        question: 'What does Wi-Fi mean?',
        choice1: 'Wired Frequency',
        choice2: 'Wireless Format',
        choice3: 'Wireless Fidelity',
        choice4: 'Wired Finite',
        answer: 3,
    },
    {
        question: 'What does a firewall do?',
        choice1: 'Permanantly deletes files',
        choice2: 'Harms your computer',
        choice3: 'Warms up the operating system',
        choice4: 'Protects your network',
        answer: 4,
    },
    {
        question: 'Which cable provides the fastest data speed?',
        choice1: 'Coaxial',
        choice2: 'Ethernet',
        choice3: 'Cat 6e',
        choice4: 'Fiber Optic',
        answer: 4,
    },
    {
        question: 'Which command aids in network troubleshooting on a Windows OS?',
        choice1: 'ifconfig',
        choice2: 'whoami',
        choice3: 'ipconfig',
        choice4: 'bcdboot',
        answer: 3,
    },
    {
        question: 'What does ISP stand for?',
        choice1: 'Internet Sales Product',
        choice2: 'Internet Service Provider',
        choice3: 'Intel Server Port',
        choice4: 'Intel Service Provisioner',
        answer: 2,
    },
    {
        question: 'Which is not a form of malware?',
        choice1: 'Firewall',
        choice2: 'Ransomware',
        choice3: 'Worm',
        choice4: 'Virus',
        answer: 1,
    },
    {
        question: 'Which is not a networking device',
        choice1: 'HUB',
        choice2: 'Port',
        choice3: 'Switch',
        choice4: 'Router',
        answer: 2,
    },
    {
        question: 'What does WAN mean?',
        choice1: 'Obi-WAN',
        choice2: 'Windows Application Network',
        choice3: 'Wide Area Network',
        choice4: 'Web And Net',
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

