# ABtesting.ai Clone - Modern Website Framework

A modern, fully customizable clone of the ABtesting.ai website built with modern web technologies. This framework allows you to easily customize all content, branding, and business information through a simple configuration file.

## 🚀 Features

- **Modern Tech Stack**: Built with Vite, SCSS, and ES6+ JavaScript
- **Fully Responsive**: Mobile-first design that works on all devices
- **Easy Customization**: Single configuration file for all business information
- **Smooth Animations**: GSAP and AOS animations for engaging user experience
- **SEO Optimized**: Proper meta tags, semantic HTML, and accessibility features
- **Performance Focused**: Optimized loading, lazy loading, and modern best practices
- **Interactive Components**: Swiper carousels, form handling, and smooth scrolling

## 📁 Project Structure

```
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.scss          # Main stylesheet
│   │   ├── js/
│   │   │   └── main.js             # Main JavaScript file
│   │   ├── images/                 # Image assets
│   │   └── fonts/                  # Font files
│   ├── components/                 # Reusable components
│   ├── config.js                   # Business configuration
│   └── agencies.html               # Main agencies page
├── scraped_site/                   # Original scraped content
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Serve built files:**
   ```bash
   npm run serve
   ```

## 🎨 Customization Guide

### Business Information

All business information can be customized in `src/config.js`. Update the following sections:

```javascript
export const businessConfig = {
  // Company Information
  company: {
    name: "Your Business Name",
    tagline: "Your Business Tagline",
    description: "Your business description...",
    logo: "/assets/images/logo.png",
    favicon: "/assets/images/favicon.png"
  },

  // Contact Information
  contact: {
    email: "contact@yourbusiness.com",
    phone: "+1 (555) 123-4567",
    // ... more contact info
  },

  // Hero Section
  hero: {
    title: "Your custom hero title with *highlighted* text",
    subtitle: "Your custom subtitle with **bold** text",
    // ... more hero settings
  },

  // Features, Stats, Navigation, etc.
  // ...
}
```

### Styling and Branding

1. **Colors**: Update CSS custom properties in `src/assets/css/main.scss`:
   ```scss
   :root {
     --primary: #your-primary-color;
     --secondary: #your-secondary-color;
     --accent: #your-accent-color;
     // ... more colors
   }
   ```

2. **Typography**: Replace fonts in the CSS file and update font imports.

3. **Logo**: Replace `src/assets/images/logo.png` with your logo.

4. **Images**: Replace images in `src/assets/images/` with your own.

### Content Customization

#### Text Highlighting
Use special syntax in your configuration for automatic text highlighting:
- `*text*` becomes `<em>text</em>` (highlighted/colored text)
- `**text**` becomes `<strong>text</strong>` (bold text)

#### Features
Update the features array in the config:
```javascript
features: [
  {
    title: "*Fastest* setup",
    description: "Your feature description here..."
  },
  // ... more features
]
```

#### Statistics
Update the stats array:
```javascript
stats: [
  {
    value: "+45",
    unit: "%",
    description: "Your statistic description",
    link: "#"
  },
  // ... more stats
]
```

### Analytics Setup

1. **Google Analytics**: Update the tracking ID in `src/config.js`:
   ```javascript
   analytics: {
     googleAnalytics: "UA-XXXXXXXXX-X",
     googleTagManager: "GTM-XXXXXXX",
     facebookPixel: "XXXXXXXXXXXXXXXXX"
   }
   ```

2. **Demo Form**: Replace the HubSpot meeting URL in `src/agencies.html`:
   ```html
   <iframe src="https://meetings.hubspot.com/your-calendar?embed=true">
   ```

## 🎯 Key Components

### Hero Section
- Animated title and description
- URL input form with validation
- Smooth animations on load

### Statistics Section
- Animated number counting
- Scroll-triggered animations
- Customizable metrics

### Features Section
- Grid layout with animations
- Highlighted text support
- Responsive design

### How It Works Carousel
- Swiper.js integration
- Step-by-step process
- Touch/swipe support

### Integration Section
- Platform logos and links
- Hover effects
- Grid layout

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: > 992px
- Large Desktop: > 1200px

## ♿ Accessibility Features

- Skip links for keyboard navigation
- ARIA labels and roles
- Screen reader support
- Keyboard navigation
- Focus management
- High contrast support

## 🔧 Development

### File Structure
- `src/config.js` - All customizable content
- `src/assets/css/main.scss` - Styles and theming
- `src/assets/js/main.js` - Interactive functionality
- `src/agencies.html` - Main HTML structure

### Adding New Sections
1. Add HTML structure to `agencies.html`
2. Add configuration options to `config.js`
3. Add JavaScript logic to populate content in `main.js`
4. Add styles to `main.scss`

### Custom Animations
The project uses:
- **GSAP** for complex animations
- **AOS** for scroll animations
- **CSS animations** for simple effects

## 🚀 Deployment

### Build Process
```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

### Deployment Options
- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import your project for instant deployment
- **GitHub Pages**: Use the built files in the `dist/` folder
- **Traditional Hosting**: Upload the `dist/` folder contents

### Environment Setup
1. Update all URLs in `src/config.js` to your production domain
2. Replace placeholder analytics IDs with real ones
3. Update the demo booking form URL
4. Test all forms and integrations

## 📊 Performance

The framework is optimized for performance:
- Lazy loading for images
- Code splitting with Vite
- Optimized animations
- Minimal JavaScript bundle
- Compressed assets

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags and Open Graph
- Structured data ready
- Fast loading times
- Mobile-friendly design
- Accessible markup

## 🆘 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths in `src/config.js`
2. **Animations not working**: Ensure AOS and GSAP are loaded
3. **Forms not submitting**: Update form action URLs
4. **Styles not applying**: Check SCSS compilation

### Development Tips

1. Use browser dev tools to test responsive design
2. Test with screen readers for accessibility
3. Validate HTML and check console for errors
4. Test form submissions and analytics tracking

## 📄 License

MIT License - feel free to use this for your business projects.

## 🤝 Contributing

This is a template project, but feel free to submit improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For customization help or questions:
- Check the configuration examples in `src/config.js`
- Review the component structure in `src/agencies.html`
- Examine the styling patterns in `src/assets/css/main.scss`

---

**Happy customizing! 🎉**

Transform this template into your unique business website by updating the configuration file and replacing the assets with your own branding.
