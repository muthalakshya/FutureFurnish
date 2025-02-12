import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
// import bgImage from "../assets/Logo.jpg"; // Add an amazing background image here

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center relative pt-24"
        style={{ backgroundImage: `url(https://cdn.ddecor.com/static/version1738578070/frontend/Ddecor/nextgen/en_US/images/design-consultation.jpg)` }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>
        <div className="relative  max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" className="text-white font-bold">
              Transform Your Home with Style ✨
            </Typography>
            <Typography variant="h6" className="text-white mt-3">
              Discover exclusive, high-quality home decor that makes every space unique.
            </Typography>
            <Button variant="contained" color="secondary" size="large" className="mt-5">
              Explore Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <Container maxWidth="lg" className="py-16 text-center">
        <Typography variant="h4" className="font-bold text-gray-800">
          Why Choose <span className="text-blue-600">Us?</span>
        </Typography>
        <Typography variant="body1" className="text-gray-600 max-w-3xl mx-auto py-6">
          We provide handpicked, stylish, and high-quality home decor items to enhance your living space.
        </Typography>

        <Grid container spacing={4} className="mt-10">
          {[
            { icon: <HomeIcon className="text-blue-500 text-5xl" />, title: "Exquisite Collection", desc: "Handpicked furniture and decor for every style." },
            { icon: <ShoppingCartIcon className="text-green-500 text-5xl" />, title: "Seamless Shopping", desc: "Easy checkout, secure payments, and fast delivery." },
            { icon: <StarIcon className="text-yellow-500 text-5xl" />, title: "Top Quality", desc: "Only the best materials and craftsmanship." },
            { icon: <PeopleIcon className="text-red-500 text-5xl" />, title: "24/7 Support", desc: "Our team is here to assist you anytime." },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Card className="hover:shadow-xl transition duration-300 ease-in-out">
                  <CardContent className="text-center">
                    {item.icon}
                    <Typography variant="h5" className="mt-4 font-semibold">{item.title}</Typography>
                    <Typography variant="body1" className="text-gray-600 mt-2">{item.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Customer Reviews */}
      <Container maxWidth="lg" className="py-24 bg-gray-100 text-center">
        <Typography variant="h4" className="font-bold text-gray-800">
          What Our <span className="text-blue-600">Customers Say</span> 💬
        </Typography>

        <Grid container spacing={4} className="pt-10">
          {[
            { name: "Emma Johnson", review: "Absolutely love their collection! My home feels so luxurious now.", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
            { name: "David Brown", review: "Great quality and fast delivery. Highly recommended!", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
            { name: "Sophia Miller", review: "The best decor pieces I’ve ever purchased!", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
          ].map((customer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card className="p-5 hover:shadow-xl transition duration-300">
                  <Avatar src={customer.avatar} alt={customer.name} className="mx-auto w-16 h-16" />
                  <Typography variant="h6" className="mt-3 font-semibold">{customer.name}</Typography>
                  <Typography variant="body2" className="text-gray-600 mt-2">{customer.review}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      {/* <div className="bg-blue-200 my-16 mx-auto text-center text-zinc-900 px-48 py-32">
        <Typography variant="h4" className="font-bold">
          Ready to Style Your Home? 🏡
        </Typography>
        <Typography variant="main" className="max-w-xl text-center  mx-auto my-12">
          Find the perfect decor to make your space truly unique. Start shopping now!
        </Typography>
        <Button variant="contained" color="secondary" size="large" className=" pt-24 mt-5">
          Shop Now
        </Button>
      </div> */}
    </>
  );
};

export default About;
