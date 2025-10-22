import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Heart, Eye, Zap, ExternalLink } from 'lucide-react';
import { productAPI, analyticsAPI } from '../services/minimalAPI';
import affiliateService from '../services/minimalAffiliate';
import { translateProduct } from '../utils/productTranslations';
import { debugTranslations } from '../utils/debugTranslations';
import { useModal } from '../contexts/ModalContext';
import currencyService from '../utils/currency';
import { formatReviewCount } from '../utils/numberFormatter';
import { safeRedirect } from '../utils/redirectUtils';
import StarRating from './StarRating';

const ProductCard = ({ product, onProductClick }) => {
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(currencyService.getCurrentCurrency());
  const { openModal } = useModal();

  // Protection contre les produits invalides
  if (!product || !product._id) {
    console.warn('ProductCard: Invalid product data', product);
    return null;
  }
  
  // Translate product information
  const translatedProduct = translateProduct(product, t);
  
  // Debug: Log translation results
  if (product._id === 'product-1' || product._id === 'product-2') {
    console.log('🔍 ProductCard Debug:', {
      productId: product._id,
      originalName: product.name,
      translatedName: translatedProduct.name,
      language: i18n.language,
      isTranslated: product.name !== translatedProduct.name
    });
  }
  
  // Check if current language is French
  const isFrench = i18n.language === 'fr';

  useEffect(() => {
    const handleCurrencyChange = (event) => {
      setCurrentCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, []);


  const handleProductClick = async (clickSource = 'card') => {
    if (!product) return;
    
    // Capturer le clic immédiatement
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    // Utiliser le service de tracking complet
    clickTrackingService.trackProductInteraction(
      product._id,
      product.name,
      clickSource,
      affiliateUrl
    );
    
    // Capturer le clic avec tous les détails
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'quickView',
      clickSource,
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ Product click captured:', clickResult.message);
    }
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, redirect directly to affiliate link
      if (affiliateUrl && affiliateUrl !== '#') {
        const redirectSuccess = safeRedirect(affiliateUrl, true);
        if (!redirectSuccess) {
          console.warn('❌ Failed to redirect to affiliate URL:', affiliateUrl);
          window.location.href = affiliateUrl;
        } else {
          console.log('✅ Successfully redirected to:', affiliateUrl);
        }
      } else {
        console.warn('❌ No affiliate URL found for product:', product.name);
        window.location.href = '/';
      }
    } else {
      // On desktop, open modal
      openModal('quickView', product);
      
      // Use setTimeout to prevent blocking the UI
      setTimeout(async () => {
        try {
          // Track the quick view in analytics
          await analyticsAPI.trackEvent('quick_view', { 
            productId: product._id,
            affiliateId: clickResult.affiliateInfo?.affiliateId 
          }, product._id);
          
        } catch (error) {
          // Error tracking quick view
          console.error('Quick view error:', error);
        }
      }, 0);
    }
  };

  const handleStarsClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    // Capturer le clic sur les étoiles
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    // Debug: Afficher le lien d'affiliation utilisé
    console.log('🔍 Stars Click - Product affiliate URL:', {
      productId: product._id,
      productName: product.name,
      affiliateUrl: affiliateUrl,
      affiliateUrl_source: product.affiliateUrl ? 'affiliateUrl' : (product.affiliate_url ? 'affiliate_url' : 'fallback')
    });
    
    // Capturer le clic avec le service d'affiliation
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'stars',
      'rating-stars',
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ Stars click captured:', clickResult.message);
    }
    
    // Rediriger vers le lien d'affiliation
    if (affiliateUrl && affiliateUrl !== '#') {
      const redirectSuccess = safeRedirect(affiliateUrl, true);
      if (!redirectSuccess) {
        console.warn('❌ Failed to redirect to affiliate URL:', affiliateUrl);
        window.location.href = affiliateUrl;
      } else {
        console.log('✅ Successfully redirected to:', affiliateUrl);
      }
    } else {
      console.warn('❌ No affiliate URL found for product:', product.name);
    }
  };

  const handleSeePriceClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    // Debug: Afficher le lien d'affiliation utilisé
    console.log('🔍 See Price - Product affiliate URL:', {
      productId: product._id,
      productName: product.name,
      affiliateUrl: affiliateUrl,
      affiliateUrl_source: product.affiliateUrl ? 'affiliateUrl' : (product.affiliate_url ? 'affiliate_url' : 'fallback')
    });
    
    // Capturer le clic sur le bouton "Voir prix"
    const clickResult = affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'buy',
      'see-price-button',
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ See Price button click captured:', clickResult.message);
    }
    
    // Redirection vers le lien d'affiliation avec ouverture forcée dans un nouvel onglet
    if (affiliateUrl && affiliateUrl !== '#') {
      const redirectSuccess = safeRedirect(affiliateUrl, true); // Force new tab
      
      if (!redirectSuccess) {
        console.warn('❌ Failed to redirect to affiliate URL:', affiliateUrl);
        // Silent redirect - no user interruption
        window.location.href = affiliateUrl;
      } else {
        console.log('✅ Successfully redirected to:', affiliateUrl);
      }
    } else {
      console.warn('❌ No affiliate URL found for product:', product.name);
      // Silent fallback - redirect to home
      window.location.href = '/';
    }
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    // Capturer le clic sur le bouton like
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'button',
      'like-button',
      productImage
    );
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capturer le clic sur l'image
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'image',
      'product-image',
      productImage
    );
    
    // Ouvrir la vue rapide
    handleProductClick('image');
  };

  const handleQuickViewClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    // Capturer le clic sur le bouton Quick View
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    // Debug: Afficher le lien d'affiliation utilisé
    console.log('🔍 Quick View - Product affiliate URL:', {
      productId: product._id,
      productName: product.name,
      affiliateUrl: affiliateUrl,
      affiliateUrl_source: product.affiliateUrl ? 'affiliateUrl' : (product.affiliate_url ? 'affiliate_url' : 'fallback')
    });
    
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'button',
      'quick-view-button',
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ Quick View button click captured:', clickResult.message);
    }
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, redirect directly to affiliate link
      if (affiliateUrl && affiliateUrl !== '#') {
        const redirectSuccess = safeRedirect(affiliateUrl, true);
        if (!redirectSuccess) {
          console.warn('❌ Failed to redirect to affiliate URL:', affiliateUrl);
          window.location.href = affiliateUrl;
        } else {
          console.log('✅ Successfully redirected to:', affiliateUrl);
        }
      } else {
        console.warn('❌ No affiliate URL found for product:', product.name);
        window.location.href = '/';
      }
    } else {
      // On desktop, open modal
      openModal('quickView', product);
      
      // Use setTimeout to prevent blocking the UI
      setTimeout(async () => {
        try {
          // Track the quick view in analytics
          await analyticsAPI.trackEvent('quick_view', { 
            productId: product._id,
            affiliateId: clickResult.affiliateInfo?.affiliateId 
          }, product._id);
          
        } catch (error) {
          // Error tracking quick view
          console.error('Quick view error:', error);
        }
      }, 0);
    }
  };

  const formatPrice = (price) => {
    return currencyService.formatPrice(price, currentCurrency);
  };

  const calculateDiscount = () => {
    if (product.discount > 0) {
      return product.discount;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const calculateSavings = () => {
    if (product.savings > 0) {
      return product.savings;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return product.originalPrice - product.price;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const savings = calculateSavings();
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const productName = translatedProduct.name || product.name || product.title || 'Product';
  
  // Enhanced fallback image with better styling
  const fallbackImage = `https://via.placeholder.com/400x400/f8fafc/64748b?text=${encodeURIComponent(productName.split(' ')[0])}`;
  
  // Enhanced product tags display
  const displayTags = product.tags?.slice(0, 2) || [];
  
  // Enhanced rating display
  const rating = product.rating?.average || 0;
  const ratingCount = product.rating?.count || 0;

  return (
    <div 
      className="product-card"
      onClick={handleProductClick}
    >
      <div className="product-image-container">
        {discount > 0 && (
          <div className="discount-badge">
            <Zap size={12} />
            -{discount}%
          </div>
        )}
        

        <div className="image-wrapper">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          
          <img
            src={primaryImage?.url || fallbackImage}
            alt={primaryImage?.alt || product.name}
            className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onClick={handleImageClick}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={(e) => {
              setImageError(true);
              e.target.src = fallbackImage;
            }}
          />
        </div>

        <div className="product-overlay">
          <button 
            className="quick-view-button"
            onClick={handleQuickViewClick}
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>
      </div>
      
          <div className="product-info">
            <div className="product-header">
              <h3 className="product-name" title={translatedProduct.name || product.name}>
                {translatedProduct.name || product.name}
              </h3>
              {product.productNumber && (
                <div className="product-number" style={{
                  backgroundColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 90%)`,
                  borderColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 80%)`,
                  color: `hsl(${(product.productNumber * 30) % 360}, 60%, 40%)`
                }}>
                  {product.productNumber}
                </div>
              )}
            </div>

            <div className="product-rating-mobile" onClick={handleStarsClick} style={{ cursor: 'pointer' }}>
              <StarRating rating={rating} size={14} showText={false} />
              <span className="rating-text-mobile">
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="product-rating-desktop" onClick={handleStarsClick} style={{ cursor: 'pointer' }}>
              <StarRating rating={rating} size={16} showText={false} />
              <span className="rating-text">
                {rating.toFixed(1)} ({formatReviewCount(ratingCount, i18n.language)})
              </span>
            </div>
        
            {/* Price section hidden */}
            {/* <div className={`product-price-modern ${isFrench ? 'price-french' : ''}`}>
              <div className="price-current">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="price-original">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="price-savings">
                  -{formatPrice(product.originalPrice - product.price)}
                </div>
              )}
            </div> */}
        
        <div className="product-actions">
          <button
            className="quick-view-button quick-view-desktop"
            onClick={handleQuickViewClick}
            title={t('products.quickView')}
          >
            <Eye size={16} />
            <span className="quick-view-text">{t('products.quickView')}</span>
          </button>
          <button
            className="buy-button buy-button-desktop"
            onClick={handleSeePriceClick}
          >
            <ExternalLink size={16} />
            <span className="buy-button-text">{t('products.seePrice')}</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;