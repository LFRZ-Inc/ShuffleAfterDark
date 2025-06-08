'use client';

export default function TestImagePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Image Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Direct Image Test</h2>
          <p className="mb-4">Testing image at: <code>/content/Eropolis_Toulouse_2009_03.jpg</code></p>
          
          <div className="border border-gray-600 p-4 rounded">
            <img 
              src="/content/Eropolis_Toulouse_2009_03.jpg" 
              alt="Test Image"
              className="max-w-full h-auto"
              onLoad={() => console.log('Image loaded successfully')}
              onError={(e) => {
                console.error('Image failed to load:', e);
                console.log('Attempted URL:', e.currentTarget.src);
              }}
            />
          </div>
        </div>

        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Image with SafeMode Blurring</h2>
          <p className="mb-4">Testing with blur classes:</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Normal (no blur):</p>
              <img 
                src="/content/Eropolis_Toulouse_2009_03.jpg" 
                alt="Test Image Normal"
                className="scene-image full-mode max-w-xs h-auto border border-gray-600"
              />
            </div>
            
            <div>
              <p className="text-sm mb-2">SafeMode (blurred):</p>
              <img 
                src="/content/Eropolis_Toulouse_2009_03.jpg" 
                alt="Test Image Blurred"
                className="scene-image safe-mode max-w-xs h-auto border border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Navigation Links</h2>
          <div className="space-x-4">
            <a href="/debug" className="text-primary-400 hover:text-primary-300">Debug Page</a>
            <a href="/browse" className="text-primary-400 hover:text-primary-300">Browse Page</a>
            <a href="/scene/e65c5d9b-72c3-49e6-adbf-71f8e67f3573" className="text-primary-400 hover:text-primary-300">Test Scene</a>
          </div>
        </div>
      </div>
    </div>
  );
} 