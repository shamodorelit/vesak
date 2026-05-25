export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 glass border-t border-b-0 border-l-0 border-r-0">
      <div className="max-w-6xl mx-auto px-6 flex justify-center items-center text-sm opacity-80">
        <div className="text-center">
          &copy; {new Date().getFullYear()} Payable Vesak Card Maker
        </div>
      </div>
    </footer>
  );
}
