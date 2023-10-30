import { gql } from "@apollo/client";

export const getPlayer = gql`
    query GetPlayer($id: Int) {
        getPlayer(id: $id) {
            hand {
                rank
                suit
            }
            id
            turn
            }
    }
`;

export const drawCard = gql`
    mutation Mutation($id: Int) {
        drawCard(player_id: $id) {
            rank
            suit
        }
    }
`;

export const getPlayers = gql`
    query Players {
        players {
            hand {
                rank
                suit
            }
            id
            turn
            winner
        }
    }
`;

export const addPlayer = gql`
    mutation Mutation($id: Int) {
        addPlayer(id: $id) {
            id
            turn
        }
    }
`;