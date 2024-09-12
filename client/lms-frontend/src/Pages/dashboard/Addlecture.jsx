import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addlecture } from "../../redux/slice/lectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";


function AddLecture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lecture, setLecture] = useState(null); // For storing the video file

  // Form submit handler
  const handleAddLecture = async (e) => {
    e.preventDefault();

    if (!title || !description || !lecture) {
      return alert("Please fill all the fields");
    }

    const formData = {
      title,
      description,
      lecture,
    };

    // Dispatch the add lecture action
    console.log(formData);
    
    await dispatch(addlecture({cid:state._id, data:formData}));

    // Navigate back to the course's lecture display page
    navigate(-1);
  };

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Add New Lecture to {state?.title}
        </h1>

        <form
          onSubmit={handleAddLecture}
          className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] bg-gray-800"
        >
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-yellow-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter lecture title"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-yellow-500">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter lecture description"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-yellow-500">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setLecture(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-2 rounded-md text-white font-semibold"
          >
            Add Lecture
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
