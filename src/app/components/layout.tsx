'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="flex min-h-screen">
        {/* Mobile Sidebar */}
        <MobileSidebar />
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden border-r">
          <Sidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0 ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}