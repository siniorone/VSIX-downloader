# VSCode VSIX Direct Download

A Chrome extension that adds a direct download button for VSIX files on the Visual Studio Code Marketplace.

## Features

- Direct download button for VSIX files
- Copy download link to clipboard
- Works on all VSCode Marketplace extension pages
- Clean UI that integrates seamlessly with the marketplace design

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/vscode-vsix-downloader.git
```
2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (top right corner)

4. Click "Load unpacked" and select the project folder

## How It Works

The extension automatically detects when you visit a VSCode Marketplace extension page (e.g., `https://marketplace.visualstudio.com/items?itemName=publisher.extension-name`).

It then:

1. **Extracts extension information** from the URL:
   - Publisher name
   - Extension name

2. **Finds the latest version** by parsing the page content

3. **Constructs the direct download URL** using the official VSCode Marketplace API:
   
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/{publisher}/vsextensions/{extensionName}/{version}/vspackage


4. **Adds two buttons** to the page header:
   - **Download VSIX**: Downloads the `.vsix` file directly
   - **Copy Link**: Copies the download URL to your clipboard

## Use Cases

- Install extensions offline
- Archive specific versions
- Inspect extension contents before installation
- Use in restricted network environments

## Technical Details

- Built with Manifest V3
- Uses `MutationObserver` to handle dynamic page updates
- No external dependencies
- No data collection or tracking

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Other Chromium-based browsers

## License

MIT License

---

**Note:** This extension only extracts publicly available download links from the VSCode Marketplace. No data is collected or transmitted.

