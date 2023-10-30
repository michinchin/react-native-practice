import { Button, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { addPlayer, getPlayers } from "../api/gql";
import { useMutation, useQuery } from "@apollo/client";
import { Player } from "../model/types";
import { useState } from "react";
import PlayerView from "./PlayerView";
import { HomeProps } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(props: HomeProps) {
    const navigator = props.navigation;
    const { data, loading, error } = useQuery(getPlayers, { pollInterval: 500 });
    const [addNewPlayer, { data: _playersData, loading: _loading, error: _error }] = useMutation<[Player]>(addPlayer) ?? {};
    const ids = [0, 1];

    const onChoosePlayer = (id: number) => {
        addNewPlayer({
            variables: { 'id': id }, 
            
            onCompleted(data, clientOptions) {
                navigator.replace("PlayerView", { id: id });
                console.log(data);
            },
        });
    };

    const checkPlayer = (players: [Player]) => {
        if (players.length >= 1) {
            // Choose opposite player
            const id = players[0].id  == 0 ? 1 : 0;

            onChoosePlayer(id);
        }
    };

    const choosePlayerButton = (id: number) => {
        return (
            <TouchableOpacity key={id} onPress={() => onChoosePlayer(id)}>
                <View style={styles.button}>
                    <Text style={styles.text}>{'Player ' + (id == 0 ? 'A' : 'B')}</Text>
                </View>
            </TouchableOpacity>
        );
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

    checkPlayer(data?.players);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <View style={styles.container}>
                {ids.map((id: number) => choosePlayerButton(id))}
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'green',
        marginVertical: 5,
        height: 100,
        width: 200,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
    }
});
