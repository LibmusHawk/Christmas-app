const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoAPI', {
  loadTodos: () => ipcRenderer.invoke('read-todos'), // Retrieve todos from main process
  saveTodos: (todos) => ipcRenderer.invoke('write-todos', todos), // Send todos to main process for saving
});
