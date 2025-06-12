import React from "react";
import { Shield, Zap, Users, Globe, Award, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-800 ">
      <div className=" px-4 py-12 max-w-7xl mx-auto py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About CloudDrive
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're on a mission to provide the most secure, reliable, and
            user-friendly cloud storage solution for individuals and businesses
            around the world.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CloudDrive was founded in 2018 by a team of security and cloud
              infrastructure experts who saw a need for a more secure and
              user-friendly file storage solution. We started with a simple
              idea: create a virtual file system that works just like your
              computer's file system, but with the security, accessibility, and
              reliability of the cloud.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Since our launch, we've grown to serve over 100,000 users
              worldwide, from individual professionals to large enterprises. Our
              platform now handles millions of files daily, all while
              maintaining our core values of security, simplicity, and
              reliability.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, CloudDrive continues to innovate with new features and
              improvements, always keeping our users' needs at the center of
              everything we do.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-teal-500 rounded-full"></div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-500 mb-1">
                      100K+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Happy Users
                    </div>
                  </div>
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-teal-500 mb-1">
                      50M+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Files Stored
                    </div>
                  </div>
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-purple-500 mb-1">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Uptime
                    </div>
                  </div>
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-orange-500 mb-1">
                      5 PB
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Data Managed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield
                  className="text-blue-600 dark:text-blue-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Security First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We prioritize the security and privacy of your data above all
                else, with robust encryption and strict access controls.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-teal-600 dark:text-teal-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Everything we build is designed with our users in mind, focusing
                on intuitive interfaces and helpful features.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap
                  className="text-purple-600 dark:text-purple-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Continuous Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're constantly improving our platform with new features and
                optimizations to provide the best possible experience.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
                <div className="bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                  JD
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Jane Doe
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  Co-Founder & CEO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Former security engineer at Google with over 15 years of
                  experience in cloud infrastructure and data security.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
                <div className="bg-teal-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                  MS
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Michael Smith
                </h3>
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-3">
                  Co-Founder & CTO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Backend architecture expert with a Ph.D. in Computer Science
                  and previous roles at AWS and Microsoft.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
                <div className="bg-purple-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                  SP
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sarah Parker
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
                  Chief Product Officer
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Product strategy expert with a focus on UX design and user
                  research. Previously led product teams at Dropbox and Adobe.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Presence */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Global Presence
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Globe className="text-blue-500 mr-3" size={28} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Serving Customers Worldwide
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  CloudDrive has a global presence with data centers in North
                  America, Europe, Asia, and Australia. Our infrastructure is
                  designed to provide low-latency access to your files, no
                  matter where you are in the world.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our team is distributed across multiple time zones, allowing
                  us to provide 24/7 support and continuous development of our
                  platform.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      North America
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Europe
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Asia
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Australia
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="italic">
                    World map visualization would be here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award
                  className="text-yellow-600 dark:text-yellow-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Best Cloud Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                TechReview Magazine, 2023
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield
                  className="text-blue-600 dark:text-blue-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Security Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Cybersecurity Awards, 2022
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users
                  className="text-green-600 dark:text-green-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                SaaS User Choice Awards, 2023
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Code
                  className="text-purple-600 dark:text-purple-400"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                API Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Developer Tools Summit, 2022
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                Ready to experience CloudDrive?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-blue-100">
                Join thousands of satisfied users and start managing your files
                with ease and security.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <button className="bg-blue-900 px-4 py-2 rounded-md  cursor-pointer text-gray-300">Get Started for Free</button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <button className="bg-blue-900 px-4 py-2 rounded-md  cursor-pointer text-gray-300">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
