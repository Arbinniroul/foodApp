import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extract images for the carousel
  const carouselImages = foodItem.map(item => ({
    img: item.img, // Assuming your food item has an 'img' property
    name: item.name // Assuming your food item has a 'name' property
  }));

  return (
    <div>
      <Navbar />
      <Carousel foodItems={carouselImages} setSearch={setSearch} /> 
      {
        foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <div key={data._id} className='mb-3'>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                    <hr />
                  </div>
                  <div className='row'>
                    {foodItem.length > 0 
                      ? foodItem.filter(item => 
                          item.CategoryName === data.CategoryName && 
                          item.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-3'>
                              <Card 
                                foodName={filterItems} 
                                options={filterItems.options[0]}
                              />
                            </div>
                          );
                        })
                      : <div>No Such Data found</div>}
                  </div>
                </div>
              );
            })
          : <div>No Categories Found</div>
      }
      
      <Footer />
    </div>
  );
}

export default Home;
