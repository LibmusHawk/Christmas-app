const { ipcRenderer } = require('electron');

// Handle close button click
document.getElementById('close-button').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});