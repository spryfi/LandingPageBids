#!/usr/bin/env python3
"""
Comprehensive Website Scraper
Scrapes https://abtesting.ai/agencies/ and creates a complete duplicate
"""

import requests
import os
import re
import json
import time
from urllib.parse import urljoin, urlparse, parse_qs
from pathlib import Path
import mimetypes
from bs4 import BeautifulSoup
import cssutils
import logging

# Suppress cssutils warnings
cssutils.log.setLevel(logging.ERROR)

class WebsiteScraper:
    def __init__(self, base_url, output_dir="scraped_site"):
        self.base_url = base_url.rstrip('/')
        self.domain = urlparse(base_url).netloc
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
        # Create subdirectories
        self.assets_dir = self.output_dir / "assets"
        self.css_dir = self.assets_dir / "css"
        self.js_dir = self.assets_dir / "js"
        self.images_dir = self.assets_dir / "images"
        self.fonts_dir = self.assets_dir / "fonts"
        
        for dir_path in [self.assets_dir, self.css_dir, self.js_dir, self.images_dir, self.fonts_dir]:
            dir_path.mkdir(exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        self.scraped_urls = set()
        self.assets_map = {}  # Original URL -> Local path mapping
        self.tech_stack = {
            'frameworks': [],
            'libraries': [],
            'fonts': [],
            'analytics': [],
            'animations': [],
            'css_features': []
        }
    
    def download_file(self, url, local_path):
        """Download a file from URL to local path"""
        try:
            if url in self.scraped_urls:
                return True
                
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            local_path.parent.mkdir(parents=True, exist_ok=True)
            with open(local_path, 'wb') as f:
                f.write(response.content)
            
            self.scraped_urls.add(url)
            print(f"Downloaded: {url} -> {local_path}")
            return True
            
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            return False
    
    def get_local_path(self, url, file_type=""):
        """Generate local path for a URL"""
        parsed = urlparse(url)
        path = parsed.path.lstrip('/')
        
        if not path or path.endswith('/'):
            path += 'index.html'
        
        # Clean filename
        filename = os.path.basename(path)
        if not filename:
            filename = 'index.html'
        
        # Determine subdirectory based on file type or extension
        if file_type == 'css' or path.endswith(('.css',)):
            return self.css_dir / filename
        elif file_type == 'js' or path.endswith(('.js',)):
            return self.js_dir / filename
        elif file_type == 'image' or path.endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico')):
            return self.images_dir / filename
        elif file_type == 'font' or path.endswith(('.woff', '.woff2', '.ttf', '.otf', '.eot')):
            return self.fonts_dir / filename
        else:
            return self.output_dir / path
    
    def analyze_technology_stack(self, soup, css_content="", js_content=""):
        """Analyze the technology stack used"""
        
        # Check for frameworks and libraries in script tags
        scripts = soup.find_all('script')
        for script in scripts:
            src = script.get('src', '')
            content = script.string or ''
            
            # Popular frameworks/libraries
            if 'react' in src.lower() or 'react' in content.lower():
                self.tech_stack['frameworks'].append('React')
            if 'vue' in src.lower() or 'vue' in content.lower():
                self.tech_stack['frameworks'].append('Vue.js')
            if 'angular' in src.lower() or 'angular' in content.lower():
                self.tech_stack['frameworks'].append('Angular')
            if 'jquery' in src.lower() or 'jquery' in content.lower():
                self.tech_stack['libraries'].append('jQuery')
            if 'gsap' in src.lower() or 'gsap' in content.lower():
                self.tech_stack['animations'].append('GSAP')
            if 'lottie' in src.lower() or 'lottie' in content.lower():
                self.tech_stack['animations'].append('Lottie')
            if 'aos' in src.lower() or 'aos' in content.lower():
                self.tech_stack['animations'].append('AOS (Animate On Scroll)')
            if 'swiper' in src.lower() or 'swiper' in content.lower():
                self.tech_stack['libraries'].append('Swiper')
            if 'bootstrap' in src.lower() or 'bootstrap' in content.lower():
                self.tech_stack['frameworks'].append('Bootstrap')
            if 'tailwind' in src.lower() or 'tailwind' in content.lower():
                self.tech_stack['frameworks'].append('Tailwind CSS')
            
            # Analytics
            if 'google-analytics' in src.lower() or 'gtag' in content.lower():
                self.tech_stack['analytics'].append('Google Analytics')
            if 'gtm' in src.lower() or 'googletagmanager' in src.lower():
                self.tech_stack['analytics'].append('Google Tag Manager')
        
        # Check CSS for frameworks and features
        if css_content:
            if '@keyframes' in css_content or 'animation:' in css_content:
                self.tech_stack['css_features'].append('CSS Animations')
            if 'transform:' in css_content:
                self.tech_stack['css_features'].append('CSS Transforms')
            if 'transition:' in css_content:
                self.tech_stack['css_features'].append('CSS Transitions')
            if 'grid' in css_content:
                self.tech_stack['css_features'].append('CSS Grid')
            if 'flex' in css_content:
                self.tech_stack['css_features'].append('CSS Flexbox')
        
        # Check for fonts
        links = soup.find_all('link')
        for link in links:
            href = link.get('href', '')
            if 'fonts.googleapis.com' in href or 'fonts.gstatic.com' in href:
                self.tech_stack['fonts'].append('Google Fonts')
            if 'typekit' in href or 'adobe' in href:
                self.tech_stack['fonts'].append('Adobe Fonts')
    
    def process_css(self, css_content, base_url):
        """Process CSS content and download referenced assets"""
        # Find URLs in CSS
        url_pattern = r'url\(["\']?([^"\']+)["\']?\)'
        urls = re.findall(url_pattern, css_content)
        
        for url in urls:
            if url.startswith('data:'):
                continue
                
            full_url = urljoin(base_url, url)
            if urlparse(full_url).netloc != self.domain:
                continue
            
            # Determine file type
            if url.endswith(('.woff', '.woff2', '.ttf', '.otf', '.eot')):
                file_type = 'font'
            else:
                file_type = 'image'
            
            local_path = self.get_local_path(full_url, file_type)
            
            if self.download_file(full_url, local_path):
                # Update CSS content with local path
                relative_path = os.path.relpath(local_path, self.css_dir)
                css_content = css_content.replace(url, f"../{file_type}s/{os.path.basename(local_path)}")
                self.assets_map[full_url] = str(local_path)
        
        return css_content
    
    def scrape_page(self, url):
        """Scrape a single page"""
        try:
            print(f"Scraping: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Download CSS files
            css_links = soup.find_all('link', rel='stylesheet')
            for link in css_links:
                href = link.get('href')
                if href:
                    css_url = urljoin(url, href)
                    if urlparse(css_url).netloc == self.domain or css_url.startswith('/'):
                        css_url = urljoin(self.base_url, href)
                        local_css_path = self.get_local_path(css_url, 'css')
                        
                        if self.download_file(css_url, local_css_path):
                            # Process CSS content
                            with open(local_css_path, 'r', encoding='utf-8') as f:
                                css_content = f.read()
                            
                            processed_css = self.process_css(css_content, css_url)
                            
                            with open(local_css_path, 'w', encoding='utf-8') as f:
                                f.write(processed_css)
                            
                            # Update link href
                            relative_path = os.path.relpath(local_css_path, self.output_dir)
                            link['href'] = relative_path
                            self.assets_map[css_url] = str(local_css_path)
                            
                            # Analyze CSS
                            self.analyze_technology_stack(soup, processed_css)
            
            # Download JavaScript files
            script_tags = soup.find_all('script', src=True)
            for script in script_tags:
                src = script.get('src')
                if src:
                    js_url = urljoin(url, src)
                    if urlparse(js_url).netloc == self.domain or src.startswith('/'):
                        js_url = urljoin(self.base_url, src)
                        local_js_path = self.get_local_path(js_url, 'js')
                        
                        if self.download_file(js_url, local_js_path):
                            # Update script src
                            relative_path = os.path.relpath(local_js_path, self.output_dir)
                            script['src'] = relative_path
                            self.assets_map[js_url] = str(local_js_path)
            
            # Download images
            img_tags = soup.find_all('img')
            for img in img_tags:
                src = img.get('src')
                if src and not src.startswith('data:'):
                    img_url = urljoin(url, src)
                    if urlparse(img_url).netloc == self.domain or src.startswith('/'):
                        img_url = urljoin(self.base_url, src)
                        local_img_path = self.get_local_path(img_url, 'image')
                        
                        if self.download_file(img_url, local_img_path):
                            # Update img src
                            relative_path = os.path.relpath(local_img_path, self.output_dir)
                            img['src'] = relative_path
                            self.assets_map[img_url] = str(local_img_path)
            
            # Process background images in style attributes
            elements_with_style = soup.find_all(attrs={"style": True})
            for element in elements_with_style:
                style = element.get('style', '')
                if 'background-image' in style or 'background:' in style:
                    # Extract URLs from style
                    url_matches = re.findall(r'url\(["\']?([^"\']+)["\']?\)', style)
                    for match in url_matches:
                        if not match.startswith('data:'):
                            img_url = urljoin(url, match)
                            if urlparse(img_url).netloc == self.domain or match.startswith('/'):
                                img_url = urljoin(self.base_url, match)
                                local_img_path = self.get_local_path(img_url, 'image')
                                
                                if self.download_file(img_url, local_img_path):
                                    relative_path = os.path.relpath(local_img_path, self.output_dir)
                                    style = style.replace(match, relative_path)
                                    element['style'] = style
                                    self.assets_map[img_url] = str(local_img_path)
            
            # Analyze technology stack
            self.analyze_technology_stack(soup)
            
            # Save the processed HTML
            page_path = self.get_local_path(url)
            page_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            print(f"Saved: {page_path}")
            return soup
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return None
    
    def find_internal_links(self, soup, base_url):
        """Find internal links to scrape"""
        links = set()
        
        if not soup:
            return links
        
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(base_url, href)
            parsed = urlparse(full_url)
            
            # Only include links from the same domain
            if parsed.netloc == self.domain:
                # Remove fragments and query parameters for deduplication
                clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
                if clean_url.endswith('/'):
                    clean_url = clean_url.rstrip('/')
                links.add(clean_url)
        
        return links
    
    def scrape_website(self, max_pages=50):
        """Scrape the entire website"""
        print(f"Starting to scrape: {self.base_url}")
        
        # Start with the main page
        to_scrape = {self.base_url}
        scraped_pages = set()
        
        while to_scrape and len(scraped_pages) < max_pages:
            current_url = to_scrape.pop()
            
            if current_url in scraped_pages:
                continue
            
            soup = self.scrape_page(current_url)
            scraped_pages.add(current_url)
            
            # Find more internal links
            new_links = self.find_internal_links(soup, current_url)
            for link in new_links:
                if link not in scraped_pages and len(scraped_pages) < max_pages:
                    to_scrape.add(link)
            
            # Be respectful with delays
            time.sleep(1)
        
        # Save technology stack analysis
        tech_stack_path = self.output_dir / "tech_stack.json"
        with open(tech_stack_path, 'w') as f:
            json.dump(self.tech_stack, f, indent=2)
        
        # Save assets mapping
        assets_map_path = self.output_dir / "assets_map.json"
        with open(assets_map_path, 'w') as f:
            json.dump(self.assets_map, f, indent=2)
        
        print(f"\nScraping completed!")
        print(f"Pages scraped: {len(scraped_pages)}")
        print(f"Assets downloaded: {len(self.assets_map)}")
        print(f"Technology stack saved to: {tech_stack_path}")
        
        return scraped_pages

if __name__ == "__main__":
    scraper = WebsiteScraper("https://abtesting.ai/agencies/")
    scraped_pages = scraper.scrape_website()
    
    print("\nTechnology Stack Detected:")
    for category, items in scraper.tech_stack.items():
        if items:
            print(f"{category.title()}: {', '.join(set(items))}")