// import React from 'react';
// import {Image1} from '../../../assets/howitworks/img-1.jpg'
// import {Image2} from '../../../assets/howitworks/img-2.jpg'
// import {Image3} from '../../../assets/howitworks/img-3.jpg'
// const stepsData = [
//   {
//     number: '01',
//     title: 'Create An Account',
//     description1: "Create an account as a service provider and start offering your services to a wide audience. On your dashboard, you'll be able to showcase your expertise, manage appointments, and connect with potential clients.",
//     description2: "Simply provide your name, email address, and create a strong password to get started. You'll also get access to tools for tracking your work, setting availability, and receiving payments.",
//     imageUrl: Image1,
//     imageAlt: 'A person creating an account on a large mobile screen',
//     layout: 'imageRight' // This will place the image on the right
//   },
//   {
//     number: '02',
//     title: 'Post An Ad',
//     description1: 'Promote your services and reach new clients by posting on our platform. Start by providing a clear and engaging title that describes your service. Include a detailed description, specifying what you offer, your experience, and any unique skills or certifications. Choose the right category to make it easier for clients to find your service.',
//     description2: 'We sure to add your contact information so clients can easily get in touch with you. Posting your service is fast and straightforward, helping you expand your client base effortlessly!',
//     imageUrl: Image2,
//     imageAlt: 'A person posting an advertisement on a social media style interface',
//     layout: 'imageLeft' // This will place the image on the left
//   },
//   {
//     number: '03',
//     title: 'Start Earning',
//     description1: "Take control of your financial future by starting to earn with our platform. Whether you're a seasoned professional or just starting, our platform connects you with a steady stream of clients who need your skills. Manage your schedule with ease and accept jobs that fit your expertise and availability.",
//     description2: 'Start earning today, expand your client base, and watch your income grow as you take on exciting new opportunities.',
//     imageUrl: Image3,
//     imageAlt: 'A person checking their earnings on a mobile phone',
//     layout: 'imageRight' // Image on the right
//   }
// ];
// const HowItWorks = () => {
//     return (
        
//         <div className="min-h-screen bg-white text-gray-800 py-12 md:py-24">
//       <div className="container mx-auto max-w-6xl px-4">
        
//         {/* We map over the stepsData array to render each step */}
//         {stepsData.map((step) => (
//           <div
//             key={step.number}
//             className={`
//               flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16
//               ${step.layout === 'imageLeft' ? 'md:flex-row-reverse' : ''}
//               mb-16 md:mb-24 last:mb-0
//             `}
//           >
//             {/* Text Content */}
//             <div className="md:w-1/2 lg:w-5/12 text-center md:text-left">
//               <div className="flex justify-center md:justify-start">
//                 <span className="
//                   flex items-center justify-center 
//                   w-12 h-12 rounded-full 
//                   bg-pink-100 text-pink-600 
//                   font-bold text-xl mb-4"
//                 >
//                   {step.number}
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 {step.title}
//               </h2>
//               <p className="text-gray-600 mb-4">
//                 {step.description1}
//               </p>
//               <p className="text-gray-600">
//                 {step.description2}
//               </p>
//             </div>
            
//             {/* Image Content */}
//             <div className="md:w-1/2 lg:w-6/12">
//               <img 
//                 src={step.imageUrl} 
//                 alt={step.imageAlt} 
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     );
// };

// export default HowItWorks;



import React from 'react';
import Image from 'next/image'; // 1. Import the Next.js Image component

// 2. Import your static images
import Image1 from '../../../assets/howitworks/img-1.jpg';
import Image2 from '../../../assets/howitworks/img-2.jpg';
import Image3 from '../../../assets/howitworks/img-3.jpg';

// 3. Fix the 'imageUrl' assignments (no extra curly braces)
const stepsData = [
  {
    number: '01',
    title: 'Create An Account',
    description1: "Create an account as a service provider and start offering your services to a wide audience. On your dashboard, you'll be able to showcase your expertise, manage appointments, and connect with potential clients.",
    description2: "Simply provide your name, email address, and create a strong password to get started. You'll also get access to tools for tracking your work, setting availability, and receiving payments.",
    imageUrl: Image1, // <-- Corrected
    imageAlt: 'A person creating an account on a large mobile screen',
    layout: 'imageRight'
  },
  {
    number: '02',
    title: 'Post An Ad',
    description1: 'Promote your services and reach new clients by posting on our platform. Start by providing a clear and engaging title that describes your service. Include a detailed description, specifying what you offer, your experience, and any unique skills or certifications. Choose the right category to make it easier for clients to find your service.',
    description2: 'We sure to add your contact information so clients can easily get in touch with you. Posting your service is fast and straightforward, helping you expand your client base effortlessly!',
    imageUrl: Image2, // <-- Corrected
    imageAlt: 'A person posting an advertisement on a social media style interface',
    layout: 'imageLeft'
  },
  {
    number: '03',
    title: 'Start Earning',
    description1: "Take control of your financial future by starting to earn with our platform. Whether you're a seasoned professional or just starting, our platform connects you with a steady stream of clients who need your skills. Manage your schedule with ease and accept jobs that fit your expertise and availability.",
    description2: 'Start earning today, expand your client base, and watch your income grow as you take on exciting new opportunities.',
    imageUrl: Image3, // <-- Corrected
    imageAlt: 'A person checking their earnings on a mobile phone',
    layout: 'imageRight'
  }
];

const HowItWorks = () => {
    return (
        
      <div className="min-h-screen bg-white text-gray-800 py-12 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
        
          {stepsData.map((step) => (
            <div
              key={step.number}
              className={`
                flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16
                ${step.layout === 'imageLeft' ? 'md:flex-row-reverse' : ''}
                mb-16 md:mb-24 last:mb-0
              `}
            >
              {/* Text Content */}
              <div className="md:w-1/2 lg:w-5/12 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                  <span className="
                    flex items-center justify-center 
                    w-12 h-12 rounded-full 
                    bg-pink-100 text-pink-600 
                    font-bold text-xl mb-4"
                  >
                    {step.number}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {step.description1}
                </p>
                <p className="text-gray-600">
                  {step.description2}
                </p>
              </div>
              
              {/* Image Content */}
              <div className="md:w-1/2 lg:w-6/12">
                {/* 4. Use the <Image> component */}
                <Image 
                  src={step.imageUrl} 
                  alt={step.imageAlt} 
                  className="w-full h-auto rounded-lg"
                  placeholder="blur" // Optional: adds a nice blur-up effect
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default HowItWorks;