import * as React from 'react';
import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import TextVoiceInput from '../components/TextVoiceInput';
import ChatBubble from '../components/ChatBubble';
import findAnswer from '../components/questionAnswerModelInference';
import LessonOptionsBar from '../components/LessonOptionsBar';

import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function QuestionAnswerScreen({
  navigation,
  route,
}): NativeStackScreenProps<RootStackParamList, 'LessonIntroScreen'> {
  const startPromptText = 'Type your question or ask through voice.';
  const chatBubbles: Array<any> = [getChatBubbleForAnswer(startPromptText)];
  const [data, setData] = useState(chatBubbles);
  const textBlurb =
    'Eucalyptus trees can grow upto 33 meters in height. Eucalyptus trees are originally found in Australia and the islands surrounding it. Famously, these trees are home to some animals like koalas in Australia. The diet of koalas consists almost solely of eucalyptus leaves! You might also notice that eucalyptus has a distinctive bark pattern. You’ll notice that there’s a huge concentration of eucalyptus trees in California specifically.';

  async function submitQuestion(question: string) {
    if (question) {
      const chatBubble = getChatBubbleForQuestion(question);
      setData(oldArray => [...oldArray, chatBubble]);
      await getAnswer(question);
    }
  }

  async function getAnswer(question: string) {
    const result = await findAnswer(textBlurb, question);
    console.log(result);
    const chatBubble = getChatBubbleForAnswer(result.text);
    setData(oldArray => [...oldArray, chatBubble]);
  }

  function getChatBubbleForAnswer(answer: string) {
    const text = answer
      ? answer
      : "Sorry, I don't know the answer to that question";
    const textView = <Text style={styles.bubbleText}>{text}</Text>;
    return (
      <View style={styles.answer}>
        <ChatBubble
          alignment={'left'}
          view={textView}
          bubbleColor={'rgba(38, 38, 39, 1)'}
          backgroundColor={'#121212'}
        />
      </View>
    );
  }

  function getChatBubbleForQuestion(question: string) {
    const textView = <Text style={styles.bubbleText}>{question}</Text>;
    return (
      <View style={styles.question}>
        <ChatBubble
          alignment={'right'}
          view={textView}
          bubbleColor={'#468CF7'}
          backgroundColor={'#121212'}
        />
      </View>
    );
  }

  function goToPreviousScreen() {
    navigation.navigate('LessonContentScreen', {
      elementId: route.params.elementId,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={{width: '100%', height: '70%', marginTop: 45}}>
        <ScrollView style={styles.scrollView}>{data}</ScrollView>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <TextVoiceInput
          placeHolderText="Ask a question"
          onSubmit={(text: string) => submitQuestion(text)}
          isSaveEnabled={false}
          targetImage={null}
        />
      </View>
      <View style={styles.optionsBarArea}>
        <LessonOptionsBar
          {...navigation}
          displayQuestionAnswerScreen={true}
          closeCallback={goToPreviousScreen}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    backgroundColor: '#121212',
  },
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 19,
    marginTop: 25,
  },
  answer: {
    flexDirection: 'row',
    marginLeft: 19,
    marginTop: 25,
  },
  optionsBarArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
  },
});
