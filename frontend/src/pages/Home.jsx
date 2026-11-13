import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
    <header className="min-w-screen w-full h-auto z-500">
      <Navbar />
    </header>
    <main min-h-screen w-full flex flex-col>
    <div>
      <div className="rounded-lg mt-30 m-10 p-4 w-90%  h-auto ">
      <img src="/icons/workflow.png" alt="How we Work" width="100%" height="auto"></img>
    </div>
    <div className=" rounded-lg shadow-lg m-12 p-4 w-90%  h-auto bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 font-serif">
      <h1 className="text-bold text-3xl lg:text-6xl text-blue-900 text-center p-8">About stampora </h1>
      <p className="text-normal text-lg lg:text-xl text-blue-900 text-center p-8" >
        Stampora is a convenient online platform for ordering 
        customized rubber stamps from the comfort of your home or office.
         Create your own stamp design using our customization options or 
         simply upload your ready-made design. We carefully transform your
          design into a high-quality rubber stamp while maintaining the details and
           appearance of your original artwork. From professional office stamps and 
           date stamps to personalized seals and specialty stamps, Stampora offers a
            variety of options to meet your needs. With custom designs, premium-quality stamps, 
            easy online ordering, and doorstep delivery, Stampora makes the entire stamp-ordering 
            process simple, convenient, and hassle-free. </p>
    </div>
    <div className="rounded-lg m-10 p-4 w-90%  h-auto">
      <img src="/icons/image.png" alt="Free shipping, custom designs, doorstep delivery" width="100%" height="auto"></img>
    </div>
    </div>
    </main>
    <Footer />
    </>
  );
}

export default Home;
