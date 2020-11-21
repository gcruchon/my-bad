const question = jest.createMockFromModule('../question');

const getAnswers = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
    resolve({
      errors: [{ userId: 'Player1', name: 'Player One' }],
      mistakes: [
        { userId: 'Player2', name: 'Player Two' },
        { userId: 'Player3', name: 'Player Three' },
      ],
      failures: [],
    });
  });
});

const showPlayers = jest.fn().mockImplementation((players) => {
  if(players.length) {
    let listOfPlayers = '';
    players.forEach((player, index) => {
      if(index) {
        listOfPlayers += ', ';
      }
      listOfPlayers += player.name;
    });
    return listOfPlayers;
  } else {
    return '--';
  }
});

question.getAnswers = getAnswers;
question.showPlayers = showPlayers;


module.exports = question;
