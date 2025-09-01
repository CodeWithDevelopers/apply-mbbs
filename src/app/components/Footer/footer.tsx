"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

declare const process: {
  env: {
    NEXT_PUBLIC_ASSET_URL?: string;
    NEXT_PUBLIC_API_URL?: string;
  };
};

interface FooterLink {
  id: number;
  name: string;
  url: string;
}

interface FooterLogo {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface FooterData {
  footerLinks: FooterLink[];
  footerLogo: FooterLogo;
}

export default function Footer() {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "https://applymbbs.in";
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";
  useEffect(() => {
    const fetchData = async () => {
      let retryCount = 0;
      const maxRetries = 3;

      const attemptFetch = async () => {
        try {
          // Use the API URL from environment variable
          const fullApiUrl = api_url;
          if (!fullApiUrl) {
            throw new Error("API URL not configured");
          }
          const endpoint = `${fullApiUrl}/api/master-link`;

          console.log(`Attempt ${retryCount + 1}: Fetching from:`, endpoint);

          // Add timeout to prevent hanging requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            mode: "cors",
          });

          clearTimeout(timeoutId);
          console.log("Response status:", response.status);
          console.log(
            "Response headers:",
            Object.fromEntries(response.headers.entries())
          );

          const text = await response.text();
          console.log("Raw response preview:", text.substring(0, 200));

          // Check if response is actually JSON (more robust check)
          const trimmedText = text.trim();
          if (!trimmedText.startsWith("{") && !trimmedText.startsWith("[")) {
            console.warn(
              `Attempt ${retryCount + 1}: Received HTML instead of JSON`
            );
            throw new Error(
              `Expected JSON but received HTML: ${text.substring(0, 100)}`
            );
          }

          // Try to parse JSON
          let result;
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            console.warn(`Attempt ${retryCount + 1}: Invalid JSON received`);
            throw new Error(
              `Invalid JSON: ${
                parseError instanceof Error
                  ? parseError.message
                  : String(parseError)
              }`
            );
          }

          console.log("Successfully parsed data:", result);
          setData(result);
          return true; // Success
        } catch (error) {
          console.error(
            `Attempt ${retryCount + 1} failed:`,
            error instanceof Error ? error.message : String(error)
          );
          return false; // Failed
        }
      };

      // Try up to maxRetries times
      while (retryCount < maxRetries) {
        // Add a small delay before the first attempt to let the API stabilize
        if (retryCount === 0) {
          console.log("Waiting 1 second before first attempt...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const success = await attemptFetch();
        if (success) {
          break;
        }
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`Retrying in 2 seconds... (${retryCount}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      // If all retries failed, try alternative endpoints
      if (retryCount >= maxRetries) {
        console.log("All API attempts failed, using fallback data");
        setData({
          footerLinks: [
            {
              id: 1,
              name: "Undergraduate Programs",
              url: "/undergraduate-programs",
            },
            {
              id: 2,
              name: "Postgraduate Programs",
              url: "/postgraduate-programs",
            },
            { id: 3, name: "Departments", url: "/departments" },
            { id: 4, name: "Admissions", url: "/admissions" },
            { id: 5, name: "Scholarships", url: "/scholarships" },
            { id: 6, name: "FAQs", url: "/faqs" },
          ],
          footerLogo: {
            url: "/assets/img/logo.png",
            alternativeText: "Logo",
            width: 150,
            height: 50,
          },
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [api_url]);

  if (loading) {
    return (
      <div className="footer-skeleton">
        <div className="footer-bg position-relative">
          <div className="footer-bg__img">
            <div className="skeleton-footer-bg"></div>
          </div>
          <footer className="ed-footer position-relative">
            <div className="ed-footer__top position-relative">
              <div className="ed-footer__shapes">
                <div className="ed-footer__shape-1 skeleton-shape"></div>
                <div className="ed-footer__shape-2 skeleton-shape"></div>
                <div className="ed-footer__shape-3 skeleton-shape"></div>
              </div>
              <div className="container ed-container">
                <div className="row g-0">
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="ed-footer__widget ed-footer__about">
                      <div className="ed-footer__logo">
                        <div className="skeleton-logo"></div>
                      </div>
                      <div className="skeleton-text skeleton-text-long"></div>
                      <ul className="ed-footer__about-social">
                        {[1, 2, 3, 4].map((item) => (
                          <li key={item}>
                            <div className="skeleton-social-icon"></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-6 col-12">
                    <div className="ed-footer__widget">
                      <div className="skeleton-title"></div>
                      <ul className="ed-footer__widget-links">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <li key={item}>
                            <div className="skeleton-link"></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="ed-footer__widget contact-widget">
                      <div className="skeleton-title"></div>
                      <div className="ed-footer__contact">
                        <div className="ed-footer__contact-icon">
                          <div className="skeleton-icon"></div>
                        </div>
                        <div className="ed-footer__contact-info">
                          <div className="skeleton-text-small"></div>
                          <div className="skeleton-text-medium"></div>
                        </div>
                      </div>
                      <div className="ed-footer__contact">
                        <div className="ed-footer__contact-icon">
                          <div className="skeleton-icon"></div>
                        </div>
                        <div className="ed-footer__contact-info">
                          <div className="skeleton-text-small"></div>
                          <div className="skeleton-text-medium"></div>
                        </div>
                      </div>
                      <div className="ed-footer__contact">
                        <div className="ed-footer__contact-icon">
                          <div className="skeleton-icon"></div>
                        </div>
                        <div className="ed-footer__contact-info">
                          <div className="skeleton-text-small"></div>
                          <div className="skeleton-text-long"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="ed-footer__widget newsletter-widget">
                      <div className="skeleton-title"></div>
                      <div className="ed-footer__newsletter">
                        <div className="skeleton-text skeleton-text-long"></div>
                        <div className="skeleton-newsletter-form">
                          <div className="skeleton-input"></div>
                          <div className="skeleton-button"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ed-footer__bottom">
              <div className="container ed-container">
                <div className="row">
                  <div className="col-12">
                    <div className="skeleton-copyright"></div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="footer-error">
        <p>Failed to load footer</p>
      </div>
    );
  }

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    // Ensure asset_url ends with a slash if it doesn't already
    const baseUrl = asset_url.endsWith("/") ? asset_url : `${asset_url}/`;
    // Remove leading slash from imagePath if it exists
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    return `${baseUrl}${cleanImagePath}`;
  };

  return (
    <div>
      <div className="footer-bg position-relative">
        <div className="footer-bg__img">
          <Image
            src={`${asset_url}/assets/images/footer/footer-2/footer-bg.png`}
            alt="footer-bg-img"
            width={1920}
            height={600}
          />
        </div>
        <footer className="ed-footer position-relative">
          <div className="ed-footer__top position-relative">
            <div className="ed-footer__shapes">
              <Image
                className="ed-footer__shape-1"
                src={`${asset_url}/assets/images/footer/footer-1/shape-1.svg`}
                alt="shape-1"
                width={100}
                height={100}
              />
              <Image
                className="ed-footer__shape-2 rotate-ani"
                src={`${asset_url}/assets/images/footer/footer-1/shape-2.svg`}
                alt="shape-2"
                width={80}
                height={80}
              />
              <Image
                className="ed-footer__shape-3"
                src={`${asset_url}/assets/images/footer/footer-1/shape-3.svg`}
                alt="shape-3"
                width={120}
                height={120}
              />
            </div>
            <div className="container ed-container">
              <div className="row g-0">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="ed-footer__widget ed-footer__about">
                    <a href={asset_url} className="ed-footer__logo">
                      <Image
                        src={
                          data.footerLogo?.url
                            ? `${process.env.NEXT_PUBLIC_API_URL}${data.footerLogo?.url}`
                            : getFullImageUrl(
                                data.footerLogo?.url || "/assets/img/logo.png"
                              )
                        }
                        alt={
                          data.footerLogo?.alternativeText || "University Logo"
                        }
                        width={data.footerLogo?.width || 150}
                        height={data.footerLogo?.height || 50}
                      />
                    </a>
                    <p className="ed-footer__about-text">
                      Our university is committed to academic excellence and
                      personal growth. Join a thriving community of learners and
                      innovators.
                    </p>
                    <ul className="ed-footer__about-social">
                      <li>
                        <a href="https://www.facebook.com/" target="_blank">
                          <Image
                            src={`${asset_url}/assets/images/icons/icon-dark-facebook.svg`}
                            alt="facebook"
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/" target="_blank">
                          <Image
                            src={`${asset_url}/assets/images/icons/icon-dark-twitter.svg`}
                            alt="twitter"
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/" target="_blank">
                          <Image
                            src={`${asset_url}/assets/images/icons/icon-dark-linkedin.png`}
                            alt="linkedin"
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/" target="_blank">
                          <Image
                            src={`${asset_url}/assets/images/icons/icon-dark-instagram.svg`}
                            alt="instagram"
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-12">
                  <div className="ed-footer__widget">
                    <h4 className="ed-footer__widget-title">Academics</h4>
                    <ul className="ed-footer__widget-links">
                      {data.footerLinks && data.footerLinks.length > 0 ? (
                        data.footerLinks.map((link) => (
                          <li key={link.id}>
                            <a href={link.url}>{link.name}</a>
                          </li>
                        ))
                      ) : (
                        <>
                          <li>
                            <a href={`${asset_url}/undergraduate-programs`}>
                              Undergraduate Programs
                            </a>
                          </li>
                          <li>
                            <a href={`${asset_url}/postgraduate-programs`}>
                              Postgraduate Programs
                            </a>
                          </li>
                          <li>
                            <a href={`${asset_url}/departments`}>Departments</a>
                          </li>
                          <li>
                            <a href={`${asset_url}/admissions`}>Admissions</a>
                          </li>
                          <li>
                            <a href={`${asset_url}/scholarships`}>
                              Scholarships
                            </a>
                          </li>
                          <li>
                            <a href={`${asset_url}/faqs`}>FAQs</a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <div className="ed-footer__widget contact-widget">
                    <h4 className="ed-footer__widget-title">Contact</h4>
                    <div className="ed-footer__contact">
                      <div className="ed-footer__contact-icon">
                        <Image
                          src={`${asset_url}/assets/images/icons/icon-phone-blue.svg`}
                          alt="phone"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="ed-footer__contact-info">
                        <span>Call Us</span>
                        <a href="tel:+919907811114">+9199078 11114</a>
                      </div>
                    </div>
                    <div className="ed-footer__contact">
                      <div className="ed-footer__contact-icon">
                        <Image
                          src={`${asset_url}/assets/images/icons/icon-envelope-blue.svg`}
                          alt="email"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="ed-footer__contact-info">
                        <span>Email</span>
                        <a href="mailto:info@applymbbs.in">info@applymbbs.in</a>
                      </div>
                    </div>
                    <div className="ed-footer__contact">
                      <div className="ed-footer__contact-icon">
                        <Image
                          src={`${asset_url}/assets/images/icons/icon-location-blue.svg`}
                          alt="location"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="ed-footer__contact-info">
                        <span>Office Address</span>
                        <a href="#" target="_blank">
                          1010, 10th Floor, Wave Silver Tower Noida Sector-18,
                          201301
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <div className="ed-footer__widget newsletter-widget">
                    <h4 className="ed-footer__widget-title">Stay Updated</h4>
                    <div className="ed-footer__newsletter">
                      <p className="ed-footer__about-text">
                        Subscribe to get the latest updates, event info, and
                        academic news straight to your inbox.
                      </p>
                      <form
                        action="#"
                        method="post"
                        className="ed-footer__newsletter-form"
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          required
                        />
                        <button type="submit" className="ed-btn">
                          Subscribe
                          <i className="fi fi-rr-arrow-small-right"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ed-footer__bottom">
            <div className="container ed-container">
              <div className="row">
                <div className="col-12">
                  <p className="ed-footer__copyright-text">
                    © 2025 Your University | Designed by{" "}
                    <a href="#" target="_blank">
                      Mono Solve
                    </a>
                    . All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
