import React, { useState, useCallback } from 'react';
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
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth;
const CARD_HEIGHT = screenHeight;
const HORIZONTAL_SWIPE_THRESHOLD = screenWidth * 0.25;
const VERTICAL_SWIPE_THRESHOLD = screenHeight * 0.2;

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
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    // Additional detailed profile data
    height: '168',
    detailedLocation: {
      country: 'United States',
      state: 'Florida',
      city: 'Miami'
    },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: 'Within 1-2 years',
    openToRelocate: true,
    livingPlans: 'Apartment',
    familyType: 'nuclear',
    household: 'Live alone',
    currentLiving: 'Alone',
    fitness: true,
    smoking: false,
    drinking: false,
    hobbies: ['Art', 'Dance', 'Beach', 'Photography', 'Travel'],
    personalityTraits: ['Creative', 'Extrovert', 'Spontaneous', 'Artistic'],
    icebreakers: ['What\'s your favorite art style?', 'Do you enjoy dancing?'],
    education: 'Bachelor\'s in Fine Arts',
    profession: 'Creative',
    jobTitle: 'Graphic Designer',
    religion: 'Islam',
    sect: 'Sunni',
    prayerLevel: 'sometimes',
    hijabBeard: 'sometimes',
    religiousLevel: 'Moderate',
    ethnicity: ['Moroccan'],
    languages: ['Arabic', 'English', 'French'],
  },
];

interface ProfileCardProps {
  profile: typeof mockProfiles[0];
  isTop: boolean;
  onVerticalSwipe: (direction: 'up' | 'down') => void;
  onHorizontalSwipe: (direction: 'left' | 'right') => void;
  onPress: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isTop,
  onVerticalSwipe,
  onHorizontalSwipe,
  onPress,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(isTop ? 1 : 0.95);
  const rotate = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      console.log('Gesture started');
      if (isTop) {
        scale.value = withSpring(1.05);
      }
    },
    onActive: (event) => {
      console.log('Gesture active', { translationX: event.translationX, translationY: event.translationY });
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
      console.log('Gesture ended');
      if (isTop) {
        const isVerticalSwipe = Math.abs(event.translationY) > Math.abs(event.translationX);

        if (isVerticalSwipe) {
          const shouldSwipe = Math.abs(event.translationY) > VERTICAL_SWIPE_THRESHOLD;
          if (shouldSwipe) {
            translateY.value = withSpring(Math.sign(event.translationY) * screenHeight * 1.5);
            runOnJS(onVerticalSwipe)(event.translationY > 0 ? 'down' : 'up');
          } else {
            translateX.value = withSpring(0, { damping: 15, stiffness: 120 });
            translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
            rotate.value = withSpring(0, { damping: 15, stiffness: 120 });
          }
        } else {
          const shouldSwipe = Math.abs(event.translationX) > HORIZONTAL_SWIPE_THRESHOLD;
          if (shouldSwipe) {
            runOnJS(onHorizontalSwipe)(event.translationX > 0 ? 'right' : 'left');
          }
          // Always spring back for horizontal swipes
          translateX.value = withSpring(0, { damping: 15, stiffness: 120, mass: 0.5, restDisplacementThreshold: 0.1 });
          translateY.value = withSpring(0, { damping: 15, stiffness: 120, mass: 0.5, restDisplacementThreshold: 0.1 });
          rotate.value = withSpring(0, { damping: 15, stiffness: 120, mass: 0.5, restDisplacementThreshold: 0.1 });
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
      zIndex: isTop ? 3 : 2,
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
      <Animated.View style={[styles.card, animatedStyle]}>
        <TouchableOpacity style={styles.cardTouchable} onPress={onPress} activeOpacity={0.9}>
          <Image source={{ uri: profile.image }} style={styles.cardImage} />
          
          <Animated.View style={[styles.likeIndicator, likeOpacity]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.nopeIndicator, nopeOpacity]}>
            <Text style={styles.nopeText}>NOPE</Text>
          </Animated.View>
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.cardOverlay}
          >
            <View style={styles.cardContent}>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                <Text style={styles.location}>{profile.location}</Text>
              </View>
              
              <Text style={styles.bio}>{profile.bio}</Text>
              
              <View style={styles.interests}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState(mockProfiles);
  const router = useRouter();

  const advanceProfile = useCallback(() => {
    console.log('Advancing to next profile');
    setCurrentIndex(prev => (prev + 1) % profiles.length);
  }, [profiles.length]);

  const previousProfile = useCallback(() => {
    console.log('Returning to previous profile');
    setCurrentIndex(prev => (prev - 1 + profiles.length) % profiles.length);
  }, [profiles.length]);

  const handleVerticalSwipe = (direction: 'up' | 'down') => {
    console.log('Vertical swipe detected', { direction });
    if (direction === 'down') {
      advanceProfile();
    } else {
      previousProfile();
    }
  };

  const handleHorizontalSwipe = (direction: 'left' | 'right') => {
    console.log('Horizontal swipe detected', { direction });
    // if (direction === 'right') {
    //   Alert.alert('Liked!', `You liked ${profiles[currentIndex].name}`);
    // } else {
    //   Alert.alert('Passed', `You passed on ${profiles[currentIndex].name}`);
    // }
  };

  const handleProfilePress = (profileId: string) => {
    console.log('Profile pressed', { profileId });
    router.push(`/profile/${profileId}`);
  };

  const handleLike = () => {
    console.log('Like button pressed');
    // Alert.alert('Liked!', `You liked ${profiles[currentIndex].name}`);
    advanceProfile();
  };

  const handleNope = () => {
    console.log('Nope button pressed');
    // Alert.alert('Passed', `You passed on ${profiles[currentIndex].name}`);
    advanceProfile();
  };

  const handleSuperLike = () => {
    console.log('Super Like button pressed');
    // Alert.alert('Super Like!', `You super liked ${profiles[currentIndex].name}`);
    advanceProfile();
  };

  // Get the next 3 profiles to show, handling cycling
  const getVisibleProfiles = () => {
    console.log('Getting visible profiles');
    const visibleProfiles = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % profiles.length;
      visibleProfiles.push(profiles[index]);
    }
    return visibleProfiles;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardContainer}>
        {getVisibleProfiles().reverse().map((profile, index) => (
          <ProfileCard
            key={`${profile.id}-${currentIndex + index}`}
            profile={profile}
            isTop={index === 0}
            onVerticalSwipe={handleVerticalSwipe}
            onHorizontalSwipe={handleHorizontalSwipe}
            onPress={() => handleProfilePress(profile.id)}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.nopeButton]} onPress={handleNope}>
          <Ionicons name="close" size={32} color="#FF3E3E" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.likeButton]} onPress={handleLike}>
          <Ionicons name="heart" size={32} color="#4CAF50" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.superLikeButton]} onPress={handleSuperLike}>
          <Ionicons name="star" size={32} color="#FFC107" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH * 0.92,
    height: CARD_HEIGHT * 0.85,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 140,
    paddingHorizontal: 24,
  },
  cardContent: {
    padding: 24,
  },
  profileInfo: {
    marginBottom: 16,
  },
  name: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: -0.5,
  },
  location: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.95,
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontWeight: '500',
  },
  bio: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 26,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginBottom: 24,
    fontWeight: '400',
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 8,
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  likeIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(76,175,80,0.8)',
  },
  likeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  nopeIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,87,34,0.8)',
  },
  nopeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
    paddingBottom: 50,
    paddingTop: 30,
    gap: 40,
    zIndex: 10,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nopeButton: {
    backgroundColor: '#fff',
  },
  superLikeButton: {
    backgroundColor: '#fff',
  },
  likeButton: {
    backgroundColor: '#fff',
  },
  cardTouchable: {
    flex: 1,
  },
});
