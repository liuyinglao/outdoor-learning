import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LessonOptionsBar from './LessonOptionsBar';

const leftArrow = require('assets/images/left-arrow-3x.png');
const rightArrow = require('assets/images/right-arrow-3x.png');

type Props = {
  elementId: number;
  totalElements: number;
  topElement: React.ReactNode;
  bottomElement?: React.ReactNode;
  children: React.ReactNode;
};

export default function LessonPrimaryLayout({
  navigation,
  elementId,
  totalElements,
  topElement,
  bottomElement,
  children,
}: NativeStackScreenProps<RootStackParamList, 'LessonContentScreen'> & Props) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.mainContainer}>
      <View style={(styles.topSection, {height: windowWidth})}>
        {topElement}
      </View>
      <View style={styles.body}>{children}</View>
      <View style={styles.navigationSection}>
        <View style={styles.arrowContainer}>
          {elementId > 0 && (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() =>
                navigation.navigate('LessonContentScreen', {
                  elementId: elementId - 1,
                })
              }
            >
              <Image source={leftArrow} style={styles.arrow} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomCenterContainer}>
          {bottomElement != null ? (
            bottomElement
          ) : (
            <Text style={styles.lessonNumber}>{`${
              elementId + 1
            }/${totalElements}`}</Text>
          )}
        </View>
        <View style={styles.arrowContainer}>
          {elementId + 1 < totalElements && (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() =>
                navigation.navigate('LessonContentScreen', {
                  elementId: elementId + 1,
                })
              }
            >
              <Image source={rightArrow} style={styles.arrow} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.optionBarWrapper}>
        <LessonOptionsBar
          displayQuestionAnswerScreen={false}
          onClose={() => navigation.navigate('LessonTabNavigator')}
          onQuestionMark={() => navigation.navigate('QuestionAnswerScreen')}
        />
      </View>
    </View>
  );
}

// TODO: Use colors from the theme instead of hardcoding
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    position: 'relative',
    backgroundColor: '#121212',
  },
  optionBarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  body: {
    // display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: '100%',
  },
  topSection: {
    // display: 'flex',
    // flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0,
    position: 'relative',
  },
  navigationSection: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    // flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 10 + 50,
    height: 22 + 50,
  },
  arrow: {
    width: 10,
    height: 22,
  },
  lessonNumber: {
    fontSize: 11,
    fontWeight: '500',
    // TODO: is this font natively supported on both platforms?
    fontFamily: 'SF Pro Text',
    color: 'white',
  },
  bottomCenterContainer: {flexGrow: 1, display: 'flex', alignItems: 'center'},
  bubbleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
