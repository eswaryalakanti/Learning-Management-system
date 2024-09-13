import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { editprofile, getuser } from "../../redux/slice/authslice";



function EditProfile() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        name: "",
        previewImage: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.auth_data?.data?.id)
    });
    
    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0]; // this is the actual file
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }
    
    function handleInputChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    
    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data.name);
        
        if(!data.name || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.name.length < 5) {
            toast.error("Name cannot be less than 5 characters");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("avatar", data.avatar);
        console.log('form dat',formData.get('name'));
        
        await dispatch(editprofile(formData));
        await dispatch(getuser());
        console.log("image upload");
        
        navigate("/user/profile");
        
    }

    return (
        <HomeLayout>

            <div className="flex items-center justify-center h-[90vh]">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">
                        Edit Profile
                    </h1>

                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {
                            data.previewImage ? (
                                <img 
                                    src={data.previewImage}
                                    className="w-28 h-28 rounded-full m-auto"
                                />
                            ) : (
                                <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                            )
                        }
                    </label>
                    <input 
                        type="file"
                        onChange={handleImageUpload}
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .jpeg, .svg"
                        className="hidden"
                    
                    />

                    <div className="flex flex-col gap-1">
                        <label className="text-g font-semibold" htmlFor="name">
                            Full name
                        </label>
                        <input 
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={data.name}
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 cursor-pointer text-lg"
                    >
                        Update profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            Go back to profile
                        </p>
                    </Link>
                </form>
            </div>

        </HomeLayout>
    )
}

export default EditProfile;