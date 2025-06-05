import {server} from './src';

const app = server.listen(process.env.APP_PORT || 3000, () => console.log('App Iniciado'));
app.setTimeout(5000);