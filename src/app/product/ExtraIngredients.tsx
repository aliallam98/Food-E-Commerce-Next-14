import React, { useState } from 'react'
import { Trash2,Pencil } from "lucide-react";
import toast from 'react-hot-toast';

interface Ingredient {
    title: string;
    price: number;
}
const ExtraIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [price, setPrice] = useState<number|null>(null);
    const [itemToEdit, setItemToEdit] = useState<Ingredient | null>(null);


    
const handleSubmit = (e: React.MouseEvent) => {
    try {
      if (!selectedIngredient || !price) {
        return toast.error("Please select a Ingredient and enter a price.")
      }
      // Validate price input
      if (isNaN(price) || price <= 0) {
        return toast.error("Please enter a valid price.");
      }


        let isIngredientExist = false
        ingredients.map((item)=> {
            selectedIngredient === item.title ? isIngredientExist = true : ''
        })
        console.log(isIngredientExist);
        if(isIngredientExist) return toast.error("This Size Is Already Added")
      
      const newItem = { title: selectedIngredient, price: price };
      if (itemToEdit) {
        // Editing existing item
        setIngredients((prevItems:Ingredient[]) =>
          prevItems.map((item) => (item === itemToEdit ? newItem : item))
        );
      } else {
        // Adding new item
        setIngredients((prevItems) => [...prevItems, newItem]);
      }
  
      setSelectedIngredient("");
      setPrice(null);
      // setItemToEdit(null); // Reset editing state
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleIngredientChange = (e: any) => {
    setSelectedIngredient(e.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     // @ts-ignore
    setPrice(event.target.value)
  };

  const handleDelete = (itemToDelete:Ingredient) => {
    setIngredients((prevItems) => prevItems.filter((item) => item !== itemToDelete));
  };

  const handleEdit = (itemToEdit:Ingredient) => {
    setSelectedIngredient(itemToEdit?.title);
    setPrice(itemToEdit.price);
    setItemToEdit(itemToEdit);
  };

  return (
    <div>
    <div className="flex items-center gap-4">
      <div className="relative w-1/2">
          <label className="absolute left-6 -top-3 bg-white border-x-4 border-white">
            Ingredients
          </label>
            <select
              className="p-2  block w-full border rounded-md focus-visible:outline-none shadow-none text-base"
              onChange={handleIngredientChange}
              placeholder="Select A Ingredient"
              value={selectedIngredient}
            >
              <option value="" disabled >
                Select a Ingredient
              </option>
              <option value="cheese">Cheese</option>
              <option value="sausage">Sausage</option>
            </select>
      </div>
      <div className="relative w-1/2">
          <label className="absolute left-6 -top-3 bg-white border-x-4 border-white">
            Price
          </label>
            <input
            value={price || ''}
            onChange={handlePriceChange}
              className="p-2 border border-neutral-200 focus:outline-none text-base rounded-md"
            />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="block  bg-primary rounded-lg text-secondary py-2 px-4 "
      >
        Add
      </button>
    </div>
    <div>
      {ingredients.length > 0 && (
        <ul className="mt-2">
          {ingredients.map((item, i) => (
            <li key={i}
            className="flex justify-between p-2 border border-neutral-200 max-w-sm mx-auto text-lg"
            >
              <span>Extra: {item.title} - Price: ${item.price}</span>
              <div className="flex items-center gap-2">
              <button onClick={() => handleDelete(item)}><Trash2/></button>
              <button onClick={() => handleEdit(item)}><Pencil/></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
}

export default ExtraIngredients