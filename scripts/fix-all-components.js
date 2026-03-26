const fs = require('fs');
const path = require('path');

// Fix all components to handle missing images
const componentFixes = [
  {
    file: 'components/storyblok/OurWork.tsx',
    fixes: [
      {
        search: 'image: {',
        replace: 'image?: {'
      },
      {
        search: `              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={item.image.filename}
                  alt={item.image.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />`,
        replace: `              {item.image?.filename ? (
          