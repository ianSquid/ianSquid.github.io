// js/mc_destroy.js
window.addEventListener('DOMContentLoaded', () => {
    // 只在存在 #mc-bg-wrapper 的頁面執行（首頁與 Minecraft 頁面）
    const bgWrapper = document.getElementById('mc-bg-wrapper');
    if (!bgWrapper) return;
  
    // 清空 bgWrapper，建立一個容器用於放置方塊
    bgWrapper.innerHTML = '';
    const container = document.createElement('div');
    container.id = 'mc-tiles-container';
    container.style.position = 'absolute';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    bgWrapper.appendChild(container);
  
    const tileSize = 32;
    const cols = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);
  
    // 建立單一方塊元素
    function createTile(x, y) {
      const tile = document.createElement('div');
      tile.classList.add('mc-tile');
      tile.style.left = `${x * tileSize}px`;
      tile.style.top = `${y * tileSize}px`;
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
  
      // 點擊事件：播放音效、震動後淡出
      tile.addEventListener('click', () => {
        if (!tile.classList.contains('destroyed')) {
          const breakSound = new Audio('sounds/break.mp3');
          breakSound.currentTime = 0;
          breakSound.play();
          tile.classList.add('shake');
          setTimeout(() => {
            tile.classList.add('destroyed');
          }, 200);
        }
      });
      return tile;
    }
  
    // 建立滿版方塊網格
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = createTile(x, y);
        container.appendChild(tile);
      }
    }
  
    // 當視窗改變尺寸時，重新建立網格
    window.addEventListener('resize', () => {
      container.innerHTML = '';
      const newCols = Math.ceil(window.innerWidth / tileSize);
      const newRows = Math.ceil(window.innerHeight / tileSize);
      for (let y = 0; y < newRows; y++) {
        for (let x = 0; x < newCols; x++) {
          const tile = createTile(x, y);
          container.appendChild(tile);
        }
      }
    });
  });
  