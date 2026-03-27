// postload.js

const folders = document.querySelectorAll('.folder');
const header  = document.getElementById('content-header-bar');
const header2  = document.getElementById('content-header-bar2');
const body    = document.getElementById('content-body');
const headerItems = document.querySelectorAll('.header-item');

import * as config from "./config.js";

function calculateVLength(folder) {
  const activeHeader = document.querySelector('.header-item.active');
  if (!activeHeader) return 0;

  const headerTop   = activeHeader.getBoundingClientRect().top + activeHeader.offsetHeight / 2;
  const folderMid   = folder.getBoundingClientRect().top + folder.offsetHeight / 2;

  return folderMid - headerTop + 3;
}

function calculateInactiveVLength(folder) {
  const inactiveHeader = document.querySelector('.header-item:not(.active)');
  if (!inactiveHeader) return 0;

  const headerTop   = inactiveHeader.getBoundingClientRect().top + inactiveHeader.offsetHeight / 2;
  const folderMid   = folder.getBoundingClientRect().top + folder.offsetHeight / 2;

  return folderMid - headerTop + 3;
}

function activateFolder(folder) {
  headerItems.forEach(h => {
    h.classList.remove('active');
  });
  //const h1 = document.getElementById('content-header-bar');
  header.classList.add('active');

  folders.forEach(f => {
    f.classList.remove('active');
    f.style.removeProperty('--v-length');
    f.style.removeProperty('--iv-length');
  });
  folder.classList.add('active');
  folder.style.setProperty('--v-length', `${calculateVLength(folder)}px`);
  folder.style.setProperty('--iv-length', `${calculateInactiveVLength(folder)}px`);
  

  body.style.padding  = '4vh 2vw 2vh 2vw';
  body.style.flex     = '';
  body.style.position = '';

  const title_object = folder.querySelector('.folder-text');
  const title = folder.querySelector('.folder-text').textContent;
  if (title === 'f1' || title === config.personal_folder_title) {
    title_object.textContent = config.personal_folder_title;
    header.textContent = config.personal1_title;
    header2.textContent = config.personal2_title;
    body.innerHTML = config.personal1_body;
  }
  else if (title === 'f2' || title === config.shared_folder_title) {
    title_object.textContent = config.shared_folder_title;
    header.textContent = config.shared1_title;
    header2.textContent = config.shared2_title;
    body.innerHTML = config.shared1_body;
  }
  else if (title === 'f3' || title === config.notes_folder_title) {
  title_object.textContent = config.notes_folder_title;
  header.textContent = config.notes1_title;
  header2.textContent = config.notes2_title;
  body.innerHTML = config.notes1_body;
  }
  else if (title === 'f4' || title === config.utility_folder_title) {
    title_object.textContent = config.utility_folder_title;
    header.textContent = config.utility1_title;
    header2.textContent = config.utility2_title;
    body.innerHTML = config.utility1_body;
    body.style.padding  = '0';
    body.style.flex     = '1';
    body.style.position = 'relative';
    startPong();
  }
  else {
    header.textContent = title;
    body.innerHTML = `<p>Loading...</p>`;
  }
  
  headerItems.forEach(item => {
    const text = item.textContent.trim();
    if (!text) {
      item.classList.add('empty');
    }
    else {
      item.classList.remove('empty');
    }
  });
}

function recalculateActiveLine() {
  const active = document.querySelector('.folder.active');
  if (!active) return;
  active.style.setProperty('--v-length', `${calculateVLength(active)}px`);
}
function recalculateInactiveLine() {
  const active = document.querySelector('.folder.active');
  if (!active) return;
  active.style.setProperty('--iv-length', `${calculateInactiveVLength(active)}px`);
}

// preemptively replace folder titles
folders.forEach(f => {
     const title = f.querySelector('.folder-text').textContent;
     const title_object = f.querySelector('.folder-text');
     if (title === 'f1' || title === config.personal_folder_title) {
       title_object.textContent = config.personal_folder_title;
     }
     else if (title === 'f2' || title === config.shared_folder_title) {
       title_object.textContent = config.shared_folder_title;
     }
     else if (title === 'f3' || title === config.notes_folder_title) {
       title_object.textContent = config.notes_folder_title;
     }
     else if (title === 'f4' || title === config.utility_folder_title) {
       title_object.textContent = config.utility_folder_title;
     }
});

folders.forEach(f => f.addEventListener('click', () => activateFolder(f)));
window.addEventListener('resize', recalculateActiveLine);
document.addEventListener('fullscreenchange', recalculateActiveLine);
window.addEventListener('resize', recalculateInactiveLine);
document.addEventListener('fullscreenchange', recalculateInactiveLine);

const top_bar = document.querySelector('.top-bar-text')
top_bar.innerHTML = config.top_bar_content

/////////// added secondary entry

function activateHeader(item) {
  const title = item.textContent;
  if (!title) return;
  headerItems.forEach(h => h.classList.remove('active'));
  item.classList.add('active');


  if (title === config.personal1_title) {
    body.innerHTML = config.personal1_body;
  }
  else if (title === config.personal2_title) {
    body.innerHTML = config.personal2_body;
  } 
  else if (title === config.shared1_title) {
    body.innerHTML = config.shared1_body;
  } 
  else if (title === config.shared2_title) {
    body.innerHTML = config.shared2_body;
  } 
  else if (title === config.notes1_title) {
    body.innerHTML = config.notes1_body;
  } 
  else if (title === config.notes2_title) {
    body.innerHTML = config.notes2_body;
  } 
  else if (title === config.utility1_title) {
    body.innerHTML = config.utility1_body;
    body.style.padding  = '0';
    body.style.flex     = '1';
    body.style.position = 'relative';
    startPong();
  } 
  else if (title === config.utility2_title) {
    body.innerHTML = config.utility2_body;
    body.style.padding  = '4vh 2vw 2vh 2vw';
    body.style.flex     = '';
    body.style.position = '';
  } 
  else {
    body.innerHTML = `<p>Loading...</p>`;
  }
}

headerItems.forEach(item => {
  item.addEventListener('click', () => activateHeader(item));
  item.addEventListener('click', () => recalculateActiveLine()); 
  item.addEventListener('click', () => recalculateInactiveLine());
});
//////////

const defaultActive = document.querySelector('.folder.active');
if (defaultActive) activateFolder(defaultActive);


// --- PONG GAME ---
function startPong() {
  const canvas = document.getElementById("pongCanvas");
  if (!canvas) return;

  const parent = canvas.parentElement; 
  canvas.style.position = 'absolute';
  canvas.style.top      = '0';
  canvas.style.left     = '0';
  canvas.width  = parent.clientWidth;
  canvas.height = parent.clientHeight;

  const ctx      = canvas.getContext("2d");
  const ballSize = 10;

  // base speeds
  const baseBallVX = 6;
  const baseBallVY = 5;
  const serveSpeedFactor = 0.5;  


  let playerY = canvas.height / 2 - 30;
  let cpuY    = canvas.height / 2 - 30;


  let ballX  = canvas.width  / 2;
  let ballY  = canvas.height / 2;

  let ballVX = baseBallVX * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);
  let ballVY = baseBallVY * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);

  let serving = true;  


  let upPressed   = false;
  let downPressed = false;
  const playerSpeed = 4;     


  const cpuSpeed    = 5;   
  const reactionPct = 2;  


  let playerScore = 0;
  let cpuScore    = 0;


  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp")   upPressed   = true;
    if (e.key === "ArrowDown") downPressed = true;
  });
  document.addEventListener("keyup", e => {
    if (e.key === "ArrowUp")   upPressed   = false;
    if (e.key === "ArrowDown") downPressed = false;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#05b669";
    ctx.fillRect((canvas.width / 2) - 2, 0, 4, canvas.height);


    ctx.fillStyle    = "#054B1C";
    ctx.textBaseline = "top";
    const fontSize   = Math.floor(canvas.height * 0.05);
    ctx.font         = `${fontSize}px Sevastolink`;

    ctx.textAlign = "left";
    ctx.fillText(`PLAYER: ${playerScore}`, 10, 10);

    ctx.textAlign = "right";
    ctx.fillText(`CPU: ${cpuScore}`, canvas.width - 10, 10);


    ctx.fillStyle = "#05b669";
    ctx.fillRect(10, playerY, 10, 60);
    ctx.fillRect(canvas.width - 20, cpuY, 10, 60);
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
  }

  function resetBall(loserIsPlayer) {
    if (loserIsPlayer) cpuScore++;
    else               playerScore++;

    ballX  = canvas.width  / 2;
    ballY  = canvas.height / 2;

    ballVX = baseBallVX * serveSpeedFactor * (loserIsPlayer ? -1 : 1);
    ballVY = baseBallVY * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);
    serving = true;
  }

  function update() {

    if (upPressed)   playerY -= playerSpeed;
    if (downPressed) playerY += playerSpeed;
    playerY = Math.max(0, Math.min(canvas.height - 60, playerY));


    ballX += ballVX;
    ballY += ballVY;


    if (ballY <= 0) {
      ballY  = 0;
      ballVY *= -1;
    } else if (ballY >= canvas.height - ballSize) {
      ballY  = canvas.height - ballSize;
      ballVY *= -1;
    }


    if (ballX <= 20 && ballY + ballSize >= playerY && ballY <= playerY + 60) {
      ballX  = 20;
      ballVX *= -1;
      if (serving) {

        ballVX = Math.sign(ballVX) * baseBallVX;
        ballVY = Math.sign(ballVY) * baseBallVY;
        serving = false;
      }
    }


    if (ballVX > 0 && Math.random() < reactionPct) {
      let targetY = ballY - 30 + (Math.random() - 0.5) * 20;
      if (cpuY + 30 < targetY)      cpuY += cpuSpeed;
      else if (cpuY + 30 > targetY) cpuY -= cpuSpeed;
    } else if (ballVX <= 0) {

      const centerY = canvas.height / 2;
      if (cpuY + 30 < centerY) cpuY += cpuSpeed / 2;
      else if (cpuY + 30 > centerY) cpuY -= cpuSpeed / 2;
    }
    cpuY = Math.max(0, Math.min(canvas.height - 60, cpuY));


    if (ballX + ballSize >= canvas.width - 20 && ballY + ballSize >= cpuY && ballY <= cpuY + 60) {
      ballX  = canvas.width - 20 - ballSize;
      ballVX *= -1;
      if (serving) {
        ballVX = Math.sign(ballVX) * baseBallVX;
        ballVY = Math.sign(ballVY) * baseBallVY;
        serving = false;
      }
    }


    if (ballX < 0)         resetBall(true);
    else if (ballX > canvas.width) resetBall(false);
  }

  (function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  })();
}
