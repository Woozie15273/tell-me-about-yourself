function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6W5onNWuAlL":
        Script1();
        break;
  }
}

function Script1()
{
  const char = document.querySelector('[data-model-id="6PUn0JFZLgl"]');

const h5Logo = document.querySelector('[data-model-id="6pmy8fdKgU0"]');
const jsLogo = document.querySelector('[data-model-id="6OUZa31iwzD"]');
const msLogo = document.querySelector('[data-model-id="6ZaPP40Q0dX"]');
const biLogo = document.querySelector('[data-model-id="5Yqy4rlxoCi"]');
const pyLogo = document.querySelector('[data-model-id="6hDVafJShvU"]');
const artLogo = document.querySelector('[data-model-id="6W6X4dRVBcG"]'); 

if (char) {
    char.style.position = 'relative';
}

let arrowKeyPressed = null;
let stepUpDown = 100; 
let stepLeftRight = 25;
let moveInterval = null;

const boundaryWidth = 640;
const boundaryHeight = 360;
const charWidth = 40; 
const charHeight = 59; 

const checkOutOfBounds = () => {
    let currentTop = parseInt(window.getComputedStyle(char).top) || 0;
    let currentLeft = parseInt(window.getComputedStyle(char).left) || 0;

    if (currentTop < 0) {
        char.style.top = '0px';
    } else if (currentTop > boundaryHeight - charHeight) {
        char.style.top = `${boundaryHeight - charHeight}px`;
    }

    if (currentLeft < 0 || currentLeft > boundaryWidth - charWidth) {
        GetPlayer().SetVar('ifOOB', true);
        setTimeout(() => {
            GetPlayer().SetVar('ifOOB', false);
        }, 500);
    }
}

const checkCollision = () => {
    const charRect = char.getBoundingClientRect();
    const h5Rect = h5Logo.getBoundingClientRect();
    const jsRect = jsLogo.getBoundingClientRect();
    const msRect = msLogo.getBoundingClientRect();
    const biRect = biLogo.getBoundingClientRect();
    const pyRect = pyLogo.getBoundingClientRect();
    const artRect = artLogo.getBoundingClientRect();

    if (charRect.left < h5Rect.right && charRect.right > h5Rect.left && charRect.top < h5Rect.bottom && charRect.bottom > h5Rect.top) {
        GetPlayer().SetVar("ifH5", true);
    }
    if (charRect.left < jsRect.right && charRect.right > jsRect.left && charRect.top < jsRect.bottom && charRect.bottom > jsRect.top) {
        GetPlayer().SetVar("ifJS", true);
    }
    if (charRect.left < msRect.right && charRect.right > msRect.left && charRect.top < msRect.bottom && charRect.bottom > msRect.top) {
        GetPlayer().SetVar("if365", true);
    }
    if (charRect.left < biRect.right && charRect.right > biRect.left && charRect.top < biRect.bottom && charRect.bottom > biRect.top) {
        GetPlayer().SetVar("ifPowerBI", true);
    }
    if (charRect.left < pyRect.right && charRect.right > pyRect.left && charRect.top < pyRect.bottom && charRect.bottom > pyRect.top) {
        GetPlayer().SetVar("ifPY", true);
    }
    if (charRect.left < artRect.right && charRect.right > artRect.left && charRect.top < artRect.bottom && charRect.bottom > artRect.top) {
        GetPlayer().SetVar("ifArticulate", true);
    }
}

document.addEventListener('keydown', e => {
    if (!arrowKeyPressed && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        GetPlayer().SetVar(`if${e.key}`, true);
        arrowKeyPressed = e.key;

        let currentTop = parseInt(window.getComputedStyle(char).top) || 0;
        let currentLeft = parseInt(window.getComputedStyle(char).left) || 0;

        switch (e.key) {
            case 'ArrowUp':
                char.style.top = `${Math.max(currentTop - stepUpDown, 0)}px`;
                checkOutOfBounds();
                checkCollision();
                break;
            case 'ArrowDown':
                char.style.top = `${Math.min(currentTop + stepUpDown, boundaryHeight - charHeight)}px`;
                checkOutOfBounds();
                checkCollision();
                break;
            case 'ArrowLeft':
                moveInterval = setInterval(() => {
                    currentLeft = parseInt(window.getComputedStyle(char).left) || 0;
                    char.style.left = `${(currentLeft - stepLeftRight + boundaryWidth) % boundaryWidth}px`;
                    checkOutOfBounds();
                    checkCollision();
                }, 100);
                break;
            case 'ArrowRight':
                moveInterval = setInterval(() => {
                    currentLeft = parseInt(window.getComputedStyle(char).left) || 0;
                    char.style.left = `${(currentLeft + stepLeftRight) % boundaryWidth}px`;
                    checkOutOfBounds();
                    checkCollision();
                }, 100);
                break;
        }
    }
});

document.addEventListener('keyup', e => {
    if (arrowKeyPressed === e.key) {
        GetPlayer().SetVar(`if${e.key}`, false);
        arrowKeyPressed = null;
        clearInterval(moveInterval);
    }
});
}

