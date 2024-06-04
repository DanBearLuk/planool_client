export const Config = Object.freeze({
    SERVER_PROTOCOL   : 'http',
    SERVER_WS_PROTOCOL: 'ws',
    SERVER_DOMAIN     : 'localhost',
    SERVER_PORT       : 2700,
});

export const ADDRESSES = Object.freeze({
    PUBLIC_FILES: Config.SERVER_PROTOCOL + '://' + 
                  Config.SERVER_DOMAIN + ':' +
                  Config.SERVER_PORT + '/public',

    API         : Config.SERVER_PROTOCOL + '://' + 
                  Config.SERVER_DOMAIN + ':' +
                  Config.SERVER_PORT + '/api',
                  
    WS          : Config.SERVER_WS_PROTOCOL + '://' + 
                  Config.SERVER_DOMAIN + ':' +
                  Config.SERVER_PORT + '/socket'
});
