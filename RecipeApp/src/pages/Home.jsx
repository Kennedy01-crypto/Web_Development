import React, { useState } from "react";
import { Moon, SearchIcon } from "lucide-react";
const tags = ["All", "Breakfast", "Lunch", "Dinner"];

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
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Grilled Chicken",
    description:
      "Perfectly seasoned and juicy grilled chicken breast, ideal for a healthy meal.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
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

  return (
    <main className="min-h-screen relative bg-white flex flex-col">
      <div className="sticky bg-white top-0 right-0 flex items-center justify-between px-2 py-2 ">
        <h2 className="text-lg font-semibold mx-auto">Home</h2>
        <button className="absolute right-2 top-2">
          {/* Example moon icon for dark mode toggle */}
          <Moon />
        </button>
      </div>
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 flex items-center rounded-md mx-3 mt-2">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search recipes"
          className="bg-transparent focus:outline-none w-full text-sm"
        />
      </div>

      {/* Tags */}
      <div className="flex overflow-x-auto space-x-3 px-4 py-3 mt-1 scrollbar-hid scroll-barwidth-hide">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`flex-shrink-0 px-4 py-1 rounded-full text-sm font-semibold ${
              selectedTag === tag
                ? "bg-orange-500 text-white"
                : "bg-orange-200 text-orange-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured Recipes */}
      <section className="px-4 mt-4">
        <h2 className="text-lg font-bold mb-3">Featured Recipes</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {featuredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex-shrink-0 w-64 rounded-lg shadow-md bg-white border border-gray-200"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-md">{recipe.title}</h3>
                <p className="text-xs text-gray-500">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="px-4 mt-6 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Recently Viewed</h2>
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
