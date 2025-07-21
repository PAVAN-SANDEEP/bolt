import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  compact?: boolean;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  compact = false,
}: LanguageSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.selector, compact && styles.compactSelector]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedLang?.flag}</Text>
        {!compact && (
          <>
            <Text style={styles.languageName}>{selectedLang?.name}</Text>
            <ChevronDown size={16} color="#64748b" />
          </>
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={styles.languageOption}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <View style={styles.languageLeft}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={styles.languageOptionName}>{language.name}</Text>
                </View>
                {selectedLanguage === language.code && (
                  <Check size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  compactSelector: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  flag: {
    fontSize: 18,
  },
  languageName: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageFlag: {
    fontSize: 20,
  },
  languageOptionName: {
    color: '#f1f5f9',
    fontSize: 16,
  },
});