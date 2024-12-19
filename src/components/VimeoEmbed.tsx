// src/components/VimeoEmbed.tsx
'use client';

interface VimeoEmbedProps {
  isVisible: boolean;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({
  isVisible,
  width,
  height,
  style
}) => {
  return (
    <div
      className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        width,
        height,
        overflow: 'hidden',
        borderRadius: '2.5rem', // Increased border radius
        ...style
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '2.5rem', // Matching border radius
      }}>
        <iframe
          src="https://player.vimeo.com/video/1033441094?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '2.5rem', // Matching border radius
          }}
          title="Animation"
        />
      </div>
    </div>
  );
};

export default VimeoEmbed;
