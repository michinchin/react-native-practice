
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type PlayerViewProps = NativeStackScreenProps<RootStackParamList, 'PlayerView'>;
export type RootStackParamList = {
    Home: {};
    PlayerView: { id: number};
};