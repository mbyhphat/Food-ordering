import React from "react";
import { useParams } from "react-router-dom";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Category = () => {
    const { category = "All" } = useParams();
    return <FoodDisplay category={category} />;
};

export default Category;
