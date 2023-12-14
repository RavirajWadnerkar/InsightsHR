import { useContext,useState,useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";
import { db } from "../../../../utils/firebase"; // import your Firebase instance
import { collection, addDoc,getDocs,query, deleteDoc,where } from "firebase/firestore";
import { officesContext } from "../../../../utils/context/contexts";

const OfficesModify = () => {
  const { allOffices } = useContext(officesContext);
  const [newOfficeName, setNewOfficeName] = useState('');
  const [allOffice, setAllOffices] = useState([]);

  const getAllOffices = async () => {
    const querySnapshot = await getDocs(collection(db, "Offices"));
    const all = querySnapshot.docs.map((doc) => doc.data().name);
    console.log('all',all);
    setAllOffices(all);
  };

  useEffect(() => {
    const getOff = async () => {
      const data = await getAllOffices();
    };
    getOff();
  }, []);

  const handleAdd = async () => {
    var newOffice = {
      name: newOfficeName,
      // add other fields as necessary
    };

    // add new office to database
    const docRef = await addDoc(collection(db, "Offices"), newOffice);
    console.log("Document written with ID: ", docRef.id);

    // clear the input field
    setNewOfficeName('');
    getAllOffices();
  };

  // const handleDelete = async (officeName) => {
  //   // get reference to the document to delete
  //   const docRef = doc(db, "Offices", officeName);

  //   // delete the document
  //   await deleteDoc(docRef);

  //   console.log(`Office ${officeName} deleted`);
  // };

  const handleDelete = async (officeName) => {
    const q = query(collection(db, "Offices"), where("name", "==", officeName));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Office ${officeName} deleted`);});
    getAllOffices();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container direction="rows" justify="flex-start">
        <Grid item xs={6} lg={6}>
          <List component="nav">
            {allOffice.map((Office) => {
              return (
                <ListItem key={Office}>
                  <TextField
                    name={Office}
                    sx={{ pr: 2, minWidth: 300 }}
                    size="small"
                    defaultValue={Office}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(Office)}
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
                value={newOfficeName}
                onChange={(e) => {
                  setNewOfficeName(e.target.value)
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
export default OfficesModify;
