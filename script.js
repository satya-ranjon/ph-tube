let selectedCategory = "1000";

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

    categories.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.id = item.category_id;
      listItem.className = `px-4 rounded-sm cursor-pointer py-1 bg-neutral-300 ${
        selectedCategory === item.category_id && "bg-[#FF1F3D] text-white"
      }`;
      listItem.textContent = item.category;
      listItem.addEventListener("click", () =>
        selectVideoCategory(categories, item)
      );
      categoryLists.appendChild(listItem);
    });
  } catch (err) {
    console.error("Error Category Fetch Data", err);
  }
};

const selectVideoCategory = (categories, item) => {
  selectedCategory = item.category_id;
  clearData();

  categories.forEach((category) => {
    const categoryItem = document.getElementById(category.category_id);
    if (category.category_id === selectedCategory) {
      categoryItem.classList.add("bg-[#FF1F3D]", "text-white");
    } else {
      categoryItem.classList.remove("bg-[#FF1F3D]", "text-white");
    }
  });

  handleVideosData();
};

const handleVideosData = async () => {
  try {
    const videosList = document.getElementById("videos");
    const notFound = document.getElementById("notFound");
    const loader = document.getElementById("loading");

    loader.classList.remove("hidden");

    const { data: videos } = await fetchData(
      `https://openapi.programming-hero.com/api/videos/category/${selectedCategory}`
    );

    loader.classList.add("hidden");

    if (videos.length === 0) {
      notFound.classList.remove("hidden");
    } else {
      notFound.classList.add("hidden");
      videos.forEach((video) => {
        const div = document.createElement("div");
        div.className = "w-full overflow-hidden rounded-md";
        div.innerHTML = `
        <div class="w-full relative">
          <img
            src=${video.thumbnail}
            alt="thumbnail"
            class="w-full h-[220px] rounded-md" />
          <div
            class="p-2 bg-neutral-800 text-white absolute bottom-4 right-4 rounded-md text-sm">
            3hrs 56 min ago
          </div>
        </div>

        <div class="flex justify-start items-start my-4 gap-2">
          <img
            src=${video.authors[0].profile_picture}
            alt="profile_name"
            class="h-10 w-10 ov rounded-full mt-1" />
          <div class="">
            <h1 class="font-bold text-lg line-clamp-2 leading-7">
              ${video.title}
            </h1>
            <div
              class="flex justify-start text-sm items-center gap-2 text-neutral-400">
              <p>${video.authors[0].profile_name}</p>
              ${
                video.authors[0].verified === true &&
                `<img src="./images/verified.svg" alt="verified" />`
              }
            </div>
            <p class="text-neutral-400 text-sm">${video.others.views} views</p>
          </div>
        </div>
        
        `;
        videosList.appendChild(div);
      });
    }
  } catch (err) {
    console.error("Error Videos Fetch Data", err);
  }
};

const clearData = () => {
  document.getElementById("videos").innerHTML = "";
};

handleVideosData();
handleCategoryData();
