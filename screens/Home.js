import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import colors from "../colors";
import { FlatList, SafeAreaView } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { useDB } from "../context";

const View = styled.View`
    flex: 1;
    padding: 30px;
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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const ButtonText = styled.Text`
    color: white;
`;

const Record = styled.View`
    background-color: ${colors.cardColor};
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
`
const Emotion = styled.Text`
    font-size: 24px;
    margin-right: 10px;
`
const Message = styled.Text`
    font-size: 18px;
    font-weight: 500;
`;

const Separator = styled.View`
    height: 10px
`;

const Home = ({navigation: {navigate}}) => {
    const realm = useDB();
    const [feelings, setFeelings] = useState(realm.objects("Feeling"));

    useEffect(()=> {
        const feelings = realm.objects("Feeling");
        setFeelings(feelings);
        feelings.addListener(() => {
            const feelings = realm.objects("Feeling");
            setFeelings(feelings);
        });

        return () => { // useEffect에서 리턴되는 값은 component가 unmount 되었을 때 실행되는 함수를 리턴한다.
            feelings.removeAllListeners();
        }
    },[])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
            <View>
                <Title>My Diary</Title>
                <FlatList
                    data={feelings}
                    keyExtractor={feeling => feeling._id + ""}
                    renderItem={({item}) => (
                        <Record>
                            <Emotion>{item.emotion}</Emotion>
                            <Message>{item.message}</Message>
                        </Record>
                    )}
                    ItemSeparatorComponent={Separator}
                />
                <Button onPress={() => {navigate("Write")}}>
                    <Ionicons name={"add"} color={"white"} size={40}/>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default Home;