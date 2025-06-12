import { ArrowRight, FileText, Shield, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Secure VFS for All Your Files
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8">
                  Access, manage, and share your files from anywhere. Our
                  virtual file system provides easy organization and secure
                  storage for all your important documents.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-500 border px-4 py-2 rounded-md bg-blue-800">
                    Get Started
                  </button>
                  <button className="bg-blue-500 border px-4 py-2 rounded-md bg-blue-800">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-inner overflow-hidden">
                    <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 text-sm text-gray-700 dark:text-gray-300">
                        My Files
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center p-2 hover:bg-gray-700 dark:hover:bg-gray-750 rounded">
                        <FileText className="text-blue-500 mr-3" size={20} />
                        <span className="text-gray-800 dark:text-gray-200">
                          Documents
                        </span>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-700  dark:hover:bg-gray-750 rounded">
                        <FileText className="text-green-500 mr-3" size={20} />
                        <span className="text-gray-800 dark:text-gray-200">
                          Photos
                        </span>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-700  dark:hover:bg-gray-750 rounded">
                        <FileText className="text-purple-500 mr-3" size={20} />
                        <span className="text-gray-800 dark:text-gray-200">
                          Work
                        </span>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-700  dark:hover:bg-gray-750 rounded">
                        <FileText className="text-orange-500 mr-3" size={20} />
                        <span className="text-gray-800 dark:text-gray-200">
                          Projects
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need in One Place
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our VFS solution comes with powerful features to help you
                manage, access, and share your files with ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Storage
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your files are encrypted and stored securely with
                  enterprise-grade security to protect your sensitive
                  information.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="text-teal-600 dark:text-teal-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Fast Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access your files instantly from anywhere with our optimized
                  infrastructure, designed for speed and reliability.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Easy Sharing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share files and folders with anyone, control access
                  permissions, and collaborate with your team seamlessly.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="/files">
                <button className="bg-blue-500 border flex items-center justify-center mx-auto px-4 py-2 rounded-md bg-blue-800 ">
                  <span className="text-white font-semibold">Try It Now</span>
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 font-semibold text-white transition-transform"
                    size={20}
                  />
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Don't just take our word for it - hear from some of our
                satisfied users.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      John Doe
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Marketing Manager
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "VFS has transformed how our team collaborates on projects.
                  The interface is intuitive and the file organization is
                  top-notch."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-lg">
                    SS
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Sarah Smith
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Freelance Designer
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "As someone who works with large design files, I needed a
                  reliable storage solution. VFS delivers with excellent
                  performance and security."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg">
                    MJ
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Mike Johnson
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The API integration and developer tools are fantastic. I've
                  built custom workflows with VFS that have saved our team
                  countless hours."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of users who trust VFS for their file storage
              needs. Sign up today and get 5GB of free storage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-500 border px-4 py-2 rounded-md bg-blue-800">
                Create Free Account
              </button>
              <button
                className="bg-blue-500 border px-4 py-2 rounded-md bg-blue-800"
                size="lg"
                variant="outline"
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
