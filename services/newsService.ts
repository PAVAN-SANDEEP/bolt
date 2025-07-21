import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:3000/api'
  : 'http://10.0.2.2:3000/api'; // Android emulator localhost

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  why: string;
  how: string;
  category: string;
  imageUrl?: string;
  actionUrl?: string;
  createdAt: string;
}

class NewsService {
  async getNews(language: string = 'en'): Promise<NewsItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/news?language=${language}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return mock data for development if server is not available
      return this.getMockNews(language);
    }
  }

  async getNewsById(id: string, language: string = 'en'): Promise<NewsItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}?language=${language}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news item');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news item:', error);
      throw error;
    }
  }

  async getLanguages() {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      return [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
      ];
    }
  }

  private getMockNews(language: string): NewsItem[] {
    const mockData = {
      en: [
        {
          id: '1',
          title: 'ChatGPT Vision Update',
          content: 'OpenAI\'s ChatGPT can now analyze images, read documents, and understand visual content in real-time.',
          why: 'This makes AI more versatile for students and professionals who work with visual data, presentations, and documents.',
          how: 'Upload screenshots, charts, or documents to ChatGPT and ask specific questions about the content.',
          category: 'AI',
          imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
          actionUrl: 'https://chat.openai.com',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'GitHub Copilot Workspace',
          content: 'GitHub\'s new Copilot Workspace can understand entire codebases and suggest comprehensive solutions to bugs and features.',
          why: 'This dramatically speeds up development cycles and helps developers learn best practices from AI-generated code.',
          how: 'Sign up for GitHub Copilot and integrate it with your IDE. Start with simple code completion and gradually use advanced features.',
          category: 'Development',
          imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
          actionUrl: 'https://github.com/features/copilot',
          createdAt: new Date().toISOString(),
        },
      ],
      te: [
        {
          id: '1',
          title: 'చాట్‌జిపిటి విజన్ అప్‌డేట్',
          content: 'ఓపెన్ఎఐ యొక్క చాట్‌జిపిటి ఇప్పుడు చిత్రాలను విశ్లేషించగలదు, పత్రాలను చదవగలదు మరియు దృశ్య కంటెంట్‌ను నిజ సమయంలో అర్థం చేసుకోగలదు.',
          why: 'ఇది దృశ్య డేటా, ప్రెజెంటేషన్లు మరియు పత్రాలతో పని చేసే విద్యార్థులు మరియు నిపుణులకు AIను మరింత బహుముఖంగా చేస్తుంది.',
          how: 'చాట్‌జిపిటికి స్క్రీన్‌షాట్‌లు, చార్ట్‌లు లేదా పత్రాలను అప్‌లోడ్ చేసి, కంటెంట్ గురించి నిర్దిష్ట ప్రశ్నలు అడుగండి.',
          category: 'AI',
          imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
          actionUrl: 'https://chat.openai.com',
          createdAt: new Date().toISOString(),
        },
      ],
      hi: [
        {
          id: '1',
          title: 'चैटजीपीटी विजन अपडेट',
          content: 'ओपनएआई का चैटजीपीटी अब इमेज का विश्लेषण कर सकता है, दस्तावेज़ पढ़ सकता है और रीयल-टाइम में विजुअल कंटेंट को समझ सकता है।',
          why: 'यह उन छात्रों और पेशेवरों के लिए एआई को अधिक बहुमुखी बनाता है जो विजुअल डेटा, प्रेजेंटेशन और दस्तावेज़ों के साथ काम करते हैं।',
          how: 'चैटजीपीटी में स्क्रीनशॉट, चार्ट या दस्तावेज़ अपलोड करें और कंटेंट के बारे में विशिष्ट प्रश्न पूछें।',
          category: 'AI',
          imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
          actionUrl: 'https://chat.openai.com',
          createdAt: new Date().toISOString(),
        },
      ],
    };

    return mockData[language as keyof typeof mockData] || mockData.en;
  }
}

export const newsService = new NewsService();