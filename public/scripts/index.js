
const roomNameInput = document.getElementById('roomName');

const socket = io();

async function createRoom(type) {
  console.log(type);
  if (
    document.getElementById('userName').checkValidity() &&
    document.getElementById('roomName').checkValidity()
  ) {
    switch (type) {
      case 'single':
        if (
          document.getElementById('Depth').checkValidity() &&
          document.getElementById('Time').checkValidity()
        ) {
          console.log('creating room: ', roomNameInput.value);
          // Notify the server about new room
          const algorithm = document.getElementById('Algorithm').value;
          const depth = Number(document.getElementById('Depth').value);
          const time = Number(document.getElementById('Time').value);
          try {
            const response = await fetch(`/create_room?type=${type}&name=${roomNameInput.value}&algorithmName=${algorithm}&depth=${depth}&time=${time}`);
            if (!response.ok) {
              throw new Error('Failed to create room');
            }
            console.log('Room created successfully');
          } catch (error) {
            console.error('Error creating room:', error);
          }
        }
        break;
      case 'multi':
        try {
          const response = await fetch(`http://localhost:3001/create_room?type=${type}&name=${roomNameInput.value}`);
          if (!response.ok) {
            throw new Error('Failed to create room');
          }
          console.log('Room created successfully');
        } catch (error) {
          console.error('Error creating room:', error);
        }
        break;
      default:
        console.log('Error: Trying to create room with unknown type');
        break;
    }
  }
}


// the user needs a name to join a room
function joinRoom(roomName) {
  console.log('joining room: ', roomName);
  if (document.getElementById('userName').checkValidity()) {
    
    roomNameInput.value = roomName;
    // submit form
    document.getElementById('formMulti').submit();
  } else {
    document.getElementById('userName').focus();
  }
}

// handle room_list event by creating a table with joinable rooms
socket.on('room_list', (roomListServer) => {
  // removing old rows
  document.getElementById('rows').textContent = '';

  // for each room add a row to the table
  for (let i = 0; i < roomListServer.length; i += 1) {
    // get the room
    const room = roomListServer[i];

    // create a new row with room name, white player name,
    // black player name, spectators number and join button
    const roomRow = document.createElement('tr');
    const roomName = document.createElement('td');
    roomName.innerText = room.name;
    const roomWhite = document.createElement('td');
    roomWhite.innerText = room.white.name ? room.white.name : '';
    const roomBlack = document.createElement('td');
    roomBlack.innerText = room.black.name ? room.black.name : '';
    const roomSpecators = document.createElement('td');
    roomSpecators.innerText = room.spectators.length;

    // creating join room button
    const roomButton = document.createElement('td');
    const roomJoinButton = document.createElement('button');
    roomJoinButton.textContent = 'Join';
    roomJoinButton.addEventListener('click', () => {
      joinRoom(room.name);
    });

    // adding button to its cell
    roomButton.appendChild(roomJoinButton);

    // adding elements to row
    roomRow.appendChild(roomName);
    roomRow.appendChild(roomWhite);
    roomRow.appendChild(roomBlack);
    roomRow.appendChild(roomSpecators);
    roomRow.appendChild(roomButton);

    // adding row to table
    document.getElementById('rows').appendChild(roomRow);
    // roomList.appendChild(roomItem);
  }
});

function updateSingleplayerOptions() {
  // get value of Algorithm select
  const algorithm = document.getElementById('Algorithm').value;
  console.log('algorithm: ', algorithm);
  const depth = document.getElementById('depthDiv');
  const time = document.getElementById('timeDiv');
  switch (algorithm) {
    case 'random':
      // hide all options
      depth.setAttribute('hidden', 'true');
      time.setAttribute('hidden', 'true');
      break;
    case 'negamax':
    case 'negamax_a_b':
    case 'negamax_a_b_table':
    case 'negamax_a_b_quiescent':
      // show only Depth option
      console.log('showing only Depth option');
      depth.removeAttribute('hidden');
      time.setAttribute('hidden', 'true');
      break;
    case 'iterative_deepening':
    case 'iterative_deepening_table':
    case 'iterative_deepening_order':
      // show only Time option
      console.log('showing only Time option');
      depth.setAttribute('hidden', 'true');
      time.removeAttribute('hidden');
      break;
    default:
      console.log('show all options');
      depth.removeAttribute('hidden');
      time.removeAttribute('hidden');
      break;
  }
}
