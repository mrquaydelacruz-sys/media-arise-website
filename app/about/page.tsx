export const metadata = {
  title: 'About Us - Media Arise',
  description: 'Learn more about Media Arise, a Jesus-focused ministry dedicated to spreading the Gospel through digital fellowship.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        
        {/* Part 1: Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Part 1: The Introduction</h2>
            <p className="text-xl text-gray-600 mb-6">Welcome to Media Arise</p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              We are friends united by the purpose of <strong>seeking the absolute Truth</strong>. 
              Our diverse denominations and backgrounds have not hindered us. Instead, we found 
              common ground in <strong>learning and receiving God&apos;s grace, love, and mercy</strong>. 
              As a <strong>Jesus-focused ministry</strong>, we believe that <strong>Jesus is our one true God</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              As a <strong>Jesus-focused ministry</strong>, our mission is to spread the Gospel and share God&apos;s truth 
              through digital fellowship and media. We are committed to creating a space where people from all 
              backgrounds can come together, set aside denominational differences, and focus on the absolute truth 
              of God&apos;s Word. We seek to use technology to bridge gaps, connect believers worldwide, and help others 
              grow in their relationship with Jesus Christ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to be a beacon of light in the digital world, arising to shine God&apos;s glory through 
              every platform available to us. We envision a global community united in Christ, where technology 
              becomes a powerful tool for spreading the Gospel, building authentic relationships, and deepening 
              faith. We aim to see believers from every nation, denomination, and background come together to 
              learn, grow, and proclaim that <strong>Jesus is our one true God</strong>, all while using our 
              professional skills in media to broadcast His truth to the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              It all began with <strong>small Bible studies and sharing testimonies in our free time</strong>. 
              As we sought God, we met <strong>Pastor Donny</strong> as a mentor. We realized we could use{' '}
              <strong>technology to bridge the gap</strong>, so we moved our meetings online.
            </p>
            <p className="text-gray-700 leading-relaxed">
              What started as a few friends and cousins has grown into a community <strong>spreading the Gospel</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Got Our Name</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The name <strong>&quot;Media Arise&quot;</strong> was inspired during a Sunday service. As{' '}
              <strong>Pastor Donny</strong> preached, we were moved by the <strong>biblical call to &apos;Arise&apos;</strong> and 
              let God&apos;s light shine.
            </p>
            <blockquote className="border-l-4 border-black pl-6 my-6 italic text-gray-700">
              <p className="mb-2">&quot;Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.&quot;</p>
              <cite className="text-sm text-gray-600">— Isaiah 60:1 (KJV)</cite>
            </blockquote>
            <p className="text-gray-700 leading-relaxed">
              After recognizing our calling to use our professional skills for God&apos;s glory, we met with 
              Pastor Donny over coffee to discuss the vision. The name <strong>Media Arise</strong> was established 
              by combining our <strong>background in media with this spiritual mandate</strong>, signifying a call to 
              stand up and broadcast God&apos;s truth to the world.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
              We are currently continuing to grow and meet online. To God be the glory!
            </p>
          </section>
        </div>

        {/* Part 2: FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Part 2: Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: Why was this group created?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: We were <strong>hungry for the Truth</strong> and wanted a space to set aside denominational 
                differences and focus purely on the absolute truth of God&apos;s Word and His grace.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: What is the meaning behind the name &quot;Media Arise&quot;?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: The name comes from a <strong>conviction to use media to spread the Gospel</strong>. It was inspired 
                by a sermon by <strong>Pastor Donny</strong> on the word &quot;Arise.&quot; Our team met with Pastor Donny and agreed 
                on &quot;Media Arise&quot; as a symbol of our mission: <strong>to arise and shine the light of Jesus through digital fellowship</strong>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: Do I need to be from a specific denomination to join?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: <strong>Not at all.</strong> We welcome people from different backgrounds and denominations. 
                Our focus is not on religious labels, but on the truth that <strong>Jesus is our one true God</strong> and 
                on building a relationship with Him.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: Who leads the biblical teachings?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: <strong>Pastor Donny</strong> is our guide and mentor. He helps lead our studies and guides us in 
                our walk toward a deeper relationship with Christ.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: How did this online ministry start?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: We originally met in person for Bible studies. When physical meetings were no longer possible, 
                the idea was brought up to use online video meetings to keep the fire burning. Since then, we have 
                moved fully online, allowing friends, cousins, and families from different places to join.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q: When and where do you meet?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: We meet online (via Google Meet/Zoom). [Insert dates/times here]
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
