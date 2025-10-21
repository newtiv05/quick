// Simple Dropdown Language Selector
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  pt: { name: 'Português', flag: '🇵🇹' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' }
};

const ModernLanguageSelector = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  const currentLang = languages[i18n.language] || languages.fr;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={`language-selector ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector-button"
        data-cta="🌍 Changer de langue"
      >
        <Globe size={20} className="language-icon" />
        <span className="language-flag">{currentLang.flag}</span>
        <div className="language-text">
          <span className="language-name">{currentLang.name}</span>
          <span className="language-code">{i18n.language.toUpperCase()}</span>
        </div>
        <ChevronDown size={18} className={`language-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="language-dropdown"
        >
          <div className="language-dropdown-header">
            <h4>Select Language</h4>
          </div>
          <div className="language-list">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`language-option ${i18n.language === code ? 'active' : ''}`}
              >
                <span className="language-flag">{lang.flag}</span>
                <div className="language-info">
                  <span className="language-name">{lang.name}</span>
                  <span className="language-code">{code.toUpperCase()}</span>
                </div>
                {i18n.language === code && (
                  <span className="check-icon">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLanguageSelector;



