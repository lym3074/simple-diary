import styled from "styled-components";
import React from "react";
import colors from "../colors";
import { SafeAreaView } from "react-native";
import {Ionicons} from '@expo/vector-icons'

const View = styled.View`
    flex: 1;
    padding: 50px;
`;
const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 50px;
    margin-bottom: 100px;
`;

const Button = styled.TouchableOpacity`
    position: absolute;
    right: 50px;
    bottom: 50px;
    background-color: ${colors.btnColor};
    height: 70px;
    width: 70px;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
    elevation: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const ButtonText = styled.Text`
    color: white;
`;

const Home = ({navigation: {navigate}}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
            <View>
                <Title>My Diary</Title>
                <Button onPress={() => {navigate("Write")}}>
                    <Ionicons name={"add"} color={"white"} size={40}/>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default Home;