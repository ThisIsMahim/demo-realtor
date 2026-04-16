export function Footer() {
    return (
        <footer className="py-16 mt-auto text-center font-sans text-[10px] text-foreground/40 tracking-[0.3em] uppercase border-t border-foreground/10">
            © {new Date().getFullYear()} Demo Realtor Platform. All rights reserved.
        </footer>
    );
}
