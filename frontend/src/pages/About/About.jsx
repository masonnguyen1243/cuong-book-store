import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="h-screen">About</div>;
};
export default About;
