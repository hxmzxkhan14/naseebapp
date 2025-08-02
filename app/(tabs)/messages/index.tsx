import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    profileId: '1',
    profileName: 'Sarah',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    lastMessage: 'I love your travel photos!',
    lastMessageTime: '2 hours ago',
    unreadCount: 2,
    messages: [
      {
        id: '1',
        type: 'like',
        content: 'Travel',
        message: 'I love your travel photos!',
        timestamp: '2024-01-15T10:30:00Z',
        isFromMe: true,
      },
      {
        id: '2',
        type: 'comment',
        content: 'Photography',
        message: 'Your photography skills are amazing!',
        timestamp: '2024-01-15T11:00:00Z',
        isFromMe: true,
      },
      {
        id: '3',
        type: 'text',
        content: '',
        message: 'Thank you! I love taking photos during my travels.',
        timestamp: '2024-01-15T11:15:00Z',
        isFromMe: false,
      },
    ],
  },
  {
    id: '2',
    profileId: '2',
    profileName: 'Alex',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    lastMessage: 'Thanks for the like on my music!',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        type: 'like',
        content: 'Music',
        message: 'I love your taste in music!',
        timestamp: '2024-01-14T15:30:00Z',
        isFromMe: true,
      },
      {
        id: '2',
        type: 'text',
        content: '',
        message: 'Thanks for the like on my music!',
        timestamp: '2024-01-14T16:00:00Z',
        isFromMe: false,
      },
    ],
  },
  {
    id: '3',
    profileId: '3',
    profileName: 'Emma',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    lastMessage: 'What books do you recommend?',
    lastMessageTime: '3 days ago',
    unreadCount: 1,
    messages: [
      {
        id: '1',
        type: 'like',
        content: 'Reading',
        message: 'I love reading too!',
        timestamp: '2024-01-12T09:30:00Z',
        isFromMe: true,
      },
      {
        id: '2',
        type: 'text',
        content: '',
        message: 'What books do you recommend?',
        timestamp: '2024-01-12T10:00:00Z',
        isFromMe: false,
      },
    ],
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const renderConversation = ({ item }: { item: typeof mockConversations[0] }) => (
    <TouchableOpacity
      style={[styles.conversationItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
      onPress={() => router.push(`/messages/${item.id}`)}
    >
      <Image source={{ uri: item.profileImage }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.name, { color: currentTheme.colors.text }]}>{item.profileName}</Text>
          <Text style={[styles.time, { color: currentTheme.colors.textSecondary }]}>{item.lastMessageTime}</Text>
        </View>
        <Text style={[styles.lastMessage, { color: currentTheme.colors.textSecondary }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: currentTheme.colors.primary }]}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Ionicons name="create-outline" size={24} color={currentTheme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationList}
        showsVerticalScrollIndicator={false}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  newMessageButton: {
    padding: 16,
  },
  conversationList: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  time: {
    fontSize: 13,
  },
  lastMessage: {
    fontSize: 15,
    lineHeight: 22,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 