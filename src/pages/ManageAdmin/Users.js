import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDButton from "components/MDButton";
import MultiDropdown from "pages/Component/dropdown/MultiDropdown";
import { useMaterialUIController } from "context";

const fakeData = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    site: ["California", "Nevada"],
    status: "Enable",
  },
  {
    id: "2",
    firstName: "Fakhir",
    lastName: "Farooqi",
    email: "photon@lts.com",
    site: ["Nevada", "California"],
    status: "Disable",
  },
  {
    id: "3",
    firstName: "Sumit",
    lastName: "Verma",
    email: "sumit@gmail.com",
    site: ["Kentucky", "California"],
    status: "Enable",
  },
];

const usStates = [
  { label: "California", value: "California" },
  { label: "Nevada", value: "Nevada" },
  { label: "Kentucky", value: "Kentucky" },
];

const Users = () => {
  const [controller, dispatch, authMenu] = useMaterialUIController();

  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  const [users, setUsers] = useState(fakeData);
  // const [editIndex, setEditIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", site: [] });
  console.log(
    "users",
    users,
    "editindex",
    editIndex,
    "validationErrors",
    validationErrors,
    "newuser",
    newUser
  );
  const handleEdit = (index) => {
    console.log(index, "IndexHandleedit");
    setEditIndex(index);
    setValidationErrors({});
  };

  const handleSave = (index) => {
    const newValidationErrors = validateUser(users[index]);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setEditIndex(null);
    setValidationErrors({});
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    }
  };

  // const handleChange = (index, field, value) => {
  //   const updatedUsers = [...users];
  //   updatedUsers[index] = {
  //     ...updatedUsers[index],
  //     [field]: value,
  //   };
  //   setUsers(updatedUsers);
  // };
  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];
    console.log("handlefunc", index, field, value);
    // if (field == "site") {
    //   // let value = event.target.value;
    //   // Assuming value is the array of selected sites

    //   updatedUsers[index] = {
    //     ...updatedUsers[index],
    //     site:
    //       fakeData.length === fakeData.find((site) => site.email === currentUser.email).site.length
    //         ? []
    //         : fakeData.find((site) => site.email === currentUser.email).site.map((block) => block),
    //   };
    // value["all"]
    //       ? updatedUsers[index].site.length ===
    //         fakeData.find((site) => site.email === currentUser.email).site.length
    //       : []
    //       ? [...value]
    //       : null,
    if (field === "site") {
      if (value[value.length - 1] === "all") {
        updatedUsers[index] = {
          ...updatedUsers[index],
          site:
            updatedUsers[index].site.length ===
            fakeData.find((site) => site.email === currentUser.email).site.length
              ? []
              : fakeData
                  .find((site) => site.email === currentUser.email)
                  .site.map((block) => block),
        };
      } else {
        updatedUsers[index] = {
          ...updatedUsers[index],
          site: [...value],
        };
      }
    } else {
      updatedUsers[index] = {
        ...updatedUsers[index],
        [field]: value,
      };
      console.log("handleElse");
    }

    setUsers(updatedUsers);
  };
  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

    setCurrentUser(fakeData.find((element) => element.email === storedUser.email));
    // console.log(currentUser, "Email");
  }, []);

  // const handleCreateUser = () => {
  //   const newValidationErrors = validateUser(newUser);
  //   console.log();
  //   if (Object.values(newValidationErrors).some((error) => error)) {
  //     setValidationErrors(newValidationErrors);
  //     return;
  //   }
  //   setUsers([...users, { ...newUser, id: (users.length + 1).toString() }]);
  //   setNewUser({ firstName: "", lastName: "", email: "", state: "" });
  //   setValidationErrors({});
  // };
  const handleCreateUser = () => {
    // const newValidationErrors = validateUser(newUser);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }

    // Generate a new user ID
    // const newUserId = (parseInt(users[users.length - 1].id) + 1).toString();

    const newUserId = (users.length + 1).toString();
    setUsers([{ ...newUser, id: newUserId }, ...users]);

    setNewUser({ firstName: "", lastName: "", email: "", state: "" });
    setEditIndex(users.length - users.length);
    // setUsers([...users, { ...newUser, id: (users.length + 1).toString() }]);

    // setValidationErrors({});
  };

  return (
    <Box>
      <MDButton
        startIcon={<AddIcon />}
        variant="contained"
        color={sidenavColor}
        onClick={handleCreateUser}
        sx={{ marginBottom: 2 }}
      >
        <span color="white">Create New User</span>
      </MDButton>
      <TableContainer component={Paper}>
        <Table>
          {/* <TableHead> */}
          <TableRow
            style={{
              background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
              color: "white",
            }}
          >
            <TableCell>Id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Sites</TableCell>
            <TableCell>Status</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
          {/* </TableHead> */}
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={user.firstName}
                      onChange={(e) => handleChange(index, "firstName", e.target.value)}
                      error={!!validationErrors.firstName}
                      helperText={validationErrors.firstName}
                    />
                  ) : (
                    user.firstName
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={user.lastName}
                      onChange={(e) => handleChange(index, "lastName", e.target.value)}
                      error={!!validationErrors.lastName}
                      helperText={validationErrors.lastName}
                    />
                  ) : (
                    user.lastName
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={user.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                      error={!!validationErrors.email}
                      helperText={validationErrors.email}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <MultiDropdown
                      // value={user.site}
                      // onChange={(e) => handleChange(index, "site", e.target.value)}
                      // onChange={(e) => handleChange(index, "site", e.target.value)}
                      error={!!validationErrors.site}
                      handleChange={(e) => handleChange(index, "site", e.target.value)}
                      helperText={validationErrors.site}
                      //help
                      // label={"Block"}
                      items={
                        fakeData.find((usr) => usr.email === currentUser.email)
                          ? fakeData
                              .find((usr) => usr.email === currentUser.email)
                              .site.map((block) => block)
                          : []
                      }
                      // handleChange={handleBlocksChange}
                      selectedItems={user.site}
                    />
                  ) : (
                    user.site.length
                  )}
                </TableCell>
                <TableCell>{user.status}</TableCell>

                <TableCell>
                  {editIndex === index ? (
                    <>
                      <Button onClick={() => handleSave(index)}>Save</Button>
                      <Button onClick={() => setEditIndex(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const validateRequired = (value) => !!value.length;
console.log(validateRequired, "ValiddateRequired");
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName) ? "First Name is Required" : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    site: !validateRequired(user.site) ? "Atleast One site select" : "",
  };
}

export default Users;
