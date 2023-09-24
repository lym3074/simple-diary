import styled from "styled-components";
import React, { useState } from "react";
import colors from "../colors";
import { Alert } from "react-native";

const View = styled.View`
    flex:1;
    background-color: ${colors.bgColor};
    padding: 0px 30px;
`;
const Title = styled.Text`
    margin: 50px 0px;
    font-size: 28px;
    color: ${colors.textColor};
    text-align: center;
    font-weight: 500;
`;

const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 18px;
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    margin-top: 30px;
    padding: 10px 20px;
    align-items: center;
    background-color: ${colors.btnColor};
    border-radius: 20px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`;

const Emotions = styled.View`
    margin-bottom: 20px;
    justify-content: space-between;
    flex-direction: row;
`;

const Emotion = styled.TouchableOpacity`
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    border-width: ${props => props.selected ? "1px": "0px"};
    border-color: rgba(0, 0, 0, 0.5);
`;

const EmotionText = styled.Text`
    font-size: 24px;
`;

const emotions = ["😀", "😍", "🥹", "🫠", "🤪", "😊", "🧐"]

const Write = () => {
    const [selectedEmotion, setEmotion] = useState(null);
    const [feelings, setFeelings] = useState("");

    const onChangeText = (text) => setFeelings(text);
    const onPressEmotion = (face) => setEmotion(face);
    const onSubmit = () => {
        if(!feelings || !selectedEmotion) {
            return Alert.alert("please complete form")
        }
    }
    return (
        <View>
            <Title>How do you feel today?</Title>
            <Emotions>
                {emotions.map((emotion, index) => (
                    <Emotion 
                        key={index}
                        onPress={() => {onPressEmotion(emotion)}}
                        selected={emotion === selectedEmotion}
                    >
                        <EmotionText>{emotion}</EmotionText>
                    </Emotion>
                ))}
            </Emotions>
            <TextInput
                value={feelings}
                placeholder="writw your feelings..."
                placeholderTextColor={"#999"}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                returnKeyType="done"
            />
            <Button onPress={onSubmit}>
                <ButtonText>Save</ButtonText>
            </Button>
        </View>
    );
};

export default Write;