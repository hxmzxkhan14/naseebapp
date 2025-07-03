import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useTheme } from '@/contexts/ThemeContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth;
const CARD_HEIGHT = screenHeight;
const SWIPE_THRESHOLD = screenWidth * 0.25;

// Mock profile data
const mockProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    bio: 'Adventure seeker and coffee enthusiast ☕️',
    location: 'New York, NY',
    interests: ['Travel', 'Photography', 'Yoga'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    // Additional detailed profile data
    height: '165',
    detailedLocation: {
      country: 'United States',
      state: 'New York',
      city: 'New York'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 1-2 years',
    openToRelocate: true,
    livingPlans: 'Apartment initially, then house',
    familyType: 'nuclear',
    household: 'Live with roommates',
    currentLiving: 'Roommates',
    fitness: true,
    smoking: false,
    drinking: false,
    hobbies: ['Travel', 'Photography', 'Yoga', 'Reading', 'Cooking'],
    personalityTraits: ['Adventurous', 'Creative', 'Optimistic', 'Organized'],
    icebreakers: ['What\'s your favorite travel destination?', 'Coffee or tea?'],
    education: 'Bachelor\'s in Communications',
    profession: 'Marketing',
    jobTitle: 'Marketing Specialist',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'always',
    hijabBeard: 'yes',
    religiousLevel: 'Practicing',
    ethnicity: ['Arab'],
    languages: ['Arabic', 'English'],
  },
  {
    id: '2',
    name: 'Alex',
    age: 28,
    bio: 'Passionate about music and outdoor activities 🎵',
    location: 'Los Angeles, CA',
    interests: ['Music', 'Hiking', 'Cooking'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    // Additional detailed profile data
    height: '180',
    detailedLocation: {
      country: 'United States',
      state: 'California',
      city: 'Los Angeles'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 2-3 years',
    openToRelocate: false,
    livingPlans: 'House with family',
    familyType: 'extended',
    household: 'Live with family',
    currentLiving: 'Family',
    fitness: true,
    smoking: false,
    drinking: false,
    hobbies: ['Music', 'Hiking', 'Cooking', 'Gaming', 'Sports'],
    personalityTraits: ['Extrovert', 'Ambitious', 'Analytical', 'Patient'],
    icebreakers: ['What\'s your favorite genre of music?', 'Have you been hiking recently?'],
    education: 'Master\'s in Computer Science',
    profession: 'Technology',
    jobTitle: 'Software Engineer',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'sometimes',
    hijabBeard: 'sometimes',
    religiousLevel: 'Moderate',
    ethnicity: ['Pakistani'],
    languages: ['English', 'Urdu'],
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    bio: 'Book lover and weekend explorer 📚',
    location: 'Chicago, IL',
    interests: ['Reading', 'Art', 'Travel'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    // Additional detailed profile data
    height: '160',
    detailedLocation: {
      country: 'United States',
      state: 'Illinois',
      city: 'Chicago'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 1 year',
    openToRelocate: true,
    livingPlans: 'Apartment',
    familyType: 'nuclear',
    household: 'Live alone',
    currentLiving: 'Alone',
    fitness: false,
    smoking: false,
    drinking: false,
    hobbies: ['Reading', 'Art', 'Travel', 'Writing', 'Gardening'],
    personalityTraits: ['Introvert', 'Creative', 'Empathetic', 'Organized'],
    icebreakers: ['What\'s the last book you read?', 'Do you enjoy art?'],
    education: 'Bachelor\'s in English Literature',
    profession: 'Education',
    jobTitle: 'Teacher',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'always',
    hijabBeard: 'yes',
    religiousLevel: 'Very Religious',
    ethnicity: ['Indian'],
    languages: ['English', 'Hindi'],
  },
  {
    id: '4',
    name: 'Michael',
    age: 27,
    bio: 'Tech enthusiast and fitness lover 💪',
    location: 'San Francisco, CA',
    interests: ['Technology', 'Fitness', 'Gaming'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    // Additional detailed profile data
    height: '175',
    detailedLocation: {
      country: 'United States',
      state: 'California',
      city: 'San Francisco'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 1-2 years',
    openToRelocate: true,
    livingPlans: 'House',
    familyType: 'nuclear',
    household: 'Live with roommates',
    currentLiving: 'Roommates',
    fitness: true,
    smoking: false,
    drinking: false,
    hobbies: ['Technology', 'Fitness', 'Gaming', 'Hiking', 'Swimming'],
    personalityTraits: ['Extrovert', 'Ambitious', 'Analytical', 'Determined'],
    icebreakers: ['What\'s your favorite tech gadget?', 'Do you work out regularly?'],
    education: 'Bachelor\'s in Engineering',
    profession: 'Technology',
    jobTitle: 'Product Manager',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'sometimes',
    hijabBeard: 'sometimes',
    religiousLevel: 'Moderate',
    ethnicity: ['Egyptian'],
    languages: ['Arabic', 'English'],
  },
  {
    id: '5',
    name: 'Jessica',
    age: 26,
    bio: 'Creative soul who loves to paint and dance 🎨',
    location: 'Miami, FL',
    interests: ['Art', 'Dance', 'Beach'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    // Additional detailed profile data
    height: '168',
    detailedLocation: {
      country: 'United States',
      state: 'Florida',
      city: 'Miami'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 2 years',
    openToRelocate: false,
    livingPlans: 'Apartment near family',
    familyType: 'extended',
    household: 'Live with family',
    currentLiving: 'Family',
    fitness: true,
    smoking: false,
    drinking: false,
    hobbies: ['Art', 'Dance', 'Beach', 'Photography', 'Yoga'],
    personalityTraits: ['Creative', 'Extrovert', 'Optimistic', 'Spontaneous'],
    icebreakers: ['What\'s your favorite art style?', 'Do you enjoy dancing?'],
    education: 'Bachelor\'s in Fine Arts',
    profession: 'Arts',
    jobTitle: 'Art Teacher',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'always',
    hijabBeard: 'yes',
    religiousLevel: 'Practicing',
    ethnicity: ['Moroccan'],
    languages: ['Arabic', 'English', 'French'],
  },
];

interface ProfileCardProps {
  profile: typeof mockProfiles[0];
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  onPress: () => void;
  currentTheme: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isTop, onSwipe, onPress, currentTheme }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(isTop ? 1 : 0.95);
  const rotate = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      if (isTop) {
        scale.value = withSpring(1.05);
      }
    },
    onActive: (event) => {
      if (isTop) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
        rotate.value = interpolate(
          event.translationX,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15],
          Extrapolate.CLAMP
        );
      }
    },
    onEnd: (event) => {
      if (isTop) {
        const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;
        
        if (shouldSwipe) {
          translateX.value = withSpring(Math.sign(event.translationX) * screenWidth * 1.5);
          translateY.value = withSpring(event.translationY);
          runOnJS(onSwipe)(event.translationX > 0 ? 'right' : 'left');
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
          rotate.value = withSpring(0);
        }
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, screenWidth / 4],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-screenWidth / 4, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={isTop}>
      <Animated.View style={[styles.card, animatedStyle, { backgroundColor: currentTheme.colors.surface }]}>
        <TouchableOpacity style={styles.cardTouchable} onPress={onPress} activeOpacity={0.9}>
          <Image source={{ uri: profile.image }} style={styles.cardImage} />
          
          <Animated.View style={[styles.likeIndicator, likeOpacity]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.nopeIndicator, nopeOpacity]}>
            <Text style={styles.nopeText}>NOPE</Text>
          </Animated.View>
          
          <View style={styles.cardOverlay}>
            <View style={[styles.cardContent, { padding: currentTheme.spacing.lg }]}>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                <Text style={styles.location}>{profile.location}</Text>
              </View>
              
              <Text style={[styles.bio, { marginBottom: currentTheme.spacing.lg }]}>{profile.bio}</Text>
              
              <View style={[styles.interests, { gap: currentTheme.spacing.sm }]}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={[styles.interestTag, { paddingHorizontal: currentTheme.spacing.md }]}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState(mockProfiles);
  const router = useRouter();
  const { currentTheme } = useTheme();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      Alert.alert('Liked!', `You liked ${profiles[currentIndex].name}`);
    } else {
      Alert.alert('Passed', `You passed on ${profiles[currentIndex].name}`);
    }
    
    // Cycle back to beginning if we've reached the end
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex >= profiles.length ? 0 : nextIndex;
    });
  };

  const handleProfilePress = (profileId: string) => {
    router.push(`/profile/${profileId}`);
  };

  const handleLike = () => {
    handleSwipe('right');
  };

  const handleNope = () => {
    handleSwipe('left');
  };

  const handleSuperLike = () => {
    Alert.alert('Super Like!', `You super liked ${profiles[currentIndex].name}`);
    
    // Cycle back to beginning if we've reached the end
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex >= profiles.length ? 0 : nextIndex;
    });
  };

  // Get the next 3 profiles to show, handling cycling
  const getVisibleProfiles = () => {
    const visibleProfiles = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % profiles.length;
      visibleProfiles.push(profiles[index]);
    }
    return visibleProfiles;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={styles.cardContainer}>
        {getVisibleProfiles().reverse().map((profile, index) => (
          <ProfileCard
            key={`${profile.id}-${currentIndex + index}`}
            profile={profile}
            isTop={index === 0}
            onSwipe={handleSwipe}
            onPress={() => handleProfilePress(profile.id)}
            currentTheme={currentTheme}
          />
        ))}
      </View>

      <View style={[styles.actions, { backgroundColor: 'transparent' }]}>
        <TouchableOpacity style={[styles.actionButton, styles.nopeButton, { backgroundColor: currentTheme.colors.surface }]} onPress={handleNope}>
          <Ionicons name="close" size={30} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.superLikeButton, { backgroundColor: currentTheme.colors.surface }]} onPress={handleSuperLike}>
          <Ionicons name="star" size={25} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.likeButton, { backgroundColor: currentTheme.colors.surface }]} onPress={handleLike}>
          <Ionicons name="heart" size={30} color="#34C759" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingBottom: 120, // Space for action buttons
  },
  cardContent: {
    // padding will be set dynamically
  },
  profileInfo: {
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  location: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bio: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap will be set dynamically
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    // paddingHorizontal will be set dynamically
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  likeIndicator: {
    position: 'absolute',
    top: 100,
    right: 30,
    transform: [{ rotate: '15deg' }],
  },
  likeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#34C759',
    borderWidth: 6,
    borderColor: '#34C759',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  nopeIndicator: {
    position: 'absolute',
    top: 100,
    left: 30,
    transform: [{ rotate: '-15deg' }],
  },
  nopeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF3B30',
    borderWidth: 6,
    borderColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    gap: 32,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nopeButton: {
    // backgroundColor will be set dynamically
  },
  superLikeButton: {
    // backgroundColor will be set dynamically
  },
  likeButton: {
    // backgroundColor will be set dynamically
  },
  cardTouchable: {
    flex: 1,
  },
});
