import FormLogged from "@/components/LoginPage/FormLogged";
import Logo from "@/components/ui/logo";

const LoginPage = () => {
  return (
    <div className="flex flex-col bg-white h-screen lg:grid lg:grid-cols-3">
      <div className="relative w-full flex items-center justify-center lg:col-span-2 lg:order-2">
        <Logo />
      </div>
      <div className="lg:bg-indigo-300 0 flex w-full h-full  items-center justify-center lg:col-span-1 lg:order-1">
        <FormLogged />
      </div>
    </div>
  );
};

export default LoginPage;
