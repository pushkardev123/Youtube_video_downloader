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
            const response = await fetch('https://80e8-183-83-152-152.ngrok-free.app/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('Failed to download video.');
            }

            const responseData = await response.json();

            if (responseData.success) {
                const downloadLink = `https://80e8-183-83-152-152.ngrok-free.app/download/${responseData.file}`;
                const a = document.createElement('a');
                a.href = downloadLink;
                a.download = responseData.file;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setMessage('Download started.');
            } else {
                setMessage(responseData.message);
            }
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
