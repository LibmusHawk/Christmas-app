const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const userDataPath = app.getPath('userData'); // Get the app's user data directory
const todosFilePath = path.join(userDataPath, 'todos.json'); // Define path to the todos.json file

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'images', 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Read todos from the userData directory (non-read-only)
ipcMain.handle('read-todos', async () => {
  try {
    // Check if todos.json exists, otherwise return an empty array
    if (fs.existsSync(todosFilePath)) {
      const data = fs.readFileSync(todosFilePath, 'utf-8');
      return JSON.parse(data);
    } else {
      console.log('No existing todos.json file. Returning empty list.');
      return [];
    }
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
});

// Write todos to the userData directory
ipcMain.handle('write-todos', async (_, todos) => {
  try {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2)); // Save todos as JSON
  } catch (error) {
    console.error('Error writing todos:', error);
  }
});
