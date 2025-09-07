import React from 'react'

const Footer = () => {
  return (
          <footer className="bg-gray-200 text-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h2 className="text-xl font-bold mb-2">Find Us</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                {/* Social icons here */}
                <a href="#" className="hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm7 6h-2v-3s0-2 2-2v5zm0-7c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-wrap justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-1/2 sm:w-1/4">
                <h1 className="text-slate-700 font-semibold mb-2">DECATHLON CORPORATE</h1>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:underline">Nolly United</a></li>
                  <li><a href="#" className="hover:underline">Lavora con Noi</a></li>
                  <li><a href="#" className="hover:underline">Impegni sostenibilità</a></li>
                </ul>
              </div>
              <div className="w-1/2 sm:w-1/4">
                <h1 className="text-slate-700 font-semibold mb-2">DECATHLON RENTAL</h1>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:underline">Decathlon Rental</a></li>
                  <li><a href="#" className="hover:underline">Come funziona</a></li>
                  <li><a href="#" className="hover:underline">Aiuto</a></li>
                </ul>
              </div>
              <div className="w-1/2 sm:w-1/4">
                <h1 className="text-slate-700 font-semibold mb-2">IL MIO ACCOUNT</h1>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:underline">I miei acquisti</a></li>
                  <li><a href="#" className="hover:underline">I miei noleggi</a></li>
                  <li><a href="#" className="hover:underline">I miei acquisti</a></li>
                </ul>
              </div>
              <div className="w-1/2 sm:w-1/4">
                <h1 className="text-slate-700 font-semibold mb-2">COSA POSSO NOLEGGIARE</h1>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:underline">Biciclette da bambino</a></li>
                  <li><a href="#" className="hover:underline">Decathlon Rent</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="relative h-16 w-40">
              <img src="/sportex_cropped.png" alt="Sportex logo" className="object-contain w-full h-full" />
            </div>
            <div className="text-sm text-slate-500">© 2023 Decathlon</div>
          </div>
          <div className="w-full border-t border-gray-400 my-4"></div>
          
          <div>
            <ul className="flex flex-wrap justify-center md:justify-start text-xs sm:text-sm space-x-4 sm:space-x-8">
              <li><a href="#" className="hover:underline">Condizioni di noleggio</a></li>
              <li><a href="#" className="hover:underline">Condizioni generali di utilizzo del sito</a></li>
              <li><a href="#" className="hover:underline">Condizioni generali di assicurazione</a></li>
              <li><a href="#" className="hover:underline">Informativa sulla privacy</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer
