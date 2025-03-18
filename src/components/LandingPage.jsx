import React from "react";
import Navbar from "./Navbar";

function LandingPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-grow flex flex-col items-center justify-center text-center p-4 ">
       

        {/* Content (Text) */}
        <h1 className="sm:text-3xl md:text-4xl font-bold text-gray-900  ">
          Welcome to Expense Tracker
        </h1>
        <p className="text-2xl">💰 "Track Every Penny, Grow Your Wealth!"</p>
      </main>
    </div>
  );
}

export default LandingPage;
