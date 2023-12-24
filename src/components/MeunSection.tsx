import Image from 'next/image'
import React from 'react'


const pizzaCategories = [
    {
        id: 1,
        name: "Classic Pizzas",
        description: "Classic pizzas are the most popular type of pizza. They typically have a thin crust and are topped with a simple sauce, cheese, and pepperoni.",
        imageUrl: "https://img.freepik.com/free-photo/pizza-with-cheese-tomato-isolated-white-background-pizza-margarita-top-view-photo-menu_639032-301.jpg?w=740&t=st=1700865504~exp=1700866104~hmac=497f5a045f423042cfbed5861e0b50ac65350d4f4751c753337ed6210575062e"
      },{
        id: 3,
        name: "Vegetarian Pizzas",
        description: "Vegetarian pizzas are topped with a variety of vegetables, such as mushrooms, peppers, onions, and olives.",
        imageUrl: "https://www.pngitem.com/pimgs/b/248-2486809_transparent-vegetable-pizza-png-png-download.png"
      },{
        id: 3,
        name: "Meat Pizzas",
        description: "Vegetarian pizzas are topped with a variety of vegetables, such as mushrooms, peppers, onions, and olives.",
        imageUrl: "https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?size=626&ext=jpg&ga=GA1.1.278544148.1691352137&semt=ais"
      },{
        id: 3,
        name: "Chicken Pizzas",
        description: "Vegetarian pizzas are topped with a variety of vegetables, such as mushrooms, peppers, onions, and olives.",
        imageUrl: "https://img.freepik.com/free-photo/fresh-pizza-with-mushrooms-ham-cheese-white-background-copy-space-homemade-with-love-fast-delivery-recipe-menu-top-view_639032-297.jpg?w=740&t=st=1700865243~exp=1700865843~hmac=4dfae515a948c4e4f85b1d0cb2b6c0bfeb18a17d4d00e7fb0512c61e3fd87efa"
      },
]

const MenuSection = () => {
  return (
    <section className="py-20 h-screen  bg-[url(https://static.vecteezy.com/system/resources/previews/018/128/193/original/delicious-spinach-salad-with-fresh-png.png),_url(https://freepngimg.com/save/16876-salad-png-pic/551x800)]
    bg-[position:top_5rem_left_-15rem,_bottom_1rem_right_-12rem]
    md:bg-[position:top_5rem_left_-10rem,_bottom_1rem_right_-8rem] 
     bg-no-repeat
     bg-[length:368px_368px]
     ">

        <div className="container max-w-[1140px] ">
        <h3 className='text-center text-3xl font-semibold mb-4'>Check Out Meun</h3>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-5 gap-4'>
            {pizzaCategories.map((category,i)=> (
                <div key={i} className='flex flex-col justify-center items-center  text-center border border-neutral-100 shadow-md'>
                    <Image src={category.imageUrl} alt='category image' width={150} height={150} />
                    <div className='p-2'>
                        <h4 className='font-medium text-lg'>{category.name}</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, voluptatibus?</p>
                    </div>
                </div>
            ))}

        </div>
        </div>
     </section>
  )
}

export default MenuSection