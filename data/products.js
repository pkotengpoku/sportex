export const Products = [
    {
      id: 1242,
      title: "Bici Trekking Elettrica",
      description:
        "Bici a pedalata assistita ideale per lunghe distanze su strade e sentieri anche con dislivello.",
      category: "Bici Elettriche",
      images: [
        "https://s.alicdn.com/@sc04/kf/H063e9acda9d74238b04dc63a6e48e6fdY.jpg?avif=close&webp=close",
        "https://s.alicdn.com/@sc04/kf/Hfdfbab32051b4806b6b90758e568d562w.png?avif=close&webp=close"
      ],
      variations: [
        {
          type: "Taglia",
          options: ["S", "M", "L", "XL"]
        }
      ],
      pricing: {
        daily: 17.8,
        oldDaily: 35.0,
        currency: "EUR",
        total: 89.0,
        duration: 5
      },
      availability: true,
      bookedDates: ["2025-09-01", "2025-09-05"], // 🆕
      perks: [
        "Cancellazione gratis fino a 24 ore prima del primo giorno di noleggio",
        "Ritiro gratis dalle 16 del giorno prima",
        "Riconsegna gratis entro le 14 del giorno successivo",
        "Copertura danni accidentali inclusa"
      ],
      seller: {
        id: "decathlon001",
        name: "Decathlon",
        rating: 4.7,
        reviews: 235,
        location: "Milano, Italia"
      }
    },
  
    // from here replicated & updated with bookedDates ⬇️
    {
      id: 2,
      title: "Tennis Racket Set",
      description: "Pair of professional-grade rackets with a set of 6 tennis balls.",
      category: "Tennis",
      condition: "Like New",
      dailyPrice: 8,
      deposit: 20,
      location: "New York, NY",
      available: true,
      images: [
        "https://m.media-amazon.com/images/I/71Cx-iPmgfL._AC_SL1300_.jpg",
        "https://m.media-amazon.com/images/I/71-VYnvDucL._SL1500_.jpg"
      ],
      bookedDates: ["2025-09-02", "2025-09-03"], // 🆕
      owner: {
        name: "Emily R.",
        rating: 5.0,
        reviewsCount: 9
      },
      features: ["2 rackets", "6 tennis balls", "Carrying case included"]
    },
    {
      id: 3,
      title: "Kayak (Single)",
      description: "Lightweight single kayak suitable for lakes and calm rivers.",
      category: "Water Sports",
      condition: "Used - Very Good",
      dailyPrice: 25,
      deposit: 80,
      location: "Seattle, WA",
      available: true,
      images: [
        "https://www.gallerysport.it/35765-medium_default/kayak-canoa-atlantis-cosmic-karp-pro-cm-396-2-gavoni-2-seggiolini-2-pagaie.jpg",
        "https://www.gallerysport.it/35766-medium_default/kayak-canoa-atlantis-cosmic-karp-pro-cm-396-2-gavoni-2-seggiolini-2-pagaie.jpg"
      ],
      bookedDates: ["2025-09-07"], // 🆕
      owner: {
        name: "Mike S.",
        rating: 4.6,
        reviewsCount: 20
      },
      features: ["Paddle included", "Life jacket provided"]
    },
    {
      id: 4,
      title: "Soccer Ball",
      description: "FIFA-approved match ball with excellent grip and durability.",
      category: "Soccer",
      condition: "New",
      dailyPrice: 5,
      deposit: 10,
      location: "Chicago, IL",
      available: true,
      images: [
        "https://images.daznservices.com/di/library/GOAL/24/40/adidas-brazuca-2014-world-cup-ball_1mcbhqg3ogjzh19on3d1u66wed.jpg",
        "https://contents.mediadecathlon.com/p2154018/83376fbe7a7049f4b1f009174575380a3fc18a50b9ca65866b6b8911ff25cfc5/kids-soccer-ball-size-4-first-kick-for-ages-9-to-12-years-red.jpg"
      ],
      bookedDates: [], // 🆕 available all days
      owner: {
        name: "Sophia L.",
        rating: 4.9,
        reviewsCount: 15
      },
      features: ["Size 5", "Synthetic leather"]
    },
    {
      id: 5,
      title: "Basketball Hoop (Portable)",
      description: "Adjustable portable basketball hoop with weighted base for stability.",
      category: "Basketball",
      condition: "Used - Good",
      dailyPrice: 12,
      deposit: 40,
      location: "Dallas, TX",
      available: false,
      images: [
        "https://s.alicdn.com/@sc04/kf/H92c4f070b7664d379f5ac37f2485564fh.jpg?avif=close&webp=close",
        "https://s.alicdn.com/@sc04/kf/Hbc7673e681d84725aadf063bcaed9d1fo.jpg?avif=close&webp=close"
      ],
      bookedDates: ["2025-09-10", "2025-09-11", "2025-09-12"], // 🆕
      owner: {
        name: "Chris M.",
        rating: 4.5,
        reviewsCount: 8
      },
      features: ["Adjustable height", "Portable base with wheels"]
    },
    {
      id: 6,
      title: "Snowboard",
      description: "High-performance snowboard suitable for beginners and advanced riders.",
      category: "Winter Sports",
      condition: "Used - Fair",
      dailyPrice: 18,
      deposit: 60,
      location: "Denver, CO",
      available: true,
      images: [
        "https://www.snowtrex.de/magazin/files/2022/09/RS16364_shutterstock_624095534-hsc-1536x1026.jpg",
        "https://www.snowtrex.de/magazin/files/2022/09/RS16364_shutterstock_624095534-hsc-1536x1026.jpg"
      ],
      bookedDates: ["2025-12-20", "2025-12-21"], // 🆕
      owner: {
        name: "Alex K.",
        rating: 4.7,
        reviewsCount: 14
      },
      features: ["Bindings included", "All-mountain design"]
    },
    {
      id: 7,
      title: "Boxing Gloves",
      description: "Pair of 16oz professional boxing gloves with wrist support.",
      category: "Boxing",
      condition: "Like New",
      dailyPrice: 6,
      deposit: 15,
      location: "Miami, FL",
      available: true,
      images: [
        "https://rdxsports.it/cdn/shop/files/DSC_0920_960x_crop_center.jpg?v=1722956592",
        "https://rdxsports.it/cdn/shop/files/DSC_1016_640x_crop_center.jpg?v=1722956592"
      ],
      bookedDates: ["2025-09-14"], // 🆕
      owner: {
        name: "Diana P.",
        rating: 5.0,
        reviewsCount: 11
      },
      features: ["16oz size", "Breathable mesh"]
    },
    {
      id: 8,
      title: "Surfboard",
      description: "7ft foam surfboard perfect for beginners and intermediate surfers.",
      category: "Surfing",
      condition: "Used - Very Good",
      dailyPrice: 22,
      deposit: 70,
      location: "Los Angeles, CA",
      available: true,
      images: [
        "https://kite-prod.b-cdn.net/18574-thickbox_default/f-one-mitu-pro-flex-2024-kite-surfboard.jpg",
        "https://kite-prod.b-cdn.net/28889-thickbox_default/airush-amp-team-carbon-v6-kite-surfboard.jpg"
      ],
      bookedDates: ["2025-08-28", "2025-08-29"], // 🆕
      owner: {
        name: "Brian T.",
        rating: 4.8,
        reviewsCount: 10
      },
      features: ["7ft long", "Leash included", "Beginner friendly"]
    },
    {
      id: 9,
      title: "Golf Club Set",
      description: "Complete set of right-handed golf clubs including irons, driver, and putter.",
      category: "Golf",
      condition: "Used - Good",
      dailyPrice: 20,
      deposit: 100,
      location: "Phoenix, AZ",
      available: false,
      images: [
        "https://th.bing.com/th/id/R.738bed934c18f8af010cdc5789b8d701?rik=1P56Vkcyq9tHRw&pid=ImgRaw&r=0",
        "https://www.nencinisport.it/images/width-def/background-def/format-def/end/articoli/wilson_dynapwr_irons_steel_rh_5_pw_regular_3420209_dettaglio_02_20250224154714.png"
      ],
      bookedDates: ["2025-09-18", "2025-09-19"], // 🆕
      owner: {
        name: "Laura W.",
        rating: 4.4,
        reviewsCount: 6
      },
      features: ["Driver, irons, wedges, putter", "Golf bag included"]
    },
    {
      id: 10,
      title: "Cricket Bat",
      description: "Professional-grade English willow bat suitable for matches and practice.",
      category: "Cricket",
      condition: "Like New",
      dailyPrice: 10,
      deposit: 30,
      location: "Houston, TX",
      available: true,
      images: [
        "https://i.ebayimg.com/images/g/UKoAAOSwN~loKFlX/s-l1600.webp",
        "https://i.ebayimg.com/images/g/xZ8AAeSwFXdoc9lo/s-l1600.webp"
      ],
      bookedDates: [], // 🆕 free all days
      owner: {
        name: "Ravi K.",
        rating: 4.9,
        reviewsCount: 7
      },
      features: ["English willow", "Grip handle"]
    }
  ];
  