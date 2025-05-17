# Gunakan image Node.js resmi
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code ke dalam container
COPY . .

# Ekspose port yang digunakan aplikasi (misal 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]