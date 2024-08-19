'use client'
import { Box, Typography, Button, Modal, TextField, IconButton } from "@mui/material";
import { Stack } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const [Pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // State for search term

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'Pantry'), (snapshot) => {
      const pantryItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPantry(pantryItems);
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (newItem.trim() !== '' && quantity.trim() !== '') {
      try {
        await setDoc(doc(firestore, 'Pantry', newItem.trim()), {
          name: newItem.trim(),
          quantity: parseInt(quantity, 10),
        });
        setNewItem('');
        setQuantity('');
        setOpen(false);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Pantry', id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleIncrementQuantity = async (id, currentQuantity) => {
    try {
      await updateDoc(doc(firestore, 'Pantry', id), {
        quantity: currentQuantity + 1
      });
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrementQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        await updateDoc(doc(firestore, 'Pantry', id), {
          quantity: currentQuantity - 1
        });
      } catch (error) {
        console.error('Error decrementing quantity:', error);
      }
    } else {
      handleRemoveItem(id); // If quantity drops to 0, remove the item
    }
  };

  // Filter the pantry items based on the search term
  const filteredPantry = Pantry.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#f0f2f5"
      padding="16px"
    >
      {/* Header Box */}
      <Box
        width="600px"
        height="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#673ab7"
        borderRadius="12px"
        boxShadow="0px 6px 16px rgba(0, 0, 0, 0.2)"
        mb={4}
      >
        <Typography
          variant="h4"
          color="#ffffff"
          fontWeight="bold"
        >
          Pantry Items
        </Typography>
      </Box>

      {/* Search Field */}
      <Box width="600px" mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </Box>

      {/* Add Button */}
      <Box
        width="600px"
        display="flex"
        justifyContent="flex-start"
        mb={2}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Box>

      {/* Modal for Adding New Item */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-item-modal"
        aria-describedby="modal-for-adding-new-item"
      >
        <Box
          width="400px"
          p={4}
          bgcolor="#ffffff"
          borderRadius="12px"
          boxShadow="0px 6px 16px rgba(0, 0, 0, 0.2)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mx="auto"
          my="20%"
        >
          <Typography id="add-item-modal" variant="h6" mb={2} color="#333">
            Add New Pantry Item
          </Typography>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            mb={2}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            mb={2}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            fullWidth
          >
            Add to Pantry
          </Button>
        </Box>
      </Modal>

      {/* Stack of Food Items */}
      <Stack
        width="600px"
        spacing={2}
        overflow="auto"
        padding="16px"
        bgcolor="#ffffff"
        borderRadius="12px"
        boxShadow="0px 6px 16px rgba(0, 0, 0, 0.2)"
      >
        {filteredPantry.map((item) => (
          <Box
            key={item.id}
            width="100%"
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#e1bee7"
            borderRadius="8px"
            boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
            padding="0 16px"
          >
            <Typography
              variant="body1"
              color="#333"
              fontWeight="medium"
              textAlign="center"
            >
              {item?.name ? (
                item.name.charAt(0).toUpperCase() + item.name.slice(1)
              ) : (
                "Unnamed Item"
              )}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleDecrementQuantity(item.id, item.quantity)}>
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body2"
                color="#333"
                fontWeight="medium"
                mx={2}
              >
                {item?.quantity ?? "N/A"}
              </Typography>
              <IconButton onClick={() => handleIncrementQuantity(item.id, item.quantity)}>
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton onClick={() => handleRemoveItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
