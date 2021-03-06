const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

})

function createAddWindow(){
   addWindow = new BrowserWindow({
     width: 300,
     height: 200,
     title:'Add New Todo'
   });
   addWindow.loadURL(`file://${__dirname}/add.html`);
   addWindow.on('closed', () => addWindow = null)
}

function sendClear(){
  mainWindow.webContents.send('todo:clear');
}

ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label:'File',
    submenu:[
      {label: 'New Todo',
        accelerator: process.platform ==='darwin'?'Command+T':'Ctrl+T',
        click(){ createAddWindow(); }
      },
      {label: 'Refresh',
        accelerator: process.platform ==='darwin'?'Command+R':'Ctrl+R',
        click() {mainWindow.reload();;}
      },
      {label: 'Clear Todos',
        accelerator: process.platform ==='darwin'?'Command+C':'Ctrl+C',
        click(){
          sendClear();
      }},
      {label: 'Quit',
        accelerator: process.platform ==='darwin'?'Command+Q':'Ctrl+W',
        click() {app.quit();}
      }
    ]
  }
];
if (process.platform === 'darwin'){
  menuTemplate.unshit({});
}

if (process.env.NODE_ENV!== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        label: 'Toggel Developer Tools',
        accelerator: process.platform ==='darwin'?'Command+Alt+I':'Ctrl+Shift+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
