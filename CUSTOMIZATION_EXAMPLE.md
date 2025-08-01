# Customization Example: Digital Marketing Agency

This example shows how to transform the ABtesting.ai clone into a website for "Growth Digital", a fictional digital marketing agency.

## Step 1: Update Business Configuration

Edit `src/config.js`:

```javascript
export const businessConfig = {
  // Company Information
  company: {
    name: "Growth Digital",
    tagline: "Scale Your Business with Data-Driven Marketing",
    description: "We help businesses grow through strategic digital marketing, conversion optimization, and data analytics.",
    logo: "/assets/images/growth-digital-logo.png",
    favicon: "/assets/images/growth-digital-favicon.png"
  },

  // Contact Information
  contact: {
    email: "hello@growthdigital.com",
    phone: "+1 (555) 987-6543",
    address: "123 Marketing Ave, San Francisco, CA 94102",
    website: "https://growthdigital.com"
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/growthdigital",
    instagram: "https://instagram.com/growthdigital",
    linkedin: "https://linkedin.com/company/growthdigital",
    facebook: "https://facebook.com/growthdigital"
  },

  // Hero Section
  hero: {
    title: "*Scale your business* with data-driven marketing strategies that *actually work*",
    subtitle: "Growth Digital combines **advanced analytics**, **conversion optimization**, and **strategic marketing** to help your business achieve sustainable growth. **Ready to scale?**",
    ctaText: "Get Free Growth Audit",
    ctaUrl: "https://growthdigital.com/audit",
    placeholder: "yourbusiness.com"
  },

  // Features
  features: [
    {
      title: "*Data-Driven* approach",
      description: "We use advanced analytics and A/B testing to make decisions based on real data, not guesswork. Every strategy is backed by insights that drive measurable results."
    },
    {
      title: "*ROI* focused",
      description: "Our campaigns are designed with one goal in mind: maximizing your return on investment. We track every dollar spent and ensure it contributes to your bottom line."
    },
    {
      title: "*Full-service* solution",
      description: "From SEO and PPC to conversion optimization and email marketing, we handle all aspects of your digital marketing so you can focus on running your business."
    },
    {
      title: "*Transparent* reporting",
      description: "Get detailed monthly reports showing exactly how your campaigns are performing. No black boxes, no hidden metrics - just clear, actionable insights."
    }
  ],

  // Statistics
  stats: [
    {
      value: "3.2",
      unit: "x",
      description: "Average increase in conversion rates for our clients within the first 6 months.",
      link: "/case-studies"
    },
    {
      value: "150",
      unit: "%",
      description: "Average ROI improvement across all client campaigns in the past year.",
      link: "/results"
    },
    {
      value: "24",
      unit: "hrs",
      description: "Average response time for client questions and campaign optimizations.",
      link: "/support"
    }
  ],

  // Trusted By Logos (replace with actual client logos)
  trustedBy: [
    { name: "TechStart Inc", logo: "/assets/images/client-techstart.png" },
    { name: "E-commerce Plus", logo: "/assets/images/client-ecommerce.png" },
    { name: "SaaS Solutions", logo: "/assets/images/client-saas.png" },
    { name: "Local Business Co", logo: "/assets/images/client-local.png" }
  ],

  // Navigation
  navigation: [
    { title: "Services", url: "/services.html" },
    { title: "Case Studies", url: "/case-studies.html" },
    { title: "About", url: "/about.html" },
    { title: "Blog", url: "/blog/" }
  ],

  // Analytics
  analytics: {
    googleAnalytics: "UA-123456789-1", // Replace with your GA ID
    googleTagManager: "GTM-ABC123",     // Replace with your GTM ID
    facebookPixel: "123456789012345"    // Replace with your FB Pixel ID
  }
};
```

## Step 2: Update Colors and Branding

Edit `src/assets/css/main.scss` to change the color scheme:

```scss
:root {
  // New brand colors for Growth Digital
  --primary: #6366f1;        // Indigo
  --secondary: #4338ca;      // Dark indigo
  --accent: #f59e0b;         // Amber
  --dark: #1f2937;           // Dark gray
  --light: #e0e7ff;          // Light indigo
  --success: #10b981;        // Emerald
  --warning: #f59e0b;        // Amber
  --danger: #ef4444;         // Red
  
  // Update brand-specific colors
  --ab-blue-500: #6366f1;
  --ab-blue-800: #4338ca;
  --ab-red: #f59e0b;
  --ab-cyan: #06b6d4;
  --ab-sky: #0ea5e9;
  --ab-dark: #1f2937;
  --blue: #6366f1;
  --red: #f59e0b;
}
```

## Step 3: Replace Assets

1. **Logo**: Replace `src/assets/images/logo.png` with Growth Digital's logo
2. **Favicon**: Replace favicon files with branded versions
3. **Hero Background**: Update the gradient in the CSS:

```scss
body {
  &:before {
    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
  }
}
```

## Step 4: Update Content Sections

### Hero Section
The hero will automatically update based on the config, but you can customize the HTML structure in `src/agencies.html` if needed.

### Services Section (replace Features)
Update the features section to focus on services:

```javascript
features: [
  {
    title: "*SEO* Optimization",
    description: "Improve your search rankings and drive organic traffic with our proven SEO strategies and technical optimizations."
  },
  {
    title: "*PPC* Management",
    description: "Maximize your ad spend with expertly managed Google Ads and social media campaigns that convert."
  },
  {
    title: "*Conversion* Optimization",
    description: "Turn more visitors into customers with data-driven A/B testing and landing page optimization."
  },
  {
    title: "*Analytics* & Reporting",
    description: "Get clear insights into your marketing performance with comprehensive tracking and monthly reports."
  }
]
```

## Step 5: Update How It Works Section

Modify the steps in `src/agencies.html` to reflect your process:

```html
<!-- Step 1 -->
<h3 class="step-title">Free <span>growth audit</span></h3>

<!-- Step 2 -->
<h3 class="step-title">Custom <span>strategy</span> development</h3>

<!-- Step 3 -->
<h3 class="step-title">Campaign <span>implementation</span></h3>

<!-- Step 4 -->
<h3 class="step-title">Continuous <span>optimization</span></h3>

<!-- Step 5 -->
<h3 class="step-title">Scale and <span>grow</span></h3>
```

## Step 6: Update Integration Section

Change the integration section to show the tools you work with:

```javascript
// In the HTML, update the integration items:
<div class="integration-item">
  <img src="/assets/images/google-ads-integration.png" alt="Google Ads Management">
</div>
<div class="integration-item">
  <img src="/assets/images/facebook-ads-integration.png" alt="Facebook Ads Management">
</div>
<div class="integration-item">
  <img src="/assets/images/analytics-integration.png" alt="Analytics Setup">
</div>
<div class="integration-item">
  <img src="/assets/images/email-marketing-integration.png" alt="Email Marketing">
</div>
```

## Step 7: Update Demo Section

Change the demo booking section:

```html
<h2 class="section-title">Book your free *Growth Audit*</h2>
<p class="copy">
  Get a comprehensive analysis of your current marketing performance and discover opportunities for growth. No commitment required! 🚀
</p>
```

## Step 8: SEO and Meta Tags

Update the meta tags in `src/agencies.html`:

```html
<title>Growth Digital - Scale Your Business with Data-Driven Marketing</title>
<meta name="description" content="Professional digital marketing agency specializing in SEO, PPC, conversion optimization, and analytics. Get your free growth audit today.">

<!-- Open Graph -->
<meta property="og:title" content="Growth Digital - Data-Driven Marketing Agency">
<meta property="og:description" content="Scale your business with our proven digital marketing strategies. Free growth audit available.">
```

## Step 9: Test and Deploy

1. **Test locally**:
   ```bash
   npm run dev
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy** to your hosting platform

## Result

After these changes, you'll have a professional digital marketing agency website with:

- ✅ Custom branding and colors
- ✅ Service-focused content
- ✅ Industry-specific messaging
- ✅ Professional design
- ✅ All animations and interactions intact
- ✅ SEO optimized content
- ✅ Mobile responsive design

The website will maintain all the sophisticated animations and interactions of the original while being completely customized for your business needs.

## Additional Customizations

### Add New Sections
You can add new sections like:
- Client testimonials
- Case studies preview
- Team member showcase
- Pricing packages

### Modify Animations
Adjust animation timing and effects in `src/assets/js/main.js`:

```javascript
// Custom animation for your brand
gsap.from('.custom-element', {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out'
});
```

### Add Custom Forms
Integrate with your CRM or email marketing platform by updating the form handlers in the JavaScript file.

This example shows how flexible the framework is - you can completely transform it for any business while maintaining the professional design and smooth user experience.