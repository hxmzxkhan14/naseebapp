import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';

// Mock profile data - in a real app, this would come from an API
const mockProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    height: '165',
    bio: 'Adventure seeker and coffee enthusiast ☕️',
    location: 'New York, NY',
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
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
  },
  {
    id: '2',
    name: 'Alex',
    age: 28,
    height: '180',
    bio: 'Passionate about music and outdoor activities 🎵',
    location: 'Los Angeles, CA',
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    height: '160',
    bio: 'Book lover and weekend explorer 📚',
    location: 'Chicago, IL',
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
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: '4',
    name: 'Michael',
    age: 27,
    height: '175',
    bio: 'Tech enthusiast and fitness lover 💪',
    location: 'San Francisco, CA',
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
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '5',
    name: 'Jessica',
    age: 26,
    height: '168',
    bio: 'Creative soul who loves to paint and dance 🎨',
    location: 'Miami, FL',
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
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  },
];

interface LikeableItemProps {
  label: string;
  value: string | string[];
  onLike: () => void;
  onComment: () => void;
  isLiked?: boolean;
}

const LikeableItem: React.FC<LikeableItemProps> = ({ 
  label, 
  value, 
  onLike, 
  onComment, 
  isLiked = false 
}) => {
  const [lastTap, setLastTap] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
      // Double tap detected - Like
      if (tapTimeout) {
        clearTimeout(tapTimeout);
        setTapTimeout(null);
      }
      onLike();
      setLastTap(0);
    } else {
      // First tap - wait to see if second tap comes
      setLastTap(now);
      
      // Clear any existing timeout
      if (tapTimeout) {
        clearTimeout(tapTimeout);
      }
      
      // Set timeout to trigger comment if no second tap
      const timeout = setTimeout(() => {
        onComment();
        setLastTap(0);
        setTapTimeout(null);
      }, DOUBLE_TAP_DELAY);
      
      setTapTimeout(timeout);
    }
  };

  const formatValue = (val: string | string[]) => {
    if (Array.isArray(val)) {
      return val.join(', ');
    }
    return val;
  };

  return (
    <TouchableOpacity
      style={[styles.likeableItem, isLiked && styles.likeableItemLiked]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.likeableContent}>
        <Text style={styles.likeableLabel}>{label}:</Text>
        <Text style={styles.likeableValue}>{formatValue(value)}</Text>
        {isLiked && (
          <Ionicons name="heart" size={16} color="#34C759" style={styles.likeIcon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  aspect: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ 
  visible, 
  onClose, 
  onSubmit, 
  aspect 
}) => {
  const [comment, setComment] = useState('');
  const { currentTheme } = useTheme();

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.commentModalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.commentModal, { backgroundColor: currentTheme.colors.surface }]}>
          <View style={[styles.commentModalHeader, { borderBottomColor: currentTheme.colors.border }]}>
            <Text style={[styles.commentModalTitle, { color: currentTheme.colors.text }]}>Comment on {aspect}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={currentTheme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={[styles.commentInput, { 
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text,
              borderColor: currentTheme.colors.border
            }]}
            value={comment}
            onChangeText={setComment}
            placeholder={`What do you think about ${aspect.toLowerCase()}?`}
            placeholderTextColor={currentTheme.colors.textSecondary}
            multiline
            maxLength={200}
            autoFocus
          />
          
          <View style={styles.commentModalActions}>
            <TouchableOpacity style={[styles.cancelButton, { backgroundColor: currentTheme.colors.background }]} onPress={onClose}>
              <Text style={[styles.cancelButtonText, { color: currentTheme.colors.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.submitButton,
                comment.trim() ? { backgroundColor: currentTheme.colors.primary } : { backgroundColor: currentTheme.colors.border }
              ]} 
              onPress={handleSubmit}
              disabled={!comment.trim()}
            >
              <Text style={styles.submitButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function ProfileDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedAspect, setSelectedAspect] = useState('');
  
  // Find the profile by ID
  const profile = mockProfiles.find(p => p.id === id);
  
  if (!profile) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: currentTheme.colors.surface }]}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Profile Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: currentTheme.colors.text }]}>Profile not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatLocation = (location: any) => {
    return `${location.city}, ${location.state}, ${location.country}`;
  };

  const formatMaritalStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatFamilyType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatPrayerLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const formatHijabBeard = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const handleLike = (aspect: string) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(aspect)) {
      newLikedItems.delete(aspect);
      Alert.alert('Unliked', `You unliked ${aspect}`);
    } else {
      newLikedItems.add(aspect);
      Alert.alert('Liked!', `You liked ${aspect}`);
      
      // In a real app, this would send a message to the profile owner
      console.log(`Liked ${aspect} on ${profile.name}'s profile`);
    }
    setLikedItems(newLikedItems);
  };

  const handleComment = (aspect: string) => {
    setSelectedAspect(aspect);
    setCommentModalVisible(true);
  };

  const handleSubmitComment = (comment: string) => {
    Alert.alert('Comment Sent!', `Your comment about ${selectedAspect} has been sent to ${profile.name}`);
    
    // In a real app, this would send a message to the profile owner
    console.log(`Commented on ${selectedAspect}: "${comment}"`);
    
    // Navigate to messages or create conversation
    router.push('/messages');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color={currentTheme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Interaction Hint */}
        <View style={[styles.interactionHint, { backgroundColor: currentTheme.colors.surface }]}>
          <Ionicons name="information-circle-outline" size={16} color={currentTheme.colors.primary} />
          <Text style={[styles.hintText, { color: currentTheme.colors.textSecondary }]}>
            Tap once to comment, double-tap to like
          </Text>
        </View>

        {/* Profile Header */}
        <Card style={styles.profileHeader}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: currentTheme.colors.text }]}>{profile.name}, {profile.age}</Text>
            <Text style={[styles.profileLocation, { color: currentTheme.colors.textSecondary }]}>{formatLocation(profile.detailedLocation)}</Text>
            <Text style={[styles.profileBio, { color: currentTheme.colors.text }]}>{profile.bio}</Text>
          </View>
        </Card>

        {/* About Me Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          
          <LikeableItem
            label="Height"
            value={profile.height + ' cm'}
            onLike={() => handleLike('Height')}
            onComment={() => handleComment('Height')}
            isLiked={likedItems.has('Height')}
          />

          <LikeableItem
            label="Marital Status"
            value={formatMaritalStatus(profile.maritalStatus)}
            onLike={() => handleLike('Marital Status')}
            onComment={() => handleComment('Marital Status')}
            isLiked={likedItems.has('Marital Status')}
          />

          {profile.hasKids && (
            <LikeableItem
              label="Children"
              value="Yes"
              onLike={() => handleLike('Children')}
              onComment={() => handleComment('Children')}
              isLiked={likedItems.has('Children')}
            />
          )}
        </Card>

        {/* Marriage Goals Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Marriage Goals</Text>
          
          <LikeableItem
            label="Marriage Timeline"
            value={profile.marriageTimeline}
            onLike={() => handleLike('Marriage Timeline')}
            onComment={() => handleComment('Marriage Timeline')}
            isLiked={likedItems.has('Marriage Timeline')}
          />

          <LikeableItem
            label="Open to Relocate"
            value={profile.openToRelocate ? 'Yes' : 'No'}
            onLike={() => handleLike('Open to Relocate')}
            onComment={() => handleComment('Open to Relocate')}
            isLiked={likedItems.has('Open to Relocate')}
          />

          <LikeableItem
            label="Living Plans"
            value={profile.livingPlans}
            onLike={() => handleLike('Living Plans')}
            onComment={() => handleComment('Living Plans')}
            isLiked={likedItems.has('Living Plans')}
          />
        </Card>

        {/* Personal Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Personal</Text>
          
          <LikeableItem
            label="Family Type"
            value={formatFamilyType(profile.familyType)}
            onLike={() => handleLike('Family Type')}
            onComment={() => handleComment('Family Type')}
            isLiked={likedItems.has('Family Type')}
          />

          <LikeableItem
            label="Current Household"
            value={profile.household}
            onLike={() => handleLike('Current Household')}
            onComment={() => handleComment('Current Household')}
            isLiked={likedItems.has('Current Household')}
          />

          <LikeableItem
            label="Living Situation"
            value={profile.currentLiving}
            onLike={() => handleLike('Living Situation')}
            onComment={() => handleComment('Living Situation')}
            isLiked={likedItems.has('Living Situation')}
          />

          <LikeableItem
            label="Fitness"
            value={profile.fitness ? 'Yes' : 'No'}
            onLike={() => handleLike('Fitness')}
            onComment={() => handleComment('Fitness')}
            isLiked={likedItems.has('Fitness')}
          />

          <LikeableItem
            label="Smoking"
            value={profile.smoking ? 'Yes' : 'No'}
            onLike={() => handleLike('Smoking')}
            onComment={() => handleComment('Smoking')}
            isLiked={likedItems.has('Smoking')}
          />

          <LikeableItem
            label="Drinking"
            value={profile.drinking ? 'Yes' : 'No'}
            onLike={() => handleLike('Drinking')}
            onComment={() => handleComment('Drinking')}
            isLiked={likedItems.has('Drinking')}
          />
        </Card>

        {/* Interests Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          
          <LikeableItem
            label="Hobbies"
            value={profile.hobbies}
            onLike={() => handleLike('Hobbies')}
            onComment={() => handleComment('Hobbies')}
            isLiked={likedItems.has('Hobbies')}
          />

          <LikeableItem
            label="Personality Traits"
            value={profile.personalityTraits}
            onLike={() => handleLike('Personality Traits')}
            onComment={() => handleComment('Personality Traits')}
            isLiked={likedItems.has('Personality Traits')}
          />

          <Text style={styles.subsectionTitle}>Icebreakers</Text>
          {profile.icebreakers.map((icebreaker, index) => (
            <LikeableItem
              key={index}
              label={`Icebreaker ${index + 1}`}
              value={icebreaker}
              onLike={() => handleLike(`Icebreaker ${index + 1}`)}
              onComment={() => handleComment(`Icebreaker ${index + 1}`)}
              isLiked={likedItems.has(`Icebreaker ${index + 1}`)}
            />
          ))}
        </Card>

        {/* Education & Career Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Career</Text>
          
          <LikeableItem
            label="Education"
            value={profile.education}
            onLike={() => handleLike('Education')}
            onComment={() => handleComment('Education')}
            isLiked={likedItems.has('Education')}
          />

          <LikeableItem
            label="Profession"
            value={profile.profession}
            onLike={() => handleLike('Profession')}
            onComment={() => handleComment('Profession')}
            isLiked={likedItems.has('Profession')}
          />

          <LikeableItem
            label="Job Title"
            value={profile.jobTitle}
            onLike={() => handleLike('Job Title')}
            onComment={() => handleComment('Job Title')}
            isLiked={likedItems.has('Job Title')}
          />
        </Card>

        {/* Deen Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Deen</Text>
          
          <LikeableItem
            label="Religion"
            value={profile.religion}
            onLike={() => handleLike('Religion')}
            onComment={() => handleComment('Religion')}
            isLiked={likedItems.has('Religion')}
          />

          <LikeableItem
            label="Sect"
            value={profile.sect}
            onLike={() => handleLike('Sect')}
            onComment={() => handleComment('Sect')}
            isLiked={likedItems.has('Sect')}
          />

          <LikeableItem
            label="Prayer Level"
            value={formatPrayerLevel(profile.prayerLevel)}
            onLike={() => handleLike('Prayer Level')}
            onComment={() => handleComment('Prayer Level')}
            isLiked={likedItems.has('Prayer Level')}
          />

          <LikeableItem
            label="Hijab/Beard"
            value={formatHijabBeard(profile.hijabBeard)}
            onLike={() => handleLike('Hijab/Beard')}
            onComment={() => handleComment('Hijab/Beard')}
            isLiked={likedItems.has('Hijab/Beard')}
          />

          <LikeableItem
            label="Religious Level"
            value={profile.religiousLevel}
            onLike={() => handleLike('Religious Level')}
            onComment={() => handleComment('Religious Level')}
            isLiked={likedItems.has('Religious Level')}
          />
        </Card>

        {/* Languages & Ethnicity Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Languages & Ethnicity</Text>
          
          <LikeableItem
            label="Ethnicity"
            value={profile.ethnicity}
            onLike={() => handleLike('Ethnicity')}
            onComment={() => handleComment('Ethnicity')}
            isLiked={likedItems.has('Ethnicity')}
          />

          <LikeableItem
            label="Languages"
            value={profile.languages}
            onLike={() => handleLike('Languages')}
            onComment={() => handleComment('Languages')}
            isLiked={likedItems.has('Languages')}
          />
        </Card>
      </ScrollView>

      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        onSubmit={handleSubmitComment}
        aspect={selectedAspect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    margin: 20,
    padding: 0,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  profileInfo: {
    padding: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 16,
    lineHeight: 22,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  likeableItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 44, // iOS minimum touch target
  },
  likeableItemLiked: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#34C759',
  },
  likeableContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  likeableLabel: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: '500',
  },
  likeableValue: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  likeIcon: {
    marginLeft: 8,
  },
  commentModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
    paddingBottom: 40,
  },
  commentModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  commentModalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  commentInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    lineHeight: 22,
    borderWidth: 1,
  },
  commentModalActions: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
  interactionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    marginLeft: 8,
  },
}); 