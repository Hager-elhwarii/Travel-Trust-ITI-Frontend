const TopDestinationCard = ({ governorate, url ,tours }) => {
  return (
    <>
      <div
        className="group relative overflow-hidden bg-cover bg-center rounded-md w-full xl:w-1/2  hover:w-full  duration-500 p-4 transition-all h-96 cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(rgba(0.4, 0.4, 0.4, 0.4), rgba(0.4,0.4,0.4,0.4)),url(${url})`,

        }}
      >
        <div className="absolute inset-0 group-hover:bg-black/30 duration-500 transition-all"></div>
        <div className="z-10 flex w-full h-full translate-y-8 flex-col items-center justify-center space-y-0 transition-transform group-hover:-translate-y-32">
        <h1 className="h-full w-full text-[40px] text-white font-medium flex justify-center items-end transition-all duration-500 font-header mb-2">
            {governorate}
          </h1>
            <span className="border-b border-2 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:w-1/2 group-hover:border-secondary-yellow group-hover:delay-100 space-y-4"></span>
            <h2 className="text-2xl text-white font-header font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:delay-100">
              {tours}
            </h2>
         
        </div>
       
      </div>
    </>
  );
};
export default TopDestinationCard;
