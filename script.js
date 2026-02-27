// --- 1. Boot Up & Security (Local Storage) ---
window.onload = function() {
    // Load Wallpaper
    const savedWallpaper = localStorage.getItem('os_wallpaper');
    if(savedWallpaper) document.getElementById('desktop').style.backgroundImage = `url('${savedWallpaper}')`;

    // Load Taskbar Apps
    const savedApps = JSON.parse(localStorage.getItem('os_installed_apps') || '[]');
    savedApps.forEach(app => {
        if(!document.getElementById('taskbar-' + app.id)) {
            restoreAppToTaskbar(app.id, app.icon, app.name);
        }
    });

    // Check Lock Screen
    const savedPassword = localStorage.getItem('os_password');
    if (savedPassword) {
        document.getElementById('lock-screen').style.display = 'flex';
    }
    
    // Make default apps draggable
    document.querySelectorAll('.app-icon').forEach(makeIconDraggable);
};

function unlockOS() {
    const input = document.getElementById('lock-password').value;
    const savedPassword = localStorage.getItem('os_password');
    if (input === savedPassword || input === localStorage.getItem('os_answer')) {
        document.getElementById('lock-screen').style.display = 'none';
    } else {
        document.getElementById('lock-error').style.display = 'block';
    }
}

function showSecurityQuestion() {
    const hintDiv = document.getElementById('security-hint');
    const qText = document.getElementById('lock-question-text');
    const savedQ = localStorage.getItem('os_question');
    if(savedQ) {
        qText.innerText = "Hint: " + savedQ;
        hintDiv.style.display = 'block';
    } else {
        qText.innerText = "No security question set.";
        hintDiv.style.display = 'block';
    }
}

function saveSecuritySettings() {
    const pass = document.getElementById('set-password').value;
    const q = document.getElementById('set-question').value;
    const a = document.getElementById('set-answer').value;
    
    if(pass) localStorage.setItem('os_password', pass);
    if(q) localStorage.setItem('os_question', q);
    if(a) localStorage.setItem('os_answer', a);
    
    const msg = document.getElementById('security-save-msg');
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 3000);
}

// --- 2. System Clock ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('clock').innerText = hours + ':' + minutes + ' ' + ampm;
}
setInterval(updateClock, 1000); updateClock();

// --- 3. Window & Menu Management ---
let highestZ = 10;

function toggleMenu() {
    const menu = document.getElementById('launcher-menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

function openApp(appId) {
    const appWindow = document.getElementById(appId);
    if(appWindow) {
        appWindow.style.display = 'flex';
        appWindow.classList.remove('minimized');
        bringToFront(appWindow);
        updateTaskbarIndicator(appId, true);
    }
    document.getElementById('launcher-menu').style.display = 'none';
}

function minimizeApp(appId) {
    document.getElementById(appId).classList.add('minimized');
    updateTaskbarIndicator(appId, false);
}

function closeApp(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'none';
    appWindow.classList.remove('minimized');
    updateTaskbarIndicator(appId, false);
    
    // Reset iframe to "restart" the app when opened again
    const iframe = appWindow.querySelector('iframe');
    if(iframe) {
        const src = iframe.src;
        iframe.src = ''; 
        setTimeout(() => iframe.src = src, 10);
    }
}

function toggleApp(appId) {
    const appWindow = document.getElementById(appId);
    if (appWindow.style.display === 'flex' && !appWindow.classList.contains('minimized')) {
        if (appWindow.style.zIndex == highestZ) minimizeApp(appId);
        else bringToFront(appWindow);
    } else {
        openApp(appId);
    }
}

function bringToFront(elmnt) {
    highestZ++;
    elmnt.style.zIndex = highestZ;
}

function updateTaskbarIndicator(appId, isActive) {
    const icon = document.querySelector(`button[onclick*="'${appId}'"]`);
    if(icon) {
        if(isActive) icon.classList.add('active');
        else icon.classList.remove('active');
    }
}

// Window Dragging & Snapping logic
const snapPreview = document.getElementById('snap-preview');
let currentSnap = null;

document.querySelectorAll('.window').forEach(win => {
    dragElement(win);
    win.addEventListener('mousedown', () => bringToFront(win));
});

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "-header");
    if (header) header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if(e.target.tagName === 'BUTTON') return; // Don't drag if clicking buttons
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        elmnt.classList.add('dragging');
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
        pos3 = e.clientX; pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        const threshold = 20; 
        if (e.clientX < threshold) {
            showPreview(0, 0, '50%', '100%'); currentSnap = 'left';
        } else if (e.clientX > window.innerWidth - threshold) {
            showPreview('50%', 0, '50%', '100%'); currentSnap = 'right';
        } else if (e.clientY < threshold) {
            showPreview(0, 0, '100%', '100%'); currentSnap = 'top';
        } else {
            snapPreview.style.display = 'none'; currentSnap = null;
        }
    }

    function showPreview(left, top, width, height) {
        snapPreview.style.display = 'block'; snapPreview.style.left = left;
        snapPreview.style.top = top; snapPreview.style.width = width; snapPreview.style.height = height;
    }

    function closeDragElement() {
        document.onmouseup = null; document.onmousemove = null;
        elmnt.classList.remove('dragging'); snapPreview.style.display = 'none';
        if (currentSnap === 'left') { elmnt.style.left = '0'; elmnt.style.top = '0'; elmnt.style.width = '50vw'; elmnt.style.height = '100vh'; } 
        else if (currentSnap === 'right') { elmnt.style.left = '50vw'; elmnt.style.top = '0'; elmnt.style.width = '50vw'; elmnt.style.height = '100vh'; } 
        else if (currentSnap === 'top') { elmnt.style.left = '0'; elmnt.style.top = '0'; elmnt.style.width = '100vw'; elmnt.style.height = '100vh'; }
        currentSnap = null;
    }
}

// --- 4. Browser Logic (History Navigation) ---
let chromeHistory = ["https://www.bing.com"];
let chromeIndex = 0;

function navigateChrome() {
    const inputUrl = document.getElementById('chrome-url').value;
    const iframe = document.getElementById('chrome-frame');
    let finalUrl = inputUrl.startsWith('http') ? inputUrl : 'https://' + inputUrl;
    
    // Trim history if we go back and then navigate somewhere new
    chromeHistory = chromeHistory.slice(0, chromeIndex + 1);
    chromeHistory.push(finalUrl);
    chromeIndex++;
    
    iframe.src = finalUrl; 
    document.getElementById('chrome-url').value = finalUrl;
}

function chromeBack() {
    if (chromeIndex > 0) {
        chromeIndex--;
        document.getElementById('chrome-frame').src = chromeHistory[chromeIndex];
        document.getElementById('chrome-url').value = chromeHistory[chromeIndex];
    }
}

function chromeForward() {
    if (chromeIndex < chromeHistory.length - 1) {
        chromeIndex++;
        document.getElementById('chrome-frame').src = chromeHistory[chromeIndex];
        document.getElementById('chrome-url').value = chromeHistory[chromeIndex];
    }
}

function chromeReload() {
    const iframe = document.getElementById('chrome-frame');
    iframe.src = iframe.src;
}

// --- 5. Wallpaper Settings ---
document.getElementById('wallpaper-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            document.getElementById('desktop').style.backgroundImage = `url('${imgData}')`;
            try { localStorage.setItem('os_wallpaper', imgData); } 
            catch(err) { alert("Image too large to save permanently, but applied for this session."); }
        }
        reader.readAsDataURL(file);
    }
});

// --- 6. Taskbar Logic & App Store ---
const taskbarIconsContainer = document.getElementById('app-icons');
let draggedIcon = null;

function makeIconDraggable(icon) {
    icon.addEventListener('dragstart', function(e) {
        draggedIcon = this;
        setTimeout(() => this.classList.add('dragging-icon'), 0);
    });
    icon.addEventListener('dragend', function() {
        setTimeout(() => { this.classList.remove('dragging-icon'); draggedIcon = null; }, 0);
    });
    icon.addEventListener('dragover', function(e) { e.preventDefault(); });
    icon.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedIcon !== this) {
            let allIcons = [...taskbarIconsContainer.children];
            if (allIcons.indexOf(draggedIcon) < allIcons.indexOf(this)) this.after(draggedIcon);
            else this.before(draggedIcon);
        }
    });
}

function installApp(appId, iconSymbol, appName, buttonElement) {
    if (document.getElementById('taskbar-' + appId)) return; 

    // Find progress UI if it exists
    const progressContainer = document.getElementById('progress-container-' + appId);
    const progressBar = document.getElementById('progress-bar-' + appId);
    
    buttonElement.innerText = 'Installing...';
    buttonElement.disabled = true;
    if(progressContainer) progressContainer.style.display = 'block';

    let progress = 0;
    const downloadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(downloadInterval);
            
            if(progressBar) { progressBar.style.width = '100%'; progressBar.innerText = '100%'; }
            buttonElement.innerText = 'Installed';
            if(progressContainer) setTimeout(() => progressContainer.style.display = 'none', 500);

            // Add to OS
            restoreAppToTaskbar(appId, iconSymbol, appName);
            saveAppToStorage(appId, iconSymbol, appName);
            
            // Add to Launcher Menu
            const menuList = document.getElementById('launcher-list');
            const li = document.createElement('li');
            li.innerHTML = `${iconSymbol} ${appName}`;
            li.onclick = () => openApp(appId);
            menuList.appendChild(li);
        } else {
            if(progressBar) { progressBar.style.width = progress + '%'; progressBar.innerText = progress + '%'; }
        }
    }, 400); 
}

function restoreAppToTaskbar(appId, iconSymbol, appName) {
    const btn = document.createElement('button');
    btn.className = 'app-icon';
    btn.id = 'taskbar-' + appId;
    btn.title = appName;
    btn.innerHTML = iconSymbol;
    btn.draggable = true;
    btn.onclick = () => toggleApp(appId);
    taskbarIconsContainer.appendChild(btn);
    makeIconDraggable(btn);
}

function saveAppToStorage(appId, iconSymbol, appName) {
    let savedApps = JSON.parse(localStorage.getItem('os_installed_apps') || '[]');
    savedApps.push({ id: appId, icon: iconSymbol, name: appName });
    localStorage.setItem('os_installed_apps', JSON.stringify(savedApps));
}