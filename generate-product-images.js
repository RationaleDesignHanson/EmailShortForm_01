// Script to generate product images using Gemini API
const products = [
  { id: 'ds1', brand: 'Sony', product: 'WH-1000XM5 Headphones', query: 'sony+headphones+wh1000xm5' },
  { id: 'ds2', brand: 'Theory', product: 'Structured Midi Dress', query: 'elegant+dress+fashion' },
  { id: 'ds3', brand: 'KitchenAid', product: 'Artisan Stand Mixer', query: 'kitchenaid+stand+mixer' },
  { id: 'ds4', brand: 'Patagonia', product: 'Nano Puff Jacket', query: 'patagonia+nano+puff+jacket' },
  { id: 'ds5', brand: 'Apple', product: 'AirPods Pro', query: 'apple+airpods+pro' }
];

// For now, use high-quality Unsplash images with specific IDs
// (Gemini image generation requires different API endpoint)
const productImages = {
  ds1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop', // Headphones
  ds2: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=400&fit=crop', // Elegant dress
  ds3: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&h=400&fit=crop', // Stand mixer
  ds4: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=400&fit=crop', // Jacket
  ds5: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=400&fit=crop'  // AirPods
};

console.log('Product Image URLs:');
console.log(JSON.stringify(productImages, null, 2));

module.exports = productImages;

