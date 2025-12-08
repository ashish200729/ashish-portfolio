// oneko.js - A cat that follows your cursor (with drag & drop!)
(function() {
  const nekoEl = document.createElement("div");
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  const nekoSpeed = 10;

  // Drag and drop variables
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let isThrown = false;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function create() {
    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.backgroundImage = "url('/oneko.gif')";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = "999999";
    nekoEl.style.cursor = "grab";

    document.body.appendChild(nekoEl);

    // Mouse move event
    document.addEventListener("mousemove", function(event) {
      if (isDragging) {
        const currentX = event.clientX;
        const currentY = event.clientY;

        velocityX = currentX - lastMouseX;
        velocityY = currentY - lastMouseY;

        nekoPosX = currentX - dragOffsetX;
        nekoPosY = currentY - dragOffsetY;

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;

        lastMouseX = currentX;
        lastMouseY = currentY;

        setSprite("alert", 0);
      } else {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      }
    });

    // Mouse down on cat
    nekoEl.addEventListener("mousedown", function(event) {
      isDragging = true;
      isThrown = false;
      nekoEl.style.cursor = "grabbing";

      const rect = nekoEl.getBoundingClientRect();
      dragOffsetX = event.clientX - rect.left - 16;
      dragOffsetY = event.clientY - rect.top - 16;

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      velocityX = 0;
      velocityY = 0;

      event.preventDefault();
    });

    // Mouse up - release cat
    document.addEventListener("mouseup", function() {
      if (isDragging) {
        isDragging = false;
        nekoEl.style.cursor = "grab";

        // If thrown with enough velocity, apply physics
        if (Math.abs(velocityX) > 2 || Math.abs(velocityY) > 2) {
          isThrown = true;
          applyThrowPhysics();
        }
      }
    });

    window.onekoInterval = setInterval(frame, 100);
  }

  function applyThrowPhysics() {
    const friction = 0.95;
    const minVelocity = 0.5;
    let throwFrameCount = 0;

    function throwFrame() {
      if (!isThrown) return;

      velocityX *= friction;
      velocityY *= friction;

      nekoPosX += velocityX;
      nekoPosY += velocityY;

      // Determine direction based on velocity for sprite
      const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      if (speed > 1) {
        let direction = "";
        if (velocityY < -0.5 * speed) direction += "N";
        if (velocityY > 0.5 * speed) direction += "S";
        if (velocityX < -0.5 * speed) direction += "E";
        if (velocityX > 0.5 * speed) direction += "W";

        if (direction) {
          setSprite(direction, throwFrameCount);
        } else {
          setSprite("alert", 0);
        }
        throwFrameCount++;
      }

      // Bounce off edges
      if (nekoPosX < 16) {
        nekoPosX = 16;
        velocityX = Math.abs(velocityX) * 0.5;
      }
      if (nekoPosX > window.innerWidth - 16) {
        nekoPosX = window.innerWidth - 16;
        velocityX = -Math.abs(velocityX) * 0.5;
      }
      if (nekoPosY < 16) {
        nekoPosY = 16;
        velocityY = Math.abs(velocityY) * 0.5;
      }
      if (nekoPosY > window.innerHeight - 16) {
        nekoPosY = window.innerHeight - 16;
        velocityY = -Math.abs(velocityY) * 0.5;
      }

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

      // Stop when velocity is low enough
      if (Math.abs(velocityX) < minVelocity && Math.abs(velocityY) < minVelocity) {
        isThrown = false;
        velocityX = 0;
        velocityY = 0;
        idleTime = 0;
      } else {
        requestAnimationFrame(throwFrame);
      }
    }

    requestAnimationFrame(throwFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation == null
    ) {
      let availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        availableIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        availableIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        availableIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        availableIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    // Don't update if being dragged or thrown
    if (isDragging || isThrown) {
      return;
    }

    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();
})();
