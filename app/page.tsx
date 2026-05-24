import Image from "next/image";
import MyNavbar from "./component/navbar";
import Header from "./component/main";
import Footer from "./component/footer";

export default function Home() {
  return (
   <div className="bg-gray-800  min-h-screen  flex flex-col justify-between">
    <MyNavbar />
    <Header />
    <Footer />
   </div>
  );
}
