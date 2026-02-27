/* Base Styles */
body, html { margin: 0; padding: 0; height: 100%; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; overflow: hidden; background-color: #000; }
#desktop { height: 100vh; position: relative; background-image: url('https://images.unsplash.com/photo-1506744626753-1fa44df31c22?q=80&w=2000&auto=format&fit=crop'); background-size: cover; background-position: center; transition: filter 0.2s, background-image 0.3s; }

/* Boot Screen */
#boot-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #202124; z-index: 99999; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; transition: opacity 0.5s ease-out; }
.boot-logo { font-size: 80px; margin-bottom: 20px; animation: pulse 1.5s infinite; }
.boot-text { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
.boot-loader { margin-top: 30px; width: 50px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; position: relative; overflow: hidden; }
.boot-loader::after { content: ''; position: absolute; left: -25px; top: 0; height: 100%; width: 25px; background: #1a73e8; animation: slide 1s infinite ease-in-out; }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
@keyframes slide { 0% { left: -25px; } 100% { left: 50px; } }

/* Context Menu */
#context-menu { position: absolute; background: rgba(32, 33, 36, 0.95); backdrop-filter: blur(10px); color: white; border-radius: 8px; padding: 5px 0; width: 200px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 10000; }
.context-item { padding: 10px 15px; cursor: pointer; font-size: 14px; transition: 0.2s; }
.context-item:hover { background: rgba(255, 255, 255, 0.15); }

/* Quick Settings Panel */
#quick-settings { position: absolute; bottom: 70px; right: 2%; width: 320px; background: rgba(32, 33, 36, 0.95); border-radius: 16px; padding: 20px; color: white; backdrop-filter: blur(20px); box-shadow: 0 4px 20px rgba(0,0,0,0.5); z-index: 9999; }
.qs-header { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #8ab4f8; font-weight: bold; }
.qs-sliders { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.qs-sliders label { font-size: 13px; }
.qs-sliders input[type=range] { width: 100%; margin-bottom: 10px; }
.qs-footer { display: flex; justify-content: space-between; gap: 10px; }
.qs-footer button { flex: 1; padding: 8px; border-radius: 8px; border: none; background: rgba(255,255,255,0.1); color: white; cursor: pointer; transition: 0.2s; }
.qs-footer button:hover { background: rgba(255,255,255,0.2); }

/* Lock Screen */
#lock-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(32, 33, 36, 0.95); backdrop-filter: blur(15px); z-index: 10000; display: flex; justify-content: center; align-items: center; }
.lock-box { text-align: center; color: white; width: 300px; }
.avatar { font-size: 64px; margin-bottom: 10px; background: rgba(255,255,255,0.1); border-radius: 50%; width: 100px; height: 100px; line-height: 100px; margin: 0 auto 15px auto; }
#lock-password { padding: 10px; border-radius: 20px; border: none; outline: none; width: 70%; text-align: center; margin-bottom: 10px; }
.lock-box button { padding: 10px 15px; border-radius: 20px; border: none; background: #1a73e8; color: white; cursor: pointer; }
#lock-error { color: #ff8a80; font-size: 12px; margin-top: 5px; display: none; }
.forgot-link { color: #8ab4f8; font-size: 12px; margin-top: 15px; cursor: pointer; }
.forgot-link:hover { text-decoration: underline; }

/* Desktop Icons */
#desktop-icons { position: absolute; top: 20px; left: 20px; display: flex; flex-direction: column; gap: 20px; z-index: 1; }
.desktop-icon { width: 80px; text-align: center; color: white; cursor: pointer; border-radius: 8px; padding: 10px 5px; transition: 0.2s; user-select: none; }
.desktop-icon:hover { background: rgba(255, 255, 255, 0.2); }
.desktop-icon .icon-emoji { font-size: 36px; margin-bottom: 5px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
.desktop-icon .icon-text { font-size: 13px; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); }

/* Windows */
.window { position: absolute; top: 80px; left: 150px; width: 600px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); display: flex; flex-direction: column; overflow: hidden; resize: both; z-index: 10; transition: opacity 0.2s; }
.window.minimized { display: none !important; }
.window.dragging { transition: none; opacity: 0.9; }
.window-header { background: #f1f3f4; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; cursor: move; user-select: none; border-bottom: 1px solid #ddd; }
.window-title { font-size: 14px; font-weight: 600; color: #3c4043; }
.win-btn { background: transparent; border: none; cursor: pointer; font-size: 16px; font-weight: bold; color: #5f6368; transition: 0.2s; padding: 0 5px; }
.close-btn:hover { color: #d93025; }
.win-btn:hover:not(.close-btn) { color: #202124; }
.window-content { flex-grow: 1; background: #fff; overflow-y: auto; display: flex; flex-direction: column; }
#snap-preview { position: absolute; background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.5); border-radius: 12px; backdrop-filter: blur(5px); display: none; z-index: 999; pointer-events: none; transition: all 0.2s ease-out; }

/* Calculator App */
.calc-bg { background: #202124; padding: 15px; }
#calc-display { width: calc(100% - 20px); height: 60px; font-size: 32px; text-align: right; margin-bottom: 10px; background: #303134; color: white; border: none; border-radius: 8px; padding: 0 10px; outline: none; }
.calc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; height: calc(100% - 70px); }
.calc-btn { background: #3c4043; color: white; border: none; border-radius: 8px; font-size: 20px; cursor: pointer; transition: 0.2s; }
.calc-btn:hover { background: #5f6368; }
.calc-btn.action { background: #8ab4f8; color: #202124; font-weight: bold; }
.calc-btn.span-2 { grid-column: span 2; }

/* Taskbar */
#taskbar-container { position: absolute; bottom: 10px; width: 100%; display: flex; justify-content: center; z-index: 9999; }
#taskbar { height: 48px; background-color: rgba(32, 33, 36, 0.75); display: flex; align-items: center; padding: 0 10px; backdrop-filter: blur(20px); border-radius: 24px; color: white; width: 90%; max-width: 1000px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
#launcher-btn { background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; font-weight: bold; color: white; margin-right: auto; transition: 0.2s; }
#launcher-btn:hover { background: rgba(255, 255, 255, 0.2); }
#app-icons { display: flex; gap: 8px; justify-content: center; position: absolute; left: 50%; transform: translateX(-50%); }
.app-icon { background: transparent; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; transition: 0.2s; position: relative; }
.app-icon:hover { background: rgba(255, 255, 255, 0.15); }
.app-icon.active::after { content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 16px; height: 3px; background: white; border-radius: 2px; }
.app-icon.dragging-icon { opacity: 0.4; }
#status-area { margin-left: auto; background: rgba(255, 255, 255, 0.1); padding: 6px 14px; border-radius: 16px; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
#status-area:hover { background: rgba(255, 255, 255, 0.2); }
#clock { font-size: 13px; font-weight: 500; }

/* Launcher Menu */
#launcher-menu { position: absolute; bottom: 70px; left: 5%; width: 300px; background: rgba(32, 33, 36, 0.85); border-radius: 16px; padding: 10px; color: white; backdrop-filter: blur(20px); box-shadow: 0 4px 20px rgba(0,0,0,0.4); z-index: 9998; }
#launcher-menu ul { list-style: none; padding: 0; margin: 0; }
#launcher-menu li { padding: 10px 15px; cursor: pointer; border-radius: 8px; transition: 0.2s; }
#launcher-menu li:hover { background: rgba(255, 255, 255, 0.15); }

/* Components */
.browser-toolbar { display: flex; padding: 8px; background: #e8eaed; border-bottom: 1px solid #ccc; gap: 5px; }
.browser-toolbar input { flex-grow: 1; padding: 6px 12px; border-radius: 15px; border: 1px solid #ccc; outline: none; }
.browser-toolbar button { background: #1a73e8; color: white; border: none; border-radius: 15px; padding: 5px 15px; cursor: pointer; }
.store-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee; }
.store-info { flex-grow: 1; margin-right: 15px; }
.store-info strong { display: block; font-size: 16px; color: #202124; }
.store-info span { font-size: 12px; color: #5f6368; }
.install-btn { background: #1a73e8; color: white; border: none; min-width: 80px; padding: 8px 16px; border-radius: 16px; cursor: pointer; font-weight: bold; }
.install-btn:disabled { background: #8ab4f8; cursor: not-allowed; }
.progress-container { width: 100%; background-color: #e0e0e0; border-radius: 8px; margin-top: 8px; display: none; overflow: hidden; height: 14px; }
.progress-bar { width: 0%; height: 100%; background-color: #1a73e8; text-align: center; line-height: 14px; color: white; font-size: 10px; font-weight: bold; transition: width 0.2s; }
#wordpad-editor { flex-grow: 1; padding: 15px; outline: none; font-family: 'Times New Roman', Times, serif; font-size: 16px; }
#wordpad-editor:empty:before { content: attr(placeholder); color: #888; }
