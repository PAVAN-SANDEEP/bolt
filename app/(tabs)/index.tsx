import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import NewsCard from '../../components/NewsCard';
import LanguageSelector from '../../components/LanguageSelector';
import { newsService } from '../../services/newsService';
import { storageService } from '../../services/storageService';
import type { NewsItem } from '../../types/news';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const SWIPE_THRESHOLD = screenWidth * 0.3;

function HomeScreen() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [refreshing, setRefreshing] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (language) {
      loadNews();
    }
  }, [language]);

  const initializeApp = async () => {
    try {
      const savedLanguage = await storageService.getLanguage();
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        setLanguage('en');
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      setLanguage('en');
    }
  };

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getNews(language);
      setNewsItems(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading news:', error);
      Alert.alert('Error', 'Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    await storageService.setLanguage(newLanguage);
  };

  const onSwipeComplete = (direction: 'left' | 'right') => {
    if (currentIndex < newsItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCard();
    } else {
      // All cards swiped, reload
      loadNews();
    }
  };

  const resetCard = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotate.value = withSpring(0);
    opacity.value = withSpring(1);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = interpolate(
        translateX.value,
        [-screenWidth, 0, screenWidth],
        [-15, 0, 15],
        Extrapolate.CLAMP
      );
      opacity.value = interpolate(
        Math.abs(translateX.value),
        [0, SWIPE_THRESHOLD],
        [1, 0.5],
        Extrapolate.CLAMP
      );
    },
    onEnd: (event) => {
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;

      if (shouldSwipeRight || shouldSwipeLeft) {
        translateX.value = withSpring(
          shouldSwipeRight ? screenWidth : -screenWidth
        );
        translateY.value = withSpring(event.translationY);
        opacity.value = withSpring(0);
        runOnJS(onSwipeComplete)(shouldSwipeRight ? 'right' : 'left');
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
        opacity.value = withSpring(1);
      }
    },
  });


  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const currentItem = newsItems[currentIndex];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading latest tech news...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tech Daily</Text>
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </View>

        <View style={styles.cardContainer}>
          {currentItem && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.card, cardStyle]}>
                <NewsCard item={currentItem} />
              </Animated.View>
            </PanGestureHandler>
          )}

          {newsItems[currentIndex + 1] && (
            <View style={[styles.card, styles.nextCard]}>
              <NewsCard item={newsItems[currentIndex + 1]} />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {newsItems.length}
          </Text>
          <Text style={styles.instructionText}>
            Swipe left or right to continue
          </Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    width: CARD_WIDTH,
    height: screenHeight * 0.65,
    position: 'absolute',
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
    zIndex: -1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default HomeScreen;