import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// Footer link configuration
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  path: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
];

// ---------------------------------------------------------------------------
// Social placeholder icons (inline SVGs)
// ---------------------------------------------------------------------------

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.16 4.86a4.28 4.28 0 001.32 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.27 4.27 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.56a8.49 8.49 0 01-2.54.7z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.957c.454.454.774.89.957 1.47.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 01-.957 1.47 4.088 4.088 0 01-1.47.957c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 01-1.47-.957 4.088 4.088 0 01-.957-1.47c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 01.957-1.47A4.088 4.088 0 015.063 2.3c.46-.163 1.26-.35 2.43-.403C8.759 1.84 9.139 1.827 12 1.827V2.163zm0 1.802c-3.153 0-3.506.012-4.744.069-1.145.052-1.766.244-2.18.405a3.456 3.456 0 00-1.29.838 3.456 3.456 0 00-.838 1.29c-.161.414-.353 1.035-.405 2.18C2.486 9.994 2.474 10.347 2.474 12s.012 2.006.069 3.244c.052 1.145.244 1.766.405 2.18.186.494.462.943.838 1.29.347.376.796.652 1.29.838.414.161 1.035.353 2.18.405 1.238.057 1.591.069 4.744.069s3.506-.012 4.744-.069c1.145-.052 1.766-.244 2.18-.405a3.67 3.67 0 002.128-2.128c.161-.414.353-1.035.405-2.18.057-1.238.069-1.591.069-3.244s-.012-2.006-.069-3.244c-.052-1.145-.244-1.766-.405-2.18a3.456 3.456 0 00-.838-1.29 3.456 3.456 0 00-1.29-.838c-.414-.161-1.035-.353-2.18-.405C15.506 3.977 15.153 3.965 12 3.965zm0 3.067a4.968 4.968 0 110 9.936 4.968 4.968 0 010-9.936zm0 8.192a3.224 3.224 0 100-6.448 3.224 3.224 0 000 6.448zm5.165-8.39a1.161 1.161 0 11-2.322 0 1.161 1.161 0 012.322 0z" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

interface SocialLink {
  label: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
];

// ---------------------------------------------------------------------------
// Footer Component
// ---------------------------------------------------------------------------

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-900',
        'transition-colors duration-300',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top row: links + social */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Footer navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm text-gray-500 dark:text-gray-400',
                  'hover:text-gray-900 dark:hover:text-white',
                  'transition-colors duration-200',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-gray-400 dark:text-gray-500',
                  'hover:text-gray-600 dark:hover:text-gray-300',
                  'transition-colors duration-200',
                )}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {currentYear} Rakhshan Eats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
