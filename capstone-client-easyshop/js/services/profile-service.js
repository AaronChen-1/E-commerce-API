let profileService;

class ProfileService {
    
    currentProfile = {};
    
    loadProfile() {
        const url = `${config.baseUrl}/profile`;
        axios.get(url)
            .then(response => {
                this.currentProfile = response.data;
                this.displayProfileForm();
            })
            .catch(error => {
                const data = {
                    error: "Load profile failed."
                };
                templateBuilder.append("error", data, "errors");
            });
    }
    
    displayProfileForm() {
        const profileData = {
            firstName: this.currentProfile.firstName || '',
            lastName: this.currentProfile.lastName || '',
            phone: this.currentProfile.phone || '',
            email: this.currentProfile.email || '',
            address: this.currentProfile.address || '',
            city: this.currentProfile.city || '',
            state: this.currentProfile.state || '',
            zip: this.currentProfile.zip || ''
        };
        
        templateBuilder.build('profile', profileData, 'main');
    }
    
    updateProfile(profile) {
        const url = `${config.baseUrl}/profile`;
        
        axios.put(url, profile)
            .then(response => {
                this.currentProfile = response.data;
                
                const data = {
                    message: "Profile updated successfully!"
                };
                templateBuilder.append("success", data, "errors");
                
                // Clear form after 2 seconds
                setTimeout(() => {
                    loadHome();
                }, 2000);
            })
            .catch(error => {
                const data = {
                    error: "Update profile failed."
                };
                templateBuilder.append("error", data, "errors");
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    profileService = new ProfileService();
});
