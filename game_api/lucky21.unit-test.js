const lucky21Constructor = require('./lucky21.js');
// reset dependency dummies
const resetDependencies = () => {
  return {
    'deck': () => [
      '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', // Hearts
      '01C', '02C', '03C', '04C', '05C', '06C', '07C', '08C', '09C', '10C', '11C', '12C', '13C', // Clubs
      '01D', '02D', '03D', '04D', '05D', '06D', '07D', '08D', '09D', '10D', '11D', '12D', '13D', // Diamonds
      '01S', '02S', '03S', '04S', '05S', '06S', '07S', '08S', '09S', '10S', '11S', '12S', '13S', // Spades
    ],
    'dealer': () => {
      return {
        'shuffle': () => { },
        'draw': (deck) => {
          return deck.pop();
        },
      };
    },
  };
};

// Set starting dependencies
let dependencies = resetDependencies();
// variable to get dependencies
const context = (name) => {
  return dependencies[name];
};

describe('Test game initiation', () => {
  test('a new game should have 50 cards left in the deck', () => {
    // Set dependencies
    dependencies = resetDependencies();
    const game = lucky21Constructor(context);
    expect(game.state.deck.length).toEqual(50);
  });

  test('a new game should have 2 drawn cards', () => {
    // Set dependencies
    dependencies = resetDependencies();
    const game = lucky21Constructor(context);
    expect(game.state.cards.length).toEqual(2);
  });
});

describe('Testing isGameOver', () => {
  test('Guessed under and the total is over 21 and isGameOver should return true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '10D', '09S'];
    game.guess21OrUnder(game);
    // Assert
    expect(game.isGameOver(game)).toEqual(true);
  });
  test('Guessed over 21 and isGameOver should return true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '10H'];
    game.state.card = '05C';
     // Assert
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('Guessed 21 or under and total is equal to 21 and isGameOver should return true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '10D', '06S'];
    // Assert
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('Guessed 21 or under and the total is under 21 and isGameOver should return false', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '05C'];
    // Assert
    expect(game.isGameOver(game)).toBe(false);
  });
});

describe('Testing playerWon', () => {
  test('Guessed 21 or under twice and total is = 21 and playerWon should return true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '06H', '05C'];
    // Assert
    expect(game.playerWon(game)).toEqual(true);
  });

  test('Guessed 21 or under and then over 21 and total is > 21 and playerWon should return true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Arrange
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '10H'];
    game.state.card = '05C';
    // Assert
    expect(game.playerWon(game)).toEqual(true);
  });

  test('Guessed 21 or under and then over 21 and the total was = 21 and playerWon should return false', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '06H'];
    game.state.card = '05C';
    // Assert
    expect(game.playerWon(game)).toEqual(false);
  });

  test('Guessed under 21 and then over 21 and the total was < 21 and playerWon should return false', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '09S', '03H'];
    game.state.card = '05C';
    // Assert
    expect(game.playerWon(game)).toEqual(false);
  });
});

describe('Testing getCardsValue', () => {
  test('The card value after two guesses should return 25', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05H', '07D', '13S', '03C'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(25);
  });

  test('getCardsValue should return 15', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01S', '04D'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(15);
  });

  test('getCardsValue with card defined should return 18', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01C', '08D', '09S'];
    game.state.card = '13S';
    // Assert
    expect(game.getCardsValue(game)).toEqual(18);
  });

  test('getCardsValue should return 23', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['08S', '05C', '01D', '02H', '07S'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(23);
  });

  test('getCardsValue with card defined should return 18', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['04D', '01S', '03C'];
    game.state.card = '05H';
    // Assert
    expect(game.getCardsValue(game)).toEqual(18);
  });

  test('getCardsValue of three aces should return 13', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '01S', '01C'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(13);
  });

  test('getCardsValue of four aces should return 14', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['01D', '01S', '01H', '01C'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(14);
  });

  test('getCardsValue of all royal cards should return 30', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['11S', '12C', '13H'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(30);
  });
});

describe('Testing getCardValue', () => {
  test('getCardValue where cards value is > 11 should return 1', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '05D'];
    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(1);
  });

  test('getCardValue where cards value is = 11 should return 1', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '04D'];
    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(1);
  });

  test('getCardValue where cards value is < 11 should return 11', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '03D'];
    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(11);
  });

  test('getCardValue should return undefined', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '04D', '01H'];
    // Assert
    expect(game.getCardValue(game)).toEqual(undefined);
  });

  test('getCardValue should return undefined', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '04D', '01H'];
    // Assert
    expect(game.getCardValue(game)).toEqual(undefined);
  });

  test('getCardValue should return 7', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03S', '04C', '04D'];
    game.state.card = '07H';
    // Assert
    expect(game.getCardValue(game)).toEqual(7);
  });
});

describe('Testing getTotal', () => {
  test('getTotal should return 16', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['12S', '03C', '03D'];
    // Assert
    expect(game.getTotal(game)).toEqual(16);
  });

  test('getTotal should return 21', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05S', '05C', '01D'];
    // Assert
    expect(game.getTotal(game)).toEqual(21);
  });

  test('getTotal should return 25', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['10S', '13C', '05D'];
    // Assert
    expect(game.getTotal(game)).toEqual(25);
  });

  test('getTotal should return 16', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['03C', '03D'];
    game.state.card = '12S';
    // Assert
    expect(game.getTotal(game)).toEqual(16);
  });

  test('getTotal should return 21', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '01D'];
    game.state.card = '05S';
    // Assert
    expect(game.getTotal(game)).toEqual(21);
  });

  test('getTotal should return 27', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '02D', '13D'];
    game.state.card = '10S';
    // Assert
    expect(game.getTotal(game)).toEqual(27);
  });
});

describe('Testing getCards', () => {
  test('getCards should return ["13S", "07D", "05H"]', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['13S', '07D', '05H'];
    // Assert
    expect(game.getCards(game)).toEqual(['13S', '07D', '05H']);
  });

  test('getCards should return ["04D", "01S"]', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['04D', '01S'];
    // Assert
    expect(game.getCards(game)).toEqual(['04D', '01S']);
  });

  test('getCards should return ["13S", "06S", "08D", "01C"]', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['13S', '06S', '08D', '01C'];
    // Assert
    expect(game.getCards(game)).toEqual(['13S', '06S', '08D', '01C']);
  });

  test('getCards should return ["07S", "01H", "10D", "05C", "08S"]', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['07S', '01H', '10D', '05C', '08S'];
    // Assert
    expect(game.getCards(game)).toEqual(['07S', '01H', '10D', '05C', '08S']);
  });
});

describe('Testing getCard', () => {
  test('getCard should return "08S"', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '10H'];
    game.state.card = '08S';
    // Assert
    expect(game.getCard(game)).toEqual('08S');
  });

  test('getCard should return undefined', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['08S', '05C', '03S'];
    // Assert
    expect(game.getCard(game)).toEqual(undefined);
  });
});

describe('Testing guess21OrUnder', () => {
  test('guess21OrUnder should draw the next card', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Arrange
    dependencies.deck = () => [
      '05C', '01D', '09S', '10H',
    ];
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Act
    game.guess21OrUnder(game);
    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });
});

describe('Testing getState', () => {
  test('getState should return cards as ["05C", "01D"], card as undefined and isGameOver as false', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '01D'];
    const expectedResult = {
      cards: ['05C', '01D'],
      cardsValue: 16,
      card: undefined,
      cardValue: undefined,
      total: 16,
      gameOver: false,
      playerWon: false,
    };
    // Assert
    expect(game.getState(game)).toEqual(expectedResult);
  });

  test('getState should return cards as ["05C", "01D"], card as "05D" and isGameOver as true', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Arrange
    game.state.cards = ['05C', '01D'];
    game.state.card = '05D';
    const expectedResult = {
      cards: ['05C', '01D'],
      cardsValue: 16,
      card: '05D',
      cardValue: 5,
      total: 21,
      gameOver: true,
      playerWon: false,
    };
    // Assert
    expect(game.getState(game)).toEqual(expectedResult);
  });
});

describe('Testing guessOver21', () => {
  test('guessOver21 should draw next card and set player card as that card', () => {
    // Set dependencies
    dependencies = resetDependencies();
    // Arrange
    dependencies.deck = () => [
      '05C', '01D', '09S', '10H',
    ];
    // Inject our dependencies
    const game = lucky21Constructor(context);
    // Act
    game.guessOver21(game);
    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.card).toEqual('01D');
  });
});
