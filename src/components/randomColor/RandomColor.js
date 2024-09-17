import React from "react";
const RandomColor = () => {
  // const [randomColor, setRandomColor] = React.useState();
  // React.useEffect(() => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   setRandomColor(color);
  // }, []);
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // setRandomColor(color);
  return color;
};

export default RandomColor;
// const RandomColor = () => {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// };

// export default RandomColor;
