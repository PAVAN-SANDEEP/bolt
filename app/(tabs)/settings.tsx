import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Languages, Bell, Smartphone, Info } from 'lucide-react-native';
import LanguageSelector from '../../components/LanguageSelector';
import { storageService } from '../../services/storageService';

export default function SettingsScreen() {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await storageService.getLanguage();
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    await storageService.setLanguage(newLanguage);
    Alert.alert('Language Changed', 'Your language preference has been updated.');
  };

  const clearSavedData = async () => {
    Alert.alert(
      'Clear Saved Data',
      'This will remove all saved articles. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.clearSavedNews();
              Alert.alert('Success', 'Saved data cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear saved data');
            }
          },
        },
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'Tech Daily',
      'Version 1.0.0\n\nA daily tech news app designed for working professionals and students. Get concise, actionable tech updates in your preferred language.\n\nBuilt with React Native and Expo.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Languages size={24} color="#3b82f6" />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <LanguageSelector
              selectedLanguage={language}
              onLanguageChange={handleLanguageChange}
              compact
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={24} color="#3b82f6" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#374151', true: '#3b82f6' }}
              thumbColor={notifications ? '#ffffff' : '#9ca3af'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Smartphone size={24} color="#3b82f6" />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#374151', true: '#3b82f6' }}
              thumbColor={darkMode ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity style={styles.settingRow} onPress={clearSavedData}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabel}>Clear Saved Articles</Text>
            </View>
            <Text style={styles.actionText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingRow} onPress={showAbout}>
            <View style={styles.settingLeft}>
              <Info size={24} color="#3b82f6" />
              <Text style={styles.settingLabel}>About Tech Daily</Text>
            </View>
            <Text style={styles.actionText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#f1f5f9',
    marginLeft: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#3b82f6',
  },
});