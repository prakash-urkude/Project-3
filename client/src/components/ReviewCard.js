import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export default function ReviewCard({
    
    name,
    rating,
    review
}) {
  return (
    <Card sx={{ width: '100%', backgroundColor: '#f1ee8e' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Rating 
          value={rating}
          readOnly
          sx={{ color: 'gold' }}
          name="read-only" />
           <Typography variant="body2" color="text.secondary">
          {review}
        </Typography>
      </CardContent>
    </Card>
  );
}


// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Rating from '@mui/material/Rating';

// export default function ReviewCard({
//     id,
//     name,
//     rating,
//     review
// }) {
//   return (
//     <Card sx={{ top: "5%", maxWidth: '20%' ,width: "10vw",
//     height: "30vh", backgroundColor: '#f1ee8e'  }}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {review}
//         </Typography>
//         <Rating 
//           value={rating}
//           readOnly
//           sx={{ color: 'gold' }}
//           name="read-only" />
//       </CardContent>
//     </Card>
//   );
// }
