const name_input = document.querySelector("#name");
const search_button = document.querySelector('#search-button');
const playground_placeholder = document.querySelector('#playground-placeholder');
const playground_placeholder_playernames = document.querySelector('#playground-placeholder-playernames');
const playground_loader = document.querySelector('#playground-loader');
const playground_error = document.querySelector('#playground-error');
const playground_cards = document.querySelector('#playground-cards');
const playground_players = document.querySelector('#playground-players');
const playground_error1 = document.querySelector('#playground-error1');
const playground_search_box = document.querySelector('#playground-search-box');
const compare_button = document.querySelector('#compare-button');
const try_again = document.querySelector('#try-again');

const selected_players = [];
let playerid2 = 0;

let numberOfPlayers = 0;


/**
 * Apeleaza API, cauta player
 */
function searchPlayer() {
  const name = name_input.value;
  return fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`, {
    method: 'GET'
  })
    .then(response => response.json());
}

/**
 * Display player
 */
function renderPlayer(player) {
  selected_players.push(player);
  playground_cards.classList.remove('is-hidden');


  playground_players.insertAdjacentHTML('beforeend', `
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${player.strCutout}" />
      <div class="card-body">
        <h5 class="card-title">${player.strPlayer}</h5>
        <p class="text-muted">${player.strBirthLocation}</p>
        <ul class="list-group">
          <li class="list-group-item"><strong>Team:</strong> ${player.strTeam}</li>
          <li class="list-group-item"><strong>Height:</strong> ${player.strHeight}</li>
          <li class="list-group-item"><strong>Weight:</strong> ${player.strWeight}</li>
          <li class="list-group-item"><strong>Position:</strong> ${player.strPosition}</li>
        </ul>
      </div>
    </div>
  `);
}

/**
 * Apelat cand se schimba numele
 */



function onChange() {
  const name = name_input.value;

  if (name) {
    search_button.removeAttribute('disabled');
  } else {
    search_button.setAttribute('disabled', true);
  }
}

/**
 * Apelat cand se apasa button-ul de search.
 * 
 * @param {Object} event Obiectul de event. 
 */
function onSearch(event) {
  // opreste refresh
  // nu face submit la <form/>
  event.preventDefault();

  // dezactiveaza butonul de search
  search_button.setAttribute('disabled', true);

  // ascunzi mesajul default
  // arati spinner-ul
  playground_placeholder.classList.add('is-hidden');
  playground_placeholder_playernames.classList.add('is-hidden');
  playground_error.classList.add('is-hidden');
  playground_loader.classList.remove('is-hidden');
  // cauta jucator
  searchPlayer()
    .then((response) => {
      if (response.player.length) {
        renderPlayer(response.player[0]);
        name_input.value = '';
        numberOfPlayers++;
        if (numberOfPlayers == 2) {
          playground_search_box.classList.add('is-hidden');
        }

        let playerid = response.player[0].idPlayer;
        if (playerid == playerid2) {
          setTimeout(location.reload.bind(location), 3000);
          playground_error1.classList.remove('is-hidden');
          compare_button.setAttribute('disabled', true);
        };
        playerid2 = playerid;

      } else {
        playground_error.classList.remove('is-hidden');
      }
    })
    .catch((error) => {
      // arata eroare
      playground_error.classList.remove('is-hidden');
      playground_loader.classList.add('is-hidden');
    })
    .finally(() => {
      // enable button
      // ascunde spinner-ul
      playground_loader.classList.add('is-hidden');
    });
};

/**
 * Apelat cand se apasa button-ul de start three point contest.
 * 
 * @param {Object} player Obiectul de player. 
 */
function threePointContest(player) {
  selected_players.push(player);
  firstPlayer = selected_players[0];
  secondPlayer = selected_players[1];
  let firstPlayerScore = comparePlayers(firstPlayer, secondPlayer);

  win(firstPlayer, secondPlayer, firstPlayerScore);
};

// functions for three point contest
function comparePlayers(firstPlayer, secondPlayer) {

  let firstPlayerScore = 0;
  let firstPlayerHeight = getValueFromString(firstPlayer.strHeight);
  let secondPlayerHeight = getValueFromString(secondPlayer.strHeight);

  if (firstPlayerHeight < secondPlayerHeight) {
    firstPlayerScore++;
  } else {
    firstPlayerScore--;
  }

  let firstPlayerWeight = getValueFromString(firstPlayer.strWeight);
  let secondPlayerWeight = getValueFromString(secondPlayer.strWeight);

  if (firstPlayerWeight < firstPlayerWeight) {
    firstPlayerScore++;
  } else {
    firstPlayerScore--;
  }

  let firstPlayerPosition = getPosition(firstPlayer.strPosition);
  let secondPlayerPosition = getPosition(secondPlayer.strPosition);

  if (firstPlayerPosition > secondPlayerPosition) {
    firstPlayerScore++;
  } else {
    firstPlayerScore--;
  }

  return firstPlayerScore;
}

function win(firstPlayer, secondPlayer, score) {
  // score -3 -2 -1 0 1 2 3
  // -3: 10%
  // -2: 25%
  // -1: 40%
  // 0: 50%
  // 1: 60%
  // 2: 75%
  // 3: 90%

  if (score == -3) {
    if (Math.floor(Math.random() * 101) <= 10) {
      displayWinnerAfterLoading(secondPlayer);
    } else {
      displayWinnerAfterLoading(firstPlayer);
    }
  } else
    if (score == -2) {
      if (Math.floor(Math.random() * 101) <= 25) {
        displayWinnerAfterLoading(secondPlayer);
      } else {
        displayWinnerAfterLoading(firstPlayer);
      }
    } else
      if (score == -1) {
        if (Math.floor(Math.random() * 101) <= 40) {
          displayWinnerAfterLoading(secondPlayer);
        } else {
          displayWinnerAfterLoading(firstPlayer);
        }
      } else
        if (score == 0) {
          if (Math.floor(Math.random() * 102) <= 50) {
            displayWinnerAfterLoading(secondPlayer);
          } else {
            displayWinnerAfterLoading(firstPlayer);
          }
        } else
          if (score == 1) {
            if (Math.floor(Math.random() * 102) <= 60) {
              displayWinnerAfterLoading(secondPlayer);
            } else {
              displayWinnerAfterLoading(firstPlayer);
            }
          } else
            if (score == 2) {
              if (Math.floor(Math.random() * 102) <= 75) {
                displayWinnerAfterLoading(secondPlayer);
              } else {
                displayWinnerAfterLoading(firstPlayer);
              }
            } else
              if (score == 3) {
                if (Math.floor(Math.random() * 102) <= 90) {
                  displayWinnerAfterLoading(secondPlayer);
                } else {
                  displayWinnerAfterLoading(firstPlayer);
                }
              }


}

function displayWinnerAfterLoading(player) {
  playground_loader.classList.remove('is-hidden');
  setTimeout(function () {
    displayWinner(player);
    playground_loader.classList.add('is-hidden');
  }, 1500);
}

function displayWinner(player) {

  playground_players.innerHTML = `
    <div class="card mb-4 box-shadow" style="margin: 0 auto;">
      <h1 style="color: green"> WINNER </h1>
      <img class="card-img-top" src="${player.strCutout}" />
      <div class="card-body">
        <h5 class="card-title">${player.strPlayer}</h5>
        <p class="text-muted">${player.strBirthLocation}</p>
        <ul class="list-group">
          <li class="list-group-item"><strong>Team:</strong> ${player.strTeam}</li>
          <li class="list-group-item"><strong>Height:</strong> ${player.strHeight}</li>
          <li class="list-group-item"><strong>Weight:</strong> ${player.strWeight}</li>
          <li class="list-group-item"><strong>Position:</strong> ${player.strPosition}</li>
        </ul>
      </div>
    </div>`;

  compare_button.classList.add('is-hidden');
  try_again.classList.remove('is-hidden');
}

// helpers for comparePlayers
function getValueFromString(string) {
  var string = string;
  var pattern = /\([^\s]+/i;
  var result = string.match(pattern)[0];
  result = result.slice(1);
  return result;
}

function getPosition(stringPosition) {
  if (stringPosition == "Shooting Guard") {
    return 5;
  }

  if (stringPosition == "Point Guard") {
    return 4;
  }

  if (stringPosition == "Small Forward") {
    return 3;
  }

  if (stringPosition == "Power Forward") {
    return 2;
  }

  if (stringPosition == "Center") {
    return 1;
  }
}

function tryAgain() {
  playground_loader.classList.remove('is-hidden');
  setTimeout(location.reload.bind(location), 1500);
}

// Adaugi evenimentele pe nodurile HTML
name_input.addEventListener('input', () => onChange());
search_button.addEventListener('click', (event) => onSearch(event));
compare_button.addEventListener('click', (event) => threePointContest(event));
try_again.addEventListener('click', () => tryAgain());
