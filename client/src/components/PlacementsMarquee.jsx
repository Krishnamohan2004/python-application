import React from 'react';
import { motion } from 'framer-motion';

const placements = [
  { name: "Shankar", lpa: "40 LPA", img: "/placements/Shankar_oct_40_LPA_AWS.jpg" },
  { name: "Prudhvi Surya", lpa: "20 LPA", img: "/placements/Prudhvi_surya_18-5_20lpa_AWS.jpeg" },
  { name: "AWS DevOps", lpa: "9 LPA", img: "/placements/9LPA_AWS_DEVOPS_.jpg" },
  { name: "Madhu", lpa: "AWS Placed", img: "/placements/Madhu_AWS_NOV.jpg" },
  { name: "Asha", lpa: "AWS Placed", img: "/placements/Asha_june_AWS.jpeg" },
  { name: "Harsha Deep", lpa: "AWS Placed", img: "/placements/HARSHA_DEEP_3rd_week.jpeg" },
  { name: "Divya", lpa: "AWS Placed", img: "/placements/Divya_June.jpeg" },
  { name: "Sanjana", lpa: "AWS Placed", img: "/placements/Sanjana_25-5.jpeg" },
  { name: "Srinu", lpa: "AWS Placed", img: "/placements/Srinu.jpg" },
  { name: "Tarun", lpa: "AWS Placed", img: "/placements/Tarun_(3rd_week).jpeg" },
  { name: "Varun", lpa: "AWS Placed", img: "/placements/VARUN_3rd_week.jpeg" },
  { name: "Jyothi Ch", lpa: "AWS Placed", img: "/placements/Jyothi Ch.jpg" },
  { name: "Hanumanthu", lpa: "AWS Placed", img: "/placements/HANUMANTHU.jpeg" },
  { name: "K.Ram Mohan", lpa: "AWS Placed", img: "/placements/K.Ram Mohan.jpg" },
  { name: "Mahesh Akki", lpa: "AWS Placed", img: "/placements/Mahesh Akki.jpg" },
  { name: "Raviteja", lpa: "AWS Placed", img: "/placements/Raviteja.jpeg" },
  { name: "Sagar", lpa: "AWS Placed", img: "/placements/Sagar.jpeg" },
  { name: "Satwika", lpa: "AWS Placed", img: "/placements/Satwika.jpg" },
  { name: "Sreenath", lpa: "AWS Placed", img: "/placements/Sreenath.jpg" },
  { name: "AWS DevSecOps", lpa: "9 LPA", img: "/placements/AWS DevSecOps.jpeg" },
];

const PlacementsMarquee = () => {
  return (
    <div className="marquee-container">
      <motion.div 
        className="marquee-content"
        animate={{ x: [0, -2000] }}
        transition={{ 
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...placements, ...placements].map((item, idx) => (
          <div key={idx} className="placement-card">
            <img src={item.img} alt={item.name} />
            <div className="placement-info">
              <div className="placement-name">{item.name}</div>
              <div className="placement-lpa">{item.lpa}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlacementsMarquee;
