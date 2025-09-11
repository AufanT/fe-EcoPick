import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 bg-[#19583B] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Logo & Description */}
        <div>
          <h1 className="text-xl font-extrabold">
            <span className="text-rose-500">Eco</span>Pick
          </h1>
          <p className="mt-4 text-sm text-white/80 leading-relaxed">
            EcoPick membantu kamu memilih produk ramah lingkungan dengan mudah. 
            Bersama kita wujudkan gaya hidup yang lebih berkelanjutan 🌱.
          </p>
          {/* Social icons */}
          <div className="mt-5 flex gap-3">
            {[
              { href: "#", src: "https://www.englishyaari.com/img/facebook.svg", alt: "Facebook" },
              { href: "#", src: "https://www.englishyaari.com/img/linkdin.svg", alt: "LinkedIn" },
              { href: "#", src: "https://www.englishyaari.com/img/instagram1.svg", alt: "Instagram" },
              { href: "#", src: "https://www.englishyaari.com/img/twitter.svg", alt: "Twitter" },
              { href: "https://www.youtube.com/", src: "https://www.englishyaari.com/img/youtube.svg", alt: "YouTube" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition duration-200"
              >
                <img src={item.src} alt={item.alt} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium">Support Number</p>
            <a href="tel:+911800123444" className="text-base hover:underline">
              +91 1800123444
            </a>
          </div>
          <div>
            <p className="text-sm font-medium">Support Email</p>
            <a href="mailto:help@lorem.com" className="text-base hover:underline">
              help@lorem.com
            </a>
          </div>
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-base">Sub Nerul, Mumbai, India, 123456</p>
          </div>
        </div>

        {/* Pages & Download */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-lg font-semibold mb-3">Pages</p>
            <ul className="space-y-2">
              {[
                { text: "Home", href: "/" },
                { text: "News", href: "/news" },
                { text: "Contact", href: "/contact" },
                { text: "Plans & Pricing", href: "/plans" },
                { text: "Terms & Conditions", href: "/terms" },
                { text: "Privacy Policy", href: "/privacy" }
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/90 hover:text-white transition duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold mb-3">Download App</p>
            <div className="flex flex-col gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.englishyaari.com/img/google-store.svg"
                  alt="Google Play"
                  className="h-12"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.englishyaari.com/img/apple-store.svg"
                  alt="App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-center">
          <p className="text-sm text-white/80">© 2025 EcoPick. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
