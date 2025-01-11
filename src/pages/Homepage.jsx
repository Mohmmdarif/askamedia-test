import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import CardContainer from "../components/CardContainer";
import Search from "../components/Search";
import { useSearchParams } from "react-router-dom";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import Modal from "../components/Modal";

function Homepage() {
  const [notification, setNotification] = useState({
    status: "",
    message: "",
    visible: false,
  });

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    const querySearch = searchParams.get("search");
    if (querySearch) {
      window.history.pushState(
        {},
        "",
        `/recipe?page=${pageNumber}&search=${encodeURIComponent(querySearch)}`
      );
    } else {
      window.history.pushState({}, "", `/recipe?page=${pageNumber}`);
    }
  };

  useEffect(() => {
    const storedMessage = localStorage.getItem("loginMessage");
    if (storedMessage) {
      const { status, message } = JSON.parse(storedMessage);
      setNotification({
        status,
        message,
        visible: true,
      });

      localStorage.removeItem("loginMessage");

      setTimeout(() => {
        setNotification({
          status: "",
          message: "",
          visible: false,
        });
      }, 3000);
    }

    const storedRecipes = JSON.parse(localStorage.getItem("recipeData")) || {
      recipes: [],
    };
    setFilteredRecipes(storedRecipes.recipes);

    const querySearch = searchParams.get("search");
    const queryPage = searchParams.get("page");

    if (querySearch) {
      handleSearch(querySearch, storedRecipes.recipes);
    } else {
      setFilteredRecipes(storedRecipes.recipes);
    }

    if (queryPage) {
      setCurrentPage(parseInt(queryPage, 10));
    }
  }, [searchParams]);

  const handleSearch = (query, data = filteredRecipes) => {
    try {
      const filteredData = data.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filteredData);
    } catch (error) {
      console.error("Error while filtering data: ", error);
    }
  };

  const handlePrevPaginate = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPaginate = () => {
    if (currentPage < Math.ceil(filteredRecipes.length / itemsPerPage)) {
      paginate(currentPage + 1);
    }
  };

  const handleShowModal = (e, id) => {
    e.stopPropagation();
    setId(id);
    setShowModal(!showModal);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();

    const updatedRecipes = filteredRecipes.filter((recipe) => recipe.id !== id);
    setFilteredRecipes(updatedRecipes);
    localStorage.setItem(
      "recipeData",
      JSON.stringify({ recipes: updatedRecipes })
    );
  };

  return (
    <div>
      {notification.visible && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <div className="w-full h-full lg:h-screen pt-10 flex flex-col items-center justify-center dark:bg-gray-800">
        <h1 className="font-bold text-3xl text-orange-600">Recipe List</h1>
        <div className="w-full flex gap-3 md:max-w-md px-4 md:px-10 mt-5">
          <Search onSearch={handleSearch} />
          <button
            className="w-1/3 bg-orange-600 text-white py-2 mt-5 rounded-md hover:bg-orange-500 font-semibold"
            onClick={handleShowModal}
          >
            Add Recipe
          </button>
        </div>
        <div className="w-full px-4 md:px-10 mt-5 md:mt-10">
          {filteredRecipes.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Data Not Found
            </div>
          ) : (
            <CardContainer
              recipes={currentItems}
              onClick={handleShowModal}
              onClickDelete={handleDelete}
            />
          )}
          {filteredRecipes.length !== 0 && (
            <div className="flex justify-center mt-5 pb-5">
              <button
                className="mx-1 px-2 py-1 rounded-md text-white hover:outline hover:outline-1 hover:outline-orange-600"
                onClick={handlePrevPaginate}
              >
                <AiOutlineCaretLeft color="#EA580C" />
              </button>
              {Array.from(
                {
                  length: Math.ceil(filteredRecipes.length / itemsPerPage),
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "outline outline-1 outline-orange-600 text-orange-600"
                        : "bg-white text-orange-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                className="mx-1 px-2 py-1 rounded-md text-white hover:outline hover:outline-1 hover:outline-orange-600"
                onClick={handleNextPaginate}
              >
                <AiOutlineCaretRight color="#EA580C" />
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal onClose={handleShowModal} id={id} />}
    </div>
  );
}

export default Homepage;
