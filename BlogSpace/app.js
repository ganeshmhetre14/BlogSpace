// Sample data for blog posts
const samplePosts = [
    {
      id: 1,
      title: "Getting Started with JavaScript",
      category: "technology",
      excerpt: "Learn the basics of JavaScript programming language and start building interactive websites.",
      content:
        "JavaScript is a programming language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much everything else...",
      image: "https://via.placeholder.com/600x400?text=JavaScript",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-06-15",
      likes: 42,
    },
    {
      id: 2,
      title: "Exploring the Beaches of Bali",
      category: "travel",
      excerpt: "Discover the most beautiful beaches in Bali and plan your next vacation.",
      content:
        "Bali is known for its stunning beaches with crystal clear waters and white sand. In this post, we'll explore the top beaches you must visit...",
      image: "https://via.placeholder.com/600x400?text=Bali+Beaches",
      author: {
        name: "Jane Smith",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-06-10",
      likes: 78,
    },
    {
      id: 3,
      title: "Delicious Pasta Recipes",
      category: "food",
      excerpt: "Try these easy and delicious pasta recipes that will impress your family and friends.",
      content:
        "Pasta is a versatile dish that can be prepared in countless ways. Here are some of my favorite pasta recipes that are both easy to make and incredibly tasty...",
      image: "https://via.placeholder.com/600x400?text=Pasta+Recipes",
      author: {
        name: "Mike Johnson",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-06-05",
      likes: 56,
    },
    {
      id: 4,
      title: "Morning Routines for Productivity",
      category: "lifestyle",
      excerpt: "Establish a morning routine that sets you up for a productive and successful day.",
      content:
        "How you start your morning can significantly impact your entire day. In this post, I'll share some effective morning routines that can boost your productivity...",
      image: "https://via.placeholder.com/600x400?text=Morning+Routines",
      author: {
        name: "Sarah Williams",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-06-01",
      likes: 34,
    },
    {
      id: 5,
      title: "Benefits of Regular Exercise",
      category: "health",
      excerpt: "Discover the numerous physical and mental health benefits of regular exercise.",
      content:
        "Regular exercise is essential for maintaining good health. In this post, we'll explore the many benefits of staying active and how it can improve your overall well-being...",
      image: "https://via.placeholder.com/600x400?text=Exercise+Benefits",
      author: {
        name: "David Brown",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-05-28",
      likes: 67,
    },
    {
      id: 6,
      title: "Introduction to React.js",
      category: "technology",
      excerpt: "Learn the fundamentals of React.js and start building modern web applications.",
      content:
        "React.js is a popular JavaScript library for building user interfaces. In this post, we'll cover the basics of React and how to create your first React application...",
      image: "https://via.placeholder.com/600x400?text=React.js",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      date: "2023-05-25",
      likes: 89,
    },
  ]
  
  // Local storage functions
  function savePostsToLocalStorage(posts) {
    localStorage.setItem("blogPosts", JSON.stringify(posts))
  }
  
  function getPostsFromLocalStorage() {
    const posts = localStorage.getItem("blogPosts")
    return posts ? JSON.parse(posts) : samplePosts
  }
  
  function saveUserProfile(profile) {
    localStorage.setItem("userProfile", JSON.stringify(profile))
  }
  
  function getUserProfile() {
    const profile = localStorage.getItem("userProfile")
    return profile
      ? JSON.parse(profile)
      : {
          name: "John Doe",
          bio: "Passionate writer and tech enthusiast",
          image: "https://via.placeholder.com/150",
          posts: [1, 6], // IDs of posts authored by the user
          savedPosts: [2, 3, 5], // IDs of posts saved by the user
        }
  }
  
  // Initialize data
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize posts if not already in local storage
    if (!localStorage.getItem("blogPosts")) {
      savePostsToLocalStorage(samplePosts)
    }
  
    // Initialize user profile if not already in local storage
    if (!localStorage.getItem("userProfile")) {
      saveUserProfile(getUserProfile())
    }
  
    // Load page-specific content
    const currentPage = window.location.pathname.split("/").pop()
  
    if (currentPage === "index.html" || currentPage === "") {
      loadRecentPosts()
    } else if (currentPage === "categories.html") {
      setupCategoryListeners()
    } else if (currentPage === "profile.html") {
      loadProfileData()
      setupProfileTabs()
    } else if (currentPage === "write.html") {
      setupBlogForm()
    }
  
    // Setup mobile menu toggle
    setupMobileMenu()
  })
  
  // Mobile menu toggle
  function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu")
    const nav = document.querySelector("nav")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        nav.style.display = nav.style.display === "block" ? "none" : "block"
      })
    }
  }
  
  // Load recent posts on home page
  function loadRecentPosts() {
    const postsContainer = document.getElementById("recent-posts-container")
    if (!postsContainer) return
  
    const posts = getPostsFromLocalStorage()
    const recentPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)
  
    postsContainer.innerHTML = ""
    recentPosts.forEach((post) => {
      postsContainer.appendChild(createPostCard(post))
    })
  }
  
  // Create post card element
  function createPostCard(post) {
    const postCard = document.createElement("div")
    postCard.className = "post-card"
    postCard.innerHTML = `
          <div class="post-image">
              <img src="${post.image}" alt="${post.title}">
          </div>
          <div class="post-content">
              <span class="post-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
              <h3 class="post-title">${post.title}</h3>
              <p class="post-excerpt">${post.excerpt}</p>
              <div class="post-meta">
                  <div class="post-author">
                      <img src="${post.author.image}" alt="${post.author.name}">
                      <span>${post.author.name}</span>
                  </div>
                  <span>${formatDate(post.date)}</span>
              </div>
          </div>
      `
  
    // Add click event to view full post (not implemented in this demo)
    postCard.addEventListener("click", () => {
      alert(`Viewing post: ${post.title}\n\n${post.content}`)
    })
  
    return postCard
  }
  
  // Format date
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }
  
  // Setup category page listeners
  function setupCategoryListeners() {
    const categoryItems = document.querySelectorAll(".category-item")
    const categoryPostsContainer = document.getElementById("category-posts-container")
    const selectedCategoryTitle = document.getElementById("selected-category")
  
    if (!categoryItems || !categoryPostsContainer || !selectedCategoryTitle) return
  
    categoryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const category = this.getAttribute("data-category")
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
        selectedCategoryTitle.textContent = `${categoryName} Posts`
  
        const posts = getPostsFromLocalStorage()
        const filteredPosts = posts.filter((post) => post.category === category)
  
        categoryPostsContainer.innerHTML = ""
        if (filteredPosts.length > 0) {
          filteredPosts.forEach((post) => {
            categoryPostsContainer.appendChild(createPostCard(post))
          })
        } else {
          categoryPostsContainer.innerHTML = '<p class="no-posts">No posts found in this category.</p>'
        }
      })
    })
  }
  
  // Load profile data
  function loadProfileData() {
    const profile = getUserProfile()
    const profileImg = document.getElementById("profile-img")
    const profileName = document.getElementById("profile-name")
    const profileBio = document.getElementById("profile-bio")
    const postsCount = document.getElementById("posts-count")
    const followersCount = document.getElementById("followers-count")
    const followingCount = document.getElementById("following-count")
  
    if (!profileImg || !profileName || !profileBio) return
  
    profileImg.src = profile.image
    profileName.textContent = profile.name
    profileBio.textContent = profile.bio
  
    if (postsCount) postsCount.textContent = profile.posts.length
  
    // Load profile form data
    const nameInput = document.getElementById("name")
    const bioInput = document.getElementById("bio")
    const profileImageUrlInput = document.getElementById("profile-image-url")
  
    if (nameInput && bioInput && profileImageUrlInput) {
      nameInput.value = profile.name
      bioInput.value = profile.bio
      profileImageUrlInput.value = profile.image
    }
  
    // Load user posts
    loadUserPosts()
    loadSavedPosts()
  }
  
  // Load user posts in profile
  function loadUserPosts() {
    const myPostsContainer = document.getElementById("my-posts-container")
    if (!myPostsContainer) return
  
    const profile = getUserProfile()
    const posts = getPostsFromLocalStorage()
    const userPosts = posts.filter((post) => profile.posts.includes(post.id))
  
    myPostsContainer.innerHTML = ""
    if (userPosts.length > 0) {
      userPosts.forEach((post) => {
        myPostsContainer.appendChild(createPostCard(post))
      })
    } else {
      myPostsContainer.innerHTML = '<p class="no-posts">You haven\'t written any posts yet.</p>'
    }
  }
  
  // Load saved posts in profile
  function loadSavedPosts() {
    const savedPostsContainer = document.getElementById("saved-posts-container")
    if (!savedPostsContainer) return
  
    const profile = getUserProfile()
    const posts = getPostsFromLocalStorage()
    const savedPosts = posts.filter((post) => profile.savedPosts.includes(post.id))
  
    savedPostsContainer.innerHTML = ""
    if (savedPosts.length > 0) {
      savedPosts.forEach((post) => {
        savedPostsContainer.appendChild(createPostCard(post))
      })
    } else {
      savedPostsContainer.innerHTML = '<p class="no-posts">You haven\'t saved any posts yet.</p>'
    }
  }
  
  // Setup profile tabs
  function setupProfileTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    if (!tabBtns || !tabPanes) return
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
  
        // Remove active class from all buttons and panes
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to current button and pane
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  
    // Setup profile form submission
    const profileForm = document.getElementById("profile-form")
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("name").value
        const bio = document.getElementById("bio").value
        const image = document.getElementById("profile-image-url").value
  
        const profile = getUserProfile()
        profile.name = name
        profile.bio = bio
        profile.image = image
  
        saveUserProfile(profile)
        loadProfileData()
  
        alert("Profile updated successfully!")
      })
    }
  }
  
  // Setup blog form submission
  function setupBlogForm() {
    const blogForm = document.getElementById("blog-form")
    if (!blogForm) return
  
    blogForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const title = document.getElementById("title").value
      const category = document.getElementById("category").value
      const content = document.getElementById("content").value
      const image =
        document.getElementById("image").value || `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`
  
      const posts = getPostsFromLocalStorage()
      const profile = getUserProfile()
  
      // Create new post
      const newPost = {
        id: posts.length + 1,
        title: title,
        category: category,
        excerpt: content.substring(0, 120) + "...",
        content: content,
        image: image,
        author: {
          name: profile.name,
          image: profile.image,
        },
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      }
  
      // Add post to posts array
      posts.push(newPost)
      savePostsToLocalStorage(posts)
  
      // Add post to user's posts
      profile.posts.push(newPost.id)
      saveUserProfile(profile)
  
      alert("Blog post published successfully!")
      blogForm.reset()
    })
  }
  
  