import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Import your components
import Hero from "@/components/storyblok/Hero";
import OurServices from "@/components/storyblok/OurServices";
import RetailPartners from "@/components/storyblok/RetailPartners";
import OurWork from "@/components/storyblok/OurWork";
import GlazedGloss from "@/components/storyblok/GlazedGloss";
import TransformingBrands from "@/components/storyblok/TransformingBrands";
import BeautyExperts from "@/components/storyblok/BeautyExperts";
import Branding from "@/components/storyblok/Branding";
import GlossAction from "@/components/storyblok/GlossAction";
import VideoSlider from "@/components/storyblok/VideoSlider";
import Footer from "@/components/storyblok/Footer";
import Page from "@/components/storyblok/Page";

// Global Components
import Navbar from "@/components/storyblok/Navbar";

// About Page Components
import AboutHero from "@/components/storyblok/AboutHero";
import TeamSection from "@/components/storyblok/TeamSection";
import CompanyValues from "@/components/storyblok/CompanyValues";
import CompanyHistory from "@/components/storyblok/CompanyHistory";

// Auth & Contact Components
import ContactForm from "@/components/storyblok/ContactForm";
import LoginForm from "@/components/storyblok/LoginForm";
import RegisterForm from "@/components/storyblok/RegisterForm";

// Membership Components
import MembershipTiers from "@/components/storyblok/MembershipTiers";
import MembershipBenefits from "@/components/storyblok/MembershipBenefits";

// Product Components
import ProductHero from "@/components/storyblok/ProductHero";
import ProductGrid from "@/components/storyblok/ProductGrid";
import ProductItem from "@/components/storyblok/ProductItem";
import ProductCategories from "@/components/storyblok/ProductCategories";
import CategoryItem from "@/components/storyblok/CategoryItem";

const components = {
  // Root components
  page: Page,
  Page: Page,
  
  // Global components
  Navbar: Navbar,
  navbar: Navbar,
  
  // Main components
  Hero: Hero,
  OurServices: OurServices,
  RetailPartners: RetailPartners,
  OurWork: OurWork,
  GlazedGloss: GlazedGloss,
  TransformingBrands: TransformingBrands,
  BeautyExperts: BeautyExperts,
  Branding: Branding,
  GlossAction: GlossAction,
  VideoSlider: VideoSlider,
  Footer: Footer,
  
  // About Page Components
  AboutHero: AboutHero,
  TeamSection: TeamSection,
  CompanyValues: CompanyValues,
  CompanyHistory: CompanyHistory,
  
  // Auth & Contact Components
  ContactForm: ContactForm,
  LoginForm: LoginForm,
  RegisterForm: RegisterForm,
  
  // Membership Components
  MembershipTiers: MembershipTiers,
  membership_tiers: MembershipTiers,
  MembershipBenefits: MembershipBenefits,
  membership_benefits: MembershipBenefits,
  
  // Product Components
  ProductHero: ProductHero,
  product_hero: ProductHero,
  ProductGrid: ProductGrid,
  product_grid: ProductGrid,
  ProductItem: ProductItem,
  product_item: ProductItem,
  ProductCategories: ProductCategories,
  product_categories: ProductCategories,
  CategoryItem: CategoryItem,
  category_item: CategoryItem,
  
  // Keep the old snake_case names for backward compatibility
  hero: Hero,
  our_services: OurServices,
  retail_partners: RetailPartners,
  our_work: OurWork,
  glazed_gloss: GlazedGloss,
  transforming_brands: TransformingBrands,
  beauty_experts: BeautyExperts,
  branding: Branding,
  gloss_action: GlossAction,
  video_slider: VideoSlider,
  footer: Footer,
  about_hero: AboutHero,
  team_section: TeamSection,
  company_values: CompanyValues,
  company_history: CompanyHistory,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

// Export for use in other files
export { components };