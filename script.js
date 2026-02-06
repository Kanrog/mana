// Function to download individual images
function downloadImage(filename) {
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to toggle lore section on mobile
function toggleLore() {
    const loreContent = document.getElementById('lore-content');
    const toggleButton = document.querySelector('.lore-toggle');
    
    if (loreContent.classList.contains('expanded')) {
        loreContent.classList.remove('expanded');
        toggleButton.textContent = 'Les mer';
    } else {
        loreContent.classList.add('expanded');
        toggleButton.textContent = 'Skjul';
    }
}

// Function to download all images as a zip
async function downloadAll() {
    // List of all image files
    const imageFiles = [
        'Æwa.png',
        'Familie.png',
        'Dænnis.png',
        'Gruble.png',
        'Khaos.png',
        'Kjersti.png',
        'Konse.png',
        'Kuli.png',
        'Lykke.png',
        'Mana.png',
        'Sarke.png',
        'Sexy.png',
        'Sinna.png',
        'Sjuke.png',
        'Skræm.png',
        'Snurt.png',
        'Sørge.png',
        'Super.png',
        'Syver.png',
        'Tfak.png',
        'Triste.png',
        'Trøste.png',
        'Virre.png',
        'Yeps.png'
    ];

    // Load JSZip library from CDN
    if (typeof JSZip === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
            script.onload = resolve;
        });
    }

    const zip = new JSZip();
    const button = document.getElementById('download-all-btn');
    const originalText = button.textContent;
    button.textContent = 'Preparing download...';
    button.disabled = true;

    try {
        // Fetch all images and add to zip
        const promises = imageFiles.map(async (filename) => {
            try {
                const response = await fetch(filename);
                const blob = await response.blob();
                zip.file(filename, blob);
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
            }
        });

        await Promise.all(promises);

        // Generate zip file
        const content = await zip.generateAsync({ type: 'blob' });

        // Download zip
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'Familien_Mana.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.error('Error creating zip:', error);
        alert('Error creating zip file. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
}
