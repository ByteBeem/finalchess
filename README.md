

## Current features
* Drag and drop to move pieces
* See possible moves when hovering over a piece
* Highlight the king when in check
* Allow only legal moves
* Restart game, switch sides (both players need to agree)
* Show last move
* Automatic white/dark mode
* Play multiplayer with friends
* Play against the computer with various algorithms
* Spectate games


## Dependencies/Modules Used
### Server-side
* [Node.js](https://github.com/nodejs/node) - Javascript runtime
* [socket.io](https://github.com/socketio/socket.io) - Library for realtime communication server-side
* [Express](https://github.com/expressjs/express) - Web Framework
* [workerpool](https://github.com/josdejong/workerpool) - Library to manage workers to allow for non-blocking find-moves calls  
* [chess.js](https://github.com/jhlywa/chess.js) - Library for chess moves validation/generation
* [wasm-chess-algorithms](https://github.com/fratorgano/wasm-chess-algorithms) - Library that uses Rust for more performant chess game tree exploration

### Client-side
* [socket.io-client](https://github.com/socketio/socket.io-client) - Library for realtime communication client-side
* [chess.js](https://github.com/jhlywa/chess.js) - Library for chess moves validation/generation
* [chessboard.js](https://github.com/oakmac/chessboardjs) - JavaScript chessboard component

## License
SocketChess is released under the MIT License.
