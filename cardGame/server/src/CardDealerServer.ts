// GraphQL type and query definitions
export const typeDefs = `#graphql
  type Player {
    id: Int!
    turn: Boolean
    hand: [Card]
    winner: Boolean
  }

  type Card {
    rank: Int!,
    suit: Suit!,
  }

   enum Suit {
    HEARTS,
    CLUBS,
    SPADES,
    DIAMONDS
   }

  type Query {
    deck: [Card]
    players: [Player]
    getPlayer(id: Int): Player
  }

  type Mutation {
    drawCard(player_id: Int): Card
    addPlayer(id: Int): [Player]
  }
`;

const generateDeck = () => {
  // 0: A; 1-10; 11: J; 12: Q; 13: K
  const cards = [];
  const suits = ['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS'];
  for (let j = 0; j <= 13; j++) {
    for (let i = 0; i <= 3; i++) {
      cards.push({
        'rank': j,
        'suit': suits[i]
      });
    }
  }
  return cards;
};

const deck = [...generateDeck()];
const players = [];

const checkWinner = (player, player2) => {
  // player just drew a card
  if (player.hand.length > 0 && player2.hand.length > 0) {
    if (player.hand[player.hand.length - 1].rank === player2.hand[player2.hand.length - 1].rank) {
      player.winner = true;
      player2.winner = false;
    }
  }
  return players;
}

export const resolvers = {
  Query: {
    deck: () => deck,
    players: () => players,
    getPlayer: (_parent, args, _contextValue, _info) => players.find((p) => p.id === args.id),
  },
  Mutation: {
    drawCard: (_parent, args) => {
      const player = players.find((p) => p.id === args.player_id);
      const player2 = players.find((p) => p.id !== args.player_id);

      if (player && player.turn) {
        // get random from deck
        const random_index = Math.floor(Math.random() * deck.length);
        const card = deck[random_index];
        console.log(`P${args.id} drew ${card}`);
        deck.splice(random_index, 1);

        // add to player hand
        player.hand.push(card);
        player.turn = false;
        player2.turn = true;

        checkWinner(player, player2);
        return card;
      } else {
        console.log('Not your turn!');
        return;
      }
    },
    addPlayer: (_parent, args) => {
      if (players) {
        // if player already exists, don't add
        const player = players.find((p) => p.id == args.id);
        if (player) {
          return players;
        } else {
          players.push({
            'id': args.id,
            'turn': args.id == 0,
            'hand': [],
            'winner':false
          });
          return players
        }
      }
    }
  },
};