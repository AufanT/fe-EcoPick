# ----- TAHAP 1: BUILD (Membangun Kode React) -----
# Gunakan image Node untuk build
FROM node:20-alpine AS builder

WORKDIR /app

# Salin package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependensi frontend
RUN npm install

# Salin sisa kode frontend
COPY . .

# Jalankan perintah build (ini akan membuat folder /dist)
RUN npm run build

# ----- TAHAP 2: SERVE (Menyajikan Hasil Build) -----
# Gunakan image Nginx yang ringan untuk server web
FROM nginx:alpine

# Salin HANYA hasil build dari tahap 1 (folder 'dist') ke folder web Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Ganti konfigurasi default Nginx dengan konfigurasi kita
# Ini PENTING agar React Router (BrowserRouter) berfungsi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ekspos port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]