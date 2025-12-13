// oneko.js - A cat that follows your cursor (with drag & drop!)
// Optimized for smooth 60 FPS animation
(function () {
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

  // Animation timing for smooth 60 FPS
  let lastFrameTime = 0;
  const frameInterval = 100; // Sprite change interval (ms)
  let animationId = null;

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
    nekoEl.style.left = "0";
    nekoEl.style.top = "0";
    nekoEl.style.transform = `translate(${nekoPosX - 16}px, ${nekoPosY - 16}px)`;
    nekoEl.style.willChange = "transform, background-position";
    nekoEl.style.zIndex = "999999";
    nekoEl.style.cursor = "grab";
    nekoEl.style.transition = "none";

    document.body.appendChild(nekoEl);

    // Velocity smoothing for accurate throw detection
    let velocityHistory = [];
    const velocityHistorySize = 5;

    // Mouse move event
    document.addEventListener("mousemove", function (event) {
      if (isDragging) {
        const currentX = event.clientX;
        const currentY = event.clientY;

        // Calculate instantaneous velocity
        const instantVelX = currentX - lastMouseX;
        const instantVelY = currentY - lastMouseY;

        // Store velocity history for smoothing
        velocityHistory.push({ x: instantVelX, y: instantVelY, time: performance.now() });
        if (velocityHistory.length > velocityHistorySize) {
          velocityHistory.shift();
        }

        nekoPosX = currentX - dragOffsetX;
        nekoPosY = currentY - dragOffsetY;

        nekoEl.style.transform = `translate(${nekoPosX - 16}px, ${nekoPosY - 16}px)`;

        lastMouseX = currentX;
        lastMouseY = currentY;

        setSprite("alert", 0);
      } else {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      }
    });

    // Mouse down on cat
    nekoEl.addEventListener("mousedown", function (event) {
      isDragging = true;
      isThrown = false;
      velocityHistory = [];
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
    document.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        nekoEl.style.cursor = "grab";

        // Calculate smoothed velocity from recent history
        if (velocityHistory.length > 0) {
          const recentVelocities = velocityHistory.slice(-3); // Use last 3 samples
          velocityX = recentVelocities.reduce((sum, v) => sum + v.x, 0) / recentVelocities.length;
          velocityY = recentVelocities.reduce((sum, v) => sum + v.y, 0) / recentVelocities.length;

          // Amplify velocity for better throw feel
          velocityX *= 1.5;
          velocityY *= 1.5;
        }

        // If thrown with enough velocity, apply physics
        if (Math.abs(velocityX) > 2 || Math.abs(velocityY) > 2) {
          isThrown = true;
          applyThrowPhysics();
        }
      }
    });

    // Start the smooth animation loop
    lastFrameTime = performance.now();
    animationLoop();
  }

  function animationLoop(currentTime) {
    animationId = requestAnimationFrame(animationLoop);

    // Only update sprite animation at the desired frame rate
    if (currentTime - lastFrameTime >= frameInterval) {
      frame();
      lastFrameTime = currentTime - ((currentTime - lastFrameTime) % frameInterval);
    }
  }

  function applyThrowPhysics() {
    const friction = 0.96; // Slightly less friction for smoother deceleration
    const minVelocity = 0.3; // Lower threshold for smoother stop
    const bounceMultiplier = 0.6; // Better bounce feel
    let throwFrameCount = 0;
    let lastThrowTime = performance.now();

    function throwFrame(currentTime) {
      if (!isThrown) return;

      // Calculate delta time for consistent physics
      const deltaTime = Math.min((currentTime - lastThrowTime) / 16.67, 2); // Normalize to 60fps, cap at 2x
      lastThrowTime = currentTime;

      // Apply friction with delta time
      const frictionFactor = Math.pow(friction, deltaTime);
      velocityX *= frictionFactor;
      velocityY *= frictionFactor;

      // Update position
      nekoPosX += velocityX * deltaTime;
      nekoPosY += velocityY * deltaTime;

      // Determine direction based on velocity for sprite (FIXED: correct E/W mapping)
      const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      if (speed > 0.5) {
        let direction = "";
        if (velocityY < -0.4 * speed) direction += "N";
        if (velocityY > 0.4 * speed) direction += "S";
        if (velocityX > 0.4 * speed) direction += "E";  // Moving right = facing East
        if (velocityX < -0.4 * speed) direction += "W"; // Moving left = facing West

        if (direction && spriteSets[direction]) {
          setSprite(direction, throwFrameCount);
        } else {
          setSprite("alert", 0);
        }
        throwFrameCount++;
      }

      // Bounce off edges with improved physics
      let bounced = false;
      if (nekoPosX < 16) {
        nekoPosX = 16;
        velocityX = Math.abs(velocityX) * bounceMultiplier;
        bounced = true;
      }
      if (nekoPosX > window.innerWidth - 16) {
        nekoPosX = window.innerWidth - 16;
        velocityX = -Math.abs(velocityX) * bounceMultiplier;
        bounced = true;
      }
      if (nekoPosY < 16) {
        nekoPosY = 16;
        velocityY = Math.abs(velocityY) * bounceMultiplier;
        bounced = true;
      }
      if (nekoPosY > window.innerHeight - 16) {
        nekoPosY = window.innerHeight - 16;
        velocityY = -Math.abs(velocityY) * bounceMultiplier;
        bounced = true;
      }

      // Show alert sprite briefly on bounce
      if (bounced && speed > 2) {
        setSprite("alert", 0);
      }

      nekoEl.style.transform = `translate(${nekoPosX - 16}px, ${nekoPosY - 16}px)`;

      // Stop when velocity is low enough
      const totalSpeed = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      if (totalSpeed < minVelocity) {
        isThrown = false;
        velocityX = 0;
        velocityY = 0;
        idleTime = 0;
        setSprite("idle", 0);
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

    nekoEl.style.transform = `translate(${nekoPosX - 16}px, ${nekoPosY - 16}px)`;
  }

  create();
})();
