history.scrollRestoration = "manual";

window.onload = () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
};


// ==========================
// Таймер отношений
// ==========================

const startDate = new Date("2026-02-13T00:00:00");

function updateTimer() {
    const diff = Math.max(0, new Date() - startDate);

    document.getElementById("days").textContent = Math.floor(diff / 86400000);
    document.getElementById("hours").textContent = Math.floor(diff / 3600000) % 24;
    document.getElementById("minutes").textContent = Math.floor(diff / 60000) % 60;
}

updateTimer();
setInterval(updateTimer, 60000);


// ==========================
// Открытие страницы
// ==========================

document.getElementById("open").onclick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
};


// ==========================
// Квест
// ==========================

const game = document.getElementById("game");
const overlay = document.getElementById("overlay");

document.getElementById("letterButton").onclick = () => {
    game.classList.add("show");
    overlay.classList.add("active");
};

overlay.onclick = () => {
    game.classList.remove("show");
    overlay.classList.remove("active");
};


// ==========================
// Вопросы
// ==========================

let currentQuestion = 1;
let locked = false;

function answer(e, correct) {
    if (locked) return;

    const button = e.currentTarget;

    if (correct) {
        locked = true;
        button.classList.add("correct");

        setTimeout(() => {
            document.getElementById("q" + currentQuestion).classList.remove("active");
            currentQuestion++;
            locked = false;

            if (currentQuestion <= 3) {
                document.getElementById("q" + currentQuestion).classList.add("active");
                document.getElementById("progress").textContent =
                    "Этап " + currentQuestion + "/5";
            } else {
                startHeartGame();
            }
        }, 500);
    } else {
        button.classList.add("wrong");
        setTimeout(() => button.classList.remove("wrong"), 350);
    }
}


// ==========================
// Сердечки
// ==========================

let hearts = 0;

function startHeartGame() {
    document.getElementById("heartGame").classList.add("active");
    document.getElementById("progress").textContent = "Этап 4/5";
    spawnHeart();
}

function spawnHeart() {
    if (hearts >= 10) {
        document.getElementById("heartGame").classList.remove("active");
        document.getElementById("dateGame").classList.add("active");
        document.getElementById("progress").textContent = "Этап 5/5";
        return;
    }

    const heart = document.createElement("div");
    heart.className = "gameHeart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 80 + "%";
    heart.style.top = Math.random() * 80 + "%";

    heart.onclick = () => {
        hearts++;
        document.getElementById("heartCounter").textContent = hearts + " / 10";
        heart.remove();
        spawnHeart();
    };

    document.getElementById("heartArea").appendChild(heart);
}


// ==========================
// Дата
// ==========================

document.getElementById("dateInput").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "").slice(0, 8);

    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);

    this.value = value;
});

function checkDate() {
    const date = document.getElementById("dateInput").value;

    if (date === "13/02/2026") {
        game.classList.remove("show");
        overlay.classList.remove("active");
        document.getElementById("letter").classList.add("open");
    } else {
        alert("Почти ❤️ Вспомни нашу дату");
    }
}


// ==========================
// Закрытие письма
// ==========================

document.getElementById("closeLetter").onclick = () => {
    document.getElementById("letter").classList.remove("open");
};


// ==========================
// Фото
// ==========================

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

document.querySelectorAll(".photo").forEach(photo => {
    photo.onclick = () => {
        viewerImg.src = photo.querySelector("img").src;
        viewer.classList.add("active");
    };
});

document.getElementById("close").onclick = () => {
    viewer.classList.remove("active");
};

viewer.onclick = (e) => {
    if (e.target === viewer) viewer.classList.remove("active");
};


// ==========================
// Анимации плиток
// ==========================

const reveals = document.querySelectorAll(".reveal");

function reveal() {
    reveals.forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight - 100) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();


// ==========================
// Фоновые сердечки
// ==========================

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    heart.style.animationDuration = Math.random() * 8 + 10 + "s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 20000);
}

setInterval(createHeart, 800);
