import React from 'react';

// Reusing the same list from the original HTML to keep data consistent.
const placementData = [
  { img: '/placements/Shankar_oct_40_LPA_AWS.jpg', name: 'Shankar', lpa: '40 LPA' },
  { img: '/placements/Prudhvi_surya_18-5_20lpa_AWS.jpeg', name: 'Prudhvi Surya', lpa: '20 LPA' },
  { img: '/placements/9LPA_AWS_DEVOPS_.jpg', name: 'AWS DevOps', lpa: '9 LPA' },
  { img: '/placements/Madhu_AWS_NOV.jpg', name: 'Madhu', lpa: 'AWS Placed' },
  { img: '/placements/Asha_june_AWS.jpeg', name: 'Asha', lpa: 'AWS Placed' },
  { img: '/placements/HARSHA_DEEP_3rd_week.jpeg', name: 'Harsha Deep', lpa: 'AWS Placed' },
  { img: '/placements/Divya_June.jpeg', name: 'Divya', lpa: 'AWS Placed' },
  { img: '/placements/Sanjana_25-5.jpeg', name: 'Sanjana', lpa: 'AWS Placed' },
  { img: '/placements/Srinu.jpg', name: 'Srinu', lpa: 'AWS Placed' },
  { img: '/placements/Tarun_(3rd_week).jpeg', name: 'Tarun', lpa: 'AWS Placed' },
  { img: '/placements/VARUN_3rd_week.jpeg', name: 'Varun', lpa: 'AWS Placed' },
  { img: '/placements/Jyothi Ch.jpg', name: 'Jyothi Ch', lpa: 'AWS Placed' },
  { img: '/placements/HANUMANTHU.jpeg', name: 'Hanumanthu', lpa: 'AWS Placed' },
  { img: '/placements/K.Ram Mohan.jpg', name: 'K.Ram Mohan', lpa: 'AWS Placed' },
  { img: '/placements/Mahesh Akki.jpg', name: 'Mahesh Akki', lpa: 'AWS Placed' },
  { img: '/placements/Raviteja.jpeg', name: 'Raviteja', lpa: 'AWS Placed' },
  { img: '/placements/Sagar.jpeg', name: 'Sagar', lpa: 'AWS Placed' },
  { img: '/placements/Satwika.jpg', name: 'Satwika', lpa: 'AWS Placed' },
  { img: '/placements/Sreenath.jpg', name: 'Sreenath', lpa: 'AWS Placed' },
  { img: '/placements/AWS DevSecOps.jpeg', name: 'AWS DevSecOps', lpa: '9 LPA' },
  { img: '/placements/Placed_white_Posters - 2026-02-13T160439.227.jpg', name: 'Placed Student', lpa: 'AWS Placed' },
  { img: '/placements/Placed_white_Posters - 2026-03-02T151649.086.jpg', name: 'Placed Student', lpa: 'AWS Placed' },
  { img: '/placements/Placed_white_Posters - 2026-03-13T183322.253.jpg', name: 'Placed Student', lpa: 'AWS Placed' }
];

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {placementData.map((item, index) => (
          <div className="placement-card" key={`original-${index}`}>
            <img src={item.img} alt={item.name} />
            <div className="card-info">
              <div className="name">{item.name}</div>
              <div className="lpa">{item.lpa}</div>
            </div>
          </div>
        ))}
        {/* Duplicate list for seamless scrolling */}
        {placementData.map((item, index) => (
          <div className="placement-card" key={`duplicate-${index}`}>
            <img src={item.img} alt={item.name} />
            <div className="card-info">
              <div className="name">{item.name}</div>
              <div className="lpa">{item.lpa}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
