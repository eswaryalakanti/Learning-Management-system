import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";



function CourseDescription() {
    
    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, auth_data } = useSelector((states) =>  states.auth);
 console.log("hiii",auth_data,state);
 const data=auth_data;
 
    console.log(role);
 
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
   
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                    <Link onClick={() => navigate(-1)} className="absolute top-8 text-2xl pb-1  link text-accent cursor-pointer">
                        <AiOutlineArrowLeft className="text-3xl"/>
                    </Link>
                        <img 
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p className="font-semibold">
                                    <span className="font-bold text-yellow-500">Total Lectures: {" "}</span> {state?.numberOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="font-bold text-yellow-500">Instructor: {" "}</span> {state?.createdBy}
                                </p>

                            </div>
                            {role == "ADMIN" || data?.data?.subscription?.status=== 'active'? (
                                <button
                                    onClick={() => navigate("/course/displaylectures", {state: {...state}})}
                                    className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300"
                                >
                                    Watch Lectures
                                </button>
                            ): (
                                <button
                                onClick={() => navigate("/checkout")}
                                className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300"
                                >
                                    Subscribe
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Right of the grid */}
                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>
                        <p className="text-yellow-500">
                            Course Description: {" "}
                        </p>
                        <p>
                            {state?.description}
                        </p>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;