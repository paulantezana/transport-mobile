export const app = {
    version: '0.0.1',
    name: 'TRANS',
    description: 'paulantezana.com',
    author: 'paul antezana',
}

// export const service = {
//     path: "http://localhost:1323",
//     api_path: "http://localhost:1323/api/v1",
//     socket_location: "ws://localhost:1323/api/v1/ws/location",
// }

export const docProperties = {
    pageSize: 'A4',
    author: app.author,
    creator: app.author,
}

export const service = {
    path: "https://transport-fast-server.herokuapp.com",
    api_path: "https://transport-fast-server.herokuapp.com/api/v1",
    socket_location: "wss://transport-fast-server.herokuapp.com/api/v1/ws/location",
}