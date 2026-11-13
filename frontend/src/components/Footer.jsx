import React from 'react';

const Footer = () => {
  return (
    <div>
      
    <footer className="bg-blue-900 text-white mt-10">
      <div className="w-full px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* About */}
          <div>
            <h2 className="text-2xl font-black font-serif mb-3">
              Stampora
            </h2>
            <p className="text-sm text-blue-100 leading-6">
              Your trusted online destination for customized rubber stamps.
              Design your own stamp or upload your design and get it delivered
              to your doorstep.
            </p>
            <img src="/icons/white-stampora.png" alt="logo" width="200px" height="80px" />
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Contact Us
            </h2>

            <p className="text-sm text-blue-100 leading-6">
              Stampora Pvt. Ltd.<br />
              25, MG Road,<br />
              Bengaluru, Karnataka - 560001
            </p>

            <p className="text-sm text-blue-100 mt-2">
              📞 +91 98765 43210
            </p>

            <p className="text-sm text-blue-100">
              ✉️ support@stampora.example
            </p>
          </div>

          {/* Website */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Visit Stampora
            </h2>

            <p className="text-sm text-blue-100 mb-3">
              Order your customized rubber stamp from the comfort of your home.
            </p>

            <p className="text-teal-200 font-semibold">
              www.stampora.example
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 mt-8 pt-5 text-center">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Stampora. All Rights Reserved.
          </p>

          <p className="text-xs text-blue-300 mt-1">
            This is a demo website created for educational purposes.
          </p>
        </div>

      </div>
    </footer>
    </div>
  );
}

export default Footer;




