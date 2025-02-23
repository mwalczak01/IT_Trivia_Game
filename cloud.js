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
        question: 'Which is not a Cloud service provider?',
        choice1: 'MongoDB',
        choice2: 'AWS',
        choice3: 'Azure',
        choice4: 'Google Cloud',
        answer: 1,
    },
    {
        question: 'Which cloud service model provides applications and services over the internet?',
        choice1: 'Platform as a Service(Paas)',
        choice2: 'Software as a Service (Saas)',
        choice3: 'Cloud as a Service (Caas)',
        choice4: 'Infrastructure as a Service (Iaas)',
        answer: 2,
    },
    {
        question: 'What does AWS stand for?',
        choice1: 'Amazon Web Servers',
        choice2: 'Amazon Waypoint Storage',
        choice3: 'Amazon Web Services',
        choice4: 'Amazon Wireless Systems',
        answer: 3,
    },
    {
        question: 'What is a benefit of using cloud-based storage services?',
        choice1: 'Limited accessibility',
        choice2: 'Higher upfront costs',
        choice3: 'Slower data retrieval',
        choice4: 'Data redundancy and accessibility from anywhere',
        answer: 4,
    },
    {
        question: 'What is a potential security concern in cloud computing?',
        choice1: 'Physical access to servers',
        choice2: 'Limited data backup options',
        choice3: 'Decreased network latency',
        choice4: 'Lack of service-level agreements',
        answer: 1,
    },
    {
        question: 'What is a common use case for cloud-based Saas applications?',
        choice1: 'Developing operating systems',
        choice2: 'Managing local area networks',
        choice3: 'Delivering email services',
        choice4: 'Building computer hardware',
        answer: 3,
    },
    {
        question: '______ refers to the ability to recover from failures without interuption.',
        choice1: 'Elasticity',
        choice2: 'Resiliency',
        choice3: 'Latency',
        choice4: 'Redundancy',
        answer: 2,
    },
    {
        question: 'What us the main benefit of using a hybrid cloud architecture?',
        choice1: 'Flexibility to use both on-premise and cloud resources',
        choice2: 'Simplicity',
        choice3: 'Lower costs',
        choice4: 'Exclusive resilience on public cloud services',
        answer: 1,
    },
    {
        question: 'Which cloud service model allows an organization to have maximum control of their infrustructure?',
        choice1: 'Public cloud',
        choice2: 'Private cloud',
        choice3: 'Hybrid cloud',
        choice4: 'Community cloud',
        answer: 2,
    },
    {
        question: '_____ ensures resources are assigned automatically based on demand.',
        choice1: 'Redundancy',
        choice2: 'Affordability',
        choice3: 'Elasticity',
        choice4: 'Accessibility',
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

