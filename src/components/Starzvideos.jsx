import React from 'react'

const Starzvideos = ({finalstarzmovies}) => {
    return (

        <div className=' flex gap-4  w-[100vw] h-[50vh] scrollbar-hide overflow-auto'>
            {finalstarzmovies && finalstarzmovies.map((item, index) => (

                <>  <div key={index} className=' mr-4  ml-3 min-w-[15%] rounded-xl p-5'>



                    <img className=' hover:shadow-[8px_12px_3px_2px_rgba(255,255,0,.5)] hover:ring-2 hover:ring-yellow-500 hover:scale-100  w-[30vw] h-[37vh] rounded '

                        src={item?.title?.primaryImage?.imageUrl}
                        alt=""
                    />


                    <div className=' hover:text-black'>
                        <h1 className=' text-2xl font-semibold text-emerald-700 mt-2  '>
                            {item?.title?.titleText?.text}

                        </h1>
                    </div>
                    {/* <p className="text-black">Movie ID: {item.title.primaryImage.imageUrl}</p> */}


                </div>
                </>
            ))}
        </div>

    );

}

export default Starzvideos