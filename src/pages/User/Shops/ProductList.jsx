import { connectStorageEmulator } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { Link, useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function ProductList() {
 const { currentUser } = useSelector((state) => state.user); 
  

  const [Form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log("Form",Form)
  
  {/**const currentuserId = currentUser ? currentUser._id : null; */}
 
  const [formId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  const { productId,shoptype} = useParams();





  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/product/getproduct/${productId}`);
        const data = await res.json();
        console.log("DATA",data);

        if (res.ok) {
          setform(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, [productId])

  

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Form]);
    } else {
      // If there's a query, filter the data
      const filteredData = Form.filter(
        (formm) =>
          formm.title && formm.title.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Form]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/product/deleteC/${formId}`, {
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



  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = [];
    
    // Prepare table data from your component's state or props
    filter.forEach((formm) => {
      tableData.push([
        formm.title,
        formm.quntity,
        formm.price,
        formm.desc
        // Add more fields as needed
      ]);
    });
  
    // Set up the table headers
    const headers = ['Title', 'Quantity', 'Price', 'Description'];
    
    // Add the table to the PDF document
    doc.autoTable({ head: [headers], body: tableData });

   
  
    // Save the PDF document
    doc.save('product_report.pdf');
  };
  

  return (
    <div>
      <div className="flex justify-center items-center text-3xl text-gray-700  mt-4 text-[30px] pb-1 font-medium">
        <h1 className="text-gray-600">Product</h1>
        

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
                    className="w-[400px] h-[520px] mt-10 mb-[-120px] rounded-xl border-none bg-white "
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-center ">
                        <img
                          className="object-cover w-56 rounded-full h-36"
                          src={formm.image}
                        />
                      </div>

                      <div className="mt-6 bg-white bg-opacity-50 border shadow-md rounded-3xl h-44">
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Title:</div>

                          <div className="font-extralight text-md mb-2 max-w-[200px] break-words">
                            {formm.title}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                            Quntity:
                          </div>

                          <div className=" text-md mb-2 max-w-[100px] font-extralight break-words">
                            {formm.quntity}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                            Price:
                          </div>

                          <div className=" text-md mb-2 max-w-[100px] font-extralight break-words">
                            ${formm.price}
                          </div>
                        </div>

                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">
                          Dsescription:
                          </div>

                          <div className=" text-md mb-2 max-w-[200px] font-extralight break-words">
                            {formm.desc}
                          </div>
                        </div>

                       

                        
                      </div>

                      {/**  {currentUser?.isInventManger && (
                        
                      )} */}

                     

<>
{currentUser?.isInventManger && (
                          <div className="flex items-center justify-center gap-6 mt-6">
                            <Link
                              to={`/updateproduct/${formm._id}`}
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
                            <Link
                            to={`/admin/promotion-add/${formm._id}/${productId}/${shoptype}`}
                            className="hidden px-8 py-1 font-medium text-blue-500 border cursor-pointer sm:inline hover:bg-gradient-to-r from-blue-500 to-blue-800 bg-opacity-90 hover:text-white rounded-xl"
                          >
                            Promotion
                          </Link>
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
        <div className="flex items-center justify-center mt-20 mb-5">
      <button className="w-48 h-10 mb-3 font-medium text-white bg-blue-600 rounded-full text-md hover:bg-opacity-90 whitespace-nowrap" onClick={generatePDF}>Generate PDF Report</button>
      </div>
      </div>
     
    </div>
  );
}



