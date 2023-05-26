import Icon from "../../utils/icons";

const CategoryIcon = ({title}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-6 border-[1.6px] border-gray-300  xl:px-40 py-4 mt-12 rounded-md hover:-translate-y-2 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div>
        <Icon name={title}/>
        </div>
         <div className="font-inter text-[24px] md:text-[30px] lg:text-4xl">
            <p>{title}</p>
         </div>
      </div>
    </>
  );
};
export default CategoryIcon;