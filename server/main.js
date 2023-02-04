import { App } from 'uWebSockets.js';
import { serveStatic } from './static.js';

export const app = App();

serveStatic();

const PORT = 80;
app.listen('0.0.0.0', PORT, token => token ? console.log(`Listening on port ${PORT}...`) : {});