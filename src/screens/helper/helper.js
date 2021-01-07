import { AsyncStorage } from "react-native";

export function update()
{
    AsyncStorage.setItem("count","1");
}