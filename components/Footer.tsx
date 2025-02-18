import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Hem
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex justify-between w-full md:w-auto items-center space-x-8">
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WuEXX9k1A44WWe2GlfJMmCvoaVZl28.png"
                alt="Auktoriserat bemanningsföretag"
                width={70}
                height={70}
                // objectFit="contain"
              />
            </div>
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CEsjx9LDNBTf8oMmCy4kL5jjnYO1Hc.png"
                alt="R-licens"
                width={60}
                height={60}
                // objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} K-Bemanning. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  )
}

