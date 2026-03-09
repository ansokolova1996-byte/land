(() => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function launchConfetti(container) {
    if (!container) return;

    const piecesCount = prefersReducedMotion ? 40 : 90;
    const baseDuration = prefersReducedMotion ? 2200 : 3200;
    const colors = ["#ffec99", "#ff99e5", "#9ae6ff", "#c4b5ff", "#ffd4a3"];

    for (let i = 0; i < piecesCount; i += 1) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";

      const left = Math.random() * 100;
      const delay = Math.random() * 0.9;
      const fallDuration = baseDuration / 1000 + Math.random() * 0.8;
      const rotate = Math.random() * 360;

      piece.style.left = `${left}vw`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = `${fallDuration}s`;
      piece.style.animationDelay = `${delay}s`;
      piece.style.transform = `translate3d(0, -110%, 0) rotateZ(${rotate}deg)`;

      container.appendChild(piece);

      const totalLifetime = (delay + fallDuration) * 1000 + 500;
      window.setTimeout(() => {
        piece.remove();
      }, totalLifetime);
    }
  }

  function initInteractiveCards(cards) {
    const toggleCard = (card) => {
      card.classList.toggle("opened");
    };

    cards.forEach((card) => {
      card.addEventListener("click", () => toggleCard(card));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCard(card);
        }
      });
    });
  }

  function initMusicControls(button, audio) {
    let isPlaying = false;

    const updateUI = () => {
      button.textContent = isPlaying ? "Поставить на паузу" : "Включить мелодию";
      button.setAttribute("aria-pressed", String(isPlaying));
    };

    updateUI();

    button.addEventListener("click", async () => {
      if (!isPlaying) {
        try {
          await audio.play();
          isPlaying = true;
        } catch (error) {
          console.error("Не удалось воспроизвести аудио:", error);
        }
      } else {
        audio.pause();
        isPlaying = false;
      }

      updateUI();
      button.blur();
    });

    audio.addEventListener("ended", () => {
      isPlaying = false;
      updateUI();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const wishesSection = document.getElementById("wishesSection");
    const confettiContainer = document.getElementById("confettiContainer");
    const wishCards = document.querySelectorAll(".wish-card");
    const musicButton = document.getElementById("musicToggle");
    const audio = document.getElementById("birthdayAudio");

    if (startButton && wishesSection && confettiContainer) {
      let hasStarted = false;

      startButton.addEventListener("click", () => {
        if (!hasStarted) {
          wishesSection.classList.remove("wishes--hidden");
          wishesSection.classList.add("wishes--visible");
          hasStarted = true;
          startButton.textContent = "Ещё праздника!";
        }

        launchConfetti(confettiContainer);
        startButton.blur();
      });
    }

    if (wishCards.length) {
      initInteractiveCards(wishCards);
    }

    if (musicButton && audio) {
      initMusicControls(musicButton, audio);
    }
  });
})();

