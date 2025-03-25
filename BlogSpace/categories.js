class CategoriesPage {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        this.renderCategories();
    }

    renderCategories() {
        const categoriesGrid = document.getElementById('categoriesGrid');
        
        // Group posts by category
        const categoriesMap = this.posts.reduce((acc, post) => {
            if (!acc[post.category]) {
                acc[post.category] = [];
            }
            acc[post.category].push(post);
            return acc;
        }, {});

        // Create category cards
        Object.entries(categoriesMap).forEach(([category, posts]) => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');
            
            categoryCard.innerHTML = `
                <div class="category-header">
                    <h2>${category}</h2>
                    <span class="post-count">${posts.length} Posts</span>
                </div>
                <div class="category-posts">
                    ${posts.slice(0, 3).map(post => `
                        <div class="category-post">
                            <h3>${post.title}</h3>
                            <p>${this.truncateContent(post.content)}</p>
                            <a href="blog-details.html?id=${post.id}">Read More</a>
                        </div>
                    `).join('')}
                    ${posts.length > 3 ? `
                        <div class="view-all">
                            <a href="#" class="view-all-link" data-category="${category}">
                                View All ${posts.length} Posts
                            </a>
                        </div>
                    ` : ''}
                </div>
            `;

            categoriesGrid.appendChild(categoryCard);
        });

        // Add event listeners for view all links
        this.addViewAllEventListeners();
    }

    addViewAllEventListeners() {
        const viewAllLinks = document.querySelectorAll('.view-all-link');
        viewAllLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.showCategoryPosts(category);
            });
        });
    }

    showCategoryPosts(category) {
        // This could be expanded to show a full list of posts in a specific category
        const categoryPosts = this.posts.filter(post => post.category === category);
        
        // For now, we'll just log to console, but you could create a modal or new page
        console.log(`All posts in ${category} category:`, categoryPosts);
        alert(`Showing all ${category} category posts (check console)`);
    }

    truncateContent(content, length = 100) {
        return content.length > length 
            ? content.substring(0, length) + '...' 
            : content;
    }
}

// Initialize the Categories Page
document.addEventListener('DOMContentLoaded', () => {
    new CategoriesPage();
});