document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const usernameInput = document.getElementById('username');
  const profileContainer = document.getElementById('profile-container');
  const themeToggle = document.getElementById('theme-toggle');

  // 1. Dark / Light Theme Switcher
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  }

  // 2. Trigger Search on Enter Key
  if (usernameInput) {
    usernameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') fetchUserData();
    });
  }

  // 3. Trigger Search on Click
  if (searchBtn) {
    searchBtn.addEventListener('click', fetchUserData);
  }

  // Fetch GitHub Profile and Repositories
  async function fetchUserData() {
    const username = usernameInput.value.trim();
    if (!username) return;

    // Show loading state inside the container
    if (profileContainer) {
      profileContainer.innerHTML = `
        <div class="profile-card" style="text-align: center; color: var(--text-secondary); padding: 20px;">
          <i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
          <p>Fetching user data...</p>
        </div>
      `;
    }

    try {
      // Fetch profile details
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error('User not found');
        throw new Error('Failed to fetch user data');
      }
      const user = await userRes.json();

      // Fetch top recent repositories
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
      const repos = reposRes.ok ? await reposRes.json() : [];

      renderProfile(user, repos);
    } catch (error) {
      if (profileContainer) {
        profileContainer.innerHTML = `
          <div class="profile-card" style="text-align: center; color: #ef4444; padding: 20px;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
            <p>${error.message}</p>
          </div>
        `;
      }
    }
  }

  // Render content dynamically
  function renderProfile(user, repos) {
    if (!profileContainer) return;

    const repoCards = repos.map(repo => `
      <a href="${repo.html_url}" target="_blank" class="repo-card">
        <strong style="color: var(--accent-color); font-size: 0.95rem;">${repo.name}</strong>
        <p style="font-size: 0.8rem; margin-top: 6px; color: var(--text-secondary);">
          ⭐ ${repo.stargazers_count} &nbsp;|&nbsp; 🍴 ${repo.forks_count}
        </p>
      </a>
    `).join('');

    profileContainer.innerHTML = `
      <div class="profile-card">
        <div class="profile-header">
          <img src="${user.avatar_url}" alt="${user.name || user.login}" class="avatar" />
          <div>
            <h2>${user.name || user.login}</h2>
            <a href="${user.html_url}" target="_blank" style="color: var(--accent-color); font-size: 0.9rem; text-decoration: none;">@${user.login}</a>
            <p style="margin-top: 8px; font-size: 0.9rem; color: var(--text-secondary);">${user.bio || 'This profile has no bio.'}</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-item"><span>Repos</span><strong>${user.public_repos}</strong></div>
          <div class="stat-item"><span>Followers</span><strong>${user.followers}</strong></div>
          <div class="stat-item"><span>Following</span><strong>${user.following}</strong></div>
        </div>

        <div class="meta-info">
          <div><i class="fa-solid fa-location-dot"></i> ${user.location || 'Not Available'}</div>
          <div><i class="fa-solid fa-link"></i> ${user.blog ? `<a href="${user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}" target="_blank" style="color: inherit; text-decoration: none;">Website</a>` : 'Not Available'}</div>
        </div>

        <h3 style="margin-top: 24px; font-size: 1rem; margin-bottom: 12px;">Recent Repositories</h3>
        <div class="repo-list">
          ${repoCards || '<p style="color: var(--text-secondary);">No public repositories found.</p>'}
        </div>
      </div>
    `;
  }
});