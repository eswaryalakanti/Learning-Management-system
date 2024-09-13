import Course from "../models/course.model.js";
import AppError from "../utils/Apperror.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getallcourses = async function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;
 console.log(skip,page,limit);
 
  try {
    const allcourses = await Course.find({})
      .select("-lectures")
      .skip(skip)
      .limit(limit);
    console.log(allcourses);
    
    if (!allcourses || allcourses.length === 0) {
      return next(new AppError("Courses not found", 404));
    }

    const totalCourses = await Course.countDocuments();

    return res.status(200).json({
      success: true,
      data: allcourses,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      message: "Courses retrieved successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getlecturesbyid = async function (req, res, next) {
  const cid = req.params.cid;
 console.log('id:',cid);
 
  try {
    const course = await Course.findById(cid);
    if (!course) {
      return next(new AppError("Course not found", 400));
    }
    return res.status(200).json({
      success: true,
      data: course.lectures,
      message: "Course retrieved successfully",
    });
  } catch (error) {
    
    return next(new AppError(error.message, 400));
  }
};

const createCourse = async function (req, res, next) {
  try {
    const { title, category, description, createdBy } = req.body;
    if (!title || !category || !description || !createdBy) {
      return next(new AppError("Please fill all fields", 400));
    }
    const data = new Course({
      title: title,
      category: category,
      description: description,
      createdBy: createdBy,
      thumbnail: {
        public_id: title,
        secure_url: `https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg`,
      },
    });

    if (!data) {
      return next(new AppError("Invalid data", 400));
    }

    if (req.file) {
      try {
        const upload = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
        });

        if (upload) {
          data.thumbnail.public_id = upload.public_id;
          data.thumbnail.secure_url = upload.secure_url; //upload.secure_url;

          //fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        next(new AppError(error.message || "issue in file uploading ", 500));
      }
    }

    await data.save();
    console.log("5");
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateCourse = async function (req, res, next) {
  try {
    const cid = req.params.cid;
    const courseupdate = Course.findByIdAndUpdate(
      cid,
      { $set: req.body },
      { runValidators: true }
    );

    if (!courseupdate) {
      return next(new AppError("Course not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: courseupdate,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteCourse = async function (req, res, next) {
  try {
    const cid = req.params.cid;
    const deletedcourse = await Course.findByIdAndDelete(cid);

    if (!deleteCourse) {
      return next(new AppError("course was not present", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedcourse,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const searchCourses = async function (req, res, next) {
  console.log("hi")
  try {
    const { query } = req.query;
    console.log("Q", query);

    if (!query) {
      return next(new AppError("Search query is required", 400));
    }

    console.log("c2");

    const searchResult = await Course.find({
      $or: [{ title: { $regex: query, $options: "i" } }],
    });

    if (!searchResult.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No courses found matching the search criteria",
      });
    }

    return res.status(200).json({
      success: true,
      data: searchResult,
      message: "Courses retrieved successfully",
    });
  } catch (error) {
    console.log(error);

    return next(new AppError(error.message, 500));
  }
};

const createlecture = async function (req, res, next) {
  try {
    const cid = req.params.cid;
    console.log(cid,"cid");
    console.log(req.body);
    
    const { title, description } = req.body;
  console.log(title,description);
  console.log(req.file);
  
    
    if (!title || !description) {
      return next(new AppError("all fields required", 400));
    }
    const user = await Course.findById(cid);
    console.log('c1',user);
    
    if (!user) {
      return next(new AppError("course didnot found ", 400));
    }
    const lecturedata = {
      title: title,
      description: description,
      lecture: {},
    };
    console.log('c2');
    
    if (req.file) {
      try {
        const upload = await new Promise((resolve,reject)=>{cloudinary.v2.uploader.upload_large(req.file.path, {resource_type:'video',
          folder: "lms",
          width: 250,
          height: 250,
        },(error,result)=>{
          if(error) reject(error)
          resolve(result);
        })
      }
      );
      
 console.log('c3');
 
        if (upload) {
          lecturedata.lecture.public_id = upload.public_id;
          lecturedata.lecture.secure_url = upload.secure_url; //upload.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
        console.log('c4');
        
      } catch (error) {
        next(new AppError(error.message || "issue in file uploading ", 500));
      }
      console.log('c5');
      
    }
    user.lectures.push(lecturedata);
    user.numberOfLectures = user.lectures.length;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "lecture created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    
    return next(new AppError(error.message, 500));
  }
};

const deletelecture = async function (req, res, next) {
  // try{
  //    const {cid,title}=req.params;
  //    const data=Course.findById(cid,{lectures:1,_id:0});// id will be included by default
  //   if(!data){
  //     return next(new AppError('Course not found',401));
  //   }

  //   const lecture=data.lectures.filter(u=> u.title!=title);
  //   data.lectures.lecture;
  //   await data.save();
  //   return res.status(200).json({
  //     status:true,
  //     message:'lecture deleted',
  //     data:data
  //     });
  // }
  // catch(error){
  //   return next(new AppError(error.message,500));
  // }

  const { courseId, lectureId } = req.query;

  console.log(courseId,lectureId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }

  if (!lectureId) {
    return next(new AppError("Lecture ID is required", 400));
  }


  console.log('d1');
  
  // Find the course uding the courseId
  const course = await Course.findById(courseId);
  console.log('d2');
  
  // If no course send custom message
  if (!course) {
    return next(new AppError("Invalid ID or Course does not exist.", 404));
  }

  console.log('d3');
  
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  console.log('d3');
  
  if (lectureIndex === -1) {
    return next(new AppError("Lecture does not exist.", 404));
  }

 console.log('d4');
 
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: "video",
    }
  );

  console.log('d5');
  
  course.lectures.splice(lectureIndex, 1);


  course.numberOfLectures = course.lectures.length;
  console.log('d6');
  

  await course.save();
  console.log('d7');
  

  return res.status(200).json({
    success: true,
    message: "Course lecture removed successfully",
  });
};

export {
  getallcourses,
  searchCourses,
  getlecturesbyid,
  createCourse,
  deleteCourse,
  updateCourse,
  createlecture,
  deletelecture,
};
