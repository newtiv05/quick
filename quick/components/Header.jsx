import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  User, 
  UserPlus,
  Menu, 
  X, 
  LogOut,
  Home,
  Grid3X3,
  Filter,
  ChevronDown,
  History,
  BarChart3
} from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import ModernLanguageSelector from './ModernLanguageSelector';
import '../styles/header.css';
import '../styles/language-selector.css';
import CurrencySelector from './CurrencySelector';
import Logo from './Logo';
// import '../styles/search-overlay.css'; // Removed unused CSS
// import '../styles/cta-messages.css'; // Removed unused CSS
// Google security compliant: Removed cookie and tracking components

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isClickStatsOpen, setIsClickStatsOpen] = useState(false); // Removed for client-side only app
  
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCategoriesOpen && !event.target.closest('.nav-dropdown')) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen]);

  // Handle search overlay
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleCategoriesMenu = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <Logo size="default" className="header-logo" />

        <nav className="desktop-nav">
          <Link to="/" className="nav-link" data-cta="🏠 Découvrez des produits incroyables">
            <Home size={16} />
            <span>{t('navigation.home')}</span>
          </Link>
          <Link to="/products" className="nav-link" data-cta="🛍️ Parcourez tous les produits">
            <Grid3X3 size={16} />
            <span>{t('navigation.products')}</span>
          </Link>
          <div className="nav-dropdown">
            <button 
              className="nav-link dropdown-trigger"
              onClick={toggleCategoriesMenu}
              data-cta="🔍 Explorez les catégories"
            >
              <Filter size={16} />
              <span>{t('navigation.categories')}</span>
              <ChevronDown size={14} />
            </button>
            <div className={`dropdown-menu ${isCategoriesOpen ? 'show' : ''}`}>
              <Link 
                to="/products?category=electronics" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">📱</span>
                <span>Électronique</span>
              </Link>
              <Link 
                to="/products?category=fashion" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">👕</span>
                <span>Mode</span>
              </Link>
              <Link 
                to="/products?category=home" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">🏠</span>
                <span>Maison et jardin</span>
              </Link>
              <Link 
                to="/products?category=sports" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">⚽</span>
                <span>Sports</span>
              </Link>
              <Link 
                to="/products?category=beauty" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">💄</span>
                <span>Beauté</span>
              </Link>
            </div>
          </div>
          <Link to="/visited-items" className="nav-link" data-cta="📋 Voir l'historique de navigation">
            <History size={16} />
            <span>{t('navigation.visited')}</span>
          </Link>
          {/* Click Stats button removed for client-side only app
          <button 
            className="nav-link click-stats-button" 
            onClick={() => setIsClickStatsOpen(true)}
            data-cta="📊 Voir les statistiques de clics"
          >
            <BarChart3 size={16} />
            <span>{t('navigation.clickStats', 'Click Stats')}</span>
          </button>
          */}
        </nav>

        <button 
          onClick={openSearch}
          className="search-trigger"
          title="Rechercher"
          data-cta="🔍 Rechercher des produits"
        >
          <Search size={20} />
        </button>

        <ModernLanguageSelector />
        <CurrencySelector />

        {/* User profile icon removed - Use 3-click logo to access login */}

        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Basculer le menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              <div className="mobile-search">
                <form onSubmit={handleSearch} className="mobile-search-form">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mobile-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="search-clear"
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>
              </div>
              
              <div className="mobile-nav-links">
                <Link 
                  to="/" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Grid3X3 size={18} />
                  <span>Products</span>
                </Link>
                <Link
                  to="/visited-items"
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <History size={18} />
                  <span>Visited</span>
                </Link>
                {/* Click Stats mobile button removed for client-side only app
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    setIsClickStatsOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <BarChart3 size={18} />
                  <span>Click Stats</span>
                </button>
                */}
                
                {/* Login/Register removed - Use 3-click logo to access login */}
              </div>
            </nav>
          </div>
        )}


        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="search-overlay" onClick={closeSearch}>
            <div className="search-overlay-content" onClick={(e) => e.stopPropagation()}>
              <div className="search-overlay-header">
                <div className="search-header-content">
                  <h2>🔍 Recherche de Produits</h2>
                  <p className="search-overlay-cta">Découvrez des milliers de produits avec notre moteur de recherche intelligent</p>
                </div>
                <button 
                  onClick={closeSearch}
                  className="search-overlay-close"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSearch} className="search-overlay-form">
                <div className="search-overlay-input-container">
                  <Search size={24} className="search-overlay-icon" />
                  <input
                    type="text"
                    placeholder="Tapez votre recherche... (ex: iPhone, Nike, ordinateur)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-overlay-input"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="search-overlay-clear"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                
                {/* Suggestions dynamiques basées sur la recherche */}
                {searchQuery && (
                  <div className="search-dynamic-suggestions">
                    <h4>💡 Suggestions pour "{searchQuery}"</h4>
                    <div className="suggestion-chips">
                      <button 
                        type="button"
                        onClick={() => setSearchQuery(`${searchQuery} pas cher`)}
                        className="suggestion-chip"
                      >
                        {searchQuery} pas cher
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSearchQuery(`${searchQuery} avis`)}
                        className="suggestion-chip"
                      >
                        {searchQuery} avis
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSearchQuery(`${searchQuery} comparatif`)}
                        className="suggestion-chip"
                      >
                        {searchQuery} comparatif
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSearchQuery(`${searchQuery} meilleur prix`)}
                        className="suggestion-chip"
                      >
                        {searchQuery} meilleur prix
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Catégories populaires */}
                <div className="search-overlay-suggestions">
                  <h3>🏷️ Catégories Populaires</h3>
                  <div className="search-suggestions-grid">
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('smartphone')}
                      className="search-suggestion-card electronics"
                    >
                      <div className="suggestion-icon">📱</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Smartphones</span>
                        <span className="suggestion-count">2,847 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('laptop')}
                      className="search-suggestion-card electronics"
                    >
                      <div className="suggestion-icon">💻</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Ordinateurs</span>
                        <span className="suggestion-count">1,234 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('mode femme')}
                      className="search-suggestion-card fashion"
                    >
                      <div className="suggestion-icon">👗</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Mode Femme</span>
                        <span className="suggestion-count">3,456 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('chaussures')}
                      className="search-suggestion-card fashion"
                    >
                      <div className="suggestion-icon">👟</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Chaussures</span>
                        <span className="suggestion-count">1,789 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('maison décoration')}
                      className="search-suggestion-card home"
                    >
                      <div className="suggestion-icon">🏠</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Maison & Déco</span>
                        <span className="suggestion-count">2,123 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('sport fitness')}
                      className="search-suggestion-card sports"
                    >
                      <div className="suggestion-icon">⚽</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Sport & Fitness</span>
                        <span className="suggestion-count">987 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('beauté soins')}
                      className="search-suggestion-card beauty"
                    >
                      <div className="suggestion-icon">💄</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Beauté & Soins</span>
                        <span className="suggestion-count">1,567 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('livres')}
                      className="search-suggestion-card books"
                    >
                      <div className="suggestion-icon">📚</div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Livres</span>
                        <span className="suggestion-count">3,210 produits</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Recherches populaires */}
                <div className="search-trending">
                  <h3>🔥 Recherches Populaires</h3>
                  <div className="trending-searches">
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('iPhone 15')}
                      className="trending-search"
                    >
                      <span className="trending-rank">1</span>
                      <span className="trending-text">iPhone 15</span>
                      <span className="trending-trend">↗️</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('Nike Air Max')}
                      className="trending-search"
                    >
                      <span className="trending-rank">2</span>
                      <span className="trending-text">Nike Air Max</span>
                      <span className="trending-trend">↗️</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('MacBook Pro')}
                      className="trending-search"
                    >
                      <span className="trending-rank">3</span>
                      <span className="trending-text">MacBook Pro</span>
                      <span className="trending-trend">↗️</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('Samsung Galaxy')}
                      className="trending-search"
                    >
                      <span className="trending-rank">4</span>
                      <span className="trending-text">Samsung Galaxy</span>
                      <span className="trending-trend">↗️</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('Adidas')}
                      className="trending-search"
                    >
                      <span className="trending-rank">5</span>
                      <span className="trending-text">Adidas</span>
                      <span className="trending-trend">↗️</span>
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="search-overlay-submit"
                  disabled={!searchQuery.trim()}
                >
                  <Search size={20} />
                  Rechercher "{searchQuery || 'produits'}"
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Click Statistics Panel - Removed for client-side only app */}
      {/* <ClickStats /> */}
      
      {/* Affiliate Cookie Display - Removed for client-side only app */}
      {/* <AffiliateCookieDisplay /> */}

      {/* Logout Confirmation Modal */}
      
      {/* <ClickStats
        isOpen={isClickStatsOpen}
        onClose={() => setIsClickStatsOpen(false)}
      /> */}
    </>
  );
};

export default Header;
