"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

declare const process: {
  env: {
    NEXT_PUBLIC_ASSET_URL?: string;
    NEXT_PUBLIC_API_URL?: string;
  };
};

interface NavLink {
  id: number;
  name: string;
  url: string;
  childrens: NavLink[];
}

interface HeaderLogo {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface HeaderData {
  navLinks: NavLink[];
  headerlogo: HeaderLogo;
}

export default function Header() {
  const [data, setData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "https://applymbbs.in";
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      let retryCount = 0;
      const maxRetries = 3;

      const attemptFetch = async () => {
        try {
          const fullApiUrl = api_url;
          if (!fullApiUrl) {
            throw new Error("API URL not configured");
          }
          const endpoint = `${fullApiUrl}/api/master-link`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            mode: "cors",
          });

          clearTimeout(timeoutId);

          const text = await response.text();
          if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) {
            throw new Error(
              `Expected JSON but received HTML: ${text.substring(0, 100)}`
            );
          }

          const result = JSON.parse(text);
          console.log("Successfully parsed data Header:", result);
          setData(result);
          return true;
        } catch (error) {
          console.error(`Attempt ${retryCount + 1} failed:`, error.message);
          return false;
        }
      };

      while (retryCount < maxRetries) {
        if (retryCount === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const success = await attemptFetch();
        if (success) {
          break;
        }
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (retryCount >= maxRetries) {
        setData({
          navLinks: [
            { id: 1, name: "Home", url: "/", childrens: [] },
            {
              id: 2,
              name: "Discover Colleges",
              url: "/discover-colleges",
              childrens: [
                {
                  id: 1,
                  name: "MBBS Colleges in UP",
                  url: "/colleges/up",
                  childrens: [],
                },
                {
                  id: 2,
                  name: "MBBS Colleges in MP",
                  url: "/colleges/mp",
                  childrens: [],
                },
              ],
            },
            { id: 3, name: "About", url: "/about", childrens: [] },
            { id: 4, name: "Latest Blog", url: "/blogs", childrens: [] },
            { id: 5, name: "Contact Us", url: "/contact", childrens: [] },
          ],
          headerlogo: {
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
      <div className="header-skeleton">
        <div className="container ed-container-expand">
          <div className="ed-header__inner">
            <div className="row align-items-center">
              <div className="col-lg-8 col-6">
                <div className="ed-header__left--style2">
                  <div className="ed-header__left-widget--style2">
                    <div className="ed-topbar__logo">
                      <div className="skeleton-logo"></div>
                    </div>
                  </div>
                  <nav className="ed-header__navigation">
                    <ul className="ed-header__menu">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item}>
                          <div className="skeleton-nav-item"></div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-6">
                <div className="ed-header__right">
                  <ul className="ed-topbar__info-social">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item}>
                        <div className="skeleton-social-icon"></div>
                      </li>
                    ))}
                  </ul>
                  <div className="ed-header__action">
                    <div className="ed-topbar__info-buttons">
                      <div className="skeleton-button"></div>
                    </div>
                    <div className="skeleton-mobile-menu"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="header-error">
        <p>Failed to load header</p>
      </div>
    );
  }

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    const baseUrl = asset_url.endsWith("/") ? asset_url : `${asset_url}/`;
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    return `${baseUrl}${cleanImagePath}`;
  };

  return (
    <div>
      <div id="ed-mouse">
        <div id="cursor-ball"></div>
      </div>
      <div
        className="modal mobile-menu-modal offcanvas-modal fade"
        id="offcanvas-modal"
      >
        <div className="modal-dialog offcanvas-dialog">
          <div className="modal-content">
            <div className="modal-header offcanvas-header">
              <div className="offcanvas-logo">
                <a href={asset_url}>
                  <Image
                    src={
                      data.headerlogo?.url
                        ? `${api_url}${data.headerlogo?.url}`
                        : getFullImageUrl("/assets/img/logo.png")
                    }
                    alt={data.headerlogo?.alternativeText || "Logo"}
                    width={150}
                    height={50}
                  />
                </a>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fi fi-ss-cross"></i>
              </button>
            </div>
            <div className="mobile-menu-modal-main-body">
              <div className="sticky-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container">
                    <a className="navbar-brand" href={asset_url}>
                      <Image
                        src={
                          data.headerlogo?.url
                            ? `${api_url}${data.headerlogo?.url}`
                            : getFullImageUrl("/assets/img/logo.png")
                        }
                        alt={data.headerlogo?.alternativeText || "Logo"}
                        width={150}
                        height={50}
                      />
                    </a>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {data.navLinks?.map((link) => (
                          <li key={link.id} className="nav-item">
                            {link.childrens && link.childrens.length > 0 ? (
                              <div className="nav-item dropdown">
                                <a
                                  className="nav-link dropdown-toggle"
                                  href="#"
                                  id={`navbarDropdown${link.id}`}
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {link.name}
                                </a>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby={`navbarDropdown${link.id}`}
                                >
                                  {link.childrens.map((child) => (
                                    <li key={child.id}>
                                      <a
                                        className="dropdown-item"
                                        href={child.url || "#"}
                                      >
                                        {child.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <a className="nav-link" href={link.url || "#"}>
                                {link.name}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <nav className="offcanvas__menu">
                <ul className="offcanvas__menu_ul">
                  {data.navLinks?.map((link) => (
                    <li key={link.id} className="offcanvas__menu_li">
                      {link.childrens && link.childrens.length > 0 ? (
                        <>
                          <a className="offcanvas__menu_item" href="#">
                            {link.name}
                          </a>
                          <ul className="offcanvas__sub_menu">
                            {link.childrens.map((child) => (
                              <li
                                key={child.id}
                                className="offcanvas__sub_menu_li"
                              >
                                <a
                                  href={child.url || "#"}
                                  className="offcanvas__sub_menu_item"
                                >
                                  {child.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <a
                          className="offcanvas__menu_item"
                          href={link.url || "#"}
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <header className="ed-header ed-header--style2 ed-header--style3">
        <div className="container ed-container-expand">
          <div className="ed-header__inner">
            <div className="row align-items-center">
              <div className="col-lg-8 col-6">
                <div className="ed-header__left--style2">
                  <div className="ed-header__left-widget--style2">
                    <div className="ed-topbar__logo">
                      <a href={asset_url}>
                        <Image
                          src={
                            data.headerlogo?.url
                              ? `${api_url}${data.headerlogo?.url}`
                              : getFullImageUrl("/assets/img/logo.png")
                          }
                          alt={"Logo"}
                          width={150}
                          height={50}
                        />
                      </a>
                    </div>
                  </div>
                  <nav className="ed-header__navigation">
                    <ul className="ed-header__menu">
                      {data.navLinks?.map((link) => (
                        <li key={link.id}>
                          {link.childrens && link.childrens.length > 0 ? (
                            <>
                              <a href="javascript:void(0)">
                                {link.name}
                                <i className="fi fi-ss-angle-small-down"></i>
                              </a>
                              <ul className="sub-menu">
                                {link.childrens.map((child) => (
                                  <li key={child.id}>
                                    <a href={child.url || "#"}>{child.name}</a>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <a href={link.url || "#"}>{link.name}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-6">
                <div className="ed-header__right">
                  <ul className="ed-topbar__info-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <Image
                          src={getFullImageUrl(
                            "assets/images/icons/icon-dark-facebook.svg"
                          )}
                          alt="icon-white-facebook"
                          width={24}
                          height={24}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/" target="_blank">
                        <Image
                          src={getFullImageUrl(
                            "assets/images/icons/icon-dark-twitter.svg"
                          )}
                          alt="icon-white-twitter"
                          width={24}
                          height={24}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <Image
                          src={getFullImageUrl(
                            "assets/images/icons/icon-dark-linkedin.png"
                          )}
                          alt="icon-white-dribbble"
                          width={24}
                          height={24}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <Image
                          src={getFullImageUrl(
                            "assets/images/icons/icon-dark-instagram.svg"
                          )}
                          alt="icon-white-instagram"
                          width={24}
                          height={24}
                        />
                      </a>
                    </li>
                  </ul>

                  <div className="ed-header__action">
                    <div className="ed-topbar__info-buttons">
                      <button
                        type="button"
                        className="register-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#registerModal"
                      >
                        ⁠⁠Online Apply
                      </button>
                    </div>
                    <button
                      type="button"
                      className="mobile-menu-offcanvas-toggler"
                      data-bs-toggle="modal"
                      data-bs-target="#offcanvas-modal"
                    >
                      <span className="line"></span>
                      <span className="line"></span>
                      <span className="line"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
