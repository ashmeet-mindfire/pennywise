import LoginRegisterDialog from "./LoginRegisterDialog";

const HomePage = () => {
  return (
    <div className="w-full font-['Poppins']">
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="mt-4 md:mt-0 md:w-1/2 ">
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-center md:text-left">
            Track your finances, simplify your life
          </h1>
          <p className="mt-4 text-xl text-gray-500 tracking-tight text-center md:text-left">
            Take control of your spending with <b>Pennywise</b>, our easy-to-use expense tracker app.
          </p>
        </div>
        <div className="md:w-1/2 md:min-w-[450px]">
          <img src="/images/pennywise-hero.jpg" />
        </div>
      </div>
      <div className="w-full mt-20">
        <h2 className="text-center text-5xl lg:text-6xl font-semibold tracking-tighter">Our Key Features</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center gap-4 mt-8">
          <div className="p-4 rounded-xl flex flex-col gap-4 bg-gray-50">
            <p className="text-xl  text-center font-semibold tracking-tighter">Intuitive Interface</p>
            <p className="text-center">Easily add, edit, and categorize expenses.</p>
          </div>
          <div className="p-4 rounded-xl flex flex-col gap-4 bg-gray-50">
            <p className="text-xl  text-center font-semibold tracking-tighter">Cloud Sync</p>
            <p className="text-center">Access your data from anywhere, anytime.</p>
          </div>
          <div className="p-4 rounded-xl flex flex-col gap-4 bg-gray-50">
            <p className="text-xl  text-center font-semibold tracking-tighter">Secure Storage</p>
            <p className="text-center">Keep your financial information safe and private.</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 flex justify-center pb-10">
        <div className="w-full md:w-[500px] rounded-lg p-5 bg-gray-50 flex flex-col gap-8 items-center">
          <p className="text-center text-5xl lg:text-6xl font-semibold tracking-tighter">Join Us Now!</p>
          <LoginRegisterDialog />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
