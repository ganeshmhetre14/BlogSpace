// Profile page specific JavaScript

// DOM Elements
let profileImg;
let profileName;
let profileBio;
let postsCount;
let followersCount;
let followingCount;
let nameInput;
let bioInput;
let profileImageUrlInput;
let myPostsContainer;
let savedPostsContainer;
let tabBtns;
let tabPanes;
let profileForm;

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    profileImg = document.getElementById('profile-img');
    profileName = document.getElementById('profile-name');
    profileBio = document.getElementById('profile-bio');
    postsCount = document.getElementById('posts-count');
    followersCount = document.getElementById('followers-count');
    followingCount = document.getElementById('following-count');
    nameInput = document.getElementById('name');
    bioInput = document.getElementById('bio');
    profileImageUrlInput = document.getElementById('profile-image-url');
    myPostsContainer = document.getElementById('my-posts-container');
    savedPostsContainer = document.getElementById('saved-posts-container');
    tabBtns = document.querySelectorAll('.tab-btn');
    tabPanes = document.querySelectorAll('.tab-pane');
    profileForm = document.getElementById('profile-form');

    // Initialize profile data
    loadProfileData();
    setupProfileTabs();
    setupProfileForm();
    setupFollowButtons();
    setupDeletePostButtons();
});

// Load profile data
function loadProfileData() {
    const profile = getUserProfile();
    
    if (!profileImg || !profileName || !profileBio) return;
    
    profileImg.src = profile.image;
    profileName.textContent = profile.name;
    profileBio.textContent = profile.bio;
    
    if (postsCount) postsCount.textContent = profile.posts.length;
    if (followersCount) followersCount.textContent = profile.followers || 256;
    if (followingCount) followingCount.textContent = profile.following || 124;
    
    // Load profile form data
    if (nameInput && bioInput && profileImageUrlInput) {
        nameInput.value = profile.name;
        bioInput.value = profile.bio;
        profileImageUrlInput.value = profile.image;
    }
    
    // Load user posts
    loadUserPosts();
    loadSavedPosts();
}

// Get user profile from local storage
function getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : {
        name: "John Doe",
        bio: "Passionate writer and tech enthusiast",
        image: "https://via.placeholder.com/150",
        posts: [1, 6], // IDs of posts authored by the user
        savedPosts: [2, 3, 5], // IDs of posts saved by the user
        followers: 256,
        following: 124
    };
}

// Save user profile to local storage
function saveUserProfile(profile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

// Get posts from local storage
function getPostsFromLocalStorage() {
    const posts = localStorage.getItem('blogPosts');
    return posts ? JSON.parse(posts) : [];
}

// Save posts to local storage
function savePostsToLocalStorage(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Load user posts in profile
function loadUserPosts() {
    if (!myPostsContainer) return;
    
    const profile = getUserProfile();
    const posts = getPostsFromLocalStorage();
    const userPosts = posts.filter(post => profile.posts.includes(post.id));
    
    myPostsContainer.innerHTML = '';
    if (userPosts.length > 0) {
        userPosts.forEach(post => {
            const postCard = createPostCard(post, true);
            myPostsContainer.appendChild(postCard);
        });
    } else {
        myPostsContainer.innerHTML = '<p class="no-posts">You haven\'t written any posts yet.</p>';
    }
}

// Load saved posts in profile
function loadSavedPosts() {
    if (!savedPostsContainer) return;
    
    const profile = getUserProfile();
    const posts = getPostsFromLocalStorage();
    const savedPosts = posts.filter(post => profile.savedPosts.includes(post.id));
    
    savedPostsContainer.innerHTML = '';
    if (savedPosts.length > 0) {
        savedPosts.forEach(post => {
            const postCard = createPostCard(post, false, true);
            savedPostsContainer.appendChild(postCard);
        });
    } else {
        savedPostsContainer.innerHTML = '<p class="no-posts">You haven\'t saved any posts yet.</p>';
    }
}

// Create post card element
function createPostCard(post, isUserPost = false, isSavedPost = false) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    
    let postHTML = `
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
    `;
    
    // Add action buttons for user posts or saved posts
    if (isUserPost) {
        postHTML += `
            <div class="post-actions">
                <button class="btn btn-edit" data-post-id="${post.id}">Edit</button>
                <button class="btn btn-delete" data-post-id="${post.id}">Delete</button>
            </div>
        `;
    } else if (isSavedPost) {
        postHTML += `
            <div class="post-actions">
                <button class="btn btn-unsave" data-post-id="${post.id}">Unsave</button>
            </div>
        `;
    }
    
    postHTML += `</div>`;
    postCard.innerHTML = postHTML;
    
    // Add click event to view full post
    postCard.addEventListener('click', function(e) {
        // Don't navigate if clicking on action buttons
        if (e.target.classList.contains('btn')) {
            e.stopPropagation();
            return;
        }
        
        // Navigate to blog detail page
        window.location.href = `blog-detail.html?id=${post.id}`;
    });
    
    // Add event listeners for action buttons
    if (isUserPost) {
        const editBtn = postCard.querySelector('.btn-edit');
        const deleteBtn = postCard.querySelector('.btn-delete');
        
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = `write.html?edit=${post.id}`;
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deletePost(post.id);
            });
        }
    } else if (isSavedPost) {
        const unsaveBtn = postCard.querySelector('.btn-unsave');
        
        if (unsaveBtn) {
            unsaveBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                unsavePost(post.id);
            });
        }
    }
    
    return postCard;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Setup profile tabs
function setupProfileTabs() {
    if (!tabBtns || !tabPanes) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Setup profile form
function setupProfileForm() {
    if (!profileForm) return;
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value;
        const bio = bioInput.value;
        const image = profileImageUrlInput.value;
        
        const profile = getUserProfile();
        profile.name = name;
        profile.bio = bio;
        profile.image = image;
        
        saveUserProfile(profile);
        loadProfileData();
        
        // Update author info in all user's posts
        updateAuthorInfo(profile);
        
        alert('Profile updated successfully!');
    });
}

// Update author info in all user's posts
function updateAuthorInfo(profile) {
    const posts = getPostsFromLocalStorage();
    const updatedPosts = posts.map(post => {
        if (profile.posts.includes(post.id)) {
            post.author.name = profile.name;
            post.author.image = profile.image;
        }
        return post;
    });
    
    savePostsToLocalStorage(updatedPosts);
}

// Delete a post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        // Remove post from posts array
        const posts = getPostsFromLocalStorage();
        const updatedPosts = posts.filter(post => post.id !== postId);
        savePostsToLocalStorage(updatedPosts);
        
        // Remove post from user's posts
        const profile = getUserProfile();
        profile.posts = profile.posts.filter(id => id !== postId);
        
        // Also remove from saved posts if it exists there
        profile.savedPosts = profile.savedPosts.filter(id => id !== postId);
        
        saveUserProfile(profile);
        
        // Reload user posts
        loadUserPosts();
        loadSavedPosts();
        
        // Update post count
        if (postsCount) postsCount.textContent = profile.posts.length;
        
        alert('Post deleted successfully!');
    }
}

// Unsave a post
function unsavePost(postId) {
    // Remove post from user's saved posts
    const profile = getUserProfile();
    profile.savedPosts = profile.savedPosts.filter(id => id !== postId);
    saveUserProfile(profile);
    
    // Reload saved posts
    loadSavedPosts();
    
    alert('Post removed from saved posts!');
}

// Setup follow buttons
function setupFollowButtons() {
    // Add followers/following functionality
    const followersElement = document.querySelector('.stat:nth-child(2)');
    const followingElement = document.querySelector('.stat:nth-child(3)');
    
    if (followersElement) {
        followersElement.addEventListener('click', function() {
            alert('Followers feature coming soon!');
        });
    }
    
    if (followingElement) {
        followingElement.addEventListener('click', function() {
            alert('Following feature coming soon!');
        });
    }
}

// Setup delete post buttons
function setupDeletePostButtons() {
    // This is handled in the createPostCard function
}
