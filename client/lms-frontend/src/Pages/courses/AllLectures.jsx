import React, { useEffect, useState, useCallback } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getalllectures, searchCourses } from '../../redux/slice/courseslice';
import LectureCard from '../../components/LectureCard';


const AllLectures = () => {
  const dispatch = useDispatch();
  const { courselist, totalPages, currentPage } = useSelector((state) => state.course);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [page, setPage] = useState(1);

  const fetchLectures = useCallback(async (page) => {
    await dispatch(getalllectures({ page }));
  }, [dispatch]);

  const handleSearch = useCallback(async (query) => {
    if (query.trim() === '') {
      await fetchLectures(page);
    } else {
      await dispatch(searchCourses(query));
    }
  }, [dispatch, fetchLectures, page]);

  useEffect(() => {
    fetchLectures(page);
  }, [fetchLectures, page]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    setDebounceTimeout(timeout);
  }, [searchTerm, handleSearch]);

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  



  return (
    <HomeLayout>
      <div className="px-10 py-6 minh-[90vh] m-6">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Explore the courses</h1>
        <input
          type="text"
          className="w-full mb-6 p-2 rounded-md text-black"
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
the input should look in very good manner u can use the animation and u can also use the third party packages also
        <div className="flex flex-wrap justify-center">
          {courselist.map((course, index) => (
            <LectureCard key={index} course={course} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button 
            onClick={goToPrevPage} 
            disabled={page === 1} 
            className="mr-4 p-2 bg-gray-300 rounded-md"
          >
            Previous
          </button>
          <button 
            onClick={goToNextPage} 
            disabled={page === totalPages} 
            className="p-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AllLectures;
