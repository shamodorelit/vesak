export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 glass border-t border-b-0 border-l-0 border-r-0">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <span className="font-medium">Made with Vesak Blessings</span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-[var(--color-vesak-gold)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-vesak-gold)] transition-colors">Terms of Service</a>
        </div>
        
        <div className="text-center md:text-right">
          &copy; {new Date().getFullYear()} Happy Vesak Card Maker
        </div>
      </div>
    </footer>
  );
}
