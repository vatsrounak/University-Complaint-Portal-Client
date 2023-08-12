import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLocationPin } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="">
      {/* Header */}
      <header className="py-4 px-8 z-40 flex justify-between items-center sticky top-0 bg-white shadoẁ">
        <div className="flex items-center">
          <Image src="/logo.png" alt="NIT Patna Logo" width={50} height={50} />
          <h1 className="text-2xl text-red-600 font-bold ml-4">NIT Patna | राष्ट्रीय प्रौद्योगिकी संस्थान पटना</h1>
        </div>
        <p className="text-sm text-left text-gray-600 hidden sm:block">An Institute of National Importance under Ministry of Education <br />  (Shiksha Mantralaya), Government of India</p>
      </header>


      {/* Main Hero Section */}
      <section className="hero w-full h-screen bg-cover relative bg-opacity-50" style={{ backgroundImage: 'url(/bgimage.jpeg)' }}>
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="hero-content flex flex-col justify-center items-center h-full text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-5">Complaint Reporting Portal</h2>
          <p className="text-white text-xl p-10">
            Welcome to the Complaint Reporting Dashboard of NIT Patna! This platform is designed to provide a convenient way for students, faculty, and staff to report any issues, concerns, or complaints they may have.
            We strive to create a safe and productive environment for everyone within our institution, and your feedback is important to us.
          </p>
          <Link href="/auth">
            <button className="btn text-white rounded bg-red-500 p-4 btn-primary mt-4">Raise a Complaint</button>
          </Link>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="testimonial-section py-10">
        <h1 className='text-center text-5xl mb-7 font-bold'>Testimonials</h1>
        <div className="max-w-3xl mx-auto">
          <div className="testimonial-card bg-white p-6 rounded shadow-md">
            <div className="flex items-center mb-4">
              <div className="testimonial-img-box w-16 h-16 bg-cover overflow-hidden rounded-full">
                <img src="/pf2.jpeg" alt="User 1" className="testimonial-img w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold">Ranveer</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                </div>
              </div>
            </div>
            <p className="text-gray-800">"I am extremely satisfied with the prompt resolution of network connectivity issues and hardware failures by the IT department at our college. Their expertise and efficient troubleshooting skills were evident in quickly diagnosing and resolving problems related to motherboard and graphics card failures. Their dedication and technical proficiency ensured minimal disruption to our work and studies. I appreciate their professionalism and commend them for their exceptional service. I highly recommend the IT department for their reliable support and expertise in handling such complex issues."</p>
          </div>

          <div className="testimonial-card bg-white p-6 rounded shadow-md mt-6">
            <div className="flex items-center mb-4">
              <div className="testimonial-img-box w-16 h-16 overflow-hidden rounded-full">
                <img src="/pf1.jpeg" alt="User 2" className="testimonial-img w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold">Punam Mishra</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                </div>
              </div>
            </div>
            <p className="text-gray-800">"Dealing with printing errors, misalignment, and network printer connection problems used to be a frustrating ordeal until we sought help from the College of IT Sector. Their expertise and prompt assistance resolved our printing woes efficiently. They tackled the error messages, corrected misaligned prints, and successfully established a stable network connection for our printers. Their knowledgeable team provided invaluable guidance, ensuring smooth printing operations. We are grateful for their exceptional service and highly recommend the College of IT Sector for any computer and printer-related issues."</p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer p-5 bg-red-800 text-white py-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="footer-column">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p>National Institute of Technology Patna<br />Patna, Bihar (800005), India</p>
            <p>Phone: +91-0612-237 1715 / 237 2715</p>
            <p>FAX : +91-0612-2670631 , 0612-2660480</p>
            <p>Official Website: <a href="https://www.nitp.ac.in" target="_blank" rel="noopener noreferrer" className="text-red-400">https://www.nitp.ac.in/</a></p>
          </div>
          <div className="footer-column">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-3 mt-4 social-links">
              <Link href="http://www.facebook.com/nitpatnaofficial">
                <FaFacebookF />
              </Link>
              <Link href="https://twitter.com/NITPatna1">
                <FaTwitter />
              </Link>
              <Link href="https://www.linkedin.com/school/national-institute-of-technology-patna/">
                <FaLinkedinIn />
              </Link>
              <Link href="https://goo.gl/maps/srZ6whpfDGqg85sp6">
                <FaLocationPin />
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom-section bg-gray-200 py-4 mt-10">
          <div className="max-w-4xl p-2 mx-auto flex justify-between items-center">
            <div className="bottom-column">
              <p className="text-black">&copy; 2023 | NIT Patna</p>
            </div>
            <div className="bottom-column">
              <p className="text-black">Website by <a href="">Campus Careline</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
