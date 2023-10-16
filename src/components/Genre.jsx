const colors = ["bg-[#8769FF]", "bg-[#F36F45]", "bg-[#61D1EA]"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const Genre = ({ children }) => {
  const randomBackgroundColor = getRandomColor();
  return (
    <button className={`text-white ${randomBackgroundColor} max-w-max px-3 py-1 rounded-full hover:scale-105 duration-200 text-sm`}>
      {children}
    </button>
  );
};
