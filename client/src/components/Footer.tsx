export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Morality Engine. All rights reserved.</p>
        <p className="mt-1">Exploring ethical dilemmas in autonomous decision-making.</p>
      </div>
    </footer>
  );
}