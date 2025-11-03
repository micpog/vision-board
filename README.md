# Vision Board

A simple, minimal vision board that automatically loops through images in random order.

## Features

- Auto-loops images in random order
- 5-second interval per image
- Full-screen display
- Smooth transitions
- No controls or distractions
- No CORS issues - images list embedded directly in HTML

## Setup

1. Add your images to the `images/` directory (JPG, PNG, GIF, WebP, SVG supported)
2. Run the image generator script to update `index.html`:

```bash
node generate-images.js
```

Or use npm:
```bash
npm run generate
```

That's it! The app will automatically load all images. No need to edit `index.html` manually.

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select the main branch as source
5. Your vision board will be available at `https://yourusername.github.io/repository-name/`

## Testing Locally

You can test locally by opening `index.html` directly in a web browser - no server needed! 
The image list is embedded directly in the HTML, so there are no CORS issues.

For best results, you can also use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
/
├── index.html              # Main HTML file (auto-updated by script)
├── generate-images.js      # Script to scan images/ and update index.html
├── images/                 # Your images go here
├── package.json            # npm scripts (optional)
└── README.md              # This file
```

## How It Works

1. Add images to `images/` directory with any filenames
2. Run `node generate-images.js` - it scans the directory and injects the image list into `index.html`
3. `index.html` displays all images from the embedded list
4. Each time you add/remove images, just run the script again to update the list
5. No CORS issues because everything is in one HTML file
# vision-board
