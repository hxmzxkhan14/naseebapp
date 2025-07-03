import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface BlockedUser {
  id: string;
  name: string;
  profileImage?: string;
  blockedDate: Date;
  reason?: string;
}

export default function BlockedUsersScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  
  // Backend-ready state management
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      name: 'John Smith',
      profileImage: undefined,
      blockedDate: new Date('2024-01-15'),
      reason: 'Inappropriate behavior',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      profileImage: undefined,
      blockedDate: new Date('2024-01-10'),
      reason: 'Spam messages',
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);
  const [newBlockUserId, setNewBlockUserId] = useState('');
  const [blockReason, setBlockReason] = useState('');

  // Filter blocked users based on search query
  const filteredUsers = blockedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnblockUser = async (userId: string, userName: string) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${userName}? They will be able to contact you again.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              setBlockedUsers(prev => prev.filter(user => user.id !== userId));
              Alert.alert('User Unblocked', `${userName} has been unblocked successfully.`);
            } catch (error) {
              Alert.alert('Error', 'Failed to unblock user. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleBlockNewUser = async () => {
    if (!newBlockUserId.trim()) {
      Alert.alert('Error', 'Please enter a user ID or username to block.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to find and block user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBlockedUser: BlockedUser = {
        id: Date.now().toString(),
        name: newBlockUserId, // In real app, this would be fetched from API
        profileImage: undefined,
        blockedDate: new Date(),
        reason: blockReason || 'No reason provided',
      };
      
      setBlockedUsers(prev => [newBlockedUser, ...prev]);
      setNewBlockUserId('');
      setBlockReason('');
      setShowBlockUserModal(false);
      Alert.alert('User Blocked', 'User has been blocked successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to block user. Please check the username and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkUnblock = () => {
    Alert.alert(
      'Unblock All Users',
      'Are you sure you want to unblock all users? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock All',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await new Promise(resolve => setTimeout(resolve, 1000));
              setBlockedUsers([]);
              Alert.alert('All Users Unblocked', 'All blocked users have been unblocked.');
            } catch (error) {
              Alert.alert('Error', 'Failed to unblock all users. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderBlockedUser = ({ item }: { item: BlockedUser }) => (
    <View style={[styles.userItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
      <View style={styles.userLeft}>
        <View style={[styles.avatar, { backgroundColor: currentTheme.colors.border }]}>
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={24} color={currentTheme.colors.textSecondary} />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: currentTheme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.blockDate, { color: currentTheme.colors.textSecondary }]}>
            Blocked on {item.blockedDate.toLocaleDateString()}
          </Text>
          {item.reason && (
            <Text style={[styles.blockReason, { color: currentTheme.colors.textSecondary }]}>
              Reason: {item.reason}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.unblockButton, { backgroundColor: currentTheme.colors.primary }]}
        onPress={() => handleUnblockUser(item.id, item.name)}
        disabled={isLoading}
      >
        <Text style={styles.unblockButtonText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="shield-checkmark" size={80} color={currentTheme.colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: currentTheme.colors.text }]}>No Blocked Users</Text>
      <Text style={[styles.emptySubtitle, { color: currentTheme.colors.textSecondary }]}>
        You haven't blocked anyone yet. Users you block will appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Blocked Users</Text>
        <TouchableOpacity onPress={() => setShowBlockUserModal(true)} style={styles.addButton}>
          <Ionicons name="person-add" size={24} color={currentTheme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.searchSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Ionicons name="search" size={20} color={currentTheme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: currentTheme.colors.text }]}
            placeholder="Search blocked users..."
            placeholderTextColor={currentTheme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={currentTheme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {blockedUsers.length > 0 && (
          <View style={styles.statsSection}>
            <Text style={[styles.statsText, { color: currentTheme.colors.textSecondary }]}>
              {filteredUsers.length} of {blockedUsers.length} blocked users
            </Text>
            {blockedUsers.length > 1 && (
              <TouchableOpacity onPress={handleBulkUnblock} style={styles.bulkActionButton}>
                <Text style={[styles.bulkActionText, { color: currentTheme.colors.primary }]}>Unblock All</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            renderItem={renderBlockedUser}
            keyExtractor={(item) => item.id}
            style={styles.usersList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmptyState()
        )}
      </View>

      {/* Block User Modal */}
      {showBlockUserModal && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: currentTheme.colors.surface }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.colors.text }]}>Block User</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Username or User ID</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                value={newBlockUserId}
                onChangeText={setNewBlockUserId}
                placeholder="Enter username or user ID"
                placeholderTextColor={currentTheme.colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Reason (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                value={blockReason}
                onChangeText={setBlockReason}
                placeholder="Why are you blocking this user?"
                placeholderTextColor={currentTheme.colors.textSecondary}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: currentTheme.colors.background }]}
                onPress={() => setShowBlockUserModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: currentTheme.colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FF5722' }]}
                onPress={handleBlockNewUser}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonTextWhite}>
                  {isLoading ? 'Blocking...' : 'Block User'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
  },
  bulkActionButton: {
    padding: 8,
  },
  bulkActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  usersList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  blockDate: {
    fontSize: 14,
    marginBottom: 2,
  },
  blockReason: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  unblockButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  unblockButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    margin: 20,
    padding: 24,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textAreaInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextWhite: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 