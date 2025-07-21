const express = require('express');
const Datastore = require('nedb-promises');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// NeDB (in-memory database) setup
const newsDb = Datastore.create({ filename: './data/news.db', autoload: true });
console.log('Connected to NeDB database');

// Sample data
const sampleNews = [
  {
    title: {
      en: "ChatGPT Vision Update",
      te: "చాట్‌జిపిటి విజన్ అప్‌డేట్",
      hi: "चैटजीपीटी विजन अपडेट"
    },
    content: {
      en: "OpenAI's ChatGPT can now analyze images, read documents, and understand visual content in real-time.",
      te: "ఓపెన్ఎఐ యొక్క చాట్‌జిపిటి ఇప్పుడు చిత్రాలను విశ్లేషించగలదు, పత్రాలను చదవగలదు మరియు దృశ్య కంటెంట్‌ను నిజ సమయంలో అర్థం చేసుకోగలదు.",
      hi: "ओपनएआई का चैटजीपीटी अब इमेज का विश्लेषण कर सकता है, दस्तावेज़ पढ़ सकता है और रीयल-टाइम में विजुअल कंटेंट को समझ सकता है।"
    },
    why: {
      en: "This makes AI more versatile for students and professionals who work with visual data, presentations, and documents.",
      te: "ఇది దృశ్య డేటా, ప్రెజెంటేషన్లు మరియు పత్రాలతో పని చేసే విద్యార్థులు మరియు నిపుణులకు AIని మరింత బహుముఖంగా చేస్తుంది.",
      hi: "यह उन छात्रों और पेशेवरों के लिए एआई को अधिक बहुमुखी बनाता है जो विजुअल डेटा, प्रेजेंटेशन और दस्तावेज़ों के साथ काम करते हैं।"
    },
    how: {
      en: "Upload screenshots, charts, or documents to ChatGPT and ask specific questions about the content.",
      te: "చాట్‌జిపిటికి స్క్రీన్‌షాట్‌లు, చార్ట్‌లు లేదా పత్రాలను అప్‌లోడ్ చేసి, కంటెంట్ గురించి నిర్దిష్ట ప్రశ్నలు అడుగండి.",
      hi: "चैटजीपीटी में स्क्रीनशॉट, चार्ट या दस्तावेज़ अपलोड करें और कंटेंट के बारे में विशिष्ट प्रश्न पूछें।"
    },
    category: "AI",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    actionUrl: "https://chat.openai.com"
  },
  {
    title: {
      en: "GitHub Copilot Workspace",
      te: "గిట్‌హబ్ కోపైలట్ వర్క్‌స్పేస్",
      hi: "गिटहब कोपायलट वर्कस्पेस"
    },
    content: {
      en: "GitHub's new Copilot Workspace can understand entire codebases and suggest comprehensive solutions to bugs and features.",
      te: "గిట్‌హబ్ యొక్క కొత్త కోపైలట్ వర్క్‌స్పేస్ మొత్తం కోడ్‌బేస్‌లను అర్థం చేసుకోగలదు మరియు బగ్‌లు మరియు ఫీచర్‌లకు సమగ్ర పరిష్కారాలను సూచించగలదు.",
      hi: "गिटहब का नया कोपायलट वर्कस्पेस पूरे कोडबेस को समझ सकता है और बग और फीचर्स के लिए व्यापक समाधान सुझा सकता है।"
    },
    why: {
      en: "This dramatically speeds up development cycles and helps developers learn best practices from AI-generated code.",
      te: "ఇది అభివృద్ధి చక్రాలను నాటకీయంగా వేగవంతం చేస్తుంది మరియు AI-జనరేటెడ్ కోడ్ నుండి ఉత్తమ అభ్యాసాలను నేర్చుకోవడంలో డెవలపర్‌లకు సహాయపడుతుంది.",
      hi: "यह विकास चक्रों को नाटकीय रूप से तेज़ करता है और डेवलपर्स को एआई-जेनरेटेड कोड से बेस्ट प्रैक्टिसेज सीखने में मदद करता है।"
    },
    how: {
      en: "Sign up for GitHub Copilot and integrate it with your IDE. Start with simple code completion and gradually use advanced features.",
      te: "గిట్‌హబ్ కోపైలట్ కోసం సైన్ అప్ చేసి, దానిని మీ IDEతో ఏకీకృతం చేయండి. సాధారణ కోడ్ పూర్తితో ప్రారంభించి, క్రమంగా అధునాతన ఫీచర్‌లను ఉపయోగించండి.",
      hi: "गिटहब कोपायलट के लिए साइन अप करें और इसे अपने IDE के साथ इंटीग्रेट करें। सिंपल कोड कम्प्लीशन से शुरू करें और धीरे-धीरे एडवांस फीचर्स का उपयोग करें।"
    },
    category: "Development",
    imageUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    actionUrl: "https://github.com/features/copilot"
  },
  {
    title: {
      en: "Apple's AI Integration",
      te: "ఆపిల్ యొక్క AI ఏకీకరణ",
      hi: "एप्पल का एआई एकीकरण"
    },
    content: {
      en: "Apple Intelligence brings advanced AI features to iOS 18, including smart writing tools, enhanced Siri, and personalized suggestions.",
      te: "ఆపిల్ ఇంటెలిజెన్స్ iOS 18కు అధునాతన AI ఫీచర్‌లను తీసుకువస్తుంది, స్మార్ట్ రైటింగ్ టూల్స్, మెరుగైన సిరి మరియు వ్యక్తిగతీకరించిన సూచనలతో సహా.",
      hi: "एप्पल इंटेलिजेंस iOS 18 में एडवांस एआई फीचर्स लाता है, जिसमें स्मार्ट राइटिंग टूल्स, बेहतर सिरी और पर्सनलाइज़्ड सुझाव शामिल हैं।"
    },
    why: {
      en: "This makes AI more accessible to mainstream users and sets new standards for privacy-focused AI implementation.",
      te: "ఇది AI ని ప్రధాన స్రవంతి వినియోగదారులకు మరింత అందుబాటులో ఉంచుతుంది మరియు గోప్యత-కేంద్రిత AI అమలుకు కొత్త ప్రమాణాలను నిర్దేశిస్తుంది.",
      hi: "यह एआई को मुख्यधारा के उपयोगकर्ताओं के लिए अधिक सुलभ बनाता है और प्राइवेसी-फोकस्ड एआई इम्प्लीमेंटेशन के लिए नए मानक स्थापित करता है।"
    },
    how: {
      en: "Update to iOS 18 when available and explore the new writing suggestions in Notes, Mail, and Messages apps.",
      te: "అందుబాటులో ఉన్నప్పుడు iOS 18కు అప్‌డేట్ చేసి, నోట్స్, మెయిల్ మరియు మెసేజెస్ యాప్‌లలో కొత్త రైటింగ్ సూచనలను అన్వేషించండి.",
      hi: "उपलब्ध होने पर iOS 18 में अपडेट करें और नोट्स, मेल और मैसेजेस ऐप्स में नए राइटिंग सुझावों का अन्वेषण करें।"
    },
    category: "Mobile",
    imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    actionUrl: "https://www.apple.com/ios/"
  }
];

// Initialize sample data
const initializeData = async () => {
  try {
    const count = await newsDb.count({});
    if (count === 0) {
      for (const item of sampleNews) {
        await newsDb.insert({
          ...item,
          createdAt: new Date()
        });
      }
      console.log('Sample data initialized');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Routes
app.get('/api/news', async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const news = await newsDb.find({}).sort({ createdAt: -1 });
    
    const formattedNews = news.map(item => ({
      id: item._id || item.id,
      title: item.title[language] || item.title.en,
      content: item.content[language] || item.content.en,
      why: item.why[language] || item.why.en,
      how: item.how[language] || item.how.en,
      category: item.category,
      imageUrl: item.imageUrl,
      actionUrl: item.actionUrl,
      createdAt: item.createdAt
    }));
    
    res.json(formattedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const news = await newsDb.findOne({ _id: req.params.id });
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    const formattedNews = {
      id: news._id || news.id,
      title: news.title[language] || news.title.en,
      content: news.content[language] || news.content.en,
      why: news.why[language] || news.why.en,
      how: news.how[language] || news.how.en,
      category: news.category,
      imageUrl: news.imageUrl,
      actionUrl: news.actionUrl,
      createdAt: news.createdAt
    };
    
    res.json(formattedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/languages', (req, res) => {
  res.json([
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ]);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to initialize server:', error);
});

module.exports = app;