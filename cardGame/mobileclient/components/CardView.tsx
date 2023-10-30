import { View, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

type CardProps = {
    rank: number,
    suit: string,
}

export default function CardView(props: CardProps) {
    const { rank, suit} = props;

    const suitsIcons = (suit: string) => {
        const size = 30;
        const color = 'white';
        switch (suit) {
            case 'HEARTS':
                return <MaterialCommunityIcons name="cards-heart-outline" size={size} color={color}></MaterialCommunityIcons>;
            case 'DIAMONDS':
                return <MaterialCommunityIcons name="cards-diamond-outline" size={size} color={color}></MaterialCommunityIcons>;
            case 'CLUBS':
                return <MaterialCommunityIcons name="cards-club-outline" size={size} color={color}></MaterialCommunityIcons>;
            case 'SPADES':
                return <MaterialCommunityIcons name="cards-spade-outline" size={size} color={color}></MaterialCommunityIcons>;
        }
    };

    return (<View style={styles.card}>
        <View style={styles.topLeft}>
            {suitsIcons(suit)}
        </View>
        <Text style={styles.text}>{rank}</Text>
        <View style={styles.bottomRight}>
            {suitsIcons(suit)}
        </View>
    </View>);
}
const styles = StyleSheet.create({
    suits: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    topLeft: {
        left: 10,
        top: 10,
        position: 'absolute',
    },
    bottomRight: {
        right: 10,
        bottom: 10,
        position: 'absolute',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'green',
        marginBottom: 10,
        height: 300,
        width: 200,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        color: 'white',
        fontSize: 54
    }
});