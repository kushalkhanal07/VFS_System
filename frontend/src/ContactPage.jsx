import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className=" px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Fill out the
            form below or use one of our contact methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        Email
                      </h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        <a
                          href="mailto:support@clouddrive.com"
                          className="hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          support@clouddrive.com
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        <a
                          href="mailto:info@clouddrive.com"
                          className="hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          info@clouddrive.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        Phone
                      </h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        <a
                          href="tel:+1-202-555-0149"
                          className="hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          +1 (202) 555-0149
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Monday-Friday, 9am-6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        Office
                      </h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        123 Innovation Drive
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-300 bg-blue-400 p-6">
                <h4 className="text-md font-medium text-white  mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-6 w-6"
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

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                How secure is my data?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is encrypted both in transit and at rest using
                industry-standard encryption protocols. We also offer two-factor
                authentication for added security.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Can I share files with non-users?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You can share files with anyone, even if they don't have a
                CloudDrive account, by generating secure sharing links with
                optional password protection.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                What are the storage limits?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free accounts include 5GB of storage. Our premium plans offer
                100GB, 1TB, and unlimited storage options depending on your
                needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                How do I recover deleted files?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Deleted files are moved to the Trash folder where they remain
                for 30 days before being permanently deleted. You can restore
                them at any time during this period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
