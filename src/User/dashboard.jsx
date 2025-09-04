import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const products = [
  { id: 1, name: 'Bamboo Toothbrush', price: 'Rp 29.000', img: '/product-1.jpg' },
  { id: 2, name: 'Reusable Straw Set', price: 'Rp 35.000', img: '/product-2.jpg' },
  { id: 3, name: 'Organic Soap Bar', price: 'Rp 25.000', img: '/product-3.jpg' },
  { id: 4, name: 'Cotton Tote Bag', price: 'Rp 49.000', img: '/product-4.jpg' },
];

const testimonials = [
  { id: 1, name: 'Alya', text: 'Kualitas bagus, pengiriman cepat, dan benar-benar ramah lingkungan!', avatar: '/avatar-1.jpg' },
  { id: 2, name: 'Rama', text: 'Sikat bambunya nyaman dipakai. Repeat order deh!', avatar: '/avatar-2.jpg' },
  { id: 3, name: 'Intan', text: 'Senang bisa belanja sambil peduli lingkungan 🌱', avatar: '/avatar-3.jpg' },
];

const posts = [
  { id: 1, title: '5 Cara Mengurangi Plastik Sekali Pakai', img: '/blog-1.jpg' },
  { id: 2, title: 'Kenapa Bambu Lebih Berkelanjutan?', img: '/blog-2.jpg' },
  { id: 3, title: 'Tips Hidup Minimalis & Eco-Friendly', img: '/blog-3.jpg' },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar fixed di atas */}
      <Navbar />

      {/* Hero Video Section */}
      <section className="relative w-full h-[88vh]" id="home">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videoproduk.mp4" // simpan di /public
          autoPlay
          muted
          loop
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow">
              Produk Kami
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              Pilih produk ramah lingkungan favoritmu dan mulai langkah kecil untuk bumi yang lebih baik.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="#shop" className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition">
                Belanja Sekarang
              </a>
              <a href="#about" className="px-6 py-3 rounded-full border border-white/70 text-white hover:bg-white hover:text-green-700 transition">
                Pelajari Misi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer karena navbar fixed */}
      <div className="pt-4" />

      {/* Products / Shop */}
      <section id="shop" className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Produk Unggulan</h2>
            <p className="text-gray-600 mt-1">Kurasi terbaik untuk kebutuhan harian yang lebih hijau.</p>
          </div>
          <a href="#" className="text-green-700 hover:underline">Lihat Semua</a>
        </div>

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(p => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gray-200">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-green-700 mt-1">{p.price}</p>
                <button className="mt-4 w-full rounded-xl bg-green-600 hover:bg-green-700 text-white py-2 font-medium transition">
                  Tambah ke Keranjang
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About / Mission */}
      <section id="about" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tentang EcoPick</h2>
            <p className="mt-3 text-gray-600">
              EcoPick hadir untuk mempermudahmu beralih ke produk yang lebih berkelanjutan tanpa ribet.
              Kami memilih bahan ramah lingkungan, proses produksi bertanggung jawab, dan kemasan minim plastik.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>• Bahan alami & dapat didaur ulang</li>
              <li>• Pemasok lokal & etis</li>
              <li>• Setiap transaksi berkontribusi pada penanaman pohon</li>
            </ul>
            <a href="#impact" className="inline-block mt-6 px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium">
              Lihat Dampak Kami
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow">
            <img src="/about.jpg" alt="Eco mission" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="bg-green-700">
        <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">1.2K+</div>
            <div className="mt-1 opacity-90">Pelanggan Peduli</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">8.5 Ton</div>
            <div className="mt-1 opacity-90">Sampah Plastik Dihemat</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">1.000+</div>
            <div className="mt-1 opacity-90">Pohon Ditanam</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Apa Kata Mereka</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-yellow-500 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Mulai Perubahan Kecil Hari Ini</h2>
          <p className="mt-2 text-gray-600">Gabung newsletter kami untuk promo & tips hidup berkelanjutan.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Email kamu"
              className="px-4 py-3 rounded-xl bg-white shadow w-full sm:w-80 outline-none ring-2 ring-transparent focus:ring-green-300"
            />
            <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium">
              Berlangganan
            </button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="max-w-6xl mx-auto px-6 py-16" id="faq">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Artikel & Tips</h2>
            <p className="text-gray-600 mt-1">Belajar hidup lebih ramah lingkungan.</p>
          </div>
          <a href="#" className="text-green-700 hover:underline">Lihat Semua</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => (
            <article key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="aspect-[16/10] bg-gray-200">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{p.title}</h3>
                <a href="#" className="inline-block mt-3 text-green-700 hover:underline">Baca selengkapnya</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
