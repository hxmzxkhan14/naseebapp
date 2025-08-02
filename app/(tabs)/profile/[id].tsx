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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

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
    router.push('/(tabs)/messages');
  };

  const generateProfileHTML = () => {
    const formatArray = (arr: string[]) => arr.join(', ');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${profile.name}'s Profile</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .profile-image-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .profile-image-text {
            font-size: 48px;
            font-weight: bold;
            color: white;
          }
          .profile-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .profile-location {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 16px;
          }
          .profile-bio {
            font-size: 16px;
            line-height: 1.6;
            opacity: 0.95;
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #3498db;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .info-item {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
          }
          .info-label {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 4px;
            font-size: 14px;
          }
          .info-value {
            color: #555;
            font-size: 16px;
          }
          .full-width {
            grid-column: 1 / -1;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          .tag {
            background: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
          }
          .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 14px;
          }
          .generated-date {
            color: #bdc3c7;
            margin-top: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="profile-image-placeholder">
              <div class="profile-image-text">${profile.name.charAt(0).toUpperCase()}</div>
            </div>
            <div class="profile-name">${profile.name}, ${profile.age}</div>
            <div class="profile-location">${formatLocation(profile.detailedLocation)}</div>
            <div class="profile-bio">${profile.bio}</div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">About Me</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Height</div>
                  <div class="info-value">${profile.height} cm</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Marital Status</div>
                  <div class="info-value">${formatMaritalStatus(profile.maritalStatus)}</div>
                </div>
                ${profile.hasKids ? `
                <div class="info-item">
                  <div class="info-label">Children</div>
                  <div class="info-value">Yes</div>
                </div>
                ` : ''}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Marriage Goals</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Marriage Timeline</div>
                  <div class="info-value">${profile.marriageTimeline}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Open to Relocate</div>
                  <div class="info-value">${profile.openToRelocate ? 'Yes' : 'No'}</div>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">Living Plans</div>
                  <div class="info-value">${profile.livingPlans}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Personal</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Family Type</div>
                  <div class="info-value">${formatFamilyType(profile.familyType)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Current Household</div>
                  <div class="info-value">${profile.household}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Living Situation</div>
                  <div class="info-value">${profile.currentLiving}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Fitness</div>
                  <div class="info-value">${profile.fitness ? 'Yes' : 'No'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Smoking</div>
                  <div class="info-value">${profile.smoking ? 'Yes' : 'No'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Drinking</div>
                  <div class="info-value">${profile.drinking ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Interests</div>
              <div class="info-item full-width">
                <div class="info-label">Hobbies</div>
                <div class="tags">
                  ${profile.hobbies.map(hobby => `<span class="tag">${hobby}</span>`).join('')}
                </div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">Personality Traits</div>
                <div class="tags">
                  ${profile.personalityTraits.map(trait => `<span class="tag">${trait}</span>`).join('')}
                </div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">Icebreakers</div>
                <div class="info-value">
                  ${profile.icebreakers.map((icebreaker, index) => `${index + 1}. ${icebreaker}`).join('<br>')}
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Education & Career</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Education</div>
                  <div class="info-value">${profile.education}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Profession</div>
                  <div class="info-value">${profile.profession}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Job Title</div>
                  <div class="info-value">${profile.jobTitle}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Deen</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Religion</div>
                  <div class="info-value">${profile.religion}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Sect</div>
                  <div class="info-value">${profile.sect}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Prayer Level</div>
                  <div class="info-value">${formatPrayerLevel(profile.prayerLevel)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Hijab/Beard</div>
                  <div class="info-value">${formatHijabBeard(profile.hijabBeard)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Religious Level</div>
                  <div class="info-value">${profile.religiousLevel}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Languages & Ethnicity</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Ethnicity</div>
                  <div class="info-value">${formatArray(profile.ethnicity)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Languages</div>
                  <div class="info-value">${formatArray(profile.languages)}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div>Generated from Naseeb - Islamic Dating App</div>
            <div class="generated-date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const generateProfileText = () => {
    const formatArray = (arr: string[]) => arr.join(', ');
    
    return `
${profile.name.toUpperCase()}'S PROFILE
${'='.repeat(50)}

BASIC INFORMATION
${'-'.repeat(20)}
Name: ${profile.name}
Age: ${profile.age}
Height: ${profile.height} cm
Location: ${formatLocation(profile.detailedLocation)}
Bio: ${profile.bio}

MARITAL STATUS
${'-'.repeat(20)}
Status: ${formatMaritalStatus(profile.maritalStatus)}
${profile.hasKids ? 'Children: Yes' : 'Children: No'}

MARRIAGE GOALS
${'-'.repeat(20)}
Timeline: ${profile.marriageTimeline}
Open to Relocate: ${profile.openToRelocate ? 'Yes' : 'No'}
Living Plans: ${profile.livingPlans}

PERSONAL DETAILS
${'-'.repeat(20)}
Family Type: ${formatFamilyType(profile.familyType)}
Current Household: ${profile.household}
Living Situation: ${profile.currentLiving}
Fitness: ${profile.fitness ? 'Yes' : 'No'}
Smoking: ${profile.smoking ? 'Yes' : 'No'}
Drinking: ${profile.drinking ? 'Yes' : 'No'}

INTERESTS & PERSONALITY
${'-'.repeat(20)}
Hobbies: ${formatArray(profile.hobbies)}
Personality Traits: ${formatArray(profile.personalityTraits)}

Icebreakers:
${profile.icebreakers.map((icebreaker, index) => `${index + 1}. ${icebreaker}`).join('\n')}

EDUCATION & CAREER
${'-'.repeat(20)}
Education: ${profile.education}
Profession: ${profile.profession}
Job Title: ${profile.jobTitle}

DEEN (RELIGIOUS PRACTICES)
${'-'.repeat(20)}
Religion: ${profile.religion}
Sect: ${profile.sect}
Prayer Level: ${formatPrayerLevel(profile.prayerLevel)}
Hijab/Beard: ${formatHijabBeard(profile.hijabBeard)}
Religious Level: ${profile.religiousLevel}

LANGUAGES & ETHNICITY
${'-'.repeat(20)}
Ethnicity: ${formatArray(profile.ethnicity)}
Languages: ${formatArray(profile.languages)}

${'='.repeat(50)}
Generated from Naseeb - Islamic Dating App
Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
${'='.repeat(50)}
    `.trim();
  };

  const handleExportPDF = async () => {
    console.log('Export button clicked!'); // Debug log
    
    try {
      // Simple direct download without confirmation for testing
      const profileText = generateProfileText();
      console.log('Profile text generated:', profileText.substring(0, 100) + '...'); // Debug log
      
      // Check if we're in a web environment
      if (typeof window !== 'undefined') {
        console.log('Running in web environment'); // Debug log
        
        // Create and download text file
        const blob = new Blob([profileText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${profile.name}_Profile_${Date.now()}.txt`;
        link.style.display = 'none';
        
        console.log('About to trigger download...'); // Debug log
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('Download should have started'); // Debug log
        
        Alert.alert(
          'Profile Exported Successfully!',
          `${profile.name}'s profile has been downloaded as a text file.`,
          [{ text: 'OK' }]
        );
      } else {
        console.log('Running in native environment'); // Debug log
        
        // Native mobile app - save as text file
        const fileName = `${profile.name}_Profile_${Date.now()}.txt`;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;
        
        await FileSystem.writeAsStringAsync(filePath, profileText);
        
        Alert.alert(
          'Profile Exported Successfully!',
          `Profile saved as: ${fileName}`,
          [
            { text: 'OK' },
            {
              text: 'Share',
              onPress: async () => {
                try {
                  await Sharing.shareAsync(filePath, {
                    mimeType: 'text/plain',
                    dialogTitle: `Share ${profile.name}'s Profile`,
                  });
                } catch (error) {
                  Alert.alert('Error', 'Failed to share profile');
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', `Failed to export profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => {
              console.log('Download button pressed!'); // Debug log
              handleExportPDF();
            }}
          >
            <Ionicons name="download-outline" size={24} color={currentTheme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // Simple test download
              const testText = 'This is a test file from Naseeb app!';
              const blob = new Blob([testText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'test.txt';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              Alert.alert('Test', 'Test file downloaded!');
            }}
          >
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
    gap: 8,
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