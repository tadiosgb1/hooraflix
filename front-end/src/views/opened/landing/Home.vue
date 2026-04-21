<template>
  <div class="bg-black text-white min-h-screen">

    <!-- Navbar -->
    <header class="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md fixed w-full z-50 border-b border-red-600/20">
      <div class="flex items-center space-x-2">
        <h1 class="text-3xl font-bold text-red-600">🎬 HooraFlix</h1>
      </div>

      <nav class="space-x-8 hidden lg:flex text-sm font-medium">
        <a href="#movies" class="hover:text-red-500 transition">Movies & Series</a>
        <a href="#music" class="hover:text-red-500 transition">Music</a>
        <a href="#talents" class="hover:text-red-500 transition">Talent Training</a>
        <a href="#creators" class="hover:text-red-500 transition">For Creators</a>
        <a href="#pricing" class="hover:text-red-500 transition">Pricing</a>
      </nav>

      <div class="flex gap-3">
        <router-link to="/login" class="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600/10 transition text-sm font-semibold">
          Sign In
        </router-link>
        <a href="/#pricing" class="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold cursor-pointer">
          Get Started
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center overflow-hidden pt-20">
      <video autoplay muted loop playsinline class="absolute w-full h-full object-cover">
        <source src="https://cdn.coverr.co/videos/coverr-watching-a-movie-while-eating-popcorn-5406/1080p.mp4" />
      </video>

      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div class="relative z-10 px-8 w-full max-w-7xl mx-auto">
        <div class="max-w-2xl">
          <p class="text-red-500 font-semibold mb-4 text-lg">
            🌟 The Ultimate Entertainment & Talent Platform
          </p>

          <h2 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stream. Create. Train. Earn.
          </h2>

          <p class="text-gray-300 mb-10 text-lg max-w-xl leading-relaxed">
            Watch unlimited movies, music & live events. Create and monetize content. Train talents and earn commissions. All in one platform.
          </p>

          <div class="flex flex-wrap gap-4">
            <button @click="openRegistrationModal('viewer')" class="bg-red-600 px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
              🎬 Start Watching
            </button>
            <button @click="openRegistrationModal('creator')" class="border-2 border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition font-semibold text-lg">
              🚀 Become a Creator
            </button>
            <button @click="openRegistrationModal('trainer')" class="border-2 border-yellow-500 px-8 py-4 rounded-lg hover:bg-yellow-500 hover:text-black transition font-semibold text-lg">
              👨‍🏫 Train Talents
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Media -->
    <TrendingMedia />

    <!-- Content Categories Section -->
    <section id="movies" class="py-20 px-8 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-4xl font-bold mb-4">Explore Our Content</h3>
        <p class="text-gray-400 mb-12 text-lg">Discover thousands of movies, series, music, and talent content</p>

        <div class="grid md:grid-cols-4 gap-6">
          <!-- Movies -->
          <div class="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition cursor-pointer group">
            <div class="text-5xl mb-4">🎬</div>
            <h4 class="text-2xl font-bold mb-3">Movies & Series</h4>
            <p class="text-gray-400 mb-4">Blockbusters, dramas, documentaries and exclusive series</p>
            <button @click="openRegistrationModal('viewer')" class="text-blue-400 font-semibold group-hover:text-blue-300 transition">Explore →</button>
          </div>

          <!-- Music -->
          <div class="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition cursor-pointer group">
            <div class="text-5xl mb-4">🎵</div>
            <h4 class="text-2xl font-bold mb-3">Music & Podcasts</h4>
            <p class="text-gray-400 mb-4">Millions of songs, albums, and exclusive podcasts</p>
            <button @click="openRegistrationModal('viewer')" class="text-purple-400 font-semibold group-hover:text-purple-300 transition">Explore →</button>
          </div>

          <!-- Talent Training -->
          <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition cursor-pointer group">
            <div class="text-5xl mb-4">👨‍🏫</div>
            <h4 class="text-2xl font-bold mb-3">Talent Training</h4>
            <p class="text-gray-400 mb-4">Learn from experts and train others to earn commissions</p>
            <button @click="openRegistrationModal('trainer')" class="text-yellow-400 font-semibold group-hover:text-yellow-300 transition">Explore →</button>
          </div>

          <!-- Live Events -->
          <div class="bg-gradient-to-br from-red-900/30 to-red-900/10 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition cursor-pointer group">
            <div class="text-5xl mb-4">🎪</div>
            <h4 class="text-2xl font-bold mb-3">Live Events</h4>
            <p class="text-gray-400 mb-4">Concerts, shows, and exclusive live performances</p>
            <button @click="openRegistrationModal('viewer')" class="text-red-400 font-semibold group-hover:text-red-300 transition">Explore →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Music Section -->
    <section id="music" class="py-20 px-8 bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-4xl font-bold mb-6">Your Music, Your Way</h3>
            <p class="text-gray-300 mb-6 text-lg">
              Stream millions of songs from artists worldwide. Discover new music, create playlists, and support your favorite artists directly.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center space-x-3">
                <span class="text-purple-500 text-2xl">✓</span>
                <span class="text-gray-300">Ad-free listening on Premium</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-purple-500 text-2xl">✓</span>
                <span class="text-gray-300">Download for offline playback</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-purple-500 text-2xl">✓</span>
                <span class="text-gray-300">Exclusive artist content & live sessions</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-purple-500 text-2xl">✓</span>
                <span class="text-gray-300">Upload and monetize your own music</span>
              </li>
            </ul>
            <button class="bg-purple-600 px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
              Explore Music
            </button>
          </div>
          <div class="bg-gradient-to-br from-purple-900/40 to-purple-900/10 h-96 rounded-2xl flex items-center justify-center border border-purple-500/20">
            <div class="text-center">
              <div class="text-6xl mb-4">🎧</div>
              <p class="text-gray-400">Music Library Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Talent Training Section -->
    <section id="talents" class="py-20 px-8 bg-black">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-6">Talent Training & Commission System</h3>
        <p class="text-gray-400 text-center mb-12 text-lg max-w-2xl mx-auto">
          Become a trainer, teach your skills, and earn commissions when your trainees succeed
        </p>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <!-- How It Works Card 1 -->
          <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 p-8 rounded-2xl border border-yellow-500/20">
            <div class="text-5xl mb-4">1️⃣</div>
            <h4 class="text-2xl font-bold mb-3">Register as Trainer</h4>
            <p class="text-gray-400">Create your trainer profile and showcase your expertise in your field</p>
          </div>

          <!-- How It Works Card 2 -->
          <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 p-8 rounded-2xl border border-yellow-500/20">
            <div class="text-5xl mb-4">2️⃣</div>
            <h4 class="text-2xl font-bold mb-3">Create Training Content</h4>
            <p class="text-gray-400">Upload courses, tutorials, and training materials for your students</p>
          </div>

          <!-- How It Works Card 3 -->
          <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 p-8 rounded-2xl border border-yellow-500/20">
            <div class="text-5xl mb-4">3️⃣</div>
            <h4 class="text-2xl font-bold mb-3">Earn Commissions</h4>
            <p class="text-gray-400">Get paid when trainees complete courses and refer others</p>
          </div>
        </div>

        <!-- Commission Structure -->
        <div class="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-12 rounded-2xl border border-yellow-500/30 mb-12">
          <h4 class="text-2xl font-bold mb-8 text-center">Commission Structure</h4>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-4xl font-bold text-yellow-500 mb-2">15%</div>
              <p class="text-gray-400">Direct Student Enrollment</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-yellow-500 mb-2">10%</div>
              <p class="text-gray-400">First Level Referral</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-yellow-500 mb-2">5%</div>
              <p class="text-gray-400">Second Level Referral</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-yellow-500 mb-2">Bonus</div>
              <p class="text-gray-400">Performance Incentives</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button class="bg-yellow-600 px-8 py-4 rounded-lg hover:bg-yellow-700 transition font-semibold text-lg">
            Become a Trainer Today
          </button>
        </div>
      </div>
    </section>

    <!-- For Creators Section -->
    <section id="creators" class="py-20 px-8 bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="bg-gradient-to-br from-red-900/40 to-red-900/10 h-96 rounded-2xl flex items-center justify-center border border-red-500/20">
            <div class="text-center">
              <div class="text-6xl mb-4">🎥</div>
              <p class="text-gray-400">Creator Dashboard Preview</p>
            </div>
          </div>
          <div>
            <h3 class="text-4xl font-bold mb-6">For Content Creators</h3>
            <p class="text-gray-300 mb-6 text-lg">
              Upload your content and start earning immediately. We support movies, series, music, and training content.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center space-x-3">
                <span class="text-red-500 text-2xl">✓</span>
                <span class="text-gray-300">Upload unlimited content</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-red-500 text-2xl">✓</span>
                <span class="text-gray-300">Earn from subscriptions & ads</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-red-500 text-2xl">✓</span>
                <span class="text-gray-300">Referral commission system</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-red-500 text-2xl">✓</span>
                <span class="text-gray-300">Analytics & performance tracking</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="text-red-500 text-2xl">✓</span>
                <span class="text-gray-300">Direct payment to your account</span>
              </li>
            </ul>
            <button class="bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold">
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Features Section -->
    <section class="py-20 px-8 bg-black">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-12">Why Choose HooraFlix?</h3>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">🌍</div>
            <h4 class="text-lg font-semibold mb-2">Global Reach</h4>
            <p class="text-gray-400 text-sm">Access content from creators worldwide</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">💰</div>
            <h4 class="text-lg font-semibold mb-2">Multiple Revenue Streams</h4>
            <p class="text-gray-400 text-sm">Earn from content, referrals, and training</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">🔒</div>
            <h4 class="text-lg font-semibold mb-2">Secure & Safe</h4>
            <p class="text-gray-400 text-sm">Protected payments and content rights</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">📊</div>
            <h4 class="text-lg font-semibold mb-2">Advanced Analytics</h4>
            <p class="text-gray-400 text-sm">Track performance and earnings in real-time</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">🎯</div>
            <h4 class="text-lg font-semibold mb-2">Smart Recommendations</h4>
            <p class="text-gray-400 text-sm">AI-powered content discovery</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">📱</div>
            <h4 class="text-lg font-semibold mb-2">Multi-Platform</h4>
            <p class="text-gray-400 text-sm">Watch on any device, anytime</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">🚀</div>
            <h4 class="text-lg font-semibold mb-2">Easy Upload</h4>
            <p class="text-gray-400 text-sm">Simple tools to publish your content</p>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition">
            <div class="text-4xl mb-4">👥</div>
            <h4 class="text-lg font-semibold mb-2">Community Support</h4>
            <p class="text-gray-400 text-sm">Connect with creators and viewers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-8 bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-6">Flexible Pricing Plans</h3>
        <p class="text-gray-400 text-center mb-12 text-lg">Choose the perfect plan for your needs</p>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Free Plan (Viewer) -->
          <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
            <h4 class="text-2xl font-bold mb-2">👁️ Viewer</h4>
            <p class="text-gray-400 mb-6">Watch unlimited content</p>
            <div class="text-3xl font-bold mb-6">Free<span class="text-lg text-gray-400"> (Pay-per-view)</span></div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Stream movies & series</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Listen to music</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Pay-per-view pricing</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Social login (Google, Facebook)</span>
              </li>
            </ul>
            <router-link :to="{ name: 'register', query: { role: 'viewer' } }" @click.prevent="openRegistrationModal('viewer')" class="w-full block text-center border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition font-semibold cursor-pointer">
              Get Started
            </router-link>
          </div>

          <!-- Creator Plan -->
          <div class="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-2xl border-2 border-red-500 relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h4 class="text-2xl font-bold mb-2">🎥 Creator</h4>
            <p class="text-red-100 mb-6">Upload & monetize content</p>
            <div class="text-3xl font-bold mb-6">$19.99<span class="text-lg text-red-100">/month</span></div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center space-x-2">
                <span class="text-green-300">✓</span>
                <span class="text-white">All Viewer features</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-300">✓</span>
                <span class="text-white">Upload unlimited content</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-300">✓</span>
                <span class="text-white">Earn from subscriptions</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-300">✓</span>
                <span class="text-white">Referral commissions (10%)</span>
              </li>
            </ul>
            <button @click="openRegistrationModal('creator')" class="w-full block text-center bg-black px-6 py-3 rounded-lg hover:bg-gray-900 transition font-semibold">
              Subscribe Now
            </button>
          </div>

          <!-- Trainer Plan -->
          <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-yellow-600 transition">
            <h4 class="text-2xl font-bold mb-2">👨‍🏫 Trainer</h4>
            <p class="text-gray-400 mb-6">Train talents & earn commissions</p>
            <div class="text-3xl font-bold mb-6">$29.99<span class="text-lg text-gray-400">/month</span></div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">All Creator features</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Create training courses</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Earn 15% per student</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-green-500">✓</span>
                <span class="text-gray-300">Referral bonuses (10% + 5%)</span>
              </li>
            </ul>
            <button @click="openRegistrationModal('trainer')" class="w-full block text-center border border-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-600/10 transition font-semibold text-yellow-500">
              Join as Trainer
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-8 bg-gradient-to-r from-red-900/30 to-black">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-4xl font-bold mb-6">Ready to Join HooraFlix?</h3>
        <p class="text-gray-300 mb-10 text-lg">
          Start watching, creating, or training today. Choose your path and begin your journey.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button @click="openRegistrationModal('viewer')" class="bg-red-600 px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
            Watch Now
          </button>
          <button @click="openRegistrationModal('creator')" class="border-2 border-red-600 px-8 py-4 rounded-lg hover:bg-red-600/10 transition font-semibold text-lg">
            Create Content
          </button>
          <button @click="openRegistrationModal('trainer')" class="border-2 border-yellow-600 px-8 py-4 rounded-lg hover:bg-yellow-600/10 transition font-semibold text-lg">
            Start Training
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-8 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold mb-4">About HooraFlix</h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">Revolutionizing entertainment and talent development globally</p>
        </div>

        <!-- Background -->
        <div class="mb-16 bg-gradient-to-r from-red-900/20 to-black p-12 rounded-2xl border border-red-600/20">
          <h3 class="text-3xl font-bold mb-4">Our Background</h3>
          <p class="text-gray-300 text-lg leading-relaxed">
            HooraFlix was founded with a vision to democratize entertainment and talent development. We believe that everyone deserves access to world-class content and the opportunity to showcase their talents. Our platform brings together viewers, creators, and trainers in a unified ecosystem where creativity is rewarded and talent is nurtured.
          </p>
        </div>

        <!-- Mission, Vision, Values Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Mission -->
          <div class="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-8 rounded-2xl border border-blue-500/20">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
            <p class="text-gray-300">
              To empower creators, trainers, and viewers by providing a global platform where talent is discovered, nurtured, and rewarded. We're committed to making entertainment accessible and enabling everyone to monetize their passion.
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-8 rounded-2xl border border-purple-500/20">
            <div class="text-5xl mb-4">🌟</div>
            <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
            <p class="text-gray-300">
              To become the world's leading platform for entertainment, talent development, and creative expression. A place where boundaries dissolve, opportunities flourish, and dreams become reality for millions worldwide.
            </p>
          </div>

          <!-- Core Values -->
          <div class="bg-gradient-to-br from-red-900/30 to-red-900/10 p-8 rounded-2xl border border-red-500/20">
            <div class="text-5xl mb-4">💎</div>
            <h3 class="text-2xl font-bold mb-4">Core Values</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center space-x-2">
                <span class="text-red-500">✓</span>
                <span>Integrity & Transparency</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-red-500">✓</span>
                <span>Innovation & Excellence</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-red-500">✓</span>
                <span>Community & Collaboration</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-red-500">✓</span>
                <span>Empowerment & Growth</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Why HooraFlix -->
        <div class="bg-black border border-red-600/20 rounded-2xl p-12">
          <h3 class="text-3xl font-bold mb-8 text-center">Why HooraFlix?</h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="flex items-start space-x-4">
              <div class="text-3xl">🚀</div>
              <div>
                <h4 class="text-xl font-bold mb-2">Unlimited Opportunities</h4>
                <p class="text-gray-400">Multiple revenue streams for creators, trainers, and viewers. Earn through content, referrals, and commissions.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="text-3xl">🌍</div>
              <div>
                <h4 class="text-xl font-bold mb-2">Global Community</h4>
                <p class="text-gray-400">Connect with millions of users worldwide. Share your talent and learn from the best in your field.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="text-3xl">💰</div>
              <div>
                <h4 class="text-xl font-bold mb-2">Fair Compensation</h4>
                <p class="text-gray-400">We believe creators deserve fair pay. Transparent pricing and instant payouts to your account.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="text-3xl">🔒</div>
              <div>
                <h4 class="text-xl font-bold mb-2">Secure Platform</h4>
                <p class="text-gray-400">Your content and data are protected. Industry-leading security and privacy standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Contactus />
    <Footer />

    <!-- Registration Modal -->
    <RegistrationModal 
      :isOpen="showRegistrationModal"
      :selectedRole="selectedRole"
      @close="closeRegistrationModal"
      @registered="handleRegistered"
    />
   
  </div>
</template>

<script>
import TrendingMedia from "./trendingMedia.vue";
import Contactus from "./contactUs.vue"
import Footer from './footer.vue'
import RegistrationModal from '../../../components/modals/RegistrationModal.vue'

export default {
  name: "HomePage",

  components: {
    TrendingMedia,
    Footer,
    Contactus,
    RegistrationModal
  },

  data() {
    return {
      showRegistrationModal: false,
      selectedRole: "viewer"
    };
  },

  methods: {
    openRegistrationModal(role) {
      this.selectedRole = role;
      this.showRegistrationModal = true;
    },

    closeRegistrationModal() {
      this.showRegistrationModal = false;
    },

    handleRegistered(userData) {
      console.log("User registered:", userData);
      this.showRegistrationModal = false;
    }
  }
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
