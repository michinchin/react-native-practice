import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type BookEditProps = NativeStackScreenProps<RootStackParamList, 'BookEdit'>;
export type RootStackParamList = {
    Home: { title: string, author: string };
    BookEdit: { title: string, author: string };
};

