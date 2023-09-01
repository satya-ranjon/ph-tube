const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};

const handleCategoryData = async () => {
  try {
    const categoryLists = document.getElementById("category_lists");
    const { data: categories } = await fetchData(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    categories.forEach((itemText) => {
      const listItem = document.createElement("li");
      listItem.id = itemText.category_id;
      listItem.className = "px-4 rounded-sm cursor-pointer py-1 bg-neutral-300";
      listItem.textContent = itemText.category;
      categoryLists.appendChild(listItem);
    });
  } catch (err) {
    console.error("Error Category Fetch Data", err);
  }
};

handleCategoryData();
