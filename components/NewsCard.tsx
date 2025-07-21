import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { storageService } from '../services/storageService';
import type { NewsItem } from '../types/news';

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      if (saved) {
        await storageService.removeSavedNews(item.id);
        setSaved(false);
      } else {
        await storageService.saveNews(item);
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleActionLink = () => {
    if (item.actionUrl) {
      Linking.openURL(item.actionUrl);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.card}
      >
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            {saved ? (
              <BookmarkCheck size={24} color="#3b82f6" />
            ) : (
              <Bookmark size={24} color="#64748b" />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{item.title}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What</Text>
            <Text style={styles.sectionContent}>{item.content}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why it matters</Text>
            <Text style={styles.sectionContent}>{item.why}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to apply</Text>
            <Text style={styles.sectionContent}>{item.how}</Text>
          </View>
        </ScrollView>

        {item.actionUrl && (
          <TouchableOpacity style={styles.actionButton} onPress={handleActionLink}>
            <Text style={styles.actionButtonText}>Learn More</Text>
            <ExternalLink size={16} color="#ffffff" />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  categoryContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  category: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  saveButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
    lineHeight: 28,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});