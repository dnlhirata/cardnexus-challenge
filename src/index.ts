import server from './server';

const SERVER_START_MSG = (`Express server started on port: ${process.env.PORT}`);
server.listen(process.env.PORT, () => console.log(SERVER_START_MSG));
