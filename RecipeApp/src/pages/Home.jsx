import React, { useState, useEffect } from "react";
import { Moon, SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
const tags = ["All", "Breakfast", "Snack", "Dessert", "Lunch", "Dinner"];

const featuredRecipes = [
  {
    id: 1,
    title: "Creamy Tomato Pasta",
    description: "Quick and easy pasta dish with a rich, creamy tomato sauce.",
    image:
      "https://www.foodandwine.com/thmb/dR9xRORMB7GqdUFGhgKx0uUgyq0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-creamy-tomato-rigatoni-hero-3069b1600c0641828a7269f676e12bd8.jpg",
  },
  {
    id: 2,
    title: "Fresh Summer Salad",
    description:
      "A light and refreshing salad with seasonal vegetables and a zesty vinaigrette.",
    image:
      "https://www.missallieskitchen.com/wp-content/uploads/2019/08/Late-Summer-Salad-1392x780.jpg",
  },
  {
    id: 3,
    title: "Grilled Chicken",
    description:
      "Perfectly seasoned and juicy grilled chicken breast, ideal for a healthy meal.",
    image:
      "https://www.seriouseats.com/thmb/Xg3PF38VgjCJ84927mLRBorlMoU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-the-best-barbecue-chicken-recipe-hero-updated-9cb214fe8fe8438992e049f8be51a708.jpg",
  },
  {
    id: 4,
    title: "Vegetable Stir-Fry",
    description:
      "A colorful mix of crisp vegetables stir-fried in a savory soy-ginger sauce.",
    image:
      "https://mccormick.widen.net/content/zfgopgfgrz/original/vegetable_and_chicken_stir_fry2000x1125.jpg",
  },
  {
    id: 5,
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies, warm and gooey.",
    image:
      "https://img.taste.com.au/FH2xb58L/taste/2010/01/choc-chip-cookies-image1-197537-1.jpg",
  },
  {
    id: 6,
    title: "Classic Beef Burger",
    description: "A juicy beef patty with fresh toppings on a toasted bun.",
    image:
      "https://searafoodsme.com/wp-content/uploads/2022/04/Beef-Burger1080x720px.jpg",
  },
];

const recentlyViewed = [
  {
    id: 1,
    category: "Breakfast",
    title: "Avocado Toast with Egg",
    description:
      "Whole wheat toast topped with mashed avocado and a perfectly cooked egg.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    category: "Lunch",
    title: "Chicken Caesar Salad",
    description:
      "Classic Caesar salad with grilled chicken, romaine lettuce, and croutons.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQR4rV4nHKf6MMfbvY9HZuaLjkMeYyIuY10A&s",
  },
  {
    id: 3,
    category: "Dinner",
    title: "Salmon with Roasted Vegetables",
    description:
      "Baked salmon fillet with a side of roasted broccoli, carrots, and bell peppers.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    category: "Dessert",
    title: "Chocolate Lava Cake",
    description:
      "Rich chocolate cake with a molten center, served with vanilla ice cream.",
    image:
      "https://www.foodnetwork.com/content/dam/images/food/fullset/2014/2/19/1/WU0701H_Molten-Chocolate-Cakes_s4x3.jpg",
  },
  {
    id: 5,
    category: "Snack",
    title: "Greek Yogurt Parfait",
    description: "Layers of Greek yogurt, granola, and fresh berries.",
    image:
      "https://tealnotes.com/wp-content/uploads/2023/05/Greek-Yogurt-Parfait-1.jpg",
  },
  {
    id: 6,
    category: "Breakfast",
    title: "Berry Smoothie Bowl",
    description:
      "Thick smoothie bowl topped with various fresh berries, chia seeds, and coconut flakes.",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2018/06/Berry-Smoothie-Bowl_EXPS_JMZ18_224489_B03_08_5b.jpg",
  },
  {
    id: 7,
    category: "Lunch",
    title: "Quinoa Salad with Feta",
    description:
      "Light and refreshing quinoa salad with cucumber, tomatoes, red onion, and crumbled feta cheese.",
    image:
      "https://www.merchant-gourmet.com/cdn/shop/articles/d261a7ee1c277e7b283f4010095e76b3.jpg?v=1636991876",
  },
  {
    id: 8,
    category: "Dinner",
    title: "Spicy Shrimp Pasta",
    description:
      "Pasta tossed with succulent shrimp in a spicy tomato and garlic sauce.",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2025/04/Spicy-Shrimp-Penne-Pasta_EXPS_TOHD25_180629_ChristineMa_2.jpg",
  },
  {
    id: 9,
    category: "Dessert",
    title: "Apple Crumble with Custard",
    description:
      "Warm baked apples topped with a crunchy oat crumble, served with creamy custard.",
    image:
      "https://www.spicemountain.co.uk/wp-content/uploads/2019/10/apple-and-blackberry-crumble-recipes.jpg",
  },
  {
    id: 10,
    category: "Snack",
    title: "Hummus and Veggie Sticks",
    description:
      "Creamy hummus served with a variety of fresh carrot, cucumber, and bell pepper sticks.",
    image:
      "https://www.mondaycampaigns.org/wp-content/uploads/2021/04/hummus-02.jpg",
  },
  {
    id: 11,
    category: "Breakfast",
    title: "Pancakes with Maple Syrup",
    description:
      "Fluffy pancakes stacked high and drizzled with rich maple syrup.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST81DnYKDpG-bUgB6KsImwIZgHJeaeEJxsZw&s",
  },
  {
    id: 12,
    category: "Lunch",
    title: "Vegetable Stir-Fry",
    description:
      "Assorted fresh vegetables stir-fried in a savory sauce, served over rice.",
    image:
      "https://mccormick.widen.net/content/zfgopgfgrz/original/vegetable_and_chicken_stir_fry2000x1125.jpg",
  },
  {
    id: 13,
    category: "Dinner",
    title: "Beef Tacos",
    description:
      "Seasoned ground beef served in warm tortillas with your favorite toppings.",
    image:
      "https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg",
  },
];

export const Home = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  // State for the current active recipe index
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const AUTO_SLIDE_INTERVAL = 4000; // 4 second
  // Define the animation variants for the individual recipe cards
  // These will be used for both the mobile carousel and the large screen slideshow
  const cardVariants = {
    // For mobile (when multiple are visible)
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    hover: { scale: 1.02, transition: { duration: 0.2 } },

    // For large screen slideshow transitions
    enter: { opacity: 0, x: 200 }, // Starts off-screen right
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    }, // Slides to center
    exit: {
      opacity: 0,
      x: -200,
      transition: { duration: 0.6, ease: "easeInOut" },
    }, // Slides off-screen left
  };

  // Define the container variants for staggered animation (optional, but nice)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Each child animates with a 0.1s delay
      },
    },
  };

  const carouselContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Effect for auto-advancing the recipe on larger screens
  useEffect(() => {
    // Check if it's a large screen (e.g., using Tailwind's 'lg' breakpoint value or similar logic)
    // For simplicity, let's assume a breakpoint around 768px (md:hidden and lg:block)
    // You might want to use a more robust way to detect large screens, e.g., useMediaQuery hook
    const isLargeScreen = window.innerWidth >= 768; // Or whatever your md breakpoint is

    let intervalId;
    if (isLargeScreen) {
      intervalId = setInterval(() => {
        setCurrentRecipeIndex(
          (prevIndex) => (prevIndex + 1) % featuredRecipes.length
        );
      }, 3000); // Change recipe every 3 seconds (adjust as needed)
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [featuredRecipes.length]); // Re-run if recipe list changes

  // Effect for auto-sliding the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredRecipes.length);
    }, AUTO_SLIDE_INTERVAL);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [featuredRecipes.length]);

  return (
    <main className="min-h-screen relative bg-white flex flex-col">
      {/* Header with Title and Dark Mode Toggle: not visible on md screens */}
      <div className="sticky md:hidden bg-white top-0 right-0 flex items-center justify-between px-2 py-2 ">
        <h2 className="text-lg font-semibold mx-auto">Home</h2>
        <button className="absolute right-2 top-2">
          {/* Example moon icon for dark mode toggle */}
          <Moon />
        </button>
      </div>
      {/* Search Bar for mobiles; not visible on md*/}
      <div className="p-4 md:opacity-0 bg-gray-100 flex items-center rounded-md mx-3 mt-2">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search recipes"
          className="bg-transparent focus:outline-none w-full text-sm"
        />
      </div>

      {/* Featured Recipes */}
      <section className="relative px-4 mt-2 md:mt-5 md:h-150 ">
        {" "}
        <h2 className="text-lg md:opacity-0 static md:text-4xl font-bold mb-3 md:mb-4 md:absolute md:top-0  md:z-20">
          Featured Recipes
        </h2>
        {/* Mobile View: Horizontal Scrollable Carousel */}
        <motion.div
          className="flex space-x-4 overflow-x-auto  no-scrollbar pb-2 md:hidden"
          variants={carouselContainerVariants}
          initial="hidden"
          animate="show"
        >
          {featuredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              className="flex-shrink-0 w-64 md:w-3/4 md:h-auto rounded-lg shadow-md bg-white border border-gray-200"
              variants={cardVariants} // Apply the individual card variants
              whileHover="hover" // Apply the hover animation state
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-36 md:h-auto object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-md">{recipe.title}</h3>
                <p className="text-xs text-gray-500">{recipe.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Large Screen View: Auto-Advancing Single Recipe */}
        <div className="hidden md:block w-full max-w-full h-full mx-auto no-scrollbar overflow-hidden relative">
          {" "}
          {/* Optional: Navigation Dots/Indicators */}
          <div className="absolute top-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {featuredRecipes.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentIndex === index
                    ? "bg-orange-600 opacity-100"
                    : "bg-gray-900 opacity-70"
                } transition-colors duration-200`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
          {/* hidden on small, block on md+ */}
          <AnimatePresence mode="wait">
            {" "}
            {/* Ensures only one child is mounted at a time */}
            {featuredRecipes.length > 0 && (
              <motion.div
                key={featuredRecipes[currentRecipeIndex].id} // Key is crucial for AnimatePresence
                className="relative rounded-lg shadow-md h-full bg-white "
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover="hover"
              >
                <img
                  src={featuredRecipes[currentRecipeIndex].image}
                  alt={featuredRecipes[currentRecipeIndex].title}
                  className="w-full h-full object-cover rounded-t-lg " // Adjust height for large screens
                />
                <div
                  className="p-4 absolute bottom-0 left-0 right-0 bg-opacity-30  rounded-b-lg"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%)", // Black gradient, opaque at bottom, transparent at top
                    backdropFilter: "blur(1px)", // Adjust blur intensity as needed (e.g., 5px, 10px)
                    WebkitBackdropFilter: "blur(8px)", // For Safari compatibility
                  }}
                >
                  {" "}
                  {/* Increased padding for large screens */}
                  <h3 className="font-bold  text-white text-6xl mb-1">
                    {featuredRecipes[currentRecipeIndex].title}
                  </h3>
                  <p className="text-3xl font-semibold text-orange-600">
                    {featuredRecipes[currentRecipeIndex].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* Tags */}
      <div className="flex overflow-x-auto space-x-3 px-4 py-3 mt-1 md:mt-3 no-scrollbar scroll-barwidth-hide">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`flex-shrink-0 px-4 py-1 rounded-full text-sm md:text-md font-semibold ${
              selectedTag === tag
                ? "bg-orange-500 text-white"
                : "bg-orange-200 text-orange-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Recently Viewed */}
      <section className="px-4 mt-6 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg md:text-3xl font-bold">Recently Viewed</h2>
          <button className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
            All Recipes
          </button>
        </div>

        {recentlyViewed.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-4 space-x-3 border-b border-gray-200 pb-3"
          >
            <div>
              <p className="text-xs text-orange-500 font-semibold">
                {item.category}
              </p>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.description}</p>
              <button className="mt-1 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded">
                View Details
              </button>
            </div>
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
};
