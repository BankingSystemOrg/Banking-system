import MobileNav from "@/components/ui/MobileNav";
import Sidebar from "@/components/ui/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const loggedIn = { firstName: "Adrian", lastName: "JSM" } as User;

  return (
    <main className="flex h-screen w-full font-inter">
      
      {/* Sidebar only visible md and up */}
      <div className="hidden md:flex">
        <Sidebar user={loggedIn} />
      </div>
      
      <div className="flex size-full flex-col flex-1">
        {/* MobileNav only visible below md */}
        <div className="md:hidden">
          <MobileNav user={loggedIn} />
        </div>

        {/* Your main content */}
        {children}
      </div>
      
    </main>
  );
}
