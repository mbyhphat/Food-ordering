import React, { useState } from 'react'
import ExploreMenu from '../../components/Explore Menu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menu = () => {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Menu