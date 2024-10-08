import { ExternalLink } from 'lucide-react';

const NpmPackageGrid = ({ packages = [] }) => {
  if (packages.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300">No packages to display.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {packages.map((pkg, index) => (
        <a
          key={index}
          href={pkg.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{pkg.name}</h3>
            <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2">v{pkg.version}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

const Package = () => {
  const npmPackages = [
    {
      name: "flexible-form-validation",
      url: "https://www.npmjs.com/package/flexible-form-validation?activeTab=readme",
      description: "A flexible form validation library for React applications.",
      version: "1.2.3",
    },
    {
      name: "file-uploader-express",
      url: "https://www.npmjs.com/package/file-uploader-express",
      description: "Easy-to-use file uploader middleware for Express.js.",
      version: "2.0.1",
    },
  ];

  return (
    <div id='blogs' className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Npm Package
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <NpmPackageGrid packages={npmPackages} />
      </div>
    </div>
  );
};

export default Package;