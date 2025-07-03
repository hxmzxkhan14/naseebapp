import { Profile } from '@/types';

// Mock profile data
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    bio: 'Adventure seeker and coffee enthusiast ☕️',
    location: 'New York, NY',
    interests: ['Travel', 'Photography', 'Yoga'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
  },
  {
    id: '2',
    name: 'Alex',
    age: 28,
    bio: 'Passionate about music and outdoor activities 🎵',
    location: 'Los Angeles, CA',
    interests: ['Music', 'Hiking', 'Cooking'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    bio: 'Book lover and weekend explorer 📚',
    location: 'Chicago, IL',
    interests: ['Reading', 'Art', 'Travel'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: '4',
    name: 'Michael',
    age: 27,
    bio: 'Tech enthusiast and fitness lover 💪',
    location: 'San Francisco, CA',
    interests: ['Technology', 'Fitness', 'Gaming'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '5',
    name: 'Jessica',
    age: 26,
    bio: 'Creative soul who loves to paint and dance 🎨',
    location: 'Miami, FL',
    interests: ['Art', 'Dance', 'Beach'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  },
  {
    id: '6',
    name: 'David',
    age: 29,
    bio: 'Foodie and craft beer enthusiast 🍺',
    location: 'Portland, OR',
    interests: ['Cooking', 'Beer', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    id: '7',
    name: 'Sophie',
    age: 23,
    bio: 'Fitness trainer and wellness advocate 💪',
    location: 'Austin, TX',
    interests: ['Fitness', 'Wellness', 'Outdoors'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  },
  {
    id: '8',
    name: 'Ryan',
    age: 26,
    bio: 'Entrepreneur and coffee addict ☕',
    location: 'Seattle, WA',
    interests: ['Business', 'Coffee', 'Travel'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ProfilesService {
  // Get all available profiles
  static async getProfiles(): Promise<Profile[]> {
    await delay(500); // Simulate network delay
    return [...mockProfiles];
  }

  // Get a specific profile by ID
  static async getProfileById(id: string): Promise<Profile | null> {
    await delay(300);
    return mockProfiles.find(profile => profile.id === id) || null;
  }

  // Like a profile (in a real app, this would send to backend)
  static async likeProfile(profileId: string): Promise<{ success: boolean; message: string }> {
    await delay(800);
    const profile = mockProfiles.find(p => p.id === profileId);
    if (!profile) {
      return { success: false, message: 'Profile not found' };
    }
    return { success: true, message: `You liked ${profile.name}!` };
  }

  // Pass on a profile
  static async passProfile(profileId: string): Promise<{ success: boolean; message: string }> {
    await delay(500);
    return { success: true, message: 'Profile passed' };
  }

  // Super like a profile
  static async superLikeProfile(profileId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    const profile = mockProfiles.find(p => p.id === profileId);
    if (!profile) {
      return { success: false, message: 'Profile not found' };
    }
    return { success: true, message: `You super liked ${profile.name}!` };
  }

  // Get profiles by location (mock filtering)
  static async getProfilesByLocation(location: string): Promise<Profile[]> {
    await delay(600);
    return mockProfiles.filter(profile => 
      profile.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Get profiles by age range
  static async getProfilesByAgeRange(minAge: number, maxAge: number): Promise<Profile[]> {
    await delay(400);
    return mockProfiles.filter(profile => 
      profile.age >= minAge && profile.age <= maxAge
    );
  }

  // Get profiles by interests
  static async getProfilesByInterests(interests: string[]): Promise<Profile[]> {
    await delay(700);
    return mockProfiles.filter(profile => 
      interests.some(interest => 
        profile.interests.some(profileInterest => 
          profileInterest.toLowerCase().includes(interest.toLowerCase())
        )
      )
    );
  }
} 