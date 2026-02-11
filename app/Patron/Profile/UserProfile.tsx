/**
 * User Profile Screen
 * 
 * A mobile-first user profile screen featuring:
 * - Sticky header consistent with Dashboard and In/Out screens
 * - User avatar, name, and role section
 * - Account details with masked API key and refresh button
 * - Connection status cards for backend services
 * - Notifications toggle for enabling/disabling notifications
 * - Navigation rows for Privacy & Data, Settings, and Help & Docs
 * - Logout button with confirmation modal
 * - Fixed bottom navigation with Home, In/Out, and Profile tabs
 * 
 * Built with React Native, TypeScript, and Expo
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  AccessibilityInfo,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navigation from '../Library Visitor/Navigation';

const { width: screenWidth } = Dimensions.get('window');
const valtrackLogo = require('../../assets/images/valtrackLogo.png');

/**
 * ProfileHeader Component
 * Displays user avatar, name, and role
 */
interface ProfileHeaderProps {
  avatarInitials: string;
  userName: string;
  userRole: string;
  userId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarInitials,
  userName,
  userRole,
  userId,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        styles.profileSection,
        {
          backgroundColor: isDark ? '#1f2937' : '#f8f9fa',
        },
      ]}
    >
      {/* Avatar */}
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: '#3b82f6',
          },
        ]}
      >
        <Text style={styles.avatarText}>{avatarInitials}</Text>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: colors.text }]}>{userName}</Text>
        <Text style={[styles.userRole, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
          {userRole}
        </Text>
        <Text style={[styles.userId, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
          ID: {userId}
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: '#3b82f6' }]}
        activeOpacity={0.7}
      >
        <MaterialIcons name="edit" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * AccountDetailsCard Component
 * Displays API key and refresh button
 */
interface AccountDetailsCardProps {
  apiKey: string;
  onRefresh: () => void;
}

const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  apiKey,
  onRefresh,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const [showFullKey, setShowFullKey] = useState(false);

  // Mask API key - show first and last 4 characters
  const displayKey = showFullKey
    ? apiKey
    : `${apiKey.slice(0, 4)}${'*'.repeat(apiKey.length - 8)}${apiKey.slice(-4)}`;

  return (
    <View
      style={[
        styles.accountCard,
        {
          backgroundColor: isDark ? '#1f2937' : '#f8f9fa',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
      ]}
    >
      <View style={styles.accountHeader}>
        <Text style={[styles.accountTitle, { color: colors.text }]}>
          Account Details
        </Text>
      </View>

      <View
        style={[
          styles.apiKeyContainer,
          {
            backgroundColor: isDark ? '#111827' : '#ffffff',
            borderColor: isDark ? '#374151' : '#e5e7eb',
          },
        ]}
      >
        <View style={styles.apiKeyContent}>
          <Text style={[styles.apiKeyLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            API Key
          </Text>
          <Text
            style={[styles.apiKeyValue, { color: colors.text }]}
            selectable
          >
            {displayKey}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowFullKey(!showFullKey)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={showFullKey ? 'visibility' : 'visibility-off'}
            size={20}
            color="#3b82f6"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={onRefresh}
        activeOpacity={0.7}
      >
        <MaterialIcons name="refresh" size={18} color="#fff" />
        <Text style={styles.refreshButtonText}>Regenerate API Key</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * ConnectionStatusCard Component
 * Displays backend service connection status
 */
interface ConnectionStatusCardProps {
  service: string;
  status: 'connected' | 'disconnected' | 'warning';
  latency?: number;
}

const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = ({
  service,
  status,
  latency,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'disconnected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'warning':
        return 'Warning';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  return (
    <View
      style={[
        styles.connectionCard,
        {
          backgroundColor: isDark ? '#1f2937' : '#f8f9fa',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
      ]}
    >
      <View style={styles.connectionContent}>
        <View
          style={[
            styles.connectionDot,
            {
              backgroundColor: getStatusColor(),
            },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.connectionService, { color: colors.text }]}>
            {service}
          </Text>
          <Text style={[styles.connectionStatus, { color: getStatusColor() }]}>
            {getStatusLabel()}
          </Text>
        </View>
        {latency && (
          <Text style={[styles.latency, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {latency}ms
          </Text>
        )}
      </View>
    </View>
  );
};

/**
 * NavigationRow Component
 * Navigation row for settings, privacy, help, etc.
 */
interface NavigationRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  color?: string;
}

const NavigationRow: React.FC<NavigationRowProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  color = '#3b82f6',
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.navigationRow,
        {
          backgroundColor: isDark ? '#1f2937' : '#f8f9fa',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.rowIconContainer, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon as any} size={20} color={color} />
      </View>

      <View style={styles.rowContent}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.rowSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <MaterialIcons name="chevron-right" size={24} color={color} />
    </TouchableOpacity>
  );
};

/**
 * LogoutModal Component
 * Confirmation modal for logout action
 */
interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: isDark ? '#1f2937' : '#fff',
            },
          ]}
        >
          <MaterialIcons
            name="logout"
            size={40}
            color="#ef4444"
            style={{ alignSelf: 'center', marginBottom: 16 }}
          />

          <Text
            style={[
              styles.modalTitle,
              { color: colors.text },
            ]}
          >
            Confirm Logout
          </Text>

          <Text
            style={[
              styles.modalMessage,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            Are you sure you want to logout? You will need to log in again to access your account.
          </Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: isDark ? '#374151' : '#e5e7eb',
                },
              ]}
              onPress={onCancel}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.text },
                ]}
              >
                No, Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: '#ef4444',
                },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.modalButtonTextConfirm}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Main User Profile Component
 */
export default function UserProfile() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  // State management
  const [apiKey, setApiKey] = useState(process.env.EXPO_PUBLIC_API_KEY || 'api_hidden');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Handle notification press
  const handleNotificationPress = () => {
    console.log('Notifications pressed');
    AccessibilityInfo.announceForAccessibility('Notifications page');
  };

  // Handle API key refresh
  const handleRefreshApiKey = () => {
    Alert.alert(
      'Regenerate API Key',
      'This will invalidate your current API key. Are you sure?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Regenerate',
          onPress: () => {
            const newKey = 'api_' + Math.random().toString(36).slice(2, 26);
            setApiKey(newKey);
            Alert.alert('Success', 'API key has been regenerated.');
          },
        },
      ]
    );
  };

  // Handle navigation rows
  const handlePrivacyAndData = () => {
    Alert.alert('Privacy & Data', 'Privacy and data management options would open here.');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings page would open here.');
  };

  const handleHelpAndDocs = () => {
    Alert.alert('Help & Docs', 'Help and documentation would open here.');
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    Alert.alert('Logged Out', 'You have been logged out successfully.', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate to login screen
          router.replace('/Patron/Library Visitor/LoginPage');
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header - Sticky */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? '#111827' : '#fff',
            borderBottomColor: isDark ? '#374151' : '#e5e7eb',
          },
        ]}
      >
        <View>
          <Image source={valtrackLogo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Notification Icon */}
        <TouchableOpacity
          onPress={handleNotificationPress}
          accessible
          accessibilityLabel={`${notifications} new notifications`}
          accessibilityRole="button"
        >
          <View style={styles.notificationContainer}>
            <MaterialIcons name="notifications" size={24} color={colors.tint} />
            {notifications > 0 && (
              <View style={[styles.notificationBadge, { backgroundColor: '#ef4444' }]}>
                <Text style={styles.badgeText}>{notifications}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        {/* User Profile Section */}
        <View style={styles.section}>
          <ProfileHeader
            avatarInitials="AB"
            userName="Ahmed Bello"
            userRole="Library Visitor"
            userId="23-2970"
          />
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <AccountDetailsCard
            apiKey={apiKey}
            onRefresh={handleRefreshApiKey}
          />
        </View>

        {/* Connection Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Service Status
          </Text>
          <ConnectionStatusCard
            service="Authentication Server"
            status="connected"
            latency={45}
          />
          <View style={{ height: 8 }} />
          <ConnectionStatusCard
            service="Database"
            status="connected"
            latency={62}
          />
          <View style={{ height: 8 }} />
          <ConnectionStatusCard
            service="Cloud Storage"
            status="warning"
            latency={120}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View
            style={[
              styles.notificationToggleCard,
              {
                backgroundColor: isDark ? '#1f2937' : '#f8f9fa',
                borderColor: isDark ? '#374151' : '#e5e7eb',
              },
            ]}
          >
            <View style={styles.toggleContent}>
              <View>
                <Text style={[styles.toggleTitle, { color: colors.text }]}>
                  Notifications
                </Text>
                <Text
                  style={[
                    styles.toggleSubtitle,
                    { color: isDark ? '#9ca3af' : '#6b7280' },
                  ]}
                >
                  {notificationsEnabled
                    ? 'You will receive notifications'
                    : 'Notifications are disabled'}
                </Text>
              </View>

              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#ccc', true: '#3b82f6' }}
                thumbColor={notificationsEnabled ? '#fff' : '#f0f0f0'}
              />
            </View>
          </View>
        </View>

        {/* Navigation Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            More Options
          </Text>
          <NavigationRow
            icon="privacy-tip"
            title="Privacy & Data"
            subtitle="Manage your privacy settings"
            onPress={handlePrivacyAndData}
            color="#8b5cf6"
          />
          <View style={{ height: 8 }} />
          <NavigationRow
            icon="settings"
            title="Settings"
            subtitle="App preferences and configuration"
            onPress={handleSettings}
            color="#06b6d4"
          />
          <View style={{ height: 8 }} />
          <NavigationRow
            icon="help"
            title="Help & Documentation"
            subtitle="FAQs and support resources"
            onPress={handleHelpAndDocs}
            color="#10b981"
          />
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#ef4444' }]}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Navigation */}
      <Navigation activeTab="profile" />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </View>
  );
}

/**
 * StyleSheet
 * All styles defined following React Native best practices
 */
const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  logo: {
    width: 100,
    height: 60,
  },
  notificationContainer: {
    position: 'relative',
    marginTop: 10,
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Scroll Content
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 120,
  },

  // Section
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  // Profile Section
  profileSection: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 13,
    marginBottom: 2,
  },
  userId: {
    fontSize: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Account Card
  accountCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  accountHeader: {
    marginBottom: 12,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  apiKeyContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  apiKeyContent: {
    flex: 1,
    marginRight: 12,
  },
  apiKeyLabel: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: '500',
  },
  apiKeyValue: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  refreshButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  // Connection Card
  connectionCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  connectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  connectionService: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  connectionStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  latency: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 12,
  },

  // Notification Toggle Card
  notificationToggleCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 13,
  },

  // Navigation Row
  navigationRow: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  rowIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontSize: 12,
  },

  // Logout Button
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: screenWidth * 0.85,
    maxWidth: 380,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  modalButtonTextConfirm: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
