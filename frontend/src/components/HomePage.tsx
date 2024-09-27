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
            <p className="text-xl  text-center font-semibold tracking-tighter">Track Income & Expenses</p>
            <p className="text-center tracking-wide">
              Easily log all your transactions, whether they are income or expenses. Categorize each entry (e.g., groceries, rent,
              entertainment, salary) to keep everything organized. You can add notes for a detailed record of each transaction.
              With an intuitive interface, adding and reviewing entries is seamless, making financial tracking easier than ever.
            </p>
          </div>
          <div className="p-4 rounded-xl flex flex-col gap-4 bg-gray-50">
            <p className="text-xl  text-center font-semibold tracking-tighter">Monthly Summaries</p>
            <p className="text-center tracking-wide">
              Get a clear breakdown of your finances every month. View total income and expenses for each month, compare across
              different time periods, and spot trends in your spending habits. The monthly summary provides a high-level overview,
              helping you stay aware of your cash flow and adjust your spending as needed.
            </p>
          </div>
          <div className="p-4 rounded-xl flex flex-col gap-4 bg-gray-50">
            <p className="text-xl  text-center font-semibold tracking-tighter">Multi-Device Sync</p>
            <p className="text-center tracking-wide">
              Track your finances on the go! Whether you're at your desktop, tablet, or smartphone, your financial data is synced
              across all devices. No matter where you are, you can update your records, view transactions, and monitor your
              budget.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 flex justify-center pb-10">
        <div className="w-full md:w-[700px] rounded-lg p-5 bg-gray-50 flex flex-col gap-8 items-center">
          <p className="text-center text-5xl lg:text-6xl font-semibold tracking-tighter">
            Ready to Take Control of Your Finances?
          </p>
          <p className="text-center">
            Start managing your income, tracking your expenses, and reaching your financial goals with ease. ExpenseTrack
            simplifies your financial life, giving you the tools and insights you need to make smarter decisions.
          </p>
          <LoginRegisterDialog />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
