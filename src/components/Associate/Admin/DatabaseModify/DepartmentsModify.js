import { useContext,useState,useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";
import { db } from "../../../../utils/firebase"; // import your Firebase instance
import { collection, addDoc,deleteDoc,getDocs,query,where} from "firebase/firestore"; 
import { departmentsContext } from "../../../../utils/context/contexts";
import { set } from "lodash";


const DepartmentsModify = () => {
  const {allDepartments} = useContext(departmentsContext);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [allDepartment, setAllDepartment] = useState([]);

  const getAllDepartment = async () => {
    const querySnapshot = await getDocs(collection(db, "Departments"));
    const all = querySnapshot.docs.map((doc) => doc.data().name);
    console.log('all',all);
    setAllDepartment(all);
  };

  useEffect(() => {
    const getCat = async () => {
      const data = await getAllDepartment();
    };
    getCat();
    // getAllCategories();
  }, []);
 
  const handleAdd = async () => {
    var newDepartment = {
      name: newDepartmentName,
      // add other fields as necessary
    };

    // add new department to database
    const docRef = await addDoc(collection(db, "Departments"), newDepartment);
    console.log("Document written with ID: ", docRef.id);
    // clear the input field
    setNewDepartmentName('');
    getAllDepartment();
  };

 
  const handleDelete = async (departmentName) => {
    const q = query(collection(db, "Departments"), where("name", "==", departmentName));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Department ${departmentName} deleted`);});
    getAllDepartment();
  };


  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container direction="rows" justify="flex-start">
        <Grid item xs={6} lg={6}>
          <List component="nav">
            {allDepartment.map((Dep) => {
              return (
                <ListItem key={Dep}>
                  <TextField
                    name={Dep}
                    sx={{ pr: 2, minWidth: 300 }}
                    size="small"
                    defaultValue={Dep}
                    onChange={(e)=>console.log(e.target.value)}
                  />
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(Dep)}
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
                value={newDepartmentName}
                onChange={(e) => {
                  setNewDepartmentName(e.target.value)
                  // console.log(e.target.value);
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
export default DepartmentsModify;
