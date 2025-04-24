import React from "react";
import ExploreMenu from "../../components/Explore Menu/ExploreMenu";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Menu = () => {
    const { category = "All" } = useParams();
    const navigate = useNavigate();

    const handleCategoryChange = (newCategory) => {
        navigate(newCategory === "All" ? "/menu" : `/menu/${newCategory}`);
    };

    return (
        <div>
            <ExploreMenu
                category={category}
                setCategory={handleCategoryChange}
            />
            <Outlet />
        </div>
    );
};

export default Menu;
