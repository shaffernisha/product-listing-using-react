import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCategories(["all", ...new Set(data.map((p) => p.category))]);
      });
  }, []);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating.rate - a.rating.rate;
      return 0;
    });

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">
          <span className="logo">Yusra Product Store</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      {/* FILTERS */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c, i) => (
            <option value={c} key={i}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price - Low to High</option>
          <option value="high">Price - High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid">
        {filtered.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p className="price">₹ {p.price}</p>
            <p>⭐ {p.rating.rate}</p>

            <button className="cart-btn" onClick={() => console.log("Added:", p.title)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
