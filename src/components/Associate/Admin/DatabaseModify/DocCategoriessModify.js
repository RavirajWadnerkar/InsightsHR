import { useEffect, useState, } from "react";
import { Box, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,query,where
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";


const DocCategoriesModify = () => {
  const [allCategories, setAllCategories] = useState([]);
  //const [allCategories, setAllCategories] = useState();
  const [newCategoryName, setNewCategoryName] = useState('');
  const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "DocumentCategories"));
    const all = querySnapshot.docs.map((doc) => doc.data().name);
    console.log('all',all);
    setAllCategories(all);
  };
  useEffect(() => {
    const getCat = async () => {
      const data = await getAllCategories();
    };
    getCat();
    // getAllCategories();
  }, []);
  const handleAdd = async () => {
    var newCategory = {
      name: newCategoryName,
      // add other fields as necessary
    };

    // add new category to database
    const docRef = await addDoc(collection(db, "DocumentCategories"), newCategory);
    console.log("Document written with ID: ", docRef.id);

    // clear the input field
    setNewCategoryName('');

    // // fetch updated list of categories
    getAllCategories();
  };

  const handleDelete = async (categoryName) => {
    // // get reference to the document to delete
    // const docRef = doc(db, "DocumentCategories", categoryName);

    // // delete the document
    // await deleteDoc(docRef);

    // console.log(`Category ${categoryName} deleted`);
    const q = query(collection(db, "DocumentCategories"), where("name", "==", categoryName));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Category ${categoryName} deleted`);});

    // // fetch updated list of categories
    getAllCategories();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container direction="rows" justify="flex-start">
        <Grid item xs={6} lg={6}>
          <List component="nav">
            {allCategories && allCategories.map((Cat) => {
                return (
                  <ListItem key={Cat}>
                    <TextField
                      name={Cat}
                      sx={{ pr: 2, minWidth: 300 }}
                      size="small"
                      defaultValue={Cat}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => handleDelete(Cat)}
                    >
                      Delete
                    </Button>
                    {/* <ListItemButton>ss</ListItemButton> */}
                  </ListItem>
                );
              })}
            <ListItem key={"Add"}>
              <TextField
                name="Add"
                sx={{ pr: 2, minWidth: 300 }}
                size="small"
                defaultValue={""}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleAdd}
              >
                Add
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DocCategoriesModify;
