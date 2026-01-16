export const metadata = {
  title: 'Christian Life Blog - Media Arise',
  description: 'Read inspiring articles and blog posts about Christian living.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Christian Life Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder blog posts */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to Our Blog
              </h2>
              <p className="text-gray-600 text-sm mb-4">Coming Soon</p>
              <p className="text-gray-700">
                We&apos;re preparing inspiring content about Christian living, faith journeys, 
                and spiritual growth. Check back soon for new articles!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Stay Connected
          </h2>
          <p className="text-gray-700 mb-6">
            Subscribe to our newsletter to receive the latest blog posts and updates 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
