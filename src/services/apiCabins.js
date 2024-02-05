import supabase, { supabaseUrl } from "./supabase";

//! Get Cabins
const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not get loaded");
  }

  return data;
};

//! Create Cabin
const createNewCabin = async (newCabin) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin could not be created"
    );
  }

  return data;
};


// //! Edit Cabin
// const editCabin = async (id, newCabin) => {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Update cabin
//   let { data, error } = await supabase
//     .from("cabins")
//     .update({ ...newCabin, image: imagePath })
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be updated");
//   }

//   // 2. Upload image if it's a new image
//   if (!hasImagePath) {
//     const { error: storageError } = await supabase.storage
//       .from("cabin-images")
//       .upload(imageName, newCabin.image);

//     if (storageError) {
//       console.error(storageError);
//       throw new Error("Cabin image could not be uploaded");
//     }
//   }

//   return data;
// };

//! Delete Cabin
const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
};

export { getCabins, deleteCabin, createNewCabin };
