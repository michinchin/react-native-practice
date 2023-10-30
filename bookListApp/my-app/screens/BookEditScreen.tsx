import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { BookEditProps } from "../navigation/navigationTypes";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../config/types";
import { useMutation } from "@apollo/client";
import { addBookQuery, editBookQuery } from "../graphql/query/searchQuery";

export default function BookEditScreen(props: BookEditProps) {
    const { title, author } = props.route.params;
    const [currTitle, changeTitle] = useState(title);
    const [currAuthor, changeAuthor] = useState(author);

    const [mutateFunction, { data, loading, error }] = useMutation<Book>(title && author ? editBookQuery : addBookQuery) ?? {};
    
    const onSave = () => {
        const onComplete = (data: Book) => {
            console.log(`Successfully created new book: ${data?.title}, ${data?.author}`);
        };

        if (title && author) { 
            console.log("edit");
            mutateFunction({variables: {"oldTitle": title, "newTitle": currTitle, "newAuthor": currAuthor}, onCompleted: onComplete});
        } else { 
            console.log("new");
            mutateFunction({variables: {"title": currTitle, "author": currAuthor}, onCompleted: onComplete});
        }
        // props.navigation.navigate('Home', {title: currTitle, author: currAuthor});
        props.navigation.goBack();
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* <View style={styles.text}>
                    <Text>{currTitle}</Text>
                    <Text>{currAuthor}</Text>
                </View> */}
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitle}
                    // defaultValue={title}
                    placeholder={title ?? 'Enter Title Here.'}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={changeAuthor}
                    // defaultValue={author}
                    placeholder={author ?? 'Enter Author Here.'}
                />
                <Button title="Save" onPress={onSave}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        // alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },
});