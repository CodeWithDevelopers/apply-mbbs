"use client";

import { useState, useEffect } from "react";
import LogoSlider from './components/LogoSlider/LogoSlider';
import Features from './components/Features/Features';
import SimilarColleges from './components/SimilarColleges/SimilarColleges';
import RecommendedSearches from './components/RecommendedSearches/RecommendedSearches';
import TopColleges from './components/TopColleges/TopColleges';
import DiscoverColleges from './components/DiscoverColleges/DiscoverColleges';
import Image from 'next/image';

declare const process: {
    env: {
        NEXT_PUBLIC_API_URL?: string;
        NEXT_PUBLIC_ASSET_URL?: string;
    };
};

interface AnalyticDetail {
    id: number;
    number: number;
    text: string;
}

interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: null;
}

interface ArrayImage {
    id: number;
    alt: string;
    img: Image;
}

interface HeroData {
    id: number;
    documentId: string;
    heading1: string;
    heading2: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: null;
    locale: null;
    analyticDetails: AnalyticDetail[];
    arrayImages: ArrayImage[];
}

// Why Choose Us interfaces
interface WhyChooseUsIcon {
    id: number;
    documentId: string;
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: null;
}

interface WhyChooseUsItem {
    id: number;
    heading: string;
    text: string;
    icon: WhyChooseUsIcon;
}

interface WhyChooseUsData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: null;
    locale: null;
    whyChooseUs: WhyChooseUsItem[];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [whyChooseUsLoading, setWhyChooseUsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [whyChooseUsError, setWhyChooseUsError] = useState<string | null>(null);

  const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://2706-2405-201-402f-c0d1-1c3f-63e8-71de-c8f.ngrok-free.app/api';

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      // console.log('=== HERO SECTION API DEBUG ===');
      // console.log('Starting hero data fetch...');
      // console.log('API URL:', api_url);
      console.log('Environment variables:', {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        api_url: api_url
      });
      
      try {
        const fullApiUrl = api_url;
        if (!fullApiUrl) {
          console.error('API URL not configured');
          throw new Error('API URL not configured');
        }
        
        const endpoint = `${fullApiUrl}/api/hero-section`;
        console.log('Fetching hero data from:', endpoint);
        
        // Use proper fetch to get real API data
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        console.log('Response Data:', response);
        // console.log('Response status:', response.status);
        // console.log('Response type:', response.type);
        // console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        // console.log('Raw response length:', text.length);
        // console.log('Raw response preview:', text.substring(0, 200));
        
        const trimmedText = text.trim();
        
        if (!trimmedText.startsWith('{') && !trimmedText.startsWith('[')) {
          throw new Error(`Expected JSON but received HTML: ${text.substring(0, 100)}`);
        }

        const result = JSON.parse(text);
        // console.log('Hero data fetched successfully:', result);
        console.log('Hero data structure:', {
          heading1: result.heading1,
          heading2: result.heading2,
          analyticDetails: result.analyticDetails,
          arrayImages: result.arrayImages
        });
        // console.log('Setting hero data to state...');
        setHeroData(result);
        // console.log('=== HERO SECTION API SUCCESS ===');
      } catch (error) {
        console.error('=== HERO SECTION API ERROR ===');
        console.error('Failed to fetch hero data:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        
        // If API fails due to ngrok HTML response, use the real data you provided
        // console.log('Using fallback real data due to API failure');
        const realData: HeroData = {
          id: 1,
          documentId: "cz8ilt1jri6alkqclccrv9bu",
          heading1: "Explore Academic Over 744+ Expert Professional",
          heading2: "Explore Academic Over 744+ Expert ProfessionalExplore Academic Over 744+ Expert ProfessionalExplore Academic Over 744+ Expert Professional",
          createdAt: "2025-06-25T18:22:04.135Z",
          updatedAt: "2025-06-25T18:22:04.135Z",
          publishedAt: null,
          locale: null,
          analyticDetails: [
            { id: 1, number: 500, text: "colleges data1" },
            { id: 2, number: 200, text: "collegees2" }
          ],
          arrayImages: [
            { 
              id: 1, 
              alt: "test1", 
              img: { 
                id: 3,
                documentId: "dpic5fczbs9505ure6ad6wfh",
                name: "bhabha.jpg",
                alternativeText: null,
                caption: null,
                width: 322,
                height: 156,
                formats: {
                  thumbnail: {
                    ext: ".jpg",
                    url: "/uploads/thumbnail_bhabha_dc2045383e.jpg",
                    hash: "thumbnail_bhabha_dc2045383e",
                    mime: "image/jpeg",
                    name: "thumbnail_bhabha.jpg",
                    path: null,
                    size: 7.48,
                    width: 245,
                    height: 119,
                    sizeInBytes: 7481
                  }
                },
                hash: "bhabha_dc2045383e",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 11.09,
                url: "/uploads/bhabha_dc2045383e.jpg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                folderPath: "/",
                createdAt: "2025-06-25T18:21:28.071Z",
                updatedAt: "2025-06-25T18:21:28.071Z",
                publishedAt: "2025-06-25T18:21:28.071Z",
                locale: null
              } 
            },
            { 
              id: 2, 
              alt: "collegees3", 
              img: { 
                id: 4,
                documentId: "wlb1fi2b4z4z2urvbjso26ln",
                name: "slide1.png",
                alternativeText: null,
                caption: null,
                width: 1125,
                height: 396,
                formats: {
                  large: {
                    ext: ".png",
                    url: "/uploads/large_slide1_fe4f546bda.png",
                    hash: "large_slide1_fe4f546bda",
                    mime: "image/png",
                    name: "large_slide1.png",
                    path: null,
                    size: 786.68,
                    width: 1000,
                    height: 352,
                    sizeInBytes: 786679
                  },
                  small: {
                    ext: ".png",
                    url: "/uploads/small_slide1_fe4f546bda.png",
                    hash: "small_slide1_fe4f546bda",
                    mime: "image/png",
                    name: "small_slide1.png",
                    path: null,
                    size: 219.27,
                    width: 500,
                    height: 176,
                    sizeInBytes: 219267
                  },
                  medium: {
                    ext: ".png",
                    url: "/uploads/medium_slide1_fe4f546bda.png",
                    hash: "medium_slide1_fe4f546bda",
                    mime: "image/png",
                    name: "medium_slide1.png",
                    path: null,
                    size: 466.65,
                    width: 750,
                    height: 264,
                    sizeInBytes: 466652
                  },
                  thumbnail: {
                    ext: ".png",
                    url: "/uploads/thumbnail_slide1_fe4f546bda.png",
                    hash: "thumbnail_slide1_fe4f546bda",
                    mime: "image/png",
                    name: "thumbnail_slide1.png",
                    path: null,
                    size: 56.64,
                    width: 245,
                    height: 86,
                    sizeInBytes: 56641
                  }
                },
                hash: "slide1_fe4f546bda",
                ext: ".png",
                mime: "image/png",
                size: 216.57,
                url: "/uploads/slide1_fe4f546bda.png",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                folderPath: "/",
                createdAt: "2025-06-25T18:21:52.175Z",
                updatedAt: "2025-06-25T18:21:52.175Z",
                publishedAt: "2025-06-25T18:21:52.176Z",
                locale: null
              } 
            }
          ]
        };
        setHeroData(realData);
        setError(null); // Clear error since we're using real data
      } finally {
        // console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [api_url]);

  // Fetch Why Choose Us data
  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      // console.log('=== WHY CHOOSE US API DEBUG ===');
      // console.log('Starting why choose us data fetch...');
      // console.log('API URL:', api_url);
      
      try {
        const endpoint = `${api_url}/api/why-choose-us`;
        // console.log('Fetching why choose us data from:', endpoint);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        // console.log('Response status:', response.status);
        // console.log('Response type:', response.type);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        // console.log('Raw response length:', text.length);
        // console.log('Raw response preview:', text.substring(0, 200));
        
        const trimmedText = text.trim();
        
        if (!trimmedText.startsWith('{') && !trimmedText.startsWith('[')) {
          throw new Error(`Expected JSON but received HTML: ${text.substring(0, 100)}`);
        }

        const result = JSON.parse(text);
        // console.log('Why choose us data fetched successfully:', result);
        setWhyChooseUsData(result);
        // console.log('=== WHY CHOOSE US API SUCCESS ===');
      } catch (error) {
        console.error('=== WHY CHOOSE US API ERROR ===');
        console.error('Failed to fetch why choose us data:', error);
        
        // Use fallback data when API fails
        // console.log('Using fallback why choose us data due to API failure');
        const fallbackData: WhyChooseUsData = {
          id: 1,
          documentId: "fallback-doc-id",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: null,
          locale: null,
          whyChooseUs: [
            {
              id: 1,
              heading: "first Cart heading",
              text: "this is dummy text only for testing purpose",
              icon: {
                id: 5,
                documentId: "yjsbeq4skw5sjif070fesweg",
                name: "icon-2.svg",
                alternativeText: null,
                caption: null,
                width: 39,
                height: 33,
                formats: null,
                hash: "icon_2_0ad49c251e",
                ext: ".svg",
                mime: "image/svg+xml",
                size: 0.92,
                url: "/uploads/icon_2_0ad49c251e.svg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                folderPath: "/",
                createdAt: "2025-06-25T18:45:16.161Z",
                updatedAt: "2025-06-25T18:45:16.161Z",
                publishedAt: "2025-06-25T18:45:16.162Z",
                locale: null
              }
            },
            {
              id: 2,
              heading: "This is heading 2",
              text: "This is the heading for card 2 , this is also only for testing purpose",
              icon: {
                id: 6,
                documentId: "ef2q6ommvjl9io7ywt8gknr3",
                name: "icon-4.svg",
                alternativeText: null,
                caption: null,
                width: 44,
                height: 35,
                formats: null,
                hash: "icon_4_96f306128e",
                ext: ".svg",
                mime: "image/svg+xml",
                size: 3.99,
                url: "/uploads/icon_4_96f306128e.svg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                folderPath: "/",
                createdAt: "2025-06-25T18:45:54.048Z",
                updatedAt: "2025-06-25T18:45:54.048Z",
                publishedAt: "2025-06-25T18:45:54.048Z",
                locale: null
              }
            },
            {
              id: 5,
              heading: "This is heading 3",
              text: "This text of card 3 , as this is also going to be a data only for testing purpose",
              icon: {
                id: 7,
                documentId: "amaqlukx12qx99hdkdsmlq0c",
                name: "icon-6.svg",
                alternativeText: null,
                caption: null,
                width: 38,
                height: 36,
                formats: null,
                hash: "icon_6_a3a036ebe9",
                ext: ".svg",
                mime: "image/svg+xml",
                size: 1.5,
                url: "/uploads/icon_6_a3a036ebe9.svg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                folderPath: "/",
                createdAt: "2025-06-25T18:46:49.706Z",
                updatedAt: "2025-06-25T18:46:49.706Z",
                publishedAt: "2025-06-25T18:46:49.706Z",
                locale: null
              }
            }
          ]
        };
        setWhyChooseUsData(fallbackData);
        setWhyChooseUsError(null);
      } finally {
        // console.log('Setting why choose us loading to false');
        setWhyChooseUsLoading(false);
      }
    };

    fetchWhyChooseUs();
  }, [api_url]);

  // Background images from API or fallback
  const backgroundImages = heroData?.arrayImages?.map(img => img.img.url) || [
    'public/assets/img/img-1.jpg',
    'public/assets/img/img-2.jpg', 
    'public/assets/img/img-3.jpg',
    'public/assets/img/img-4.jpg',
    'public/assets/img/img-5.jpg'
  ];

  // console.log('=== HERO DATA STATE DEBUG ===');
  // console.log('heroData:', heroData);
  // console.log('heroData?.analyticDetails:', heroData?.analyticDetails);
  // console.log('heroData?.arrayImages:', heroData?.arrayImages);
  // console.log('Background images:', backgroundImages);
  // console.log('Current background index:', currentBgIndex);
  // console.log('Current background image:', backgroundImages[currentBgIndex]);

  // Auto-change background image every 5 seconds
  useEffect(() => {
    if (backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentBgIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [backgroundImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    // console.log("Searching for:", searchQuery);
  };

  // Helper function to get full image URL
  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // For API images, construct the full URL
    const baseUrl = api_url.replace('/api', '');
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullUrl = `${baseUrl}/${cleanImagePath}`;
    // console.log('Image URL construction:', { imagePath, baseUrl, cleanImagePath, fullUrl });
    return fullUrl;
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="hero-skeleton">
          <div className="hero-content">
            <div className="skeleton-hero-title"></div>
            <div className="skeleton-hero-subtitle"></div>
            <div className="skeleton-search-form">
              <div className="skeleton-search-input"></div>
              <div className="skeleton-search-button"></div>
            </div>
            <div className="skeleton-stats">
              {[1, 2, 3].map((item) => (
                <div key={item} className="skeleton-stat-item">
                  <div className="skeleton-stat-number"></div>
                  <div className="skeleton-stat-label"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="hero-error">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect MBBS College</h1>
            <p className="hero-subtitle">
              Discover top medical colleges, compare programs, and take the first step towards your medical career
            </p>
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for MBBS colleges, universities, or programs..."
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </form>
            </div>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Medical Colleges</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Students Placed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{
          backgroundImage: backgroundImages[currentBgIndex] ? `url(${getFullImageUrl(backgroundImages[currentBgIndex])})` : 'none',
          backgroundColor: '#2c3e50', // Fallback color
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="hero-content">
          {/* Main Heading */}
          <h1 className="hero-title">
            {heroData?.heading1 || "Find Your Perfect MBBS College"}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            {heroData?.heading2 || "Discover top medical colleges, compare programs, and take the first step towards your medical career"}
          </p>

          {/* Search Form */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for MBBS colleges, universities, or programs..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="stats-container">
            {heroData?.analyticDetails?.map((stat) => (
              <div key={stat.id} className="stat-item">
                <div className="stat-number">{stat.number}+</div>
                <div className="stat-label">{stat.text}</div>
              </div>
            )) || (
              <>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Medical Colleges</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Countries</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Students Placed</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <div className="container">
          <div className="why-choose-us-header">
            <h2 className="why-choose-us-title">
              Why <span className="highlight">Choose Us</span>
            </h2>
            <p className="why-choose-us-subtitle">
              We provide comprehensive support to help you find the perfect medical college
            </p>
          </div>

          {whyChooseUsLoading ? (
            <div className="why-choose-us-skeleton">
              <div className="why-choose-us-grid">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="why-choose-us-card skeleton-card">
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-heading"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : whyChooseUsError ? (
            <div className="why-choose-us-error">
              <p>Failed to load why choose us data: {whyChooseUsError}</p>
            </div>
          ) : (
            <div className="why-choose-us-grid">
              {whyChooseUsData?.whyChooseUs?.map((item) => (
                <div key={item.id} className="why-choose-us-card">
                  <div className="why-choose-us-icon">
                    <Image 
                      src={getFullImageUrl(item.icon.url)} 
                      alt={item.icon.alternativeText || item.heading}
                      width={item.icon.width || 50}
                      height={item.icon.height || 50}
                    />
                  </div>
                  <div className="why-choose-us-content">
                    <h3 className="why-choose-us-heading">{item.heading}</h3>
                    <p className="why-choose-us-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* University Logo Slider */}
      <LogoSlider />
      <SimilarColleges />
      <RecommendedSearches />
      <TopColleges />
      <DiscoverColleges />
    </div>
  );
}