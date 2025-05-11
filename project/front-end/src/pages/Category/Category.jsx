import React from "react";
import { useParams } from "react-router-dom";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Category = () => {
    const { category } = useParams();
    return <FoodDisplay category={category || "all"} />;
};

export default Category;
