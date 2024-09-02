const List=()=>{
  return(
    <div>List</div>
  )
}
export default List




// //@ts-nocheck
// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { DeleteIcon, EditIcon } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { createClient } from "@/utils/supabase/client";

// const formSchema = z.object({
//   price: z.preprocess(
//     (val) => parseInt(val, 10),
//     z.number().min(0, {
//       message: "Price must be a non-negative number.",
//     })
//   ),
//   title: z.string().nonempty({
//     message: "Title is required.",
//   }),
// });

// const Home = () => {
//   const supabase = createClient();
//   const [formDataList, setFormDataList] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       price: "",
//       title: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       const newData = {
//         title: data.title,
//         price: data.price,
//       };

//       if (editingItem) {
//         const { error } = await supabase
//           .from("newform")
//           .update(newData)
//           .eq("id", editingItem.id);

//         if (error) {
//           throw error;
//         }

//         setEditingItem(null);
//       } else {
//         const { error } = await supabase.from("newform").insert([newData]);

//         if (error) {
//           throw error;
//         }
//       }

//       form.reset({
//         price: "",
//         title: "",
//       });

//       fetchFormDataList();
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//     }
//   };

//   const handleEdit = (item) => {
//     form.setValue("title", item.title);
//     form.setValue("price", item.price);
//     setEditingItem(item);
//   };

//   const handleDelete = async (item) => {
//     try {
//       const { error } = await supabase
//         .from("newform")
//         .delete()
//         .eq("id", item.id);

//       if (error) {
//         throw error;
//       }

//       fetchFormDataList();
//     } catch (error) {
//       console.error("Error deleting data:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchFormDataList();
//   }, []);

//   const fetchFormDataList = async () => {
//     try {
//       const { data, error } = await supabase.from("newform").select("*");

//       if (error) {
//         throw error;
//       }

//       if (data) {
//         setFormDataList(data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen gap-10">
//       <Card className="mt-8 ml-10 w-[600px] p-10">
//         <ul>
//           {formDataList.map((item) => (
//             <li
//               className="flex items-center justify-between my-5"
//               key={item.id}
//             >
//               <div className="flex-grow">
//                 <p className="font-semibold">{item.title}</p>
//                 <p className="text-gray-500">${item.price}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <Button
//                   onClick={() => handleEdit(item)}
//                   variant="outline"
//                   size="icon"
//                 >
//                   <EditIcon
//                     className="h-6 w-6 text-blue-400"
//                     aria-hidden="true"
//                   />
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(item)}
//                   variant="outline"
//                   size="icon"
//                 >
//                   <DeleteIcon
//                     className="h-6 w-6 text-red-400"
//                     aria-hidden="true"
//                   />
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </Card>

//       <Card className="w-[500px] p-10">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input type="text" placeholder="Title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <Input type="number" placeholder="Price" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit">{editingItem ? "Update" : "Submit"}</Button>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Home;

