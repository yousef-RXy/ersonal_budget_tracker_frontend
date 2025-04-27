import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="col-start-1 row-end-1 flex justify-between items-center px-12 py-4 pt-8 bg-[#1b2055] text-white ">
      <h1 className="text-2xl font-bold">My Budget</h1>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <span>Naden Mohamed</span>
          <img
            src="https://oodie.eu/cdn/shop/files/ODI09742.jpg?v=1721095106&width=1946"
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
