// ===================================
// VANGALAMMAN DECORS - MAIN JAVASCRIPT
// CLEAN + SAFE + OPTIMIZED VERSION
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // NAVIGATION FUNCTIONALITY
    // ===================================

    const dropdownToggle = document.getElementById('dropdownToggle');
    const brandWrapper = document.getElementById('brandTrigger');
    const panelOverlay = document.getElementById('brand-panel-overlay');
    const panelClose = document.getElementById('brand-panel-close');

    if (dropdownToggle && panelOverlay && brandWrapper) {

        function openPanel() {
            panelOverlay.hidden = false;
            document.body.style.overflow = 'hidden'; // Prevent scrolling underneath
        }

        function closePanel() {
            panelOverlay.hidden = true;
            document.body.style.overflow = '';
        }

        dropdownToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            openPanel();
        });

        brandWrapper.addEventListener('click', function (e) {
            if (!dropdownToggle.contains(e.target)) {
                openPanel();
            }
        });

        if (panelClose) {
            panelClose.addEventListener('click', closePanel);
        }

        panelOverlay.addEventListener('click', function (e) {
            if (e.target === panelOverlay) {
                closePanel();
            }
        });
    }


    // ===================================
    // HAMBURGER MENU
    // ===================================

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // ===================================
    // PROJECT FILTER & MODAL
    // ===================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-grid');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const modalGallery = document.getElementById('modalGallery');
    const modalDetails = document.getElementById('modalDetails');

    const projectsData = {
        "1": {
            clientName: "Velayuthapuram Client",
            location: "Velayuthapuram",
            images: [
                { src: "assets/hall/hall-project-01.jpg", category: "Living Room", title: "Main Living Area", description: "A beautifully elegant main living space featuring custom seating and warm lighting elements." },
                { src: "assets/hall/hall-project-02.jpg", category: "Decor", title: "Refined Textures", description: "Close up view of the premium wall textures and selected artwork complementing the space." },
                { src: "assets/hall/hall-project-03.jpg", category: "Lighting", title: "Ambient Glow", description: "Strategically placed ambient lighting enhances the sophisticated atmosphere of the home." },
                { src: "assets/hall/hall-project-04.jpg", category: "Furniture", title: "Bespoke Sofa Set", description: "Custom-made luxury seating arrangement positioned optimally for both conversation and media viewing." },
                { src: "assets/hall/hall-project-05.jpg", category: "Accent Wall", title: "Wooden Paneling", description: "A striking wooden panel accent wall serving as the focal point of the expansive living room." },
                { src: "assets/hall/hall-project-06.jpg", category: "Overview", title: "Seamless Flow", description: "Wide angle showing the seamless flow from the living space into the adjoining areas." }
            ]
        },
        "2": {
            clientName: "Private Client",
            location: "Chennai",
            images: [
                { src: "assets/kitchen/kitchen-project-01.jpg", category: "Kitchen Canvas", title: "Modern Cabinets", description: "Sleek, handle-less modern cabinetry providing ample concealed storage." },
                { src: "assets/kitchen/kitchen-project-02.jpg", category: "Countertops", title: "Quartz Surfaces", description: "Premium quartz countertops offering durability and a luxurious finish." },
                { src: "assets/kitchen/kitchen-project-03.jpg", category: "Appliances", title: "Integrated Tech", description: "State-of-the-art integrated appliances maintaining the clean, unbroken lines of the kitchen." },
                { src: "assets/kitchen/kitchen-project-04.jpg", category: "Lighting", title: "Task Lighting", description: "Under-cabinet LED task lighting ensures perfect visibility for food preparation." },
                { src: "assets/kitchen/kitchen-project-05.jpg", category: "Island", title: "Central Island", description: "A spacious central island serving as both a prep area and a casual dining spot." },
                { src: "assets/kitchen/kitchen-project-06.jpg", category: "View", title: "Open Kitchen", description: "The open-plan kitchen seamlessly integrating with the adjacent living and dining spaces." }
            ]
        },
        "3": {
            clientName: "Palladam Client",
            location: "Palladam",
            images: [
                { src: "assets/hall/hall-project-07.jpg", category: "Entrance", title: "Grand Foyer", description: "A grand entrance foyer setting a premium tone for the rest of the home." },
                { src: "assets/hall/hall-project-08.jpg", category: "Living Space", title: "Luxurious Seating", description: "High-end furnishings paired with elegant drapery in the primary gathering space." },
                { src: "assets/hall/hall-project-09.jpg", category: "Details", title: "Artistic Corners", description: "Curated decor pieces and indoor plants breathing life into the corners." },
                { src: "assets/hall/hall-project-10.jpg", category: "Ceiling", title: "False Ceiling Design", description: "Intricate false ceiling with cove lighting adding depth and dimension." },
                { src: "assets/hall/hall-project-11.jpg", category: "Media Unit", title: "Custom TV Wall", description: "A minimalist customized TV unit crafted to hide messy wires while looking chic." },
                { src: "assets/hall/hall-project-12.jpg", category: "Corridor", title: "Illuminated Hallway", description: "The connecting hallway elegantly lit with modern fixtures and premium wall finishes." }
            ]
        },
        "4": {
            clientName: "Gandhi Gramam Client",
            location: "Gandhi Gramam",
            images: [
                { src: "assets/kitchen/kitchen-project-07.jpg", category: "Layout", title: "U-Shaped Kitchen", description: "A highly efficient U-shaped layout maximizing every inch of available space." },
                { src: "assets/kitchen/kitchen-project-08.jpg", category: "Cabinets", title: "Matte Finish", description: "Elegant matte finish cabinets resistant to fingerprints and easy to maintain." },
                { src: "assets/kitchen/kitchen-project-09.jpg", category: "Storage", title: "Tall Pantry Unit", description: "A tall pantry unit providing immense storage capacity for dry goods." },
                { src: "assets/kitchen/kitchen-project-10.jpg", category: "Backsplash", title: "Designer Tiles", description: "Custom designer backsplash tiles adding a pop of character and ease of cleaning." },
                { src: "assets/kitchen/kitchen-project-11.jpg", category: "Accessories", title: "Pull-out Organizers", description: "Smart internal pull-out organizers ensuring perfectly efficient use of corner spaces." },
                { src: "assets/kitchen/kitchen-project-12.jpg", category: "Dining Interlock", title: "Breakfast Counter", description: "A sleek breakfast counter bridging the kitchen and the main dining room." }
            ]
        },
        "5": {
            clientName: "Urban Homeowner",
            location: "Coimbatore",
            images: [
                { src: "assets/hall/hall-project-13.jpg", category: "Main Hall", title: "Contemporary Charm", description: "A contemporary living area utilizing a neutral palette interspersed with bold accents." },
                { src: "assets/hall/hall-project-14.jpg", category: "Seating", title: "Sectional Comfort", description: "A massive, comfortable sectional perfect for large family gatherings." },
                { src: "assets/hall/hall-project-15.jpg", category: "Accents", title: "Metallic Accents", description: "Subtle gold and brass metallic accents elevating the room's luxurious feel." },
                { src: "assets/hall/hall-project-16.jpg", category: "Rugs", title: "Textured Rugs", description: "Plush, textured rugs grounding the seating arrangement beautifully." },
                { src: "assets/hall/hall-project-17.jpg", category: "Lighting", title: "Pendant Lights", description: "Statement pendant lights providing both illumination and artistic flair." },
                { src: "assets/hall/hall-project-18.jpg", category: "Dining", title: "Adjacent Dining", description: "The cohesive transition from the living space into the modern dining area." }
            ]
        },
        "6": {
            clientName: "Young Couple",
            location: "Chennai",
            images: [
                { src: "assets/kitchen/kitchen-project-11.jpg", category: "Kitchen Overview", title: "Elegant Efficiency", description: "A beautifully elegant kitchen designed specifically for a young professional couple." },
                { src: "assets/kitchen/kitchen-project-12.jpg", category: "Color Scheme", title: "Two-Tone Cabinets", description: "A trendy two-tone cabinet strategy keeping the space feeling light and airy." },
                { src: "assets/kitchen/kitchen-project-13.jpg", category: "Appliances", title: "Smart Appliances", description: "Integration of smart, energy-efficient appliances for modern convenience." },
                { src: "assets/kitchen/kitchen-project-14.jpg", category: "Workspace", title: "Ample Prep Area", description: "Uncluttered, continuous countertops offering maximum food preparation space." },
                { src: "assets/kitchen/kitchen-project-15.jpg", category: "Hardware", title: "Minimalist Pulls", description: "Minimalist edge-pull hardware maintaining the sleek lines of the cabinetry." },
                { src: "assets/kitchen/kitchen-project-16.jpg", category: "Lighting", title: "Natural Light", description: "Optimized layout ensuring maximum benefit from the natural window light." }
            ]
        },
        "7": {
            clientName: "Minimalist Enthusiast",
            location: "OMR",
            images: [
                { src: "assets/hall/hall-project-19.jpg", category: "Living Area", title: "True Minimalism", description: "A space characterized by extreme simplicity, clean lines, and an uncluttered environment." },
                { src: "assets/hall/hall-project-20.jpg", category: "Colors", title: "Monochrome Magic", description: "A strict monochromatic color scheme enhanced by subtle textural differences." },
                { src: "assets/hall/hall-project-21.jpg", category: "Furniture", title: "Low-Profile Seating", description: "Low-profile, sleek furniture emphasizing the volume of the room." },
                { src: "assets/hall/hall-project-22.jpg", category: "Decor", title: "Restrained Art", description: "A single, large-scale piece of restrained art serving as the sole visual anchor." },
                { src: "assets/hall/hall-project-23.jpg", category: "Windows", title: "Unobstructed Views", description: "Sheer window treatments maximizing natural light and unobstructed views." },
                { src: "assets/hall/hall-project-24.jpg", category: "Layout", title: "Breathing Space", description: "Intentional empty space allowing the architectural details to stand out." }
            ]
        },
        "8": {
            clientName: "The Family Hub",
            location: "Tambaram",
            images: [
                { src: "assets/kitchen/kitchen-project-01.jpg", category: "Layout", title: "Family Kitchen", description: "A robust, family-friendly kitchen designed for high traffic and durability." },
                { src: "assets/kitchen/kitchen-project-02.jpg", category: "Island", title: "Homework Station", description: "A large island doubling as a casual eating area and children's homework station." },
                { src: "assets/kitchen/kitchen-project-03.jpg", category: "Surfaces", title: "Durable Quartz", description: "Highly durable quartz countertops resistant to stains and everyday wear." },
                { src: "assets/kitchen/kitchen-project-04.jpg", category: "Storage", title: "Maximum Storage", description: "Floor-to-ceiling cabinets ensuring ample storage for a large family." },
                { src: "assets/kitchen/kitchen-project-05.jpg", category: "Safety", title: "Soft Close Mechs", description: "Soft-close hardware on all doors and drawers for safety and quiet operation." },
                { src: "assets/kitchen/kitchen-project-06.jpg", category: "Lighting", title: "Bright Interiors", description: "Bright, consistent ambient lighting supplemented by focused task lights." }
            ]
        },
        "9": {
            clientName: "Literature Lover",
            location: "Adyar",
            images: [
                { src: "assets/hall/hall-project-24.jpg", category: "Library", title: "Extensive Shelving", description: "Custom floor-to-ceiling bookshelf units designed to house a massive collection." },
                { src: "assets/hall/hall-project-25.jpg", category: "Seating", title: "Reading Nook", description: "A cozy, dedicated reading nook with an ergonomic lounge chair." },
                { src: "assets/hall/hall-project-26.jpg", category: "Lighting", title: "Directed Task Light", description: "Perfectly angled floor reading lamps ensuring eye comfort during long sessions." },
                { src: "assets/hall/hall-project-27.jpg", category: "Materials", title: "Rich Woods", description: "Rich, dark wood finishes attributing a classic, intellectual vibe to the space." },
                { src: "assets/hall/hall-project-28.jpg", category: "Integration", title: "Living Fusion", description: "Seamless fusion of the library space with the primary entertainment living area." },
                { src: "assets/hall/hall-project-29.jpg", category: "Details", title: "Display Niches", description: "Integrated lit niches within the shelving for displaying precious artifacts." }
            ]
        },
        "10": {
            clientName: "Thennilai Homeowner",
            location: "Thennilai",
            images: [
                { src: "assets/kitchen/kitchen-project-05.jpg", category: "Modern Home", title: "Warm Kitchen Aesthetics", description: "A kitchen blending modern layout efficiency with warm, traditional wood tones." },
                { src: "assets/kitchen/kitchen-project-06.jpg", category: "Layout", title: "L-Shaped Efficiency", description: "An L-shaped layout providing an excellent work triangle for cooking." },
                { src: "assets/kitchen/kitchen-project-07.jpg", category: "Backsplash", title: "Patterned Tiles", description: "A striking patterned backsplash tile adding a unique focal point." },
                { src: "assets/kitchen/kitchen-project-08.jpg", category: "Sinks", title: "Double Basin", description: "A large double-basin sink situated perfectly beneath a natural light source." },
                { src: "assets/kitchen/kitchen-project-09.jpg", category: "Details", title: "Open Shelving", description: "A mix of closed cabinets and open shelving for displaying finest dinnerware." },
                { src: "assets/kitchen/kitchen-project-10.jpg", category: "Dining", title: "Dining Peninsula", description: "A raised peninsula counter separating the active cooking zone from diners." }
            ]
        },
        "11": {
            clientName: "Comfort Seekers",
            location: "ECR",
            images: [
                { src: "assets/hall/hall-project-01.jpg", category: "Bedroom", title: "Tranquil Retreat", description: "A serene, cozy bedroom environment optimized for deep relaxation and rest." },
                { src: "assets/hall/hall-project-02.jpg", category: "Bedding", title: "Plush Centerpiece", description: "An oversized, plush bed frame featuring a custom extended headboard." },
                { src: "assets/hall/hall-project-03.jpg", category: "Lighting", title: "Soft Illumination", description: "Warm, dimmable LED cove lighting creating a soothing nighttime ambiance." },
                { src: "assets/hall/hall-project-04.jpg", category: "Colors", title: "Earth Tones", description: "A calming palette of soft earth tones and muted neutrals." },
                { src: "assets/hall/hall-project-05.jpg", category: "Window", title: "Blackout Curtains", description: "Premium layered drapery including heavy blackout curtains for perfect sleep conditions." },
                { src: "assets/hall/hall-project-06.jpg", category: "Wardrobe", title: "Seamless Storage", description: "Built-in seamlessly integrated wardrobes that visually recede into the walls." }
            ]
        },
        "12": {
            clientName: "Culinary Expert",
            location: "Besant Nagar",
            images: [
                { src: "assets/kitchen/kitchen-project-06.jpg", category: "Premium Kitchen", title: "Chef's Dream", description: "A professional-grade premium kitchen designed for a serious culinary enthusiast." },
                { src: "assets/kitchen/kitchen-project-07.jpg", category: "Appliances", title: "Commercial Grade", description: "Equipped with massive, commercial-grade ranges and dual-zone refrigeration." },
                { src: "assets/kitchen/kitchen-project-08.jpg", category: "Prep Area", title: "Steel Surfaces", description: "Hygienic, indestructible stainless steel prep areas surrounding the main cooking zone." },
                { src: "assets/kitchen/kitchen-project-09.jpg", category: "Ventilation", title: "High-CFM Hood", description: "A powerful, architectural hood vent to manage smoke and odors efficiently." },
                { src: "assets/kitchen/kitchen-project-10.jpg", category: "Storage", title: "Utensil Rails", description: "Accessible utensil rails and magnetic knife strips for immediate tool access." },
                { src: "assets/kitchen/kitchen-project-11.jpg", category: "Lighting", title: "Brilliant Task Lights", description: "Extra-bright, shadow-free overhead task lighting covering all working surfaces." }
            ]
        },
        "13": {
            clientName: "Luxury Aficionado",
            location: "Poes Garden",
            images: [
                { src: "assets/hall/hall-project-12.jpg", category: "Living Space", title: "Unapologetic Luxury", description: "An ultra-luxurious living experience featuring premium imported materials throughout." },
                { src: "assets/hall/hall-project-13.jpg", category: "Flooring", title: "Italian Marble", description: "Exquisite, large-format Italian marble flooring reflecting the ambient light." },
                { src: "assets/hall/hall-project-14.jpg", category: "Chandelier", title: "Crystal Centerpiece", description: "A breathtaking custom crystal chandelier commanding attention in the room's center." },
                { src: "assets/hall/hall-project-15.jpg", category: "Furniture", title: "Designer Pieces", description: "Curated collection of authentic designer furniture pieces." },
                { src: "assets/hall/hall-project-16.jpg", category: "Accents", title: "Gold Detailing", description: "Subtle brushed gold inlay detailing running through the custom wall panels." },
                { src: "assets/hall/hall-project-17.jpg", category: "Tech", title: "Invisible Tech", description: "A fully integrated hidden home theater system disguised behind art panels." }
            ]
        },
        "14": {
            clientName: "Kodumudi Resident",
            location: "Kodumudi",
            images: [
                { src: "assets/kitchen/kitchen-project-10.jpg", category: "Modern Kitchen", title: "Sleek Aesthetics", description: "A distinctly modern kitchen embracing sharp lines and high-gloss finishes." },
                { src: "assets/kitchen/kitchen-project-11.jpg", category: "Finish", title: "High-Gloss Acrylic", description: "Ultra-reflective high-gloss acrylic cabinets visually expanding the space." },
                { src: "assets/kitchen/kitchen-project-12.jpg", category: "Hardware", title: "Gola Profile", description: "Handle-less Gola profile systems for a completely uninterrupted facade." },
                { src: "assets/kitchen/kitchen-project-13.jpg", category: "Accessories", title: "Tambour Units", description: "Convenient roll-up tambour units keeping countertop appliances hidden." },
                { src: "assets/kitchen/kitchen-project-14.jpg", category: "Countertops", title: "Ultra-thin Profiles", description: "Modern ultra-thin composite countertops adding a touch of futuristic elegance." },
                { src: "assets/kitchen/kitchen-project-15.jpg", category: "Sink", title: "Undermount Sink", description: "A seamless undermount sink integration rendering wipe-downs effortless." }
            ]
        },
        "15": {
            clientName: "Dindugal Retreat",
            location: "Dindugal",
            images: [
                { src: "assets/hall/hall-project-15.jpg", category: "Bedroom Interior", title: "Elegant Sanctuaries", description: "An elegant, master bedroom layout combining luxury with deep comfort." },
                { src: "assets/hall/hall-project-16.jpg", category: "Headboard", title: "Tufted Fabric", description: "A towering, custom-tufted fabric headboard dominating the visual space." },
                { src: "assets/hall/hall-project-17.jpg", category: "Seating", title: "Bay Window Seating", description: "A plush bay window seating area perfect for morning coffees." },
                { src: "assets/hall/hall-project-18.jpg", category: "Colors", title: "Regal Palette", description: "A regal color palette utilizing deep emeralds and rich golds." },
                { src: "assets/hall/hall-project-19.jpg", category: "Lighting", title: "Bedside Pendants", description: "Symmetrical dropped bedside pendant lights freeing up nightstand space." },
                { src: "assets/hall/hall-project-20.jpg", category: "Storage", title: "Walk-In Transition", description: "The elegant transitional space leading seamlessly into the massive walk-in closet." }
            ]
        },
        "default": {
            clientName: "Vangalamman Decors",
            location: "Tamil Nadu",
            images: [
                { src: "assets/hall/hall-project-05.jpg", category: "Interior", title: "Premium Design", description: "One of our many premium interior design projects where excellence meets creativity." },
                { src: "assets/kitchen/kitchen-project-05.jpg", category: "Details", title: "Tailored Solutions", description: "We deliver tailored, high-end finishing touches that reflect our clients' unique visions and lifestyle." }
            ]
        }
    };

    if (projectCards.length) {

        let currentModalImages = [];
        let currentModalProject = null;
        let currentImageIndex = 0;

        function updateSlider() {
            // Update images
            const imgs = modalGallery.querySelectorAll('img.slide-img');
            imgs.forEach((img, index) => {
                if (index === currentImageIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });

            // Update category tag overlay
            const tagOverlay = modalGallery.querySelector('.modal-category-tag');
            if (tagOverlay && currentModalImages[currentImageIndex]) {
                tagOverlay.textContent = currentModalImages[currentImageIndex].category;
            }

            // Update indicators
            const dots = modalGallery.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                if (index === currentImageIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Update dynamic text with animation
            const dynamicContent = document.getElementById('dynamicContent');
            if (dynamicContent && currentModalImages[currentImageIndex]) {
                const { title, description } = currentModalImages[currentImageIndex];

                // Fade out
                dynamicContent.classList.remove('active');

                setTimeout(() => {
                    dynamicContent.innerHTML = `
                        <h2>${title}</h2>
                        <div class="divider"></div>
                        <p>${description}</p>
                    `;
                    // Fade in
                    dynamicContent.classList.add('active');
                }, 200); // 200ms matches CSS transition
            }
        }

        function slideNext(e) {
            if (e) e.stopPropagation();
            if (currentModalImages.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % currentModalImages.length;
                updateSlider();
            }
        }

        function slidePrev(e) {
            if (e) e.stopPropagation();
            if (currentModalImages.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + currentModalImages.length) % currentModalImages.length;
                updateSlider();
            }
        }

        function jumpToSlide(index, e) {
            if (e) e.stopPropagation();
            if (index >= 0 && index < currentModalImages.length && index !== currentImageIndex) {
                currentImageIndex = index;
                updateSlider();
            }
        }

        // Modal Open Logic
        projectCards.forEach(card => {
            card.addEventListener('click', function () {
                const id = this.dataset.id;
                currentModalProject = projectsData[id] || projectsData["default"];
                currentModalImages = currentModalProject.images;
                currentImageIndex = 0;

                const firstImage = currentModalImages[0];

                // Populate Gallery side
                let galleryHTML = currentModalImages.map((img, index) =>
                    `<img src="${img.src}" alt="${img.title}" class="slide-img ${index === 0 ? 'active' : ''}">`
                ).join('');

                // Tag Overlay
                galleryHTML += `<div class="modal-category-tag">${firstImage.category}</div>`;

                // Add slider arrows and dots if multiple images
                if (currentModalImages.length > 1) {
                    galleryHTML += `
                        <button class="slider-btn slider-prev" id="sliderPrev">❮</button>
                        <button class="slider-btn slider-next" id="sliderNext">❯</button>
                        <div class="modal-indicators">
                            ${currentModalImages.map((_, i) => `<div class="indicator-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
                        </div>
                    `;
                }

                modalGallery.innerHTML = galleryHTML;

                // Populate Details side
                modalDetails.innerHTML = `
                    <div class="client-info">
                        <div class="info-group">
                            <span class="info-label">Client</span>
                            <span class="info-value">${currentModalProject.clientName}</span>
                        </div>
                        <div class="info-group">
                            <span class="info-label">Location</span>
                            <span class="info-value">${currentModalProject.location}</span>
                        </div>
                    </div>
                    <div class="content-fade active" id="dynamicContent">
                        <h2>${firstImage.title}</h2>
                        <div class="divider"></div>
                        <p>${firstImage.description}</p>
                    </div>
                `;

                // Event Listeners for new elements inside modal
                if (currentModalImages.length > 1) {
                    document.getElementById('sliderPrev').addEventListener('click', slidePrev);
                    document.getElementById('sliderNext').addEventListener('click', slideNext);

                    modalGallery.querySelectorAll('.indicator-dot').forEach(dot => {
                        dot.addEventListener('click', function (e) {
                            jumpToSlide(parseInt(this.dataset.index), e);
                        });
                    });
                }

                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close Modal Logic
        const closeProjectModal = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModal.addEventListener('click', closeProjectModal);

        projectModal.addEventListener('click', function (e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }


    // ===================================
    // FORM VALIDATION (CONTACT + CONSULTATION)
    // ===================================

    function handleForm(formId, fields, successId) {

        const form = document.getElementById(formId);

        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            clearErrors();

            let isValid = true;

            fields.forEach(field => {

                const input = document.getElementById(field.id);
                const value = input.value.trim();

                if (value === '') {
                    showError(field.errorId, field.requiredMessage);
                    isValid = false;
                } else if (field.minLength && value.length < field.minLength) {
                    showError(field.errorId, field.lengthMessage);
                    isValid = false;
                } else if (field.type === 'email' && value !== '' && !isValidEmail(value)) {
                    showError(field.errorId, 'Please enter a valid email address');
                    isValid = false;
                } else if (field.type === 'phone' && !isValidPhone(value)) {
                    showError(field.errorId, 'Please enter a valid phone number');
                    isValid = false;
                }

            });

            if (isValid) {
                showSuccess(successId);
                form.reset();
            }

        });
    }


    // CONTACT FORM
    handleForm('contactForm', [
        { id: 'name', errorId: 'nameError', requiredMessage: 'Please enter your name', minLength: 2, lengthMessage: 'Name must be at least 2 characters' },
        { id: 'phone', errorId: 'phoneError', requiredMessage: 'Please enter your phone number', type: 'phone' },
        { id: 'email', errorId: 'emailError', requiredMessage: '', type: 'email' },
        { id: 'message', errorId: 'messageError', requiredMessage: 'Please enter your message', minLength: 10, lengthMessage: 'Message must be at least 10 characters' }
    ], 'formSuccess');


    // CONSULTATION FORM
    handleForm('consultationForm', [
        { id: 'consultName', errorId: 'consultNameError', requiredMessage: 'Please enter your name', minLength: 2, lengthMessage: 'Name must be at least 2 characters' },
        { id: 'consultPhone', errorId: 'consultPhoneError', requiredMessage: 'Please enter your phone number', type: 'phone' },
        { id: 'consultEmail', errorId: 'consultEmailError', requiredMessage: '', type: 'email' },
        { id: 'consultMessage', errorId: 'consultMessageError', requiredMessage: 'Please tell us about your project', minLength: 10, lengthMessage: 'Please provide more details (at least 10 characters)' }
    ], 'consultFormSuccess');


    function showError(id, message) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = message;
            element.classList.add('active');
        }
    }

    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
            el.classList.remove('active');
        });
        document.querySelectorAll('.form-success').forEach(el => {
            el.classList.remove('active');
        });
    }

    function showSuccess(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('active');
            setTimeout(() => element.classList.remove('active'), 5000);
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        const clean = phone.replace(/\D/g, '');
        return clean.length === 10;
    }


    // ===================================
    // SMOOTH SCROLL
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                e.preventDefault();

                const offset = document.querySelector('.navbar').offsetHeight;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }

        });
    });


    // ===================================
    // NAVBAR SCROLL SHADOW
    // ===================================

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

    });


    // ===================================
    // SCROLL REVEAL ANIMATION (SAFE)
    // ===================================

    const revealSections = document.querySelectorAll(
        '.about-section, .services-section, .process-section'
    );

    function revealOnScroll() {

        const trigger = window.innerHeight / 1.2;

        revealSections.forEach(section => {
            const top = section.getBoundingClientRect().top;

            if (top < trigger) {
                section.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

});
(function () {
    const trigger = document.getElementById('logoToggle');
    const overlay = document.getElementById('brand-panel-overlay');
    const closeBtn = document.getElementById('brand-panel-close');

    if (!trigger || !overlay) return;

    function openPanel() {
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        overlay.hidden = true;
        document.body.style.overflow = '';
    }

    trigger.addEventListener('click', function (e) {
        if (e.target.closest("a")) return;
        openPanel();
    });

    closeBtn.addEventListener('click', closePanel);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closePanel();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePanel();
        }
    });
})();