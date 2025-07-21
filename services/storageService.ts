import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NewsItem } from '../types/news';

const KEYS = {
  LANGUAGE: 'user_language',
  SAVED_NEWS: 'saved_news',
  PREFERENCES: 'user_preferences',
};

class StorageService {
  // Language preferences
  async getLanguage(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.LANGUAGE);
    } catch (error) {
      console.error('Error getting language:', error);
      return null;
    }
  }

  async setLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  }

  // Saved news management
  async getSavedNews(): Promise<NewsItem[]> {
    try {
      const savedNews = await AsyncStorage.getItem(KEYS.SAVED_NEWS);
      return savedNews ? JSON.parse(savedNews) : [];
    } catch (error) {
      console.error('Error getting saved news:', error);
      return [];
    }
  }

  async saveNews(newsItem: NewsItem): Promise<void> {
    try {
      const savedNews = await this.getSavedNews();
      const isAlreadySaved = savedNews.some(item => item.id === newsItem.id);
      
      if (!isAlreadySaved) {
        savedNews.unshift(newsItem);
        await AsyncStorage.setItem(KEYS.SAVED_NEWS, JSON.stringify(savedNews));
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  }

  async removeSavedNews(newsId: string): Promise<void> {
    try {
      const savedNews = await this.getSavedNews();
      const filteredNews = savedNews.filter(item => item.id !== newsId);
      await AsyncStorage.setItem(KEYS.SAVED_NEWS, JSON.stringify(filteredNews));
    } catch (error) {
      console.error('Error removing saved news:', error);
    }
  }

  async clearSavedNews(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.SAVED_NEWS);
    } catch (error) {
      console.error('Error clearing saved news:', error);
    }
  }

  async isNewsSaved(newsId: string): Promise<boolean> {
    try {
      const savedNews = await this.getSavedNews();
      return savedNews.some(item => item.id === newsId);
    } catch (error) {
      console.error('Error checking saved news:', error);
      return false;
    }
  }

  // General preferences
  async setPreference(key: string, value: any): Promise<void> {
    try {
      const preferences = await this.getPreferences();
      preferences[key] = value;
      await AsyncStorage.setItem(KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error setting preference:', error);
    }
  }

  async getPreference(key: string): Promise<any> {
    try {
      const preferences = await this.getPreferences();
      return preferences[key];
    } catch (error) {
      console.error('Error getting preference:', error);
      return null;
    }
  }

  private async getPreferences(): Promise<Record<string, any>> {
    try {
      const preferences = await AsyncStorage.getItem(KEYS.PREFERENCES);
      return preferences ? JSON.parse(preferences) : {};
    } catch (error) {
      console.error('Error getting preferences:', error);
      return {};
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        KEYS.LANGUAGE,
        KEYS.SAVED_NEWS,
        KEYS.PREFERENCES,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export const storageService = new StorageService();