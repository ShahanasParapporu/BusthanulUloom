// src/screens/onboarding/OnboardingScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, SIZES } from '../../constants/theme';
import { storageService, STORAGE_KEYS } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Busthanul Uloom',
    description: 'Your gateway to Islamic education and knowledge',
    icon: '📚',
  },
  {
    id: '2',
    title: 'Student Portal',
    description: 'Access courses, assignments, and track your progress',
    icon: '🎓',
  },
  {
    id: '3',
    title: 'Parent Portal',
    description: 'Monitor your child\'s academic journey and performance',
    icon: '👨‍👩‍👧‍👦',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await storageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
    navigation.replace('Auth');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <Button
                mode="text"
                onPress={handleSkip}
                textColor={COLORS.gray}
              >
                Skip
              </Button>
              <Button
                mode="contained"
                onPress={handleNext}
                style={styles.nextButton}
              >
                Next
              </Button>
            </>
          ) : (
            <Button
              mode="contained"
              onPress={handleComplete}
              style={styles.getStartedButton}
            >
              Get Started
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slide: {
    width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    height: height * 0.3,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    paddingHorizontal: 20,
  },
  getStartedButton: {
    flex: 1,
  },
});

export default OnboardingScreen;