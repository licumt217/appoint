let node_env=process.argv[2];
process.env.NODE_ENV=node_env;


switch (node_env) {
    case 'prod':
        require('./prod-server');
        break;
    case 'prep':
        require('./prep-server')
        break;
    default:
        require('./local-server')
}
