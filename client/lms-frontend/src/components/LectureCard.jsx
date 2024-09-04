import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LectureCard = ({ course }) => {
  const { thumbnail, title, category, createdBy } = course;
  const imageUrl = thumbnail?.secure_url || 'https://via.placeholder.com/150';
const navigate=useNavigate();
  return (
    <motion.div onClick={()=>navigate('/courses/description',{state:{...course}})}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex  items-center m-4 basis-1/4 "
    >
      <Card className="w-72 h-72 flex flex-col justify-between">
        <CardMedia
          component="img"
          alt={title}
          image={imageUrl}
          className="object-cover w-full h-40 md:h-1/2"
        />
        <CardContent className="flex-grow flex flex-col justify-between">
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructor: {createdBy}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LectureCard;
