export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-foreground/30 text-sm">
          &copy; {new Date().getFullYear()} <span className="text-foreground/50 font-medium">KISHORE</span>. All rights reserved.
        </p>
        <p className="text-foreground/20 text-xs">
          Designed and Developed by Kishore
        </p>
      </div>
    </footer>
  );
}
