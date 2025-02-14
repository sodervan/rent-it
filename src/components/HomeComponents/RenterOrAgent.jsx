import { motion } from "framer-motion";

const RenterOrAgent = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-center w-full bg-[#F4EBFF] py-12 mb-12"
      >
        <div className="flex items-center justify-center md:grid grid-cols-2 w-full max-w-screen-xxl px-6 sm:px-20 md:items-center md:justify-between gap-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-start my-10 max-w-md"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Are You a Renter or a Student?
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Find your perfect home with ease. Our platform offers you a
              seamless experience to search, compare, and secure your next
              apartment, all in one place. Explore verified listings and connect
              directly with landlords or agents.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button className="bg-[#7F56D9] px-6 py-3 rounded-lg text-white font-medium hover:bg-[#6E46C2] transition-all duration-300">
                Get started today!
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-end"
          >
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725089764/Pngtree_a_business_man_wearing_purple_15424326_1_uzoou5.png"
              alt="Business Man"
              className="max-w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
      {/*AGENT SECTION*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-center w-full bg-[#F4EBFF] py-12"
      >
        <div className="flex items-center justify-center md:grid grid-cols-2 w-full max-w-screen-xxl px-6 sm:px-20 md:items-center md:justify-between gap-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-start my-10 max-w-md"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Are You an Agent or Landlord?
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Spread the good news! Earn more by helping your friends and
              clients find an apartment they truly love. Refer and earn for each
              successful booking made on the platform.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button className="bg-[#7F56D9] px-6 py-3 rounded-lg text-white font-medium hover:bg-[#6E46C2] transition-all duration-300">
                Expand Your Reach
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-end"
          >
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725090751/Pexels_Photo_by_Ketut_Subiyanto_h5pma8.png"
              alt="Agent or Landlord"
              className="max-w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default RenterOrAgent;
