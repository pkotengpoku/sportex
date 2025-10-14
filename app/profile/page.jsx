import Link from 'next/link';
import Header from '@/components/Header';

// Helper component for SVG icons to avoid repetition
const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// ChevronRightIcon component
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


export default function AccountPage() {
  const accountLinks = [
    { href: '/account/orders', icon: <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563C9.254 15 9 14.746 9 14.437V9.563z" />, label: 'Cronologia ordini' },
    { href: '/account/details', icon: <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />, label: 'Dati personali' },
    { href: '/account/change-password', icon: <Icon path="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />, label: 'Cambia password' },
    { href: '/account/address-book', icon: <Icon path="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />, label: 'Rubrica' },
    { href: '/account/payment-methods', icon: <Icon path="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M3 12l6 6m-6-6l6-6" />, label: 'Metodi di pagamento' },
    { href: '/account/contact-preferences', icon: <Icon path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />, label: 'Preferenze di contatto' },
  ];

  const secondaryLinks = [
      { href: '/account/wishlist', icon: <Icon path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />, label: 'Lista dei desideri' },
      { href: '/logout', icon: null, label: 'Esci' },
  ]

  return (
    <div>
      <Header />
    <div className="bg-[#F8F7F5] min-h-screen font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Account</h1>

        <div className="bg-white rounded-lg shadow-sm mb-6">
            {accountLinks.map((link) => (
                <a href={link.href} key={link.label} className="block">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                            {link.icon}
                            <span className="text-gray-800">{link.label}</span>
                        </div>
                        <ChevronRightIcon />
                    </div>
                </a>
            ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
           {secondaryLinks.map((link) => (
                <Link href={link.href} key={link.lLinkbel} className="block">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                            {link.icon}
                            <span className="text-gray-800">{link.label}</span>
                        </div>
                       {link.icon && <ChevronRightIcon />}
                    </div>
                </Link>
           ))}
        </div>

        <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
                Useremo i tuoi dati secondo la nostra
                <a href="/privacy-policy" className="underline hover:text-gray-700 ml-1">
                    Politica di Privacy.
                </a>
            </p>
        </div>
      </div>
    </div>
  </div>
  );
}