import React from 'react';

const ApplyFilter = ({ selectedBrands,setSelectedBrands,selectedShapes,
  setSelectedShapes,selectedCatagory,setSelectedCatagory,maxPrice,
setMaxPrice,sortOrder,setSortOrder}) => {
  const catagories=["Pre Inked Stamps",
    "Self Inking Stamps",
    "Certificate Stamps",
    "Embossed Stamps",
    "Date Stamps",
    "Stock Stamps",
    "Traditional Stamps",
    "Inks and Stamppads"  ]
const brands=[
  "Shiny",
  "Trodat",
  "Sun-Stamper",
  "Ecomax",
  "Neo",
  "Stampora",
];
const shapes=[
  "Round",
  "Oval",
  "Square",
  "Rectangle"
];
const orders=["price high to low", "price low to high"];
  return (
    <div className="font-serif text-blue-900 m-1 p-1 h-screen ">
      <h1 className="font-black">Filters</h1>
{/*Catagory selection*/}
    <div className="flex-1 flex-col m-1 p-1">
      <h1 className="font-semibold m-1">Select Catagory</h1>
    {  catagories.map((catagory) => (
      <div key={catagory}>
          <label className="font-light m-1">
        <input className="p-1 m-0.5 accent-blue-900"
      type="radio" name="catagory" value={catagory} checked={selectedCatagory === catagory}
      onChange={(e) => setSelectedCatagory(e.target.value)}
    />
    {catagory}
      </label>
     <br/>
      </div>
      ))}
    </div>
{/*Brand Selection*/}

<div className="flex-1 flex-col m-1 p-1">
      <h1 className="font-semibold m-1">Select Brands</h1>
    {  brands.map((brand) => (
      <div key={brand}>
          <label className="font-light m-1">
        <input className="p-1 m-0.5 accent-blue-900"
      type="checkbox" name="catagory" value={brand} checked={selectedBrands.includes(brand)}
       onChange={(e) => {
            if (e.target.checked) {
              setSelectedBrands([...selectedBrands, brand]);
            } else {
              setSelectedBrands(
                selectedBrands.filter((item) => item !== brand)
              );
        }}}
    />
    {brand}
      </label>
     <br/>
      </div>
      ))}
    </div>

    {/**Shapes Selection */}

    <div className="flex-1 flex-col m-1 p-1">
      <h1 className="font-semibold m-1">Select Shapes</h1>
    {  shapes.map((shape) => (
      <div key={shape}>
          <label className="font-light m-1">
        <input className="p-1 m-0.5 accent-blue-900"
      type="checkbox" name="shape" value={shape} checked={selectedShapes.includes(shape)}
       onChange={(e) => {
            if (e.target.checked) {
              setSelectedShapes([...selectedShapes, shape]);
            } else {
              setSelectedShapes(
                selectedShapes.filter((item) => item !== shape)
              );
        }}}
    />
    {shape}
      </label>
     <br/>
      </div>
      ))}

      {/**Max price slider */}
      <div className="m-1 p-1">
  <h1 className="font-semibold m-1">Set Price</h1>

  <input
    type="range"
    min="0"
    max="4000"
    step="50"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    className="w-full accent-blue-900"
  />

  <p className="text-sm">
    Maximum Price: ₹{maxPrice}
  </p>
</div>
{/**Sort order */}

    <div className="flex-1 flex-col m-1 p-1">
      <h1 className="font-semibold m-1">Sort Order</h1>
    {  orders.map((order) => (
      <div key={order}>
          <label className="font-light m-1">
        <input className="p-1 m-0.5 accent-blue-900"
      type="radio" name="order" value={order} checked={sortOrder === order}
      onChange={(e) => setSortOrder(e.target.value)}
    />
    {order}
      </label>
     <br/>
      </div>
      ))}
    </div>

{
  console.log(selectedCatagory,selectedBrands,selectedShapes,maxPrice,sortOrder)
}
 </div>

</div>    );
}


export default ApplyFilter;
