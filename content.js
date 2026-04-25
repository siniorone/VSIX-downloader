function extractExtensionInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get('itemName');
  
  if (!itemName) return null;
  
  const [publisher, extensionName] = itemName.split('.');
  if (!publisher || !extensionName) return null;
  
  return { publisher, extensionName, itemName };
}

function getLatestVersion() {
  const versionElement = document.querySelector('.ux-item-version-details .ux-item-version');
  return versionElement ? versionElement.textContent.trim() : 'latest';
}

function createDownloadButton(vsixUrl, version) {
  const button = document.createElement('a');
  button.href = vsixUrl;
  button.className = 'vsix-download-btn';
  button.textContent = `📦 Download VSIX (${version})`;
  button.target = '_blank';
  button.download = '';
  
  return button;
}

function addDownloadButton() {
  const info = extractExtensionInfo();
  if (!info) return;
  
  const version = getLatestVersion();
  const vsixUrl = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${info.publisher}/vsextensions/${info.extensionName}/${version}/vspackage`;
  
  const targetContainer = document.querySelector('.ux-item-header') || 
                          document.querySelector('.ux-section-details');
  
  if (!targetContainer) {
    setTimeout(addDownloadButton, 500);
    return;
  }
  
  if (document.querySelector('.vsix-download-btn')) return;
  
  const button = createDownloadButton(vsixUrl, version);
  
  const wrapper = document.createElement('div');
  wrapper.className = 'vsix-download-wrapper';
  wrapper.appendChild(button);
  
  const copyBtn = document.createElement('button');
  copyBtn.className = 'vsix-copy-btn';
  copyBtn.textContent = '📋';
  copyBtn.title = 'Copy Download Link';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(vsixUrl);
    copyBtn.textContent = '✓';
    setTimeout(() => copyBtn.textContent = '📋', 2000);
  };
  wrapper.appendChild(copyBtn);
  
  targetContainer.insertBefore(wrapper, targetContainer.firstChild);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addDownloadButton);
} else {
  addDownloadButton();
}

const observer = new MutationObserver(() => {
  if (!document.querySelector('.vsix-download-btn')) {
    addDownloadButton();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
