// ============================================================
// Agosto Lilás — script.js
// Menu mobile + Quiz interativo sobre a campanha
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- MENU MOBILE ---------------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });

  /* ---------------- QUIZ ---------------- */
  const questions = [
    {
      question: 'Em que ano foi criada a Lei Maria da Penha?',
      options: ['1998', '2006', '2010', '2015'],
      correct: 1,
      explanation: 'A Lei nº 11.340 foi sancionada em 7 de agosto de 2006.'
    },
    {
      question: 'Qual é o número da central de atendimento à mulher em situação de violência?',
      options: ['190', '181', '180', '100'],
      correct: 2,
      explanation: 'O 180 é gratuito e funciona 24 horas por dia, todos os dias.'
    },
    {
      question: 'Em homenagem a quem a Lei Maria da Penha recebeu esse nome?',
      options: [
        'Uma juíza pioneira em direitos humanos',
        'Uma sobrevivente de violência doméstica',
        'Uma senadora que propôs a lei',
        'Uma ativista dos anos 1950'
      ],
      correct: 1,
      explanation: 'Maria da Penha Maia Fernandes sobreviveu a duas tentativas de feminicídio e se tornou símbolo da luta contra a impunidade.'
    },
    {
      question: 'Qual NÃO é um tipo de violência previsto na Lei Maria da Penha?',
      options: ['Física', 'Patrimonial', 'Ambiental', 'Psicológica'],
      correct: 2,
      explanation: 'A lei prevê os tipos física, psicológica, moral, patrimonial e sexual — "ambiental" não existe na lei.'
    },
    {
      question: 'Por que o mês de agosto foi escolhido para a campanha "Agosto Lilás"?',
      options: [
        'Por ser o mês do Dia das Mães',
        'Por marcar a sanção da Lei Maria da Penha',
        'Por ser o mês de fundação da ONU Mulheres',
        'Não tem relação com nenhuma data específica'
      ],
      correct: 1,
      explanation: 'A Lei nº 13.984/2020 instituiu agosto como o mês de conscientização, em referência à sanção da Lei Maria da Penha em 07/08/2006.'
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const quizArea = document.getElementById('quizArea');
  const quizResult = document.getElementById('quizResult');
  const quizProgressLabel = document.getElementById('quizProgressLabel');
  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizOptionsEl = document.getElementById('quizOptions');
  const quizFeedbackEl = document.getElementById('quizFeedback');
  const quizScoreEl = document.getElementById('quizScore');
  const quizStartBtn = document.getElementById('quizStartBtn');
  const quizRestartBtn = document.getElementById('quizRestartBtn');
  const quizResultText = document.getElementById('quizResultText');

  function renderQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    quizProgressLabel.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    quizQuestionEl.textContent = q.question;
    quizFeedbackEl.classList.add('hidden');
    quizFeedbackEl.textContent = '';

    quizOptionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option text-left text-sm sm:text-[15px] font-semibold text-lilac-950 bg-white border-2 border-lilac-200 rounded-xl px-4 py-3 hover:border-lilac-500 hover:bg-lilac-100/60';
      btn.innerHTML = `<span class="text-lilac-500 font-bold mr-1">${letters[index]})</span> ${option}`;
      btn.addEventListener('click', () => selectAnswer(index, btn));
      quizOptionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btnEl) {
    if (answered) return;
    answered = true;
    const q = questions[currentQuestion];
    const allButtons = quizOptionsEl.querySelectorAll('button');

    allButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === index) btn.classList.add('wrong');
    });

    quizFeedbackEl.classList.remove('hidden');
    if (index === q.correct) {
      score++;
      quizScoreEl.textContent = score;
      quizFeedbackEl.className = 'mt-4 text-sm font-semibold text-emerald-700';
      quizFeedbackEl.textContent = `✅ Certa resposta! ${q.explanation}`;
    } else {
      quizFeedbackEl.className = 'mt-4 text-sm font-semibold text-red-700';
      quizFeedbackEl.textContent = `❌ Não foi dessa vez. ${q.explanation}`;
    }

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'mt-4 inline-flex items-center gap-2 bg-lilac-600 hover:bg-lilac-700 transition-colors text-white font-bold text-sm px-6 py-2.5 rounded-full';
    nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Próxima pergunta →' : 'Ver resultado';
    nextBtn.addEventListener('click', () => {
      nextBtn.remove();
      currentQuestion++;
      if (currentQuestion < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });
    quizFeedbackEl.after(nextBtn);
  }

  function showResult() {
    quizArea.classList.add('hidden');
    quizResult.classList.remove('hidden');

    let message;
    if (score === questions.length) {
      message = `Perfeito! Você acertou ${score} de ${questions.length} perguntas. Você conhece muito bem a campanha Agosto Lilás! 💜`;
    } else if (score >= questions.length / 2) {
      message = `Muito bem! Você acertou ${score} de ${questions.length} perguntas. Continue aprendendo sobre o tema!`;
    } else {
      message = `Você acertou ${score} de ${questions.length} perguntas. Que tal revisar as informações da campanha e tentar de novo?`;
    }
    quizResultText.textContent = message;
  }

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizScoreEl.textContent = '0';
    quizResult.classList.add('hidden');
    quizArea.classList.remove('hidden');
    renderQuestion();
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  quizStartBtn.addEventListener('click', startQuiz);
  quizRestartBtn.addEventListener('click', startQuiz);

  // Renderiza a primeira pergunta como prévia (sem contabilizar) ao carregar a página
  renderQuestion();
});
