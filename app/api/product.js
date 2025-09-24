// pages/api/product.js
export default function handler(req, res) {
  // You would use your DB here. For demo we return static data with coords.
  const sample = [
    {
      _id: "p1",
      title: "City Road Bike - Perfect for commuting",
      seller_name: "Marco",
      final_price: 25,
      currency: "€",
      image_url: ["/sample/bike1.jpg"],
      categories: ["Bike"],
      rating: 4.8,
      availability: "In Stock",
      coordinates: [45.4668, 9.1905],
      short_desc: "Lightweight frame, helmet included",
    },
    {
      _id: "p2",
      title: "Mountain Bike - Full Suspension",
      seller_name: "Laura",
      final_price: 40,
      currency: "€",
      image_url: ["/sample/bike2.jpg"],
      categories: ["Bike", "MTB"],
      rating: 4.9,
      availability: "In Stock",
      coordinates: [45.455, 9.185],
      short_desc: "Great for trails, hydraulic brakes",
    },
    {
      _id: "p3",
      title: "Surfboard + wetsuit",
      seller_name: "Andrea",
      final_price: 30,
      currency: "€",
      image_url: ["/sample/surf1.jpg"],
      categories: ["Surf"],
      rating: 4.5,
      availability: "In Stock",
      coordinates: [45.47, 9.2],
      short_desc: "6'6 board, size small wetsuit",
    },
    // ... add more
  ];

  // Optional: you can read query params and filter sample accordingly
  res.status(200).json(sample);
}
