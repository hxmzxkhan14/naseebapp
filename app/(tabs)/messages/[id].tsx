import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { lightTheme } from '@/constants/theme';

// Mock conversations data (same as in messages.tsx)
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

interface MessageItemProps {
  message: {
    id: string;
    type: 'like' | 'comment' | 'text';
    content: string;
    message: string;
    timestamp: string;
    isFromMe: boolean;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case 'like':
        return <Ionicons name="heart" size={16} color="#34C759" />;
      case 'comment':
        return <Ionicons name="chatbubble" size={16} color="#007AFF" />;
      default:
        return null;
    }
  };

  return (
    <View style={[
      styles.messageContainer,
      message.isFromMe ? styles.messageFromMe : styles.messageFromOther
    ]}>
      <View style={[
        styles.messageBubble,
        message.isFromMe ? styles.messageBubbleFromMe : styles.messageBubbleFromOther
      ]}>
        {message.type !== 'text' && (
          <View style={styles.messageHeader}>
            {getMessageIcon()}
            <Text style={styles.messageContent}>
              {message.content}
            </Text>
          </View>
        )}
        <Text style={[
          styles.messageText,
          message.isFromMe ? styles.messageTextFromMe : styles.messageTextFromOther
        ]}>
          {message.message}
        </Text>
        <Text style={[
          styles.messageTime,
          message.isFromMe ? styles.messageTimeFromMe : styles.messageTimeFromOther
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Find the conversation
  const conversation = mockConversations.find(c => c.id === id);

  React.useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        type: 'text' as const,
        content: '',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isFromMe: true,
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={lightTheme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Conversation Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerProfile}>
          <Image source={{ uri: conversation.profileImage }} style={styles.headerProfileImage} />
          <View style={styles.headerProfileInfo}>
            <Text style={styles.headerProfileName}>{conversation.profileName}</Text>
            <Text style={styles.headerProfileStatus}>Online</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-vertical" size={24} color={lightTheme.colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={lightTheme.colors.textSecondary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]} 
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? '#fff' : lightTheme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },
  backButton: {
    padding: lightTheme.spacing.sm,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: lightTheme.spacing.md,
  },
  headerProfileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: lightTheme.spacing.sm,
  },
  headerProfileInfo: {
    flex: 1,
  },
  headerProfileName: {
    fontSize: 17,
    fontWeight: '600',
    color: lightTheme.colors.text,
  },
  headerProfileStatus: {
    fontSize: 13,
    color: lightTheme.colors.textSecondary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.colors.text,
  },
  headerAction: {
    padding: lightTheme.spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
  },
  messageContainer: {
    marginBottom: lightTheme.spacing.md,
  },
  messageFromMe: {
    alignItems: 'flex-end',
  },
  messageFromOther: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: lightTheme.spacing.md,
    borderRadius: 20,
  },
  messageBubbleFromMe: {
    backgroundColor: lightTheme.colors.primary,
    borderBottomRightRadius: 5,
  },
  messageBubbleFromOther: {
    backgroundColor: lightTheme.colors.surface,
    borderBottomLeftRadius: 5,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.xs,
  },
  messageContent: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginLeft: lightTheme.spacing.xs,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextFromMe: {
    color: '#fff',
  },
  messageTextFromOther: {
    color: lightTheme.colors.text,
  },
  messageTime: {
    fontSize: 11,
    marginTop: lightTheme.spacing.xs,
  },
  messageTimeFromMe: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  messageTimeFromOther: {
    color: lightTheme.colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
  },
  textInput: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    borderRadius: 20,
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
    fontSize: 16,
    color: lightTheme.colors.text,
    maxHeight: 100,
    marginRight: lightTheme.spacing.sm,
    minHeight: 40,
    lineHeight: 20,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: lightTheme.colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },
}); 