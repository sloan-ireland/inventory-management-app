import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/material";

const foodItems = [
  'spagetti',
  'tomato sauce',
  'meatballs',
  'cheese',
  'garlic bread'  
]

export default function Home() {
  return <Box
    width="100vw"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"  
  >
  
  <Stack
    width = "800px"
    height= "200px"
    spacing = {2}
    overflow={'auto'}>
    {foodItems.map((item) => (
      <Box
        key = {item}
        width = "100%"
        height = "300px"
        display = "flex"
        justifyContent = "center"
        alignItems = "center"
        //make it a fun color
        bgcolor={'#f0f0f0'}
      >
        <Typography
          //set variant to h4, color to 333 and bold and center the text. captizlie first word of each item
          variant="h4"
          color={'#333'}
          fontWeight={'bold'}
          textAlign={'center'}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Typography>
      </Box>
    ))}
  </Stack>
  
  
  </Box>


}
