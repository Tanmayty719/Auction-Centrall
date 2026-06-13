import { Link } from "react-router";
// import { AdsComponent } from "../components/AdsComponent";
import { useSelector } from "react-redux";

export const About = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-sm shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            About This Project
          </h1>
<h2>  Welcome to Auction Centrall.</h2>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            
            
              <p className="text-lg">This was my TY project for the year 2025-2026. This project is a comprehensive online auction system designed to facilitate seamless buying and selling of items through a user-friendly web interface. It incorporates features such as user authentication, real-time bidding, item listing, and profile management, all built using modern web technologies to provide an engaging and efficient auction experience.
            </p>

            {/* {!user && <AdsComponent dataAdSlot="1002244889" />} */}

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>User registration and authentication</li>
                <li>Real-time auction bidding</li>
                <li>Item listing and management</li>
                <li>User profile management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </section>
            <section>

              <div className="mt-4 p-4 bg-gray-50 rounded-sm">
                <p className="font-medium text-gray-900 mb-2">
                  Connect with the Developer:
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">GitHub Profile:</span>{" "}
                    <a
                      href="https://github.com/Tanmayty719"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      github.com/Tanmayty719
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Project Repository:</span>{" "}
                    <a
                      href="https://www.linkedin.com/in/tanmay-kamtekar-644996371/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      linkedin.com/in/Tanmay Kamtekar
                    </a>
                  </p>
                </div>
              </div>
            </section>

           
          </div>
        </div>
      </div>
    </div>
  );
};
