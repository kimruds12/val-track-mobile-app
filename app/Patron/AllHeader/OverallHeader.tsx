/**
 * OverallHeader Component
 *
 * Consistent header used across all main tabs (Home, In/Out, Profile)
 * Features:
 * - Val-Track branding with logo image
 * - Notification bell icon with badge counter
 * - Responsive mobile design
 * - Consistent styling across all screens
 * - Touch-friendly notification button
 *
 * Props:
 * - notificationCount: Number of unread notifications
 * - onNotificationPress: Callback when notification bell is pressed
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Logo image (use require for RN bundler)
const valtrackLogo = require('../../assets/images/valtrackLogo.png');

interface OverallHeaderProps {
  notificationCount?: number;
  onNotificationPress?: () => void;
}

/**
 * OverallHeader Component
 * Reusable header for all main app screens
 */
export default function OverallHeader({
  notificationCount = 0,
  onNotificationPress,
}: OverallHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {/* Left Section: Logo only */}
      <View style={styles.brandingSection}>
        {/* Logo Image */}
        <Image
          source={valtrackLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Right Section: Notification Bell */}
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${notificationCount} notifications`}
      >
        {/* Bell Icon */}
        <MaterialCommunityIcons
          name="bell"
          size={24}
          color="#001a4d"
        />

        {/* Notification Badge */}
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  // Branding Section
  brandingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: width * 0.18,
    height: width * 0.18,
  },

  // Notification Section
  notificationButton: {
    position: 'relative',
    padding: 8,
    paddingRight: 0,
  },

  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});
