import {server} from './src';

server.listen(process.env.APP_PORT || 8080, () => console.log('App Iniciado'));