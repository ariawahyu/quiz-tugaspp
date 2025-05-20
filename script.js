// Quiz Questions & Configuration
const questions = [
    {
        question: "Setelah membaca kronologi pemaksaan jilbab di SMA Negeri 1 Sumberlawang, manakah dari berikut ini yang paling tepat menggambarkan bentuk pelanggaran hak yang dialami S?",
        options: ["Pelanggaran hak atas kebebasan berpendapat", "Pelanggaran hak atas kebebasan beragama", "Pelanggaran hak atas memperoleh pendidikan", "Pelanggaran hak atas privasi"],
        correct: 1,
        time: 15
    },
    {
        question: "Gubernur Jawa Tengah menyatakan siap memecat guru yang mengulangi perundungan. Menurut prinsip penyelesaian konflik berbasis restorative justice, tindakan apa yang seharusnya lebih prioritas sebelum pemecatan?",
        options: ["Hukuman administratif tanpa pembinaan", "Pembentukan kelompok kerja antiperundungan di provinsi", "Mediasi dan rehabilitasi hubungan antara guru, korban, dan orang tua", "Pelaporan langsung ke Dewan Pendidikan Nasional"],
        correct: 2,
        time: 20
    },
    {
        question: "Berdasarkan catatan KPAI tentang beragam kasus pemaksaan dan pelarangan jilbab di berbagai daerah, kebijakan pemerintah pusat manakah yang paling efektif mencegah pelanggaran serupa terjadi?",
        options: ["Mewajibkan semua sekolah negeri menerbitkan peraturan seragam tunggal", "Menghapus seluruh aturan lokal tentang jilbab dan menyerahkan sepenuhnya pada keputusan sekolah", "Mengeluarkan regulasi nasional yang melarang wajib jilbab maupun larangan jilbab di sekolah", "Menyerahkan penyusunan aturan kepada DPRD provinsi agar lebih adaptif"],
        correct: 2,
        time: 25
    },
    {
        question: "Ketika guru bertanya “Agamamu apa? Islam kok nggak pakai jilbab?”, hal ini mencerminkan pelanggaran kewajiban negara atau warga negara manakah?",
        options: ["Kelalaian warga negara dalam menghargai perbedaan", "Kegagalan guru sebagai aparatur negara menegakkan netralitas", "Kekurangan regulasi tentang seragam sekolah", "Pelanggaran kewajiban siswa untuk menaati peraturan sekolah"],
        correct: 1,
        time: 25
    },
    {
        question: "Jika Anda ditunjuk sebagai konsultan KPAI untuk menurunkan angka perundungan berbasis paksaan agama, intervensi manakah yang paling tepat dilakukan?",
        options: ["Pelatihan toleransi agama bagi seluruh tenaga kependidikan dan OSIS", "Pemasangan kamera pengawas di setiap ruang kelas", "Penambahan jam pelajaran Pendidikan Agama Islam", "Penerapan tes religiositas bagi calon siswa baru"],
        correct: 0,
        time: 25
    },
    {
        question: "UndangUndang Dasar 1945 menjamin kebebasan beragama. Manakah pasal UUD 1945 yang menegaskan hal ini?",
        options: ["Pasal 28E ayat (1)", "Pasal 29 ayat (2)", "Pasal 28A", "Pasal 31 ayat (1)"],
        correct: 1,
        time: 25
    },
    {
        question: "S mempertimbangkan pindah sekolah karena trauma. Jika Anda menjadi konselor sekolah, strategi mana yang paling holistik untuk memulihkan kondisi psikologis S sekaligus mencegah kasus lanjutan?",
        options: ["Memberikan konseling individual dan membentuk grup peer support di sekolah", "Menyarankan pindah ke sekolah swasta demi suasana baru", "Mengawasi ketat semua interaksi siswa oleh CCTV", "Mengganti seluruh jajaran guru BK dan kepsek"],
        correct: 0,
        time: 25
    },
];

// Variabel State
let currentQuestion = 0;
let score = 0;
let timeLeft;
let timerId;
let participantData = {};

const elements = {
    landingPage: document.getElementById('landingPage'),
    quizContainer: document.getElementById('quizContainer'),
    questionEl: document.getElementById('question'),
    optionsEl: document.getElementById('options'),
    timerEl: document.getElementById('timer'),
    scoreEl: document.getElementById('currentScore'),
    nextBtn: document.getElementById('nextBtn'),
    progressEl: document.getElementById('progress'),
    finalScoreEl: document.getElementById('finalScore'),
    startForm: document.getElementById('startForm'),
    resultContainer: document.getElementById('resultContainer') // Tambahkan ini
};

// Tambahkan fungsi submitResult
function submitResult() {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzUh3HpBQG6NwoapSd7C7qIJXQvBKskgKAWgKRJxHTtdYTvXUb6hAfm9rNrft2vLcGQ/exec";
  
  const payload = {
    name: participantData.name,
    group: participantData.group,
    score: score,
    timestamp: new Date().toISOString()
  };

  fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload)
  })
  .catch(error => console.error('Error:', error));
}

elements.nextBtn.addEventListener('click', nextQuestion);

// Perbaikan Event Listener
elements.startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    participantData = {
        name: document.getElementById('inputName').value,
        group: document.getElementById('inputGroup').value
    };
    
    if(!participantData.name || !participantData.group) {
        alert('Isi nama dan kelompok!');
        return;
    }
    
    elements.landingPage.style.display = 'none';
    elements.quizContainer.style.display = 'block';
    loadQuestion(); // Panggil fungsi loadQuestion
    startTimer(); // Mulai timer
});

// Initialize Quiz
function startQuiz() {
    landingPage.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    startTimer();
}

// Perbaikan Fungsi loadQuestion()
function loadQuestion() {
    const q = questions[currentQuestion];
    elements.questionEl.textContent = q.question;
    elements.optionsEl.innerHTML = ''; // Reset opsi    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        elements.optionsEl.appendChild(button);
    });


// Update progress
    const progressWidth = ((currentQuestion + 1) / questions.length) * 100;
    elements.progressEl.style.width = `${progressWidth}%`;
    
    // Update timer dan score
    timeLeft = q.time;
    elements.timerEl.textContent = timeLeft.toString().padStart(2, '0');
    elements.scoreEl.textContent = score;
    elements.nextBtn.disabled = true;
}

function selectAnswer(selectedIndex) {
    const options = document.querySelectorAll('.option-btn');
    const q = questions[currentQuestion];
    
    // Nonaktifkan semua opsi
    options.forEach(option => {
        option.classList.add('disabled');
        option.removeEventListener('click', selectAnswer)
    });
    
    // Tandai jawaban yang dipilih
    options[selectedIndex].classList.add('selected');
    
    // Cek jawaban benar/salah
    if(selectedIndex === q.correct) {
        score++;
        elements.scoreEl.textContent = score;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('wrong');
    }
    
    elements.nextBtn.disabled = false;
    clearInterval(timerId);
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        elements.timerEl.textContent = timeLeft.toString().padStart(2, '0');
        
        if(timeLeft <= 0) {
            clearInterval(timerId);
            nextQuestion();
        }
    }, 1000);
}

// ... (fungsi timer dan nextQuestion tetap sama) ...
// Tambahkan fungsi ini


function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        loadQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    elements.quizContainer.style.display = 'none';
    elements.resultContainer.style.display = 'block';
    elements.finalScoreEl.textContent = `${score}/${questions.length}`;
    
    // Submit hasil ke Google Sheets
    submitResult();
}

// Reset quiz jika ingin memainkan lagi
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    landingPage.style.display = 'block';
}

// ... (fungsi submitResult dan resetQuiz tetap sama) 

// Blok klik kanan dan shortcut keyboard
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  // Blok Ctrl+C/Ctrl+V/Ctrl+A
  if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
    e.preventDefault();
  }
  
  // Blok F12 (Developer Tools)
  if (e.key === 'F12') {
    e.preventDefault();
  }
});

// Blok seleksi teks via JavaScript
document.onselectstart = function() {
  return false;
};

document.addEventListener('copy', function(e) {
  document.getElementById('copy-warning').style.display = 'block';
  setTimeout(() => {
    document.getElementById('copy-warning').style.display = 'none';
  }, 2000);
  e.preventDefault();
});