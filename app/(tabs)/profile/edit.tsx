import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Input, Card } from '@/components/ui';
import { lightTheme } from '@/constants/theme';

interface ProfileData {
  // Basic Info
  name: string;
  age: string;
  height: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  
  // Marital Status
  maritalStatus: 'single' | 'previously_married' | 'annulled';
  hasKids: boolean;
  
  // Marriage Goals
  marriageTimeline: string;
  openToRelocate: boolean;
  livingPlans: string;
  
  // Personal
  familyType: 'nuclear' | 'single_parent' | 'extended';
  household: string;
  currentLiving: string;
  fitness: boolean;
  smoking: boolean;
  drinking: boolean;
  
  // Interests
  hobbies: string[];
  personalityTraits: string[];
  icebreakers: string[];
  
  // Education/Career
  education: string;
  profession: string;
  jobTitle: string;
  
  // Deen
  religion: string;
  sect: string;
  prayerLevel: 'always' | 'sometimes' | 'never';
  hijabBeard: 'yes' | 'no' | 'sometimes';
  religiousLevel: string;
  
  // Languages/Ethnicity
  ethnicity: string[];
  languages: string[];
}

const HOBBIES_OPTIONS = [
  'Reading', 'Travel', 'Cooking', 'Photography', 'Music', 'Sports',
  'Art', 'Gaming', 'Hiking', 'Swimming', 'Yoga', 'Dancing',
  'Writing', 'Gardening', 'Fishing', 'Painting', 'Sewing', 'Knitting'
];

const PERSONALITY_TRAITS = [
  'Introvert', 'Extrovert', 'Ambitious', 'Creative', 'Analytical',
  'Empathetic', 'Adventurous', 'Cautious', 'Optimistic', 'Realistic',
  'Spontaneous', 'Organized', 'Flexible', 'Determined', 'Patient'
];

const ETHNICITY_OPTIONS = [
  'Arab', 'Pakistani', 'Indian', 'Bangladeshi', 'Turkish', 'Malaysian',
  'Indonesian', 'Somali', 'Sudanese', 'Egyptian', 'Moroccan', 'Algerian',
  'Tunisian', 'Libyan', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian',
  'Palestinian', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni',
  'Saudi', 'Emirati', 'Other'
];

const LANGUAGE_OPTIONS = [
  'Arabic', 'English', 'Urdu', 'Hindi', 'Bengali', 'Turkish',
  'Malay', 'Indonesian', 'Somali', 'French', 'Spanish', 'German',
  'Persian', 'Kurdish', 'Other'
];

export default function EditProfileScreen() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    age: '',
    height: '',
    location: { country: '', state: '', city: '' },
    maritalStatus: 'single',
    hasKids: false,
    marriageTimeline: '',
    openToRelocate: false,
    livingPlans: '',
    familyType: 'nuclear',
    household: '',
    currentLiving: '',
    fitness: false,
    smoking: false,
    drinking: false,
    hobbies: [],
    personalityTraits: [],
    icebreakers: [],
    education: '',
    profession: '',
    jobTitle: '',
    religion: 'Islam',
    sect: '',
    prayerLevel: 'sometimes',
    hijabBeard: 'sometimes',
    religiousLevel: '',
    ethnicity: [],
    languages: [],
  });

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedEthnicity, setSelectedEthnicity] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const updateProfileData = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (
    item: string,
    currentSelection: string[],
    setSelection: (items: string[]) => void,
    maxSelections: number = 5
  ) => {
    if (currentSelection.includes(item)) {
      setSelection(currentSelection.filter(i => i !== item));
    } else if (currentSelection.length < maxSelections) {
      setSelection([...currentSelection, item]);
    } else {
      Alert.alert('Maximum Selection', `You can only select up to ${maxSelections} items.`);
    }
  };

  const SelectionChips = ({ 
    options, 
    selected, 
    onToggle, 
    maxSelections = 5 
  }: {
    options: string[];
    selected: string[];
    onToggle: (item: string) => void;
    maxSelections?: number;
  }) => (
    <View style={styles.chipsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.chip,
            selected.includes(option) && styles.chipSelected
          ]}
          onPress={() => onToggle(option)}
        >
          <Text style={[
            styles.chipText,
            selected.includes(option) && styles.chipTextSelected
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSave = () => {
    // Update profile data with selected items
    const updatedData = {
      ...profileData,
      hobbies: selectedHobbies,
      personalityTraits: selectedTraits,
      ethnicity: selectedEthnicity,
      languages: selectedLanguages,
    };
    
    // Here you would typically save to backend
    console.log('Saving profile:', updatedData);
    Alert.alert('Success', 'Profile updated successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Card style={styles.section}>
          <View style={styles.headerSection}>
            <View style={styles.profilePreview}>
              <View style={styles.profileImage}>
                <Ionicons name="person" size={40} color={lightTheme.colors.textSecondary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData.name || 'Your Name'}</Text>
                <Text style={styles.profileSubtitle}>Preview</Text>
                <View style={styles.completionStatus}>
                  <Text style={styles.completionText}>Profile Completion: 75%</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '75%' }]} />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={20} color={lightTheme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* About Me Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={profileData.name}
            onChangeText={(text) => updateProfileData('name', text)}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Age"
                placeholder="Age"
                value={profileData.age}
                onChangeText={(text) => updateProfileData('age', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Height"
                placeholder="Height (cm)"
                value={profileData.height}
                onChangeText={(text) => updateProfileData('height', text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Input
            label="Country"
            placeholder="Country"
            value={profileData.location.country}
            onChangeText={(text) => updateProfileData('location', { ...profileData.location, country: text })}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="State/Province"
                placeholder="State"
                value={profileData.location.state}
                onChangeText={(text) => updateProfileData('location', { ...profileData.location, state: text })}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="City"
                placeholder="City"
                value={profileData.location.city}
                onChangeText={(text) => updateProfileData('location', { ...profileData.location, city: text })}
              />
            </View>
          </View>

          <View style={styles.selectContainer}>
            <Text style={styles.label}>Marital Status</Text>
            <View style={styles.radioGroup}>
              {['single', 'previously_married', 'annulled'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.radioButton,
                    profileData.maritalStatus === status && styles.radioButtonSelected
                  ]}
                  onPress={() => updateProfileData('maritalStatus', status)}
                >
                  <Text style={[
                    styles.radioText,
                    profileData.maritalStatus === status && styles.radioTextSelected
                  ]}>
                    {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Do you have children?</Text>
            <Switch
              value={profileData.hasKids}
              onValueChange={(value) => updateProfileData('hasKids', value)}
              trackColor={{ false: lightTheme.colors.border, true: lightTheme.colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Marriage Goals Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Marriage Goals</Text>
          
          <Input
            label="Marriage Timeline"
            placeholder="e.g., Within 1 year"
            value={profileData.marriageTimeline}
            onChangeText={(text) => updateProfileData('marriageTimeline', text)}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Open to relocate?</Text>
            <Switch
              value={profileData.openToRelocate}
              onValueChange={(value) => updateProfileData('openToRelocate', value)}
              trackColor={{ false: lightTheme.colors.border, true: lightTheme.colors.primary }}
              thumbColor="#fff"
            />
          </View>

          <Input
            label="Living Plans After Marriage"
            placeholder="e.g., With family, Apartment, etc."
            value={profileData.livingPlans}
            onChangeText={(text) => updateProfileData('livingPlans', text)}
          />
        </Card>

        {/* Personal Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Personal</Text>
          
          <View style={styles.selectContainer}>
            <Text style={styles.label}>Family Type</Text>
            <View style={styles.radioGroup}>
              {['nuclear', 'single_parent', 'extended'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.radioButton,
                    profileData.familyType === type && styles.radioButtonSelected
                  ]}
                  onPress={() => updateProfileData('familyType', type)}
                >
                  <Text style={[
                    styles.radioText,
                    profileData.familyType === type && styles.radioTextSelected
                  ]}>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Input
            label="Current Household"
            placeholder="e.g., Live alone, with family"
            value={profileData.household}
            onChangeText={(text) => updateProfileData('household', text)}
          />

          <Input
            label="Current Living Situation"
            placeholder="e.g., Roommates, Parents, Alone"
            value={profileData.currentLiving}
            onChangeText={(text) => updateProfileData('currentLiving', text)}
          />

          <View style={styles.switchRow}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Fitness/Exercise</Text>
              <Switch
                value={profileData.fitness}
                onValueChange={(value) => updateProfileData('fitness', value)}
                trackColor={{ false: lightTheme.colors.border, true: lightTheme.colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Smoking</Text>
              <Switch
                value={profileData.smoking}
                onValueChange={(value) => updateProfileData('smoking', value)}
                trackColor={{ false: lightTheme.colors.border, true: lightTheme.colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Drinking</Text>
              <Switch
                value={profileData.drinking}
                onValueChange={(value) => updateProfileData('drinking', value)}
                trackColor={{ false: lightTheme.colors.border, true: lightTheme.colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </Card>

        {/* Interests Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          
          <Text style={styles.label}>Sports/Hobbies (Select up to 5)</Text>
          <SelectionChips
            options={HOBBIES_OPTIONS}
            selected={selectedHobbies}
            onToggle={(item) => toggleSelection(item, selectedHobbies, setSelectedHobbies, 5)}
            maxSelections={5}
          />

          <Text style={styles.label}>Personality Traits (Select up to 5)</Text>
          <SelectionChips
            options={PERSONALITY_TRAITS}
            selected={selectedTraits}
            onToggle={(item) => toggleSelection(item, selectedTraits, setSelectedTraits, 5)}
            maxSelections={5}
          />

          <Input
            label="Icebreaker"
            placeholder="Tell us something interesting about yourself"
            value={profileData.icebreakers.join(', ')}
            onChangeText={(text) => updateProfileData('icebreakers', text.split(', ').filter(Boolean))}
            multiline
            numberOfLines={3}
          />
        </Card>

        {/* Education/Career Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Education / Career</Text>
          
          <Input
            label="Education"
            placeholder="e.g., Bachelor's in Computer Science"
            value={profileData.education}
            onChangeText={(text) => updateProfileData('education', text)}
          />

          <Input
            label="Profession"
            placeholder="e.g., Software Development"
            value={profileData.profession}
            onChangeText={(text) => updateProfileData('profession', text)}
          />

          <Input
            label="Job Title"
            placeholder="e.g., Software Developer @ Google"
            value={profileData.jobTitle}
            onChangeText={(text) => updateProfileData('jobTitle', text)}
          />
        </Card>

        {/* Deen Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Deen</Text>
          
          <Input
            label="Religion"
            placeholder="Religion"
            value={profileData.religion}
            onChangeText={(text) => updateProfileData('religion', text)}
          />

          <Input
            label="Sect"
            placeholder="e.g., Sunni, Shia"
            value={profileData.sect}
            onChangeText={(text) => updateProfileData('sect', text)}
          />

          <View style={styles.selectContainer}>
            <Text style={styles.label}>Prayer Level</Text>
            <View style={styles.radioGroup}>
              {['always', 'sometimes', 'never'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.radioButton,
                    profileData.prayerLevel === level && styles.radioButtonSelected
                  ]}
                  onPress={() => updateProfileData('prayerLevel', level)}
                >
                  <Text style={[
                    styles.radioText,
                    profileData.prayerLevel === level && styles.radioTextSelected
                  ]}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.selectContainer}>
            <Text style={styles.label}>Hijab/Beard</Text>
            <View style={styles.radioGroup}>
              {['yes', 'no', 'sometimes'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioButton,
                    profileData.hijabBeard === option && styles.radioButtonSelected
                  ]}
                  onPress={() => updateProfileData('hijabBeard', option)}
                >
                  <Text style={[
                    styles.radioText,
                    profileData.hijabBeard === option && styles.radioTextSelected
                  ]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Input
            label="Religious Level"
            placeholder="e.g., Practicing, Learning"
            value={profileData.religiousLevel}
            onChangeText={(text) => updateProfileData('religiousLevel', text)}
          />
        </Card>

        {/* Languages/Ethnicity Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Languages / Ethnicity</Text>
          
          <Text style={styles.label}>Ethnicity (Select up to 3)</Text>
          <SelectionChips
            options={ETHNICITY_OPTIONS}
            selected={selectedEthnicity}
            onToggle={(item) => toggleSelection(item, selectedEthnicity, setSelectedEthnicity, 3)}
            maxSelections={3}
          />

          <Text style={styles.label}>Languages (Select up to 5)</Text>
          <SelectionChips
            options={LANGUAGE_OPTIONS}
            selected={selectedLanguages}
            onToggle={(item) => toggleSelection(item, selectedLanguages, setSelectedLanguages, 5)}
            maxSelections={5}
          />
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
    backgroundColor: lightTheme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },
  backButton: {
    padding: lightTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.colors.text,
  },
  saveButton: {
    padding: lightTheme.spacing.sm,
  },
  saveButtonText: {
    color: lightTheme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: lightTheme.spacing.md,
  },
  section: {
    marginVertical: lightTheme.spacing.sm,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: lightTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: lightTheme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
    marginBottom: lightTheme.spacing.sm,
  },
  completionStatus: {
    marginTop: lightTheme.spacing.xs,
  },
  completionText: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: lightTheme.colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: lightTheme.colors.primary,
    borderRadius: 2,
  },
  editButton: {
    padding: lightTheme.spacing.sm,
    backgroundColor: lightTheme.colors.background,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: lightTheme.spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.sm,
  },
  selectContainer: {
    marginBottom: lightTheme.spacing.md,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: lightTheme.spacing.sm,
  },
  radioButton: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
  },
  radioButtonSelected: {
    backgroundColor: lightTheme.colors.primary,
    borderColor: lightTheme.colors.primary,
  },
  radioText: {
    fontSize: 14,
    color: lightTheme.colors.text,
  },
  radioTextSelected: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.md,
  },
  switchRow: {
    gap: lightTheme.spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: lightTheme.spacing.sm,
    marginBottom: lightTheme.spacing.md,
  },
  chip: {
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    borderRadius: lightTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
  },
  chipSelected: {
    backgroundColor: lightTheme.colors.primary,
    borderColor: lightTheme.colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: lightTheme.colors.text,
  },
  chipTextSelected: {
    color: '#fff',
  },
  bottomSpacing: {
    height: lightTheme.spacing.xl,
  },
}); 