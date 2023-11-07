document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.getElementById("nav-btn");
  const sidebar = document.querySelector(".sidebar");
  const container = document.querySelector(".container");
  const typingContainer = document.querySelector(".typing-container");

  // Function to open the sidebar
  function openSidebar() {
    sidebar.classList.add("open");
    container.classList.add("container-pushed");
    typingContainer.classList.add("typing-container-pushed");
  }

  // Function to close the sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    container.classList.remove("container-pushed");
    typingContainer.classList.remove("typing-container-pushed");
  }

  // Function to handle window resize
  function handleWindowResize() {
    if (window.innerWidth >= 800) {
      openSidebar(); // Always open the sidebar for larger screens
    } else {
      closeSidebar(); // Close the sidebar for smaller screens
    }
  }

  // Initially handle the window size
  handleWindowResize();

  // Event listener for the navigation button
  navBtn.addEventListener("click", function () {
    if (window.innerWidth < 800) {
      sidebar.classList.toggle("open");
      container.classList.toggle("container-pushed");
      typingContainer.classList.toggle("typing-container-pushed");
    }
  });

  // Event listener for window resize
  window.addEventListener("resize", handleWindowResize);
});
