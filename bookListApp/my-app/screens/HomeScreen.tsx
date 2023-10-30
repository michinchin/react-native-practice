import { useMutation, useQuery } from '@apollo/client';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Book, Books } from '../config/types';
import { deleteQuery, searchQuery } from '../graphql/query/searchQuery';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeProps } from '../navigation/navigationTypes';

export default function HomeScreen(props: HomeProps) {
    // type HomeScreenNavigationProp = HomeProps['navigation'];
    // type HomeScreenRouteProp = HomeProps['route'];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
            <View style={styles.container}>
                <StatusBar style='auto' />
                <BookList {...props}></BookList>
            </View>
        </SafeAreaView>

    );
}


function BookList(props: HomeProps) {
    const { title, author } = props.route.params || {};

    // useQuery automatically caches | 500 ms 
    const { data, loading, error } = useQuery<Books>(searchQuery, { pollInterval: 500 }) ?? {};
    const [deleteFunction, { data: data1, loading: loading1, error: error1 }] = useMutation<Book>(deleteQuery);

    if (title && author) {
        // need to call query to change db
        console.log(title, author);
    }

    const onBookTap = (book?: Book) => props.navigation.navigate('BookEdit', book ?? { title: '', author: '' } as Book);
    const onBookDelete = (book: Book) => deleteFunction({ variables: { "title": book.title, "author": book.author }, onError: (error) => { console.log(error); } });

    const BookItem = ({ book }: { book: Book }) => {
        const { title, author } = book;
        return (
            <TouchableOpacity onPress={() => onBookTap(book)}>
                <View style={styles.item}>
                    <View style={styles.col}>
                        <Text key={title} style={styles.titleText}>
                            {title}
                        </Text>
                        <Text>
                            {author}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => onBookDelete(book)}>
                        <MaterialCommunityIcons name="trash-can" size={12} color={'red'}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    const onAdd = () => {
        onBookTap();
        // Alert.prompt('Enter title', '', [{
        //     text: 'Cancel',
        //     style: 'cancel',
        // }, {
        //     text: 'OK', onPress(value) {
        //         if (value !== null) {
        //             alert(`You entered: ${value}`)

        //         }
        //     },
        // }
        // ]);
    }

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
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Books</Text>
                <TouchableOpacity onPress={onAdd}>
                    <MaterialCommunityIcons name="plus" size={24}></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data?.books}
                renderItem={({ item }) => <BookItem book={item} />}
                keyExtractor={(item, index) => item.title}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        width: '100%',
        marginTop: 10,
    },
    item: {
        padding: 10,
        shadowColor: "#020202",
        backgroundColor: "#fff",
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col: {
        flexDirection: 'column',
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'left'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: "Arial Rounded MT Bold",
        textAlign: 'left'
    }
});