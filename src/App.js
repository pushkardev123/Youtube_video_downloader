import React, { useState } from 'react';

const App = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleDownload = async () => {
        if (!url.trim()) {
            setMessage('Please enter a valid URL.');
            return;
        }

        try {
            const response = await fetch('https://2ea3-2406-b400-71-c88e-85c3-95a4-6e61-f9fa.ngrok-free.app/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('Failed to download video.');
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            setMessage('Download started.');

        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Download YouTube Video</h1>
            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleDownload}>Download</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
