import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[10vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <SearchX size={80} className="text-primary" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold mb-2">404</h1>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-3">Oops! Page Missing</h2>

        <p className="text-base-content/70 mb-8 leading-relaxed">
          The page you are looking for might have been removed or never existed.
        </p>

        {/* Button */}
        <Link href="/" className="btn btn-outline rounded-full px-6">
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
