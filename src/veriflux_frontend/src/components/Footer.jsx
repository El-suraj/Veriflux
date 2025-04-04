import * as React from "react";

const Footer = () => {

    return (
        <footer className="bg-gray-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p  className="text-sm">
                    &copy, {new Date().getFullYear()} Veriflux. All rights reserved.
                </p>
            </div>
            </footer>
    );

};

export default Footer;