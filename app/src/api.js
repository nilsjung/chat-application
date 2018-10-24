import * as actions from './actions/message-actions';
import io from 'socket.io-client';

let socket = null;

/**
 * Adds the chat middleware to send messages via ws to the server.
 *
 * @param {Object} store the current store
 */
export function chatMiddleware(store) {
    return (next) => (action) => {
        if (socket && (action.type === actions.ADD_MESSAGE)) {
            socket.emit('message', action.message);
        }
        return next(action);
    }
}

/**
 * Creates a connection to the server via ws.
 *
 * TODO save host as env or global var
 *
 * @param {Object} store the current store
 */
export default function(store) {
    socket = io.connect('http://localhost:5001');

    socket.on('start', (data) => {
        store.dispatch(actions.setUserId(data))
    })

    socket.on('message', (data) => {
        store.dispatch(actions.addResponse(data))
    });
}