// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { useState } from 'react';
// import { Button, Modal } from '@mui/material';
// import BackIcon from '@mui/icons-material/ArrowBack';
// import { FileUpload } from '../Firebase/FileUpload';

// export const ImageUploadModal = props => {
//   const { open, setOpen } = props;
//   const handleClose = () => setOpen(false);

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//   };

//   const [value, setValue] = useState('1');
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       keepMounted
//     >
//       <Box sx={style}>
//         <TabContext value={value}>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <TabList onChange={handleChange} aria-label="lab API tabs example">
//               <Tab label="Upload Image" value="1" />
//             </TabList>
//           </Box>
//           <TabPanel value="1">
//             <FileUpload endpoint={'users/setimage'} />
//           </TabPanel>
//         </TabContext>
//         <Button
//           color="error"
//           variant="outlined"
//           size="large"
//           startIcon={<BackIcon />}
//           onClick={handleClose}
//         >
//           Cancel
//         </Button>
//       </Box>
//     </Modal>
//   );
// };
