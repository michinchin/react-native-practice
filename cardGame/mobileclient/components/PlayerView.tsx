import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PlayerViewProps } from "../navigation/types";
import { useMutation, useQuery } from "@apollo/client";
import { getPlayers } from "../api/gql";
import { Card, Player } from "../model/types";
import CardView from "./CardView";
import { drawCard } from "../api/gql";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function PlayerView(props: PlayerViewProps) {
    const [winner, setGameWinner] = useState(-1);
    const { id } = props.route.params;
    const { data, loading, error } = useQuery(getPlayers, { pollInterval: 500 });
    const [playerDrawCard, { data: _playersData, loading: _loading, error: _error }] = useMutation<Card>(drawCard) ?? {};
    const player: Player = data?.players.find((p: Player) => p.id === id);
    const otherPlayer: Player = data?.players.find((p: Player) => p.id !== id);

    const playerDraw = () => {
        playerDrawCard({
            variables: { 'id': id },
        });
        data?.players.map((p: Player) => p.winner ? setGameWinner(p.id) : undefined);
    }

    const drawCardButton = () => {
        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={playerDraw}>
                    <Text>Draw Card</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const cardView = (p: Player) => {
        console.log(p);
        if (p && p.hand.length > 0) {
            console.log(p.hand);
            const lastCard = p.hand[p.hand.length - 1];
            return (<CardView key={p.id}  {...lastCard} />);
        }
        return <></>;
    };

    const winnerScreen = (winner_id: number) => {
        return(
            <View>
                <Text>{player?.id == winner_id ? 'You Win!': 'You Lose'}</Text>
            </View>
        );
    };

    const game = () => {
        return (
            <>
                <View style={styles.spacing}>
                    <Text>Opponent draw</Text>
                </View>
                {cardView(otherPlayer)}
                <View style={styles.spacing}>
                    <Text>Your last draw</Text>
                </View>
                {cardView(player)}
                {player?.turn ? drawCardButton() : <Text style={{ height: 50, margin: 10 }}>Waiting for other player...</Text>}
            </>);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                {<Text>Loading...</Text>}
            </View>
        );
    }

    if (error != null) {
        return (
            <View style={styles.container}>
                {<Text>Error</Text>}
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <View style={styles.container}>
                {winner === -1 ? game() : winnerScreen(winner)}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    spacing: {
        margin: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        height: 50,
        width: 100,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});