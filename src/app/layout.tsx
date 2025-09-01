import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

import "./globals.css";
import "../../public/assets/css/about.css";
import "../../public/assets/css/blog.css";
import "../../public/assets/css/course.css";
import "../../public/assets/css/error.css";
import "../../public/assets/css/footer.css";
import "../../public/assets/plugins/css/animate.min.css";
import "../../public/assets/plugins/css/owl.carousel.min.css";
import "../../public/assets/plugins/css/swiper-bundle.min.css";
import "../../public/assets/plugins/css/maginific-popup.min.css";
import "../../public/assets/plugins/css/nice-select.min.css";
import "../../public/assets/plugins/css/icofont.css";
import "../../public/assets/plugins/css/uicons.css";
import "../../public/assets/css/styling.css";
import "../../public/assets/css/detailsCust.css";
import "../../public/assets/css/aboutCust.css";
import "../../public/assets/plugins/css/bootstrap.min.css";
import "../../public/assets/section-css/reset.css";
import "../../public/assets/section-css/mobile-menu.css";
import "../../public/assets/section-css/header.css";
import "../../public/assets/section-css/hero.css";
import "../../public/assets/section-css/about.css";
import "../../public/assets/section-css/category.css";
import "../../public/assets/section-css/features.css";
import "../../public/assets/section-css/course.css";
import "../../public/assets/section-css/why-choose.css";
import "../../public/assets/section-css/funfact.css";
import "../../public/assets/section-css/partner.css";
import "../../public/assets/section-css/testimonial.css";
import "../../public/assets/section-css/blog.css";
import "../../public/assets/section-css/call-action.css";
import "../../public/assets/section-css/video.css";
import "../../public/assets/section-css/team.css";
import "../../public/assets/section-css/faq.css";
import "../../public/assets/section-css/breadcrumbs.css";
import "../../public/assets/section-css/apply.css";
import "../../public/assets/section-css/event.css";
import "../../public/assets/section-css/contact.css";
import "../../public/assets/section-css/product.css";
import "../../public/assets/section-css/error.css";
import "../../public/assets/section-css/checkout.css";
import "../../public/assets/section-css/sidebars.css";
import "../../public/assets/section-css/auth-pages.css";
import "../../public/assets/section-css/footer.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
