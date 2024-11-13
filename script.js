let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let isEnglish = false; // Varsayılan olarak Türkçe
let timer;
let timeLeft;
let gameInterval;

const wordsQuestions = [
    {
        question: "What is 'Elma' in English?",
        questionTr: "'Elma' İngilizce ne demek?",
        options: ["Apple", "Banana", "Orange", "Grape"],
        optionsTr: ["Elma", "Muz", "Portakal", "Üzüm"],
        correct: 0
    },
    {
        question: "What is 'Köpek' in English?",
        questionTr: "'Köpek' İngilizce ne demek?",
        options: ["Dog", "Cat", "Bird", "Fish"],
        optionsTr: ["Köpek", "Kedi", "Kuş", "Balık"],
        correct: 0
    },
    {
        question: "What is 'Ev' in English?",
        questionTr: "'Ev' İngilizce ne demek?",
        options: ["House", "Car", "School", "Office"],
        optionsTr: ["Ev", "Araba", "Okul", "Ofis"],
        correct: 0
    },
    {
        question: "What is 'Kitap' in English?",
        questionTr: "'Kitap' İngilizce ne demek?",
        options: ["Book", "Pencil", "Paper", "Notebook"],
        optionsTr: ["Kitap", "Kalem", "Kağıt", "Defter"],
        correct: 0
    },
    {
        question: "What is 'Güneş' in English?",
        questionTr: "'Güneş' İngilizce ne demek?",
        options: ["Sun", "Moon", "Star", "Cloud"],
        optionsTr: ["Güneş", "Ay", "Yıldız", "Bulut"],
        correct: 0
    }
];

const spellingQuestions = [
    {
        question: "Which one is correctly spelled?",
        questionTr: "Hangisi doğru yazılmıştır?",
        options: ["Beautiful", "Beautifull", "Beutiful", "Beautyful"],
        optionsTr: ["Beautiful", "Beautifull", "Beutiful", "Beautyful"],
        correct: 0
    },
    {
        question: "Find the correct spelling:",
        questionTr: "Doğru yazımı bulun:",
        options: ["Necessary", "Necesary", "Neccesary", "Necesery"],
        optionsTr: ["Necessary", "Necesary", "Neccesary", "Necesery"],
        correct: 0
    },
    {
        question: "Which spelling is right?",
        questionTr: "Hangi yazım doğru?",
        options: ["Tomorrow", "Tommorow", "Tomorow", "Tommorrow"],
        optionsTr: ["Tomorrow", "Tommorow", "Tomorow", "Tommorrow"],
        correct: 0
    },
    {
        question: "Select the correct spelling:",
        questionTr: "Doğru yazımı seçin:",
        options: ["Restaurant", "Resturant", "Restarant", "Restaurent"],
        optionsTr: ["Restaurant", "Resturant", "Restarant", "Restaurent"],
        correct: 0
    },
    {
        question: "Which is spelled correctly?",
        questionTr: "Hangisi doğru yazılmıştır?",
        options: ["Beginning", "Begining", "Begineing", "Begininng"],
        optionsTr: ["Beginning", "Begining", "Begineing", "Begininng"],
        correct: 0
    }
];

const speakingQuestions = [
    {
        question: "How do you say 'Günaydın'?",
        questionTr: "'Günaydın' nasıl söylenir?",
        options: ["Good morning", "Good night", "Good evening", "Good afternoon"],
        optionsTr: ["Günaydın", "İyi geceler", "İyi akşamlar", "İyi öğlenler"],
        correct: 0
    },
    {
        question: "What's the meaning of 'How are you?'",
        questionTr: "'How are you?' ne demek?",
        options: ["Nasılsın?", "Nerelisin?", "Kimsin?", "Neredesin?"],
        optionsTr: ["Nasılsın?", "Nerelisin?", "Kimsin?", "Neredesin?"],
        correct: 0
    },
    {
        question: "How do you say 'Teşekkür ederim'?",
        questionTr: "'Teşekkür ederim' nasıl söylenir?",
        options: ["Thank you", "Please", "You're welcome", "Excuse me"],
        optionsTr: ["Teşekkür ederim", "Lütfen", "Rica ederim", "Affedersiniz"],
        correct: 0
    },
    {
        question: "What's the meaning of 'Nice to meet you'?",
        questionTr: "'Nice to meet you' ne demek?",
        options: ["Tanıştığımıza memnun oldum", "Görüşürüz", "Hoşçakal", "Nasılsın"],
        optionsTr: ["Tanıştığımıza memnun oldum", "Görüşürüz", "Hoşçakal", "Nasılsın"],
        correct: 0
    },
    {
        question: "How do you say 'Hoşçakal'?",
        questionTr: "'Hoşçakal' nasıl söylenir?",
        options: ["Goodbye", "Hello", "Welcome", "Thanks"],
        optionsTr: ["Hoşçakal", "Merhaba", "Hoşgeldin", "Teşekkürler"],
        correct: 0
    }
];

function startCategory(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    
    switch(category) {
        case 'words':
            questions = wordsQuestions;
            break;
        case 'spelling':
            questions = spellingQuestions;
            break;
        case 'speaking':
            questions = speakingQuestions;
            break;
    }
    
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    updateQuestion();
    startTimer();
    updateProgress();
}

function startTimer() {
    timeLeft = 15;
    clearInterval(gameInterval);
    updateTimerDisplay();
    
    gameInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            document.getElementById('timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            handleAnswer(-1); // Zaman dolduğunda yanlış cevap olarak işle
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
}

function updateQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = isEnglish ? 
        currentQuestion.question : currentQuestion.questionTr;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const currentOptions = isEnglish ? currentQuestion.options : currentQuestion.optionsTr;
    
    currentOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    updateProgress();
}

function handleAnswer(selectedIndex) {
    clearInterval(gameInterval);
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.getElementById('options').children;
    
    // Doğru cevabı göster
    options[currentQuestion.correct].classList.add('correct');
    
    if (selectedIndex !== -1) { // Zaman dolmadıysa
        if (selectedIndex === currentQuestion.correct) {
            score += 10;
            showFeedback(true);
        } else {
            options[selectedIndex].classList.add('wrong');
            showFeedback(false);
        }
    } else { // Zaman dolduysa
        showFeedback(false);
    }

    document.getElementById('currentScore').textContent = score;
    
    // 2 saniye sonra bir sonraki soruya geç
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            updateQuestion();
            startTimer();
        } else {
            endGame();
        }
    }, 2000);
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    feedback.style.backgroundColor = isCorrect ? '#2ecc71' : '#e74c3c';
    feedback.style.color = 'white';
    feedback.textContent = isCorrect ? 
        (isEnglish ? 'Correct!' : 'Doğru!') : 
        (isEnglish ? 'Wrong!' : 'Yanlış!');
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 1500);
}

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function toggleLanguage() {
    isEnglish = !isEnglish;
    document.getElementById('languageBtn').textContent = isEnglish ? 'Türkçe\'ye Geç' : 'Switch to English';
    updateQuestion();
}

function endGame() {
    clearInterval(gameInterval);
    const finalScore = score;
    
    // Yüksek skorları localStorage'dan al
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Yeni skoru ekle
    highScores.push({
        category: currentCategory,
        score: finalScore,
        date: new Date().toLocaleDateString()
    });
    
    // Skorları sırala
    highScores.sort((a, b) => b.score - a.score);
    
    // En yüksek 10 skoru tut
    highScores = highScores.slice(0, 10);
    
    // Skorları kaydet
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Ana menüye dön
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    
    // Skor tablosunu göster
    showScoreboard();
}

function showScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    const scoreList = document.getElementById('scoreList');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    scoreList.innerHTML = '';
    
    highScores.forEach((score, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <span>${index + 1}. ${getCategoryName(score.category)}</span>
            <span>${score.score} puan</span>
            <span>${score.date}</span>
        `;
        scoreList.appendChild(scoreItem);
    });
    
    scoreboard.style.display = 'block';
}

function getCategoryName(category) {
    const categories = {
        'words': 'Kelimeler',
        'spelling': 'Yazım',
        'speaking': 'Konuşma'
    };
    return categories[category] || category;
}

function hideScoreboard() {
    document.getElementById('scoreboard').style.display = 'none';
}