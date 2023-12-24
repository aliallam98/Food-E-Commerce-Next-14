import React from "react";
import { Trash2 } from "lucide-react";
import { getAllCategories } from "@/libs/actions";
import { initialCategory } from "@/lib/redux/categorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";



interface IProps {
  id: string;
}

const DeleteCategoryButton = ({ id }: IProps) => {
  const dispatch = useDispatch()
  const handleDeleteClick = async (id: string) => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });
      const results = await res.json();
      if(results.success){
        resolve(results.message)
        getAllCategories().then(result=>dispatch(initialCategory(result.results)))
      }else{
        reject()
      }
    });
    toast.promise(promise,{
      loading: 'Deleting...',
      success: 'Category deleted successfully',
      error: 'Something went wrong'
    })
  };
  return (
    <button onClick={() => handleDeleteClick(id)}>
      <Trash2 />
    </button>
  );
};

export default DeleteCategoryButton;
