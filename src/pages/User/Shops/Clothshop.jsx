import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { Link } from "react-router-dom";

export default function ClothShop() {
  const { currentUser } = useSelector((state) => state.user);
  

  const [Form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  
  {/**const currentuserId = currentUser ? currentUser._id : null; */}
  console.log("arra", Form);
  const [formId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/cloth/CgetAll`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.getcloth);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, []);

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Form]);
    } else {
      // If there's a query, filter the data
      const filteredData = Form.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Form]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/cloth/deleteC/${formId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setform((prev) => prev.filter((formm) => formm._id !== formId));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center text-3xl  mt-4 text-[30px] pb-1 font-medium">
        <h1>Clothing Shops</h1>
      </div>
      <div className="flex items-center justify-center ml-8 mt-7">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-10 rounded-lg  border-none bg-slate-50"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      
      </div>

      

      <div>

        {/** {currentUser?.isInventManger && (
         
        )}*/}
        

<>
            
          </>



        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {filter && filter.length > 0 ? (
              <>
                {filter.map((formm) => (
                  <div
                    key={formm._id}
                    className="w-[400px] h-[520px]  mt-10 mb-2 rounded-xl border-none bg-white "
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-center ">
                        <img
                          className="object-cover rounded-full w-36 h-36"
                          src={formm.image}
                        />
                      </div>

                      <div className="h-64 mt-6 bg-white bg-opacity-50 border shadow-md  rounded-3xl">
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Name:</div>

                          <div className="font-extralight text-md mb-2 max-w-[200px] break-words">
                            {formm.name}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                            StallNumber:
                          </div>

                          <div className=" text-md mb-2 max-w-[100px] font-extralight break-words">
                            {formm.stallNumber}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                            FloorNumber:
                          </div>

                          <div className=" text-md mb-2 max-w-[100px] font-extralight break-words">
                            {formm.FloorNumber}
                          </div>
                        </div>

                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                            Description:
                          </div>

                          <div className="text-gray-700  text-sm mt-2   max-w-[200px] font-extralight break-words">
                            {formm.Des}
                          </div>
                        </div>
                        
                        <div className="flex justify-center items-center mt-20 text-blue-900  text-[18px]  pb-1 font-medium  ">
                        <Link  to={`/product/${formm._id}/cloth`}>
                            <button  className="hover:text-black" >View List</button>
                            </Link>
                        </div>
                        {currentUser?.isInventManger && (
                        <Link  to={`/createproduct/${formm._id}`}>
                            <button  className="w-10 h-5 mb-1 font-medium text-white rounded bg-gradient-to-r from-blue-500 to-blue-800 hover:opacity-90" >Add</button>
                            </Link>
                        )}
                      </div>

                      {/**  {currentUser?.isInventManger && (
                        
                      )} */}

                     

<>
{currentUser?.isInventManger && (
                          <div className="flex items-center justify-center gap-6 mt-6">
                            <Link
                              to={`/update-clothshope/${formm._id}`}
                              className="hidden px-8 py-1 font-medium text-blue-900 border cursor-pointer sm:inline hover:bg-gradient-to-r from-blue-500 to-blue-800 bg-opacity-90 hover:text-white rounded-xl"
                            >
                              Edit
                            </Link>
                            <div>
                              <span
                                onClick={() => {
                                  setformId(formm._id);
                                  handleDelete();
                                }}
                                className="hidden px-6 py-2 font-medium text-orange-700 border cursor-pointer sm:inline hover:bg-gradient-to-r from-orange-300 to-orange-500 hover:text-white bg-opacity-90 rounded-xl"
                              >
                                Delete
                              </span>
                            </div>
                            </div>
)}
                        </>
                    </div>
                  </div>
                ))}

                
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 mb-6">
        <span className="">
              <Link
                to={"/crateclothshop"}
                className="hidden py-3 font-medium border cursor-pointer sm:inline hover:bg-gradient-to-r from-orange-300 to-orange-500 hover:text-white text-slate-600 rounded-3xl"
              >
                <button className="w-[300px]">
                Add New Shop
                </button>
             
              </Link>
              <div></div>
            </span>

        </div>
        
      </div>
    </div>
  );
}



