const axios = require('axios');

async function detectLanguage(text) {
  try {
    const response = await axios.post('https://libretranslate.com/detect', {
      q: text
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0].language;
    }
    return null;
  } catch (error) {
    console.error('Error detectando idioma:', error.message);
    return null;
  }
}

async function translateToSpanish(text, fromLang = 'auto') {
  try {
    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: fromLang === 'auto' ? 'auto' : fromLang,
      target: 'es',
      format: 'text'
    });
    
    if (response.data && response.data.translatedText) {
      return {
        success: true,
        translatedText: response.data.translatedText,
        detectedLang: response.data.detectedLanguage?.language || fromLang,
        confidence: 'high'
      };
    }
    
    return {
      success: false,
      error: 'No se pudo traducir el texto'
    };
  } catch (error) {
    console.error('Error traduciendo:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

async function translateText(text, targetLang = 'es', sourceLang = 'auto') {
  try {
    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    });
    
    if (response.data && response.data.translatedText) {
      return {
        success: true,
        translatedText: response.data.translatedText,
        detectedLang: response.data.detectedLanguage?.language || sourceLang
      };
    }
    
    return {
      success: false,
      error: 'No se pudo traducir el texto'
    };
  } catch (error) {
    console.error('Error traduciendo:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

const languageNames = {
  'en': 'Inglés',
  'pt': 'Portugués',
  'fr': 'Francés',
  'de': 'Alemán',
  'it': 'Italiano',
  'ja': 'Japonés',
  'ko': 'Coreano',
  'zh': 'Chino',
  'ru': 'Ruso',
  'ar': 'Árabe',
  'hi': 'Hindi',
  'es': 'Español',
  'nl': 'Holandés',
  'tr': 'Turco',
  'pl': 'Polaco',
  'uk': 'Ucraniano',
  'sv': 'Sueco',
  'da': 'Danés',
  'fi': 'Finlandés',
  'no': 'Noruego'
};

function getLanguageName(code) {
  return languageNames[code] || code.toUpperCase();
}

module.exports = {
  detectLanguage,
  translateToSpanish,
  translateText,
  getLanguageName
};
