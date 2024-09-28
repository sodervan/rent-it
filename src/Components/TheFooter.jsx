import { Footer } from "flowbite-react";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsYoutube} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
const theFooter = () => {
  return (
    <Footer container className="bg-black">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="#"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="RentIT"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="company" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">About Us</Footer.Link>
                <Footer.Link href="#">Contact</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Instagram</Footer.Link>
                <Footer.Link href="#">Facebook</Footer.Link>
                <Footer.Link href="#">Twitter(x)</Footer.Link>
                <Footer.Link href="#">Youtube</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="resources" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Sign Up</Footer.Link>
                <Footer.Link href="#">Login</Footer.Link>
                <Footer.Link href="#">FAQ</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="RentIT. All Rights Reserved" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsYoutube} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default theFooter;
