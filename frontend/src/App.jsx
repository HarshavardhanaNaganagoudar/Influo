import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Outfit:wght@200;300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080808;
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    color: #e8e2d9;
    min-height: 100vh;
  }

  .grain {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  .glow-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    z-index: 0;
  }

  .orb-1 {
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(232,201,126,0.08) 0%, transparent 70%);
    top: -250px; left: -150px;
  }

  .orb-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(160,180,255,0.06) 0%, transparent 70%);
    bottom: 0; right: -100px;
  }

  .app {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 24px;
  }

  .header {
    text-align: center;
    margin-bottom: 72px;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(72px, 12vw, 120px);
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: #ffffff;
    text-shadow: 0 0 80px rgba(255,255,255,0.12);
  }

  h1 em {
    font-style: italic;
    color: #e8c97e;
    text-shadow: 0 0 60px rgba(232,201,126,0.3);
  }

  .subtitle {
    margin-top: 20px;
    font-size: 15px;
    font-weight: 300;
    color: #c8c0b4;
    letter-spacing: 0.06em;
  }

  .divider {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, #3a3530, transparent);
    margin: 0 auto 64px;
  }

  .grid {
    width: 100%;
    max-width: 960px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #1e1a17;
    border: 1px solid #1e1a17;
    border-radius: 2px;
  }

  .panel {
    background: #0c0b09;
    padding: 40px;
  }

  .panel-left { border-radius: 2px 0 0 2px; }
  .panel-right {
    border-radius: 0 2px 2px 0;
    background: #080807;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .panel-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #a09080;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .upload-zone {
    border: 1px solid #2e2a26;
    border-radius: 2px;
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s, background 0.3s;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }

  .upload-zone:hover {
    border-color: #5a5248;
    background: #0f0e0c;
  }

  .upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .upload-icon {
    width: 32px;
    height: 32px;
    margin: 0 auto 12px;
    opacity: 0.6;
  }

  .upload-text {
    font-size: 12px;
    color: #a09080;
    letter-spacing: 0.08em;
  }

  .upload-text strong {
    display: block;
    color: #d0c8bc;
    font-weight: 300;
    margin-bottom: 4px;
    font-size: 13px;
  }

  /* Preview */
  .preview-wrap {
    margin-bottom: 16px;
    border: 1px solid #1e1a17;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .preview-wrap img {
    width: 100%;
    display: block;
    max-height: 260px;
    object-fit: cover;
    filter: saturate(0.8) brightness(0.9);
  }

  .preview-filename {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 8px 12px;
    font-size: 9px;
    letter-spacing: 0.15em;
    color: #4a4540;
    background: linear-gradient(to top, rgba(8,8,7,0.9), transparent);
  }

  /* URL Input */
  .url-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid #2e2a26;
    padding: 14px 0;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #c8c0b4;
    letter-spacing: 0.05em;
    outline: none;
    transition: border-color 0.3s, color 0.3s;
    margin-bottom: 32px;
  }

  .url-input::placeholder { color: #5a5248; }
  .url-input:focus {
    border-color: #6a6258;
    color: #e8c97e;
  }

  /* Button */
  .btn {
    width: 100%;
    padding: 16px;
    background: #ede8e0;
    color: #0c0b09;
    border: none;
    border-radius: 1px;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s, opacity 0.3s;
  }

  .btn:hover:not(:disabled) { background: #ffffff; }
  .btn:disabled {
    background: #1e1a17;
    color: #3a3530;
    cursor: not-allowed;
  }

  /* Loading */
  .loading-state {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .loading-line {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: #a09080;
    text-transform: uppercase;
  }

  .dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #c8b99a;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .loading-line:nth-child(2) .dot { animation-delay: 0.3s; }
  .loading-line:nth-child(3) .dot { animation-delay: 0.6s; }

  @keyframes pulse {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
  }

  /* Right panel sections */
  .result-block {
    background: #0c0b09;
    padding: 40px;
    flex: 1;
  }

  .result-block + .result-block {
    border-top: 1px solid #1e1a17;
  }

  .result-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #a09080;
    margin-bottom: 20px;
  }

  .prompt-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.7;
    color: #c8c0b4;
    font-style: italic;
  }

  .video-wrap {
    border: 1px solid #1e1a17;
    border-radius: 2px;
    overflow: hidden;
  }

  .video-wrap video {
    width: 100%;
    display: block;
  }

  /* Empty state */
  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px;
    text-align: center;
  }

  .empty-ring {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 1px solid #3a3530;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-ring-inner {
    width: 48px; height: 48px;
    border-radius: 50%;
    border: 1px solid #4a4540;
  }

  .empty-hint {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7a7268;
  }

  @media (max-width: 700px) {
    .grid { grid-template-columns: 1fr; }
    .panel-left { border-radius: 2px 2px 0 0; }
    .panel-right { border-radius: 0 0 2px 2px; }
  }
`;

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    setPrompt("");
    setVideoUrl("");
  };

  const generateVideo = async () => {
    if (!image) { alert("Please upload an image"); return; }
    if (!imageUrl) { alert("Please enter a public image URL"); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("image_url", imageUrl);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-video", {
        method: "POST", body: formData,
      });
      const data = await response.json();
      setPrompt(data.prompt);
      setVideoUrl(data.video_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasResult = prompt || videoUrl;

  return (
    <>
      <style>{styles}</style>
      <div className="grain" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      <div className="app">
        <header className="header">
          <h1><em>Influo</em></h1>
          <p className="subtitle">Generate Influencer Ads with AI</p>
        </header>

        <div className="divider" />

        <div className="grid">
          {/* LEFT */}
          <div className="panel panel-left">
            <p className="panel-label">Source</p>

            <div className="upload-zone">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {!preview && (
                <>
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="#a09080" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="upload-text">
                    <strong>Drop image here</strong>
                    PNG, JPG, WEBP
                  </p>
                </>
              )}
            </div>

            {preview && (
              <div className="preview-wrap">
                <img src={preview} alt="preview" />
                <span className="preview-filename">{fileName}</span>
              </div>
            )}

            <input
              className="url-input"
              type="text"
              placeholder="Public image URL for Runway →"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <button className="btn" onClick={generateVideo} disabled={loading}>
              {loading ? "Generating…" : "Generate Video"}
            </button>

            {loading && (
              <div className="loading-state">
                <div className="loading-line"><div className="dot" /> Analysing with Gemma</div>
                <div className="loading-line"><div className="dot" /> Composing motion prompt</div>
                <div className="loading-line"><div className="dot" /> Rendering with Runway</div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="panel-right">
            {!hasResult ? (
              <div className="empty-state">
                <div className="empty-ring">
                  <div className="empty-ring-inner" />
                </div>
                <p className="empty-hint">Output appears here</p>
              </div>
            ) : (
              <>
                {prompt && (
                  <div className="result-block">
                    <p className="result-label">Prompt</p>
                    <p className="prompt-text">{prompt}</p>
                  </div>
                )}
                {videoUrl && (
                  <div className="result-block">
                    <p className="result-label">Video</p>
                    <div className="video-wrap">
                      <video src={videoUrl} controls autoPlay loop />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}