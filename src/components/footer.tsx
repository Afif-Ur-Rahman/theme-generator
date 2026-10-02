"use client";

export const Footer = () => {
  const githubUrl = "https://github.com/afif-Ur-Rahman/";

  return (
    <footer className="border-t border-primary-200 px-4 py-6 sm:px-6 lg:px-8 dark:border-primary-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-primary-500 dark:text-primary-400">
          © {new Date().getFullYear()} Theme Generator. All rights reserved.
        </p>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-primary-500 transition-colors hover:text-primary-950 dark:text-primary-400 dark:hover:text-primary-50"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 fill-current"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
          </svg>

          <span>Afif-Ur-Rahman</span>
        </a>
      </div>
    </footer>
  );
};
