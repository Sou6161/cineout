// import React, { useState } from 'react'

// const Dropdown = ({ title, options,func,func2} ) => {

//     const [category, setcategory] = useState("movie")
//     const [category2, setcategory2] = useState("tv")

//     const handleChange = (e) => {
//         const selectedOption = e.target.value;
//         if (selectedOption === 'tv') {
//         } else if (selectedOption === 'movie') {
//             func2={(e)=> setcategory2(e.target.value)};
//         }
//     }
//     return (
//         <div className='select'>
//             <select defaultValue="0" onChange={handleChange} name="format" id="format">
//                 <option value="0" disabled>
//                     {title}
//                 </option>
//                 {options.map((o, i) => (
//                     <option key={i} value={o}>
//                         {o.toLowerCase()}
//                     </option>
//                 ))}
//             </select>

//         </div>
//     )
// }

// export default Dropdown