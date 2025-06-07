import { Github, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-gray-100 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} QR Code Generator. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={20} />
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using React & Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}