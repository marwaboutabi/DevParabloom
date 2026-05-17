import React from 'react';
import Header from '../components/layout/Header';
import HeroBanner from '../components/home/HeroBanner';
import ProductGrid from '../components/home/ProductGrid';
import PromoSection from '../components/home/PromoSection';
import UriageBanner from '../components/home/UriageBanner';
import FAQSection from '../components/faq/FAQSection';
import Footer from '../components/layout/Footer';

const HomePage = () => (
  <>
    <Header />
    <main >
      <HeroBanner />
      <ProductGrid title="Nos Produits" />
      <PromoSection />
      <UriageBanner />
      <FAQSection />
    </main>
    <Footer />
  </>
);
export default HomePage;