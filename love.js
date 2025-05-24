const startBtn = document.getElementById("startBtn");
const backgroundMusic = document.getElementById("backgroundMusic");
const loading = document.getElementById("loading");
const pageLoading = document.getElementById("pageLoading");
const pageTitle = document.getElementById("pageTitle");
const quizForm = document.getElementById("quizForm");
const questions = document.querySelectorAll(".question");
const submitBtn = document.getElementById("submitBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const giftBox = document.getElementById("giftBox");
const flipCardsContainer = document.getElementById("flipCardsContainer");
const endBtn = document.getElementById("endBtn");

const answers = {
  q1: "Sinigang",
  q2: "Watching",
  q3: "R&B",
  q4: "Relax",
  q5: "Coffee",
  q6: "Heights",
  q7: "Sleep",
  q8: "Beach",
  q9: "Business",
  q10: "Bali"
};

const flipCardsData = [

  { img: "images/IMG_20240722_223642_480.jpg", message: "Hi love, tagal diba? ito lang ginawa ko buong hapon🎶🤣 HAHHAHA!" },
  { img: "images/IMG_20240921_185615_311.webp", message: "Uy, sobra ka naman excited! 😳 Matulog ka na, ha? 😴 Bes love cares! ❤️" },
  { img: "images/IMG_20240927_184607_814.jpg", message: "Perfect scores, wow! 🏆 Kung hindi ka perfect, edi wala ka dito, lol bleh 😝" },
  { img: "images/IMG_20241030_144844_493.jpg", message: "Panis ka nanaman sa akin! 😜🔥" },
  { img: "images/IMG_20250117_191904_475.jpg", message: "Love kita kahit maamoy ka na! 💩 Maliligo ka kasi HAHAHA 🚿😂" },
  { img: "images/IMG_20250304_205052_400.jpg", message: "Kay Lord ako takot 🙏... pero kay’yo? Hindi naman, ‘di ba? BLEH 😈" },
  { img: "images/IMG_20250313_134419_121.jpg", message: "I love you with space 🫶 — para walang makasingit 💘 Iloveyou lang, promise!" },
  { img: "images/IMG_20250322_184257_103.jpg", message: "Next time na lang yung iba 🤭 short time lang e 🕐 pero love kita sobra! 💖" },
  { img: "images/IMG_20240822_175851_772.jpg", message: "Tandaan mo, kahit gaano kahirap, kaya natin ‘to together, bes! 💪💑" },
  { img: "images/IMG_20240822_175934_403.jpg", message: "Hwag ka na ma stress mag sasamgy tayo, ikaw mag babayad☀️❤️" },
  { img: "images/IMG_20241108_203243_134.jpg", message: "Keep pushing 🚀 kahit madami challenges, ako lagi nandito para sa’yo 💗" },
  { img: "images/IMG_20250304_205052_400.jpg", message: "Huwag susuko, love! 💪 Kaya nating lampasan lahat ng ito 🫂✨" },
  { img: "images/IMG_20250313_134419_121.jpg", message: "Gusto ko lang sabihin, proud ako sayo kahit maacm ka— never forget that 💫❤️" },
  { img: "images/IMG_20250322_183400_092.jpg", message: "okay" },
  { 
  img: "images/Messenger_creation_2A788DF0-4FD6-422E-9084-11CD5178B97D.jpeg", 
  message: "Anong sinabi ng lalaki sa babae habang kumakain ng spaghetti? 🍝\n– Wag kang mawala ha, ikaw ang sauce ng buhay ko. HAHAHHA SOWS BLEH😘🥰" },
  { img: "images/Messenger_creation_6e0a5229-b00b-4c50-b136-dcb25ca1d09d.jpeg", 
  message: `"Sino problema ko araw-araw?"\n– "Ikaw pa rin. Pero okay lang… gusto ko ng problemang cute. 😏❤️"` },
  { img: "images/Messenger_creation_AC9384BC-66B1-44F2-9D1D-D0E62E93AEF1.jpeg", message: " Bakit Maacm ka kapag magkasama tayo, wala kaba pang ligo? 👫⚔️💖" },
  { img: "images/Messenger_creation_d49b06aa-154e-416c-8ede-b5dc9d9d306e.jpeg", message: "Laging tandaan, kahit anong mangyari, you got me always 💯💞" },
  { img: "images/received_1095052821747146.jpeg", message: "Dapat Marunong ka manuyo hindi puro pagalit ka sa akin  💐💖" }


];


let currentQuestion = 0;
let answeredCorrectly = {};

// Initial UI state
pageLoading.style.display = 'flex';
pageTitle.style.display = 'none';
startBtn.style.display = 'none';
quizForm.style.display = 'none';
submitBtn.style.display = 'none';
tryAgainBtn.style.display = 'none';
loading.style.display = 'none';
giftBox.style.display = 'none';
flipCardsContainer.style.display = 'none';
endBtn.style.display = 'none';

setTimeout(() => {
  pageLoading.style.display = 'none';
  pageTitle.style.display = 'block';
  startBtn.style.display = 'block';
}, 3000);


giftBox.addEventListener("click", () => {
  giftBox.style.display = "none";
  flipCardsContainer.style.display = "flex";
  flipCardsContainer.innerHTML = "";

  document.getElementById('cardsSection').style.display = 'block';


  flipCardsData.forEach(({ img, message }, index) => {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${img}" alt="Card Image">
        </div>
        <div class="flip-card-back">${message}</div>
      </div>
    `;
  card.style.animationDelay = `${index * 0.4}s`;

    card.addEventListener("click", () => card.classList.toggle("flipped"));
    flipCardsContainer.appendChild(card);
  });

  endBtn.style.display = "inline-block";
});

function showQuestion(index) {
  questions.forEach((q, i) => q.classList.toggle('active', i === index));
  submitBtn.style.display = 'none';
}

function setupAutoAdvance() {
  questions.forEach((q, i) => {
    const inputs = q.querySelectorAll("input[type='radio']");
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        const selected = q.querySelector("input[type='radio']:checked");
        if (!selected) return;

        const questionId = q.id;
        const userAnswer = selected.value;
        const correctAnswer = answers[questionId];

        if (userAnswer !== correctAnswer) {
          alert("Mali ang sagot mo, try again!");
          tryAgainBtn.style.display = "block";
          submitBtn.style.display = "none";
          answeredCorrectly[questionId] = false;
          return;
        } else {
          answeredCorrectly[questionId] = true;
        }

        if (i < questions.length - 1) {
          currentQuestion = i + 1;
          showQuestion(currentQuestion);
        }

        const allCorrect = Object.keys(answers).every(key => answeredCorrectly[key]);
        if (allCorrect) {
          submitBtn.style.display = "block";
          tryAgainBtn.style.display = "none";
        }
      });
    });
  });
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  backgroundMusic.play().catch(() => {});
  quizForm.style.display = 'block';
  currentQuestion = 0;
  answeredCorrectly = {};
  showQuestion(currentQuestion);
  tryAgainBtn.style.display = 'none';
  submitBtn.style.display = 'none';
  setupAutoAdvance();
});

submitBtn.addEventListener("click", () => {
  quizForm.style.display = "none";
  submitBtn.style.display = "none";
  loading.style.display = "block";

  setTimeout(() => {
    loading.style.display = "none";
    giftBox.style.display = "block";
    flipCardsContainer.style.display = "none";
  }, 2000);
});

tryAgainBtn.addEventListener("click", () => {
  currentQuestion = 0;
  answeredCorrectly = {};
  tryAgainBtn.style.display = "none";
  giftBox.style.display = "none";
  flipCardsContainer.style.display = "none";
  quizForm.style.display = "block";
  submitBtn.style.display = "none";

  quizForm.querySelectorAll("input[type='radio']").forEach(input => input.checked = false);
  showQuestion(currentQuestion);
});

endBtn.addEventListener("click", () => {
  loading.style.display = "flex";
  flipCardsContainer.style.display = "none";
  endBtn.style.display = "none";

  // Show the bye message after loading spinner
  setTimeout(() => {
    loading.style.display = "none";  // hide loading spinner
    document.getElementById("byeMessage").style.display = "block";  // show bye message
  }, 2000);

  // Redirect or close after showing the message for 2 seconds
  setTimeout(() => {
    window.location.href = "about:blank"; // or window.close();
  }, 4000);
});

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
