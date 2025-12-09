export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-white shadow-md p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Sales Management</h1>

      <nav className="flex flex-col gap-4">
        <SidebarItem label="Dashboard" active />
        <SidebarItem label="Sales" />
        <SidebarItem label="Analytics" />
        <SidebarItem label="Settings" />
      </nav>
    </div>
  );
}

function SidebarItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`cursor-pointer px-3 py-2 rounded-md ${
        active
          ? "bg-blue-600 text-white font-medium"
          : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </div>
  );
}
