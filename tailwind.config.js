
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    screens: {
            xs:{max:"500px"} ,
            xmd:{max:"767px"} ,
            sm:{min:"640px"} ,
            md:{min:"768px"} ,
            lg:{min:"992px"} ,


          },
   
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};
