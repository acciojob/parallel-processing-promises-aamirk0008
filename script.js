const output = document.getElementById("output");
        const loadingDiv = document.getElementById("loading");
        const errorDiv = document.getElementById("error");
        const btn = document.getElementById("download-images-button");
        
        const images = [
            { url: "https://picsum.photos/id/237/200/300" },
            { url: "https://picsum.photos/id/238/200/300" },
            { url: "https://picsum.photos/id/239/200/300" },
        ];

        // Function to download a single image
        function downloadImage(imageObj) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => {
                    resolve(img);
                };
                
                img.onerror = () => {
                    reject(new Error(`Failed to load image from ${imageObj.url}`));
                };
                
                img.src = imageObj.url;
            });
        }

        // Main function to download all images using Promise.all
        async function downloadImages() {
            try {
                // Clear previous results
                output.innerHTML = '';
                errorDiv.style.display = 'none';
                errorDiv.innerHTML = '';
                
                // Show loading spinner
                loadingDiv.style.display = 'block';
                btn.disabled = true;
                
                // Create array of promises for all images
                const imagePromises = images.map(imageObj => downloadImage(imageObj));
                
                // Wait for all images to download using Promise.all
                const downloadedImages = await Promise.all(imagePromises);
                
                // Hide loading spinner
                loadingDiv.style.display = 'none';
                
                // Display all successfully downloaded images
                downloadedImages.forEach(img => {
                    output.appendChild(img);
                });
                
                console.log('All images downloaded successfully!');
                
            } catch (error) {
                // Hide loading spinner
                loadingDiv.style.display = 'none';
                
                // Show error message
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
                
                console.error('Error downloading images:', error);
            } finally {
                // Re-enable the button
                btn.disabled = false;
            }
        }

        // Add event listener to the download button
        btn.addEventListener('click', downloadImages);
        
        // Auto-start download when page loads
        window.addEventListener('load', downloadImages);