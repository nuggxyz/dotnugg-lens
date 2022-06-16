const IpcListener = require('./ipc-listener').default;
const Main = require('./main');

Main.main();
IpcListener.register();
