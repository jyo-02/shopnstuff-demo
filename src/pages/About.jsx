import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        We believe that shopping should be a delightful experience. Our mission is to provide a curated selection of high-quality products that cater to your needs and lifestyle. Whether you're looking for the latest fashion trends, home essentials, or unique gifts, we have something special just for you.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Started as a small venture fueled by a passion for bringing unique products to customers. Over the years, we have grown into a trusted online retailer, serving thousands of satisfied customers.
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          We pride ourselves on our exceptional customer service and our commitment to quality. Our values include quality assurance, customer satisfaction, and continuous innovation.
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          We operate under the necessary licenses and permits required to conduct e-commerce, ensuring a safe and compliant shopping experience for our customers.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Licensing</h2>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        Our business is fully licensed and compliant with local and federal regulations. We hold all necessary permits to operate as an online retailer, providing you with confidence and peace of mind while shopping with us.
      </p>

      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        We respect your privacy. We are committed to protecting any personal information you share with us. Your information is used solely for order processing, customer service, and marketing purposes (with your consent).
      </p>

      <p className="mb-3 text-gray-500 dark:text-gray-400">
        We implement robust security measures to protect your data from unauthorized access or disclosure. Our website uses cookies to enhance your shopping experience, and you can manage your cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        If you have any questions, comments, or concerns, please don't hesitate to reach out:
      </p>
      <p className="mb-3 text-gray-500 dark:text-gray-400"><strong>Email</strong>: dummysupportwhatswrongwithyou@jyo.com</p>
      <p className="mb-3 text-gray-500 dark:text-gray-400"><strong>Phone</strong>: 1-800-555-HA-HA </p>
      <p className="mb-3 text-gray-500 dark:text-gray-400"><strong>Address</strong>: 123 Funnyside Lane, Laugh Town, LOL 12345</p>

      <p className="mb-3 text-gray-500 dark:text-gray-400">
        We appreciate your business and look forward to serving you. Happy shopping!
      </p>
    </div>
  );
};

export default About;
